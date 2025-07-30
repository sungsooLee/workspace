@echo off
echo 🚀 프론트엔드 개발 가이드 문서 서버를 시작합니다...
echo.
echo 📚 접속 주소: http://localhost:3001
echo ⏹️  종료하려면 Ctrl+C를 누르세요
echo.

cd /d "%~dp0"

REM Python이 설치되어 있는지 확인
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python이 설치되어 있지 않습니다.
    echo 📥 Python 설치: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Python 서버 실행
python -m http.server 3001