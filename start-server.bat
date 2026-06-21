@echo off
echo Starting local server at http://localhost:8080
start http://localhost:8080
node "%~dp0server.js"
pause
