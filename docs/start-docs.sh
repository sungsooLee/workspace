#!/bin/bash

echo "🚀 프론트엔드 개발 가이드 문서 서버를 시작합니다..."
echo ""
echo "📚 접속 주소: http://localhost:3001"
echo "⏹️  종료하려면 Ctrl+C를 누르세요"
echo ""

cd "$(dirname "$0")"

# Python 서버 실행
python3 -m http.server 3001