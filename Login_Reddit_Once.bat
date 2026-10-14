@echo off
title PDFArenaArc Agent - Reddit Login Session
cd /d "%~dp0"
echo ===================================================
echo   Opening Private Browser for 1-Time Reddit Login
echo ===================================================
node growth_agent/login.js
pause
