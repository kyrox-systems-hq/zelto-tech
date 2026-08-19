@echo off
setlocal EnableExtensions
title Zelto Outreach Auto Deploy - Installer
set "SELF=%~f0"
set "PS1=%TEMP%\Install-ZeltoOutreachAutoDeploy-%RANDOM%%RANDOM%.ps1"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$lines=Get-Content -LiteralPath $env:SELF; $marker=[Array]::IndexOf($lines,'### POWERSHELL PAYLOAD ###'); if($marker -lt 0){exit 91}; $lines[($marker+1)..($lines.Length-1)] | Set-Content -LiteralPath $env:PS1 -Encoding UTF8"
if errorlevel 1 (
  echo Could not unpack installer payload.
  pause
  exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%PS1%"
set "RC=%ERRORLEVEL%"
del /q "%PS1%" >nul 2>&1

echo.
if "%RC%"=="0" (
  echo ZELTO OUTREACH AUTO DEPLOY INSTALLED SUCCESSFULLY.
) else (
  echo INSTALLATION FAILED. Leave this window open.
)
echo.
pause
exit /b %RC%

### POWERSHELL PAYLOAD ###
$ErrorActionPreference = 'Stop'

$Repo = 'kyrox-systems-hq/zelto-tech'
$Branch = 'main'
$ProjectId = 'zelto-tech'
$HostingRoot = 'https://zelto-tech.web.app'
$TestSlug = 'mach42-semiconductor-demand-gen'
$TestText = 'Mach42 Semiconductor Demand Generation Concept'

$Root = Join-Path $env:LOCALAPPDATA 'Kyrox\zelto-outreach-deployer'
$RepoDir = Join-Path $Root 'repo'
$FirebaseCliDir = Join-Path $Root 'firebase-cli'
$FirebaseCmd = Join-Path $FirebaseCliDir 'node_modules\.bin\firebase.cmd'
$WatcherSource = Join-Path $RepoDir 'scripts\outreach-deployer\Watch-ZeltoOutreachDeploy.ps1'
$Watcher = Join-Path $Root 'Watch-ZeltoOutreachDeploy.ps1'
$StateFile = Join-Path $Root 'last-deployed-marker.txt'
$LogFile = Join-Path $Root 'install.log'
$TaskName = 'Zelto Outreach Auto Deploy'
$MarkerPath = 'public/proposals/.deploy-ready'
$StatusPath = 'public/proposals/.deploy-status'

function Write-InstallLog {
    param([string]$Message)
    New-Item -ItemType Directory -Path $Root -Force | Out-Null
    Add-Content -LiteralPath $LogFile -Value ("{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),$Message)
}

function Refresh-Path {
    $machine = [Environment]::GetEnvironmentVariable('Path','Machine')
    $user = [Environment]::GetEnvironmentVariable('Path','User')
    $env:Path = "$machine;$user"
}

function Invoke-Native {
    param([string]$FilePath,[string[]]$Arguments=@())
    $old = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $output = (& $FilePath @Arguments 2>&1 | Out-String)
        $code = $LASTEXITCODE
    }
    finally { $ErrorActionPreference = $old }
    [pscustomobject]@{Code=$code;Output=$output.Trim()}
}

function Invoke-InteractiveNative {
    param([string]$FilePath,[string[]]$Arguments=@())
    $old = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try { & $FilePath @Arguments; $code = $LASTEXITCODE }
    finally { $ErrorActionPreference = $old }
    return $code
}

function Ensure-WingetPackage {
    param([string]$Command,[string]$PackageId)
    if (Get-Command $Command -ErrorAction SilentlyContinue) { return }
    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) { throw "$Command is missing and winget is unavailable." }
    Write-Host "Installing $PackageId..."
    $r = Invoke-Native -FilePath 'winget' -Arguments @('install','--id',$PackageId,'-e','--source','winget','--accept-package-agreements','--accept-source-agreements','--silent')
    if ($r.Code -ne 0) { throw "winget failed to install $PackageId: $($r.Output)" }
    Refresh-Path
    if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) { throw "$PackageId installed, but $Command is still unavailable. Restart Windows once and rerun this installer." }
}

function Get-RemoteFile {
    param([string]$Path)
    $encodedBranch = [uri]::EscapeDataString($Branch)
    $r = Invoke-Native -FilePath 'gh' -Arguments @('api',"repos/$Repo/contents/$Path?ref=$encodedBranch")
    if ($r.Code -ne 0) { return $null }
    return ($r.Output | ConvertFrom-Json)
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
    $r = Invoke-Native -FilePath 'gh' -Arguments $args
    if ($r.Code -ne 0) { throw "GitHub could not update $Path: $($r.Output)" }
    return ($r.Output | ConvertFrom-Json)
}

function Assert-WebPage {
    param([string]$Url,[string]$RequiredText='',[switch]$RequireNoIndex)
    $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 30
    if ([int]$r.StatusCode -lt 200 -or [int]$r.StatusCode -ge 400) { throw "HTTP $($r.StatusCode) from $Url" }
    if ($RequiredText -and $r.Content -notmatch [regex]::Escape($RequiredText)) { throw "Expected '$RequiredText' was not found at $Url" }
    if ($RequireNoIndex) {
        $robots = [string]$r.Headers['X-Robots-Tag']
        if ($robots -notmatch 'noindex') { throw "X-Robots-Tag noindex was not present at $Url" }
    }
    return $r
}

function Stop-ExistingTask {
    $task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
    if ($null -ne $task) {
        try { Stop-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue } catch {}
        Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    }
}

try {
    Write-Host ''
    Write-Host 'Zelto Outreach Auto Deploy - installation and validation'
    Write-Host '-------------------------------------------------------'
    Write-Host ''

    Write-Host '[1/8] Checking Git, GitHub CLI, Node.js and npm...'
    Ensure-WingetPackage -Command 'git' -PackageId 'Git.Git'
    Ensure-WingetPackage -Command 'gh' -PackageId 'GitHub.cli'
    Ensure-WingetPackage -Command 'node' -PackageId 'OpenJS.NodeJS.LTS'
    Refresh-Path
    if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) { throw 'npm is unavailable.' }

    Write-Host '[2/8] Checking GitHub access...'
    $auth = Invoke-Native -FilePath 'gh' -Arguments @('auth','status','--hostname','github.com')
    if ($auth.Code -ne 0) {
        Write-Host 'GitHub needs one browser sign-in.'
        if ((Invoke-InteractiveNative -FilePath 'gh' -Arguments @('auth','login','--hostname','github.com','--git-protocol','https','--web')) -ne 0) { throw 'GitHub sign-in failed.' }
    }
    $view = Invoke-Native -FilePath 'gh' -Arguments @('repo','view',$Repo,'--json','nameWithOwner')
    if ($view.Code -ne 0) { throw "GitHub cannot access $Repo." }
    $setup = Invoke-Native -FilePath 'gh' -Arguments @('auth','setup-git','--hostname','github.com')
    if ($setup.Code -ne 0) { throw "GitHub credential-helper setup failed: $($setup.Output)" }

    Write-Host '[3/8] Creating a clean local Zelto checkout...'
    Stop-ExistingTask
    if (Test-Path -LiteralPath $Root) { Remove-Item -LiteralPath $Root -Recurse -Force }
    New-Item -ItemType Directory -Path $Root -Force | Out-Null
    $clone = Invoke-Native -FilePath 'gh' -Arguments @('repo','clone',$Repo,$RepoDir,'--','--branch',$Branch,'--single-branch')
    if ($clone.Code -ne 0) { throw "Repository clone failed: $($clone.Output)" }
    foreach ($required in @((Join-Path $RepoDir 'firebase.json'),(Join-Path $RepoDir '.firebaserc'),$WatcherSource,(Join-Path $RepoDir "public\proposals\$TestSlug\index.html"))) {
        if (-not (Test-Path -LiteralPath $required)) { throw "Required file is missing: $required" }
    }

    Write-Host '[4/8] Installing Firebase CLI...'
    New-Item -ItemType Directory -Path $FirebaseCliDir -Force | Out-Null
    $npm = Invoke-Native -FilePath 'npm.cmd' -Arguments @('install','--prefix',$FirebaseCliDir,'firebase-tools@latest','--no-audit','--no-fund','--loglevel=error')
    if ($npm.Code -ne 0 -or -not (Test-Path -LiteralPath $FirebaseCmd)) { throw "Firebase CLI installation failed: $($npm.Output)" }

    Write-Host '[5/8] Reusing/validating Firebase authentication...'
    $projects = Invoke-Native -FilePath $FirebaseCmd -Arguments @('projects:list','--json')
    if ($projects.Code -ne 0 -or $projects.Output -notmatch [regex]::Escape($ProjectId)) {
        Write-Host 'Firebase needs one browser sign-in. Use the Google account that owns the Zelto Firebase project.'
        if ((Invoke-InteractiveNative -FilePath $FirebaseCmd -Arguments @('login','--reauth')) -ne 0) { throw 'Firebase sign-in failed.' }
        $projects = Invoke-Native -FilePath $FirebaseCmd -Arguments @('projects:list','--json')
        if ($projects.Code -ne 0 -or $projects.Output -notmatch [regex]::Escape($ProjectId)) { throw "Firebase login cannot access $ProjectId." }
    }

    Write-Host '[6/8] Deploying current Zelto main to Firebase now...'
    Push-Location $RepoDir
    try { $deploy = Invoke-Native -FilePath $FirebaseCmd -Arguments @('deploy','--only','hosting','--project',$ProjectId,'--non-interactive') }
    finally { Pop-Location }
    if ($deploy.Code -ne 0) { throw "Direct Firebase deployment failed: $($deploy.Output)" }
    $testUrl = "$HostingRoot/proposals/$TestSlug/"
    Assert-WebPage -Url $testUrl -RequiredText $TestText -RequireNoIndex | Out-Null
    Write-Host "Mach42 route is live: $testUrl"

    Write-Host '[7/8] Installing the automatic two-minute watcher...'
    Copy-Item -LiteralPath $WatcherSource -Destination $Watcher -Force
    if (Test-Path -LiteralPath $StateFile) { Remove-Item -LiteralPath $StateFile -Force }
    $action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$Watcher`""
    $repeatTrigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 2) -RepetitionDuration (New-TimeSpan -Days 3650)
    $currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
    $logonTrigger = New-ScheduledTaskTrigger -AtLogOn -User $currentUser
    $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 15) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -Hidden
    $principal = New-ScheduledTaskPrincipal -UserId $currentUser -LogonType Interactive -RunLevel Limited
    Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger @($repeatTrigger,$logonTrigger) -Settings $settings -Principal $principal -Force | Out-Null

    Write-Host '[8/8] Running a real marker -> watcher -> Firebase -> live-page test...'
    $requestId = "INSTALL_$([guid]::NewGuid().ToString('N'))"
    $markerContent = @"
slug=$TestSlug
request_id=$requestId
required_text=$TestText
requested_at_utc=$((Get-Date).ToUniversalTime().ToString('o'))
"@
    Put-RemoteFile -Path $MarkerPath -Content $markerContent -Message 'Trigger Zelto outreach auto-deploy installation test' | Out-Null
    if (Test-Path -LiteralPath $StateFile) { Remove-Item -LiteralPath $StateFile -Force }
    Start-ScheduledTask -TaskName $TaskName

    $deadline = (Get-Date).AddMinutes(4)
    $passed = $false
    $lastStatus = ''
    while ((Get-Date) -lt $deadline) {
        Start-Sleep -Seconds 5
        $statusFile = Get-RemoteFile -Path $StatusPath
        if ($null -eq $statusFile) { continue }
        $statusText = Decode-GitHubContent -FileObject $statusFile
        $lastStatus = $statusText
        if ($statusText -match "(?m)^request_id=$([regex]::Escape($requestId))$") {
            if ($statusText -match '(?m)^status=success$') { $passed = $true; break }
            if ($statusText -match '(?m)^status=failure$') { throw "Watcher reported failure: $statusText" }
        }
    }
    if (-not $passed) { throw "Timed out waiting for watcher acknowledgement. Last status: $lastStatus" }

    Assert-WebPage -Url $testUrl -RequiredText $TestText -RequireNoIndex | Out-Null
    $taskInfo = Get-ScheduledTaskInfo -TaskName $TaskName
    if ($taskInfo.LastTaskResult -ne 0) { throw "Scheduled task returned Windows result $($taskInfo.LastTaskResult)." }

    Write-InstallLog "INSTALLATION PASSED. $testUrl"
    Write-Host ''
    Write-Host 'FULL END-TO-END VALIDATION PASSED.' -ForegroundColor Green
    Write-Host 'GitHub proposal commit -> deploy marker -> Windows watcher -> Firebase Hosting -> live verification is now automatic.'
    Write-Host 'This does not alter the existing personal-portfolio deployment watcher.'
    Write-Host ''
    exit 0
}
catch {
    $message = $_.Exception.Message
    try { Write-InstallLog "FAILED: $message" } catch {}
    try { Stop-ExistingTask } catch {}
    Write-Host ''
    Write-Host 'ZELTO AUTO DEPLOY INSTALLATION FAILED' -ForegroundColor Red
    Write-Host $message -ForegroundColor Red
    Write-Host "Log: $LogFile"
    Write-Host ''
    exit 1
}
