# FSD 아키텍처 컨벤션 가이드

## 📋 목차

- [FSD 아키텍처 개요](#fsd-아키텍처-개요)
- [계층 구조와 의존성 규칙](#계층-구조와-의존성-규칙)
- [폴더 구조 표준](#폴더-구조-표준)
- [Import 규칙](#import-규칙)
- [자주 발생하는 위반 사항](#자주-발생하는-위반-사항)
- [명명 규칙](#명명-규칙)
- [Public API 패턴](#public-api-패턴)
- [코드 리뷰 체크리스트](#코드-리뷰-체크리스트)

## 🏗️ FSD 아키텍처 개요

Feature-Sliced Design(FSD)는 프론트엔드 애플리케이션의 확장 가능한 아키텍처 방법론입니다.

### 핵심 원칙

1. **계층화된 구조**: 명확한 계층 간 의존성 관리
2. **단방향 의존성**: 상위 계층만 하위 계층을 참조
3. **Public API**: 각 모듈의 명확한 공개 인터페이스
4. **비즈니스 로직 분리**: UI와 비즈니스 로직의 명확한 분리

## 📊 계층 구조와 의존성 규칙

```
app      ← 애플리케이션 설정, providers
  ↓
pages    ← 라우팅 페이지
  ↓
widgets  ← 복합 UI 블록
  ↓
features ← 비즈니스 기능
  ↓
entities ← 비즈니스 엔티티
  ↓
shared   ← 공통 코드
```

### ✅ 허용되는 Import

```typescript
// 상위 → 하위 계층
import { AuthWidget } from '@widgets/auth'; // pages → widgets
import { useAuth } from '@features/auth'; // widgets → features
import { UserEntity } from '@entities/user'; // features → entities
import { Button } from '@shared/ui'; // 모든 계층 → shared
```

### ❌ 금지되는 Import

```typescript
// 하위 → 상위 계층
import { SomePage } from '@pages/some-page'; // widgets → pages
import { SomeWidget } from '@widgets/some-widget'; // features → widgets

// 같은 레벨 간
import { OtherFeature } from '@features/other'; // features → features
import { OtherEntity } from '@entities/other'; // entities → entities
```

## 📁 폴더 구조 표준

```
src/
├── app/
│   ├── providers/          # React Context, Query Client 등
│   ├── router/             # 라우팅 설정
│   └── index.ts
├── pages/
│   ├── {route-name}/       # 라우트별 페이지
│   │   ├── ui/
│   │   └── index.ts
│   └── index.ts
├── widgets/
│   ├── {widget-name}/      # 위젯별 폴더
│   │   ├── ui/
│   │   ├── model/          # 상태 관리 (선택적)
│   │   └── index.ts
│   └── index.ts
├── features/
│   ├── {feature-name}/     # 기능별 폴더
│   │   ├── ui/
│   │   ├── api/            # API 호출
│   │   ├── model/          # 상태 관리
│   │   └── index.ts
│   └── index.ts
├── entities/
│   ├── {entity-name}/      # 엔티티별 폴더
│   │   ├── api/
│   │   ├── model/
│   │   ├── ui/             # 엔티티 관련 UI (선택적)
│   │   └── index.ts
│   └── index.ts
└── shared/
    ├── ui/                 # 공통 UI 컴포넌트
    ├── lib/                # 유틸리티, 헬퍼
    ├── api/                # 공통 API 설정
    ├── types/              # 공통 타입
    ├── constants/          # 상수
    └── index.ts
```

## 🔗 Import 규칙

### 1. 절대 경로 사용

```typescript
// ✅ 올바른 방법
import { Button } from '@shared/ui';
import { useAuth } from '@features/auth';

// ❌ 잘못된 방법
import { Button } from '../../../shared/ui';
import { useAuth } from './auth';
```

### 2. Public API를 통한 Import

```typescript
// ✅ 올바른 방법
import { AuthForm } from '@features/auth';

// ❌ 잘못된 방법
import { AuthForm } from '@features/auth/ui/auth-form';
```

### 3. Import 순서

```typescript
// 1. 외부 라이브러리
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. 내부 라이브러리 (@learnway)
import { Button } from '@learnway/ui';
import { useModal } from '@learnway/hooks';

// 3. 상위 계층부터 하위 계층 순
import { SomeWidget } from '@widgets/some-widget';
import { SomeFeature } from '@features/some-feature';
import { SomeEntity } from '@entities/some-entity';
import { utils } from '@shared/lib';

// 4. 타입 import (별도 그룹)
import type { User } from '@entities/user';
import type { ComponentProps } from 'react';
```

## ⚠️ 자주 발생하는 위반 사항

### 1. Features → Widgets Import

```typescript
// ❌ 잘못된 예시
// features/auth/ui/auth-form.tsx
import { SectionLayout } from '@widgets/layout';

// ✅ 올바른 해결책
// shared/ui에 공통 컴포넌트로 이동하거나
// features에서 props로 받아서 처리
```

### 2. 같은 레벨 간 Import

```typescript
// ❌ 잘못된 예시
// features/auth/ui/auth-form.tsx
import { validateUser } from '@features/user-validation';

// ✅ 올바른 해결책
// shared/lib로 공통 유틸리티 이동 또는
// entities 레벨에서 처리
```

### 3. Pages → Entities 직접 Import

```typescript
// ❌ 잘못된 예시
// pages/user/index.tsx
import { userQueries } from '@entities/user';

// ✅ 올바른 해결책
// features를 통해 간접적으로 사용
import { useUserData } from '@features/user-management';
```

### 4. 잘못된 폴더 위치

```typescript
// ❌ 잘못된 구조
src/
├── components/     # shared/ui로 이동해야 함
├── types/         # shared/types로 이동해야 함
└── utils/         # shared/lib로 이동해야 함
```

## 🏷️ 명명 규칙

### 1. 파일 명명

- **컴포넌트**: `kebab-case.tsx` (예: `auth-form.tsx`)
- **훅**: `use-kebab-case.ts` (예: `use-auth-form.ts`)
- **유틸리티**: `kebab-case.ts` (예: `form-validator.ts`)
- **타입**: `kebab-case.types.ts` (예: `user-auth.types.ts`)

### 2. 폴더 명명

- **모든 폴더**: `kebab-case` (예: `user-management`, `auth-form`)
- **도메인 폴더**: 비즈니스 도메인명 (예: `user`, `course`, `tenant`)

### 3. Export 명명

```typescript
// ✅ 올바른 방법
export const AuthForm = () => { ... };
export const useAuthForm = () => { ... };
export type AuthFormProps = { ... };

// ❌ 잘못된 방법
export const authForm = () => { ... };  // 컴포넌트는 PascalCase
export const UseAuthForm = () => { ... }; // 훅은 camelCase
```

## 📦 Public API 패턴

### 1. 각 레이어의 index.ts

```typescript
// features/auth/index.ts
export { AuthForm } from './ui/auth-form';
export { useAuthForm } from './model/use-auth-form';
export type { AuthFormProps } from './ui/auth-form';

// 내부 구현은 숨김
// export { AuthFormImpl } from './ui/auth-form-impl'; // ❌
```

### 2. 조건부 Export

```typescript
// 개발 환경에서만 export
export { AuthFormDevTools } from './dev/auth-form-dev-tools';
```

## ✅ 코드 리뷰 체크리스트

### FSD 아키텍처 검토

- [ ] 올바른 계층 구조를 따르고 있는가?
- [ ] 계층 간 의존성 규칙을 위반하지 않았는가?
- [ ] Public API를 통해 모듈을 사용하고 있는가?
- [ ] 절대 경로를 사용하고 있는가?

### 파일 구조 검토

- [ ] 파일이 적절한 레이어에 위치하고 있는가?
- [ ] 폴더 구조가 표준을 따르고 있는가?
- [ ] 명명 규칙을 준수하고 있는가?

### Import 검토

- [ ] Import 순서가 올바른가?
- [ ] 불필요한 import가 없는가?
- [ ] 타입 import가 적절히 분리되어 있는가?

## 🔧 자동화 도구

### 1. FSD 위반 사항 검출

```bash
# FSD 아키텍처 위반 사항 체크
npm run fsd:check

# 자동 수정 가능한 항목 수정
npm run fsd:fix
```

### 2. ESLint 코드 품질 검사

```bash
# 린팅 검사 실행
npm run lint

# 자동 수정 가능한 항목 수정
npm run lint:fix
```

### 3. Import 정리

```bash
# Import 순서 정리
npm run lint:imports

# 사용하지 않는 import 제거
npm run lint:unused-imports
```

## ⚙️ ESLint 설정 가이드

### React 관련 규칙

- **react/react-in-jsx-scope**: `off` - React 17+ 자동 import 지원
- **react/prop-types**: `off` - TypeScript 사용으로 불필요
- **react/display-name**: `error` - 컴포넌트명 필수
- **react/no-array-index-key**: `warn` - 배열 인덱스를 key로 사용 금지
- **react/self-closing-comp**: `error` - 자체 닫는 태그 강제
- **react/no-danger**: `warn` - dangerouslySetInnerHTML 사용 경고
- **react/no-deprecated**: `error` - 지원 중단된 API 사용 금지

### React Hooks 규칙

- **react-hooks/rules-of-hooks**: `error` - Hook 사용 규칙 준수 필수
- **react-hooks/exhaustive-deps**: `warn` - useEffect 의존성 배열 검사

### 접근성(a11y) 규칙

- **jsx-a11y/alt-text**: `error` - 이미지 alt 속성 필수
- **jsx-a11y/aria-props**: `error` - 올바른 ARIA 속성 사용
- **jsx-a11y/heading-has-content**: `error` - 제목 태그 내용 필수
- **jsx-a11y/html-has-lang**: `error` - HTML lang 속성 필수
- **jsx-a11y/img-redundant-alt**: `error` - 중복 alt 텍스트 금지

### TypeScript 규칙

- **@typescript-eslint/no-unused-vars**: `error` - 사용하지 않는 변수 금지
  - `argsIgnorePattern: '^_'` - \_로 시작하는 매개변수 제외
  - `varsIgnorePattern: '^_'` - \_로 시작하는 변수 제외
- **@typescript-eslint/no-explicit-any**: `warn` - any 타입 사용 경고
- **@typescript-eslint/prefer-nullish-coalescing**: `error` - ?? 연산자 권장
- **@typescript-eslint/prefer-optional-chain**: `error` - ?. 연산자 권장
- **@typescript-eslint/no-unnecessary-condition**: `warn` - 불필요한 조건 검사
- **@typescript-eslint/prefer-as-const**: `error` - as const 권장

### 코드 품질 규칙

- **no-console**: `warn` - console.log 사용 경고 (개발 시 허용)
- **no-debugger**: `error` - debugger 문 금지
- **no-alert**: `error` - alert 사용 금지
- **prefer-const**: `error` - 재할당 없는 변수는 const 사용
- **no-var**: `error` - var 키워드 금지
- **prefer-template**: `error` - 문자열 연결 시 템플릿 리터럴 권장
- **object-shorthand**: `error` - 객체 속성 단축 문법 권장
- **no-duplicate-imports**: `error` - 중복 import 금지

### Import 관련 규칙

- **no-restricted-imports**: 상대 경로로 src 경계 넘나드는 import 금지
  - 패턴: `../**/src/**` 금지

## 🔄 자동화 시스템 동작 방식

### Pre-commit 훅 (커밋 시)

```bash
git commit -m "feat: 새로운 기능 추가"

# 자동 실행:
# 1. ✅ ESLint + Prettier 자동 수정
# 2. ⚠️ FSD 위반 사항 검사 (경고만, 커밋은 진행)
```

### GitHub Actions (PR 생성 시)

```bash
git push origin feature/new-feature

# GitHub에서 PR 생성 시:
# 1. 🤖 FSD 아키텍처 검사 자동 실행
# 2. 📝 검사 결과를 PR 댓글로 자동 생성
# 3. ❌ 위반 사항 발견 시 PR 상태 실패로 표시
```

## 🤝 기여 방법

1. 새로운 기능 개발 시 해당 컨벤션을 따라 주세요
2. 기존 코드 수정 시 FSD 원칙을 고려해 주세요
3. PR 생성 시 자동화된 FSD 체크 결과를 확인해 주세요
4. 의문사항이 있으면 팀과 논의 후 진행해 주세요

## 🚨 자주 발생하는 오류 해결

### ESLint 오류 해결

```bash
# 자동 수정 가능한 오류들
npm run lint:fix

# 수동 수정이 필요한 경우 오류 메시지를 확인하고 해당 파일을 수정
```

### FSD 위반 사항 해결

```bash
# 위반 사항 확인
npm run fsd:check

# Public API 우회 오류 예시:
# ❌ import { Button } from '@shared/ui/button';
# ✅ import { Button } from '@shared/ui';
```

### 커밋이 실패하는 경우

1. ESLint 오류: `npm run lint:fix` 실행 후 재커밋
2. Prettier 오류: 파일이 자동으로 포맷팅되므로 변경된 파일을 다시 add하고 커밋
3. FSD 경고: 경고는 커밋을 막지 않으니 무시하거나 수정 후 커밋

## 📚 참고 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [FSD 아키텍처 예시](https://github.com/feature-sliced/examples)
