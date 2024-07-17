# learningway fe 프로젝트 가이드

# 1. 개발 환경 & 개발 규칙

## a. Visual Studio Code

- _로컬 개발환경에서는 macOS 기준 Users/{ad명}/learningway/fe 안에 구성되어야함_

## b. 커밋 컨벤션

- feat: 새로운 기능에 대한 커밋
- fix: 버그 수정에 대한 커밋
- build: 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋
- chore: 그 외 자잘한 수정에 대한 커밋
- ci: ci 관련 설정 수정에 대한 커밋
- docs: 문서 수정에 대한 커밋
- style: 코드 스타일 혹은 포맷 등에 관한 커밋
- refactor: 코드 리팩토링에 대한 커밋
- test: 테스트 코드 수정에 대한 커밋
- perf: 성능 개선에 대한 커밋

# 2. 프로젝트

## a. 디렉토리 구조

**FSD 아키텍처**를 사용하려고 함. _아직 수정이 더 필요한 상태_.

```
├─ src/
│  ├─ app/
│  ├─ pages/
│  ├─ widgets/
│  ├─ features/
│  ├─ entities/
│  ├─ shared/
```

- app: 애플리케이션 로직이 초기화 되는 곳. 프로바이더, 라우터, 전역 스타일, 전역
  타입 선언 등이 여기서 정의 된다. 애플리케이션의 진입점 역할.
- pages: 애플리케이션의 페이지.
- widgets: 페이지에 사용되는 독립적인 UI 컴포넌트.
- features: 비즈니스 가치를 전달하는 기능을 다룬다. 예를 들면 좋아요, 채널
  팔로우, 리뷰 작성 등
- entities: 비즈니스 엔티티를 나타낸다. 엔티티에는 사용자, 리뷰, 댓글 등
- shared: 프로젝트 전반에서 사용되는 공통 모듈, 유틸리티를 포함.

## b. 기술 스택

![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1721180917016?alt=media&token=c88c9119-85d7-4da3-b4ab-51d2e615e60b)

클라이언트 상태 관리는 zustand 라이브러리 사용 예정

# 3. 실행

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open the project in your browser

```bash
http://localhost:5174
```
