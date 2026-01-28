@echo off
chcp 65001
echo '해줘' 웹사이트 서버를 시작합니다...
echo 브라우저가 자동으로 열립니다. (http://localhost:5173)
cd /d "%~dp0"
start http://localhost:5173
call npm run dev
pause
