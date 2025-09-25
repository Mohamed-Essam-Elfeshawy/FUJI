@echo off
echo Starting FUJI FD Website Local Server...
echo.
echo Opening website at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
start http://localhost:8000
python -m http.server 8000

pause
