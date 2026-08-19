@echo off
setlocal EnableExtensions
title Zelto Outreach Auto Deploy - Bootstrap

set "TARGET=%TEMP%\Install-ZeltoOutreachAutoDeploy-%RANDOM%-%RANDOM%.cmd"
set "URL=https://raw.githubusercontent.com/kyrox-systems-hq/zelto-tech/main/scripts/outreach-deployer/Install-ZeltoOutreachAutoDeploy.cmd"

echo.
echo Zelto Outreach Auto Deploy - bootstrap
echo ======================================
echo.
echo Downloading the canonical installer from GitHub...

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
  "Invoke-WebRequest -UseBasicParsing -Uri '%URL%' -OutFile '%TARGET%'"

if errorlevel 1 (
  echo.
  echo Could not download the Zelto installer.
  echo Leave this window open and send me a screenshot.
  echo.
  pause
  exit /b 1
)

call "%TARGET%"
set "RC=%ERRORLEVEL%"
del /q "%TARGET%" >nul 2>&1

echo.
if "%RC%"=="0" (
  echo Zelto deployment bridge setup completed.
) else (
  echo Zelto deployment bridge setup failed with error code %RC%.
)
echo.
pause
exit /b %RC%
