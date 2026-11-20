@echo off
echo ==============================================
echo   Launching AI Resume Analyzer Full-Stack
echo ==============================================
start "AI Resume Analyzer - Backend" "%~dp0run_backend.bat"
start "AI Resume Analyzer - Frontend" "%~dp0run_frontend.bat"
echo Services are starting...
echo Frontend will be accessible at: http://localhost:5173
echo Backend will be accessible at: http://localhost:5000
timeout /t 3 >nul
start http://localhost:5173
