@echo off
title PDFArenaArc Agent - Reddit Login Session
cd /d "%~dp0"
echo =========================================================
echo   Launching Real Google Chrome for Agent Session Setup...
echo =========================================================
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --user-data-dir="%~dp0growth_agent\user_data" "https://www.reddit.com/login"
echo.
echo Browser opened! Please log into Reddit in that window.
echo Once logged in, you can close this window.
echo =========================================================
pause
