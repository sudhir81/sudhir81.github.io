@echo off
cmd /k "cd /d "%~dp0" && echo --- Node version: && node --version && echo --- npm version: && npm --version && echo --- Installing packages if needed... && (IF NOT EXIST node_modules npm install) && echo --- Starting server... && npx ng serve --open"
