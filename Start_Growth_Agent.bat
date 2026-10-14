@echo off
title PDFArenaArc Growth Employee Agent
cd /d "%~dp0"
echo ===================================================
echo   PDFArenaArc Autonomous Growth Agent Launching...
echo ===================================================
node growth_agent/run_agent.js
pause
