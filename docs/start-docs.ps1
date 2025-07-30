# PowerShell 스크립트
Write-Host "🚀 프론트엔드 개발 가이드 문서 서버를 시작합니다..." -ForegroundColor Green
Write-Host ""
Write-Host "📚 접속 주소: http://localhost:3001" -ForegroundColor Cyan
Write-Host "⏹️  종료하려면 Ctrl+C를 누르세요" -ForegroundColor Yellow
Write-Host ""

# 현재 디렉토리로 이동
Set-Location $PSScriptRoot

# Python 설치 확인
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python 발견: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python이 설치되어 있지 않습니다." -ForegroundColor Red
    Write-Host "📥 Python 설치: https://www.python.org/downloads/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# 서버 시작
try {
    Write-Host "🌐 서버를 시작합니다..." -ForegroundColor Green
    Start-Process "http://localhost:3001"  # 브라우저 자동 열기
    python -m http.server 3001
} catch {
    Write-Host "❌ 서버 시작에 실패했습니다: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit"
}