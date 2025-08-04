# 차세대 학습 플랫폼 프로젝트 FE

## 프로젝트 개요

**기술 스택**: React + TypeScript + Nx 모노레포

## 기술 스택 상세

### 핵심 프레임워크 및 라이브러리

- **React**: 18.3.1
- **TypeScript**: 5.5.4
- **Nx**: 20.0.3 (모노레포 관리)
- **Vite**: 5.4.19 (번들러)
- **TanStack Router**: 1.129.7 (라우팅)
- **TanStack Query**: 5.83.0 (서버 상태 관리)
- **React Hook Form**: 7.60.0 (폼 관리)
- **Zod**: 3.25.76 (스키마 검증)

### UI 라이브러리

- **Radix UI**: 다양한 컴포넌트 사용
- **Tailwind CSS**: 3.4.3
- **Lexical**: 0.22.0 (리치 텍스트 에디터)

## 프로젝트 구조

### 모노레포 구조 (Nx 기반)

```
fe/
├── apps/           # 애플리케이션
│   ├── bo/        # Back Office (관리자)
│   ├── fo/        # Front Office (사용자)
│   ├── pub/       # 퍼블리싱 가이드
│   └── sb/        # Storybook
├── libs/          # 공유 라이브러리
│   ├── auth/      # 인증 관련
│   ├── config/    # 설정 관리
│   ├── editor/    # 에디터 (개발 중)
│   ├── hooks/     # 공통 훅
│   ├── icons/     # 아이콘
│   ├── shared/    # 공통 유틸리티
│   ├── styles/    # 스타일
│   ├── types/     # 타입 정의
│   └── ui/        # UI 컴포넌트
└── temp/          # OpenAPI 생성 타입
```

### 주요 애플리케이션 설명

1. **BO (Back Office)**
   - 관리자용 애플리케이션
   - 채널, 컨텐츠, 사용자, 학습 관리 기능
   - FSD (Feature-Sliced Design) 아키텍처 적용

2. **FO (Front Office)**
   - 일반 사용자용 애플리케이션
   - 학습, 커뮤니티, 마이페이지 기능
   - 모바일 반응형 지원

3. **Pub (Publishing Guide)**
   - UI/UX 가이드 및 컴포넌트 예제

4. **SB (Storybook)**
   - UI 컴포넌트 개발 및 테스트
   - 컴포넌트 문서화

## 발견된 문제점 및 개선 필요사항

#### ESLint 설정

- any 타입에 대해 'warn' 레벨로만 설정

#### 번들 크기 -> 메인(index) 번들 사이즈 3MB

#### 테스트 파일

- 실제 테스트 파일이 거의 없음
- E2E 테스트 설정은 있으나 실제 테스트 부재

## 1. Form 처리 패턴의 혼재 문제

### useDynamicForm vs useDynamicForm2

프로젝트에서 두 가지 버전의 동적 폼 훅이 공존.(변경작업 진행 중)

#### useDynamicForm (기존 버전)

- **위치**: `/libs/hooks/src/lib/form-builder/use-dynamic-form.ts`
- **특징**: 정적 config 기반, 제약사항 많음
- **문제점**:
  - 런타임에 필드 추가/제거 불가
  - 동적 validation 변경 어려움

#### useDynamicForm2 (새 버전)

- **위치**: `/libs/hooks/src/lib/form-builder/use-dynamic-form2.ts`
- **특징**: 동적 필드 관리 가능
- **개선점**:
  - `registerField`, `addValidator` 메서드 제공
  - 동적 builder 관리
  - `clearAllValidators` 기능

## 2. 상세/등록 화면 구현 패턴 불일치

### Pattern 1: mode 기반 단일 컴포넌트

```typescript
// sequence-detail.tsx
const SequenceDetailComponent = ({ mode, setMode, ... }) => {
  // mode: 'MAIN' | 'DETAIL' | 'EDIT'
  // 하나의 컴포넌트에서 모든 모드 처리
}
```

### Pattern 2: 별도 컴포넌트 분리

```typescript
// company-detail.tsx (상세)
const CompanyDetailComponent = () => { ... }

// company-regist.tsx (등록)
const CompanyRegistComponent = () => { ... }
```

**문제점**:

- 개발자마다 선호하는 패턴이 다름 => 햔재는 패턴1로 가이드 문서 작업하고 표준으로 진행 안내.

## 3. API 호출 패턴의 일관성 부족

### 메서드 명명 규칙 혼재

```typescript
// Company API: fetch* 패턴
fetchAll(), fetchList(), fetchListPopup()

// Channel API: get* 패턴
getChannelList(), getChannelDetail()

// Course API: 혼합 패턴
fetchAll(), fetch(), create(), updateWizard1~5()
```

### 타입 안정성 문제

```typescript
// Tenant API - any 타입 남용
fetchTenant(tenantId: number): Promise<any>
fetchListTenant(params?: any): Promise<any>

// Course API - 제네릭 타입 사용
fetchAll<T>(params?: CourseSearchReqDto): Promise<T>
```

## 4. 에러 처리 및 사용자 피드백 불일치

### 에러 처리 방식

```typescript
// 단순 console.error
onError: (error: any) => {
  console.error(error);
};

// 사용자 정의 처리
onError: (error) => {
  handleApiError(error);
};

// 처리 없음
// 많은 곳에서 에러 처리 자체가 누락
```
