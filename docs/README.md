# 📚 프론트엔드 개발 가이드 문서

FSD 아키텍처 기반 React + TypeScript 프로젝트 개발 가이드

## 🚀 빠른 시작

### Node.js 사용 (권장)

```bash
# 1. 의존성 설치 (한 번만)
npm install

# 2. 개발 서버 시작 (브라우저 자동 열림)
npm start
# 또는
npm run dev
```

### 대안 방법들

```bash
# npx 사용 (설치 없이)
npx docsify-cli serve . --port 3001 --open

# 다른 Node.js 서버들
npx serve . -p 3001 -s
npx http-server . -p 3001 -o
```

## 📂 폴더 구조

```
docs/
├── 01-README.md              # 📖 시작 가이드 (이 파일)
├── 02-fsd-guidelines.md      # 🏗️ FSD 아키텍처 가이드 ⭐️
├── 03-api-patterns-guide.md  # 🌐 API 호출 패턴
├── 04-coding-style-guide.md  # 🎨 코딩 스타일 규칙
├── 05-component-guide.md     # ⚛️ 컴포넌트 작성 가이드
├── 06-testing-guide.md       # 🧪 테스트 작성 가이드
├── sample-codes/             # 📁 실무 샘플 코드
│   ├── 01-api-layer-sample.md
│   ├── 02-list-page-sample.md
│   └── 03-detail-page-sample.md
├── assets/                   # 📁 정적 파일들
├── index.html               # Docsify 설정
├── _sidebar.md              # 사이드바 네비게이션
└── package.json             # Node.js 설정
```

## 🎯 개발 순서

1. **02-fsd-guidelines.md** - FSD 아키텍처 이해
2. **sample-codes/01-api-layer-sample.md** - API 레이어 구현
3. **sample-codes/02-list-page-sample.md** - 목록 화면 구현
4. **sample-codes/03-detail-page-sample.md** - 상세/등록 화면 구현

## 🔧 요구사항

- **Node.js 16+** (대부분 프론트엔드 개발자는 이미 설치됨)
- **웹 브라우저**

## 💡 특징

- ✨ **실시간 Hot Reload** - 파일 수정 시 자동 새로고침
- 🔍 **전체 문서 검색** - 모든 내용 실시간 검색
- 📱 **반응형 디자인** - 모바일/태블릿 지원
- 🎨 **코드 하이라이트** - TypeScript, JSX 구문 강조
- 📋 **원클릭 복사** - 코드 블록 복사 버튼
- 🧭 **스마트 네비게이션** - 자동 목차 생성

---

**접속 주소: http://localhost:3001**
