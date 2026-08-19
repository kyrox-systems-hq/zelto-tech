$ErrorActionPreference = 'Stop'

$Repo = 'kyrox-systems-hq/zelto-tech'
$Branch = 'main'
$ProjectId = 'zelto-tech'
$HostingRoot = 'https://zelto-tech.web.app'

$Root = Join-Path $env:LOCALAPPDATA 'Kyrox\zelto-outreach-deployer'
$RepoDir = Join-Path $Root 'repo'
$FirebaseCliDir = Join-Path $Root 'firebase-cli'
$FirebaseCmd = Join-Path $FirebaseCliDir 'node_modules\.bin\firebase.cmd'
$StateFile = Join-Path $Root 'last-deployed-marker.txt'
$LogFile = Join-Path $Root 'deploy.log'

$MarkerPath = 'public/proposals/.deploy-ready'
$StatusPath = 'public/proposals/.deploy-status'

function Write-DeployLog {
    param([string]$Message)
    New-Item -ItemType Directory -Path $Root -Force | Out-Null
    Add-Content -LiteralPath $LogFile -Value ("{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Message)
}

function Invoke-Native {
    param([string]$FilePath,[string[]]$Arguments=@())
    $old = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $output = (& $FilePath @Arguments 2>&1 | Out-String)
        $code = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $old
    }
    [pscustomobject]@{ Code=$code; Output=$output.Trim() }
}

function Get-RemoteFile {
    param([string]$Path)
    $encodedBranch = [uri]::EscapeDataString($Branch)
    $result = Invoke-Native -FilePath 'gh' -Arguments @('api',"repos/$Repo/contents/$Path?ref=$encodedBranch")
    if ($result.Code -ne 0) { return $null }
    return ($result.Output | ConvertFrom-Json)
}

function Decode-GitHubContent {
    param([object]$FileObject)
    if ($null -eq $FileObject -or -not $FileObject.content) { return '' }
    $base64 = ($FileObject.content -replace '\s','')
    return [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($base64))
}

function Put-RemoteFile {
    param([string]$Path,[string]$Content,[string]$Message)
    $existing = Get-RemoteFile -Path $Path
    $encoded = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($Content))
    $args = @('api',"repos/$Repo/contents/$Path",'--method','PUT','-f',"message=$Message",'-f',"content=$encoded",'-f',"branch=$Branch")
    if ($null -ne $existing -and $existing.sha) { $args += @('-f',"sha=$($existing.sha)") }
    $result = Invoke-Native -FilePath 'gh' -Arguments $args
    if ($result.Code -ne 0) { throw "GitHub could not update $Path: $($result.Output)" }
    return ($result.Output | ConvertFrom-Json)
}

function Parse-Marker {
    param([string]$Text)
    $data = @{}
    foreach ($line in ($Text -split "`r?`n")) {
        if ($line -match '^([^=]+)=(.*)$') {
            $data[$matches[1].Trim()] = $matches[2].Trim()
        }
    }
    return $data
}

function Publish-Status {
    param(
        [string]$Status,
        [string]$MarkerSha,
        [string]$Slug,
        [string]$RequestId,
        [string]$LiveUrl,
        [string]$Detail=''
    )
    $safe = (($Detail -replace "`r|`n",' ') -replace '\s+',' ').Trim()
    if ($safe.Length -gt 700) { $safe = $safe.Substring(0,700) }
    $content = @"
status=$Status
marker_sha=$MarkerSha
slug=$Slug
request_id=$RequestId
deployed_at_utc=$((Get-Date).ToUniversalTime().ToString('o'))
firebase_project=$ProjectId
live_url=$LiveUrl
detail=$safe
"@
    Put-RemoteFile -Path $StatusPath -Content $content -Message "Record Zelto outreach deployment $Status" | Out-Null
}

$markerSha = ''
$slug = ''
$requestId = ''
$liveUrl = ''

try {
    New-Item -ItemType Directory -Path $Root -Force | Out-Null

    foreach ($cmd in @('git','gh')) {
        if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { throw "$cmd is unavailable." }
    }
    if (-not (Test-Path -LiteralPath $FirebaseCmd)) { throw "Firebase CLI is missing at $FirebaseCmd" }
    if (-not (Test-Path -LiteralPath $RepoDir)) { throw "Local Zelto checkout is missing at $RepoDir" }

    $marker = Get-RemoteFile -Path $MarkerPath
    if ($null -eq $marker) {
        Write-DeployLog 'No deploy marker exists. Nothing to do.'
        exit 0
    }

    $markerSha = [string]$marker.sha
    if (Test-Path -LiteralPath $StateFile) {
        $previous = (Get-Content -LiteralPath $StateFile -Raw).Trim()
        if ($previous -eq $markerSha) { exit 0 }
    }

    $markerData = Parse-Marker -Text (Decode-GitHubContent -FileObject $marker)
    $slug = [string]$markerData['slug']
    $requestId = [string]$markerData['request_id']
    $requiredText = [string]$markerData['required_text']

    if (-not $slug -or $slug -notmatch '^[a-z0-9][a-z0-9-]*$') { throw "Invalid or missing slug in deploy marker." }
    if (-not $requestId) { $requestId = $markerSha }

    Write-DeployLog "Deploy request $requestId for $slug"

    $fetch = Invoke-Native -FilePath 'git' -Arguments @('-C',$RepoDir,'fetch','origin',$Branch,'--prune')
    if ($fetch.Code -ne 0) { throw "git fetch failed: $($fetch.Output)" }
    $checkout = Invoke-Native -FilePath 'git' -Arguments @('-C',$RepoDir,'checkout','-B',$Branch,"origin/$Branch")
    if ($checkout.Code -ne 0) { throw "git checkout failed: $($checkout.Output)" }
    $reset = Invoke-Native -FilePath 'git' -Arguments @('-C',$RepoDir,'reset','--hard',"origin/$Branch")
    if ($reset.Code -ne 0) { throw "git reset failed: $($reset.Output)" }

    $page = Join-Path $RepoDir ("public\proposals\$slug\index.html")
    if (-not (Test-Path -LiteralPath $page)) { throw "Proposal page does not exist at $page" }

    Push-Location $RepoDir
    try {
        $deploy = Invoke-Native -FilePath $FirebaseCmd -Arguments @('deploy','--only','hosting','--project',$ProjectId,'--non-interactive')
    }
    finally {
        Pop-Location
    }
    if ($deploy.Code -ne 0) { throw "Firebase deployment failed: $($deploy.Output)" }

    $liveUrl = "$HostingRoot/proposals/$slug/"
    $response = Invoke-WebRequest -Uri $liveUrl -UseBasicParsing -TimeoutSec 30
    if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "HTTP $($response.StatusCode) from $liveUrl" }
    if ($requiredText -and $response.Content -notmatch [regex]::Escape($requiredText)) { throw "Expected live text '$requiredText' was not found." }
    $robots = [string]$response.Headers['X-Robots-Tag']
    if ($robots -notmatch 'noindex') { throw "X-Robots-Tag noindex is missing from $liveUrl" }

    Set-Content -LiteralPath $StateFile -Value $markerSha -Encoding ascii
    Publish-Status -Status 'success' -MarkerSha $markerSha -Slug $slug -RequestId $requestId -LiveUrl $liveUrl -Detail 'Firebase Hosting deployment and live HTTP verification passed.'
    Write-DeployLog "SUCCESS $liveUrl"
    exit 0
}
catch {
    $detail = $_.Exception.Message
    Write-DeployLog "FAILURE $detail"
    if ($markerSha) {
        try { Publish-Status -Status 'failure' -MarkerSha $markerSha -Slug $slug -RequestId $requestId -LiveUrl $liveUrl -Detail $detail } catch {}
    }
    exit 1
}
