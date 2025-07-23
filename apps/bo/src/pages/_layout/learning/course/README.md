# 과정 관리 페이지 (Course Management)

이 디렉토리는 학습 과정 관리 페이지의 리팩토링된 구조를 포함합니다.

## 📁 폴더 구조

```
course/
├── -components/         # UI 컴포넌트들
│   ├── CourseActionButtons.tsx   # 상단 액션 버튼들
│   ├── CourseGrid.tsx           # 과정 목록 그리드
│   ├── CourseSearchForm.tsx     # 검색 폼
│   └── index.ts                 # 컴포넌트 export
├── -common/             # 공통 정의
│   ├── constants.ts             # 상수 정의
│   └── type.ts                  # 타입 정의
├── -hooks/              # 커스텀 훅들
│   └── useCoursePage.tsx  # 과정 관리 비즈니스 로직
├── utils/               # 유틸리티 함수들
│   └── gridConfig.tsx           # 그리드 설정 생성 함수
├── index.tsx           # 메인 컴포넌트
└── README.md           # 이 파일
```

## 🔧 주요 개선사항

### 1. **컴포넌트 분리**

- 302줄의 큰 컴포넌트를 기능별로 분리
- 각 컴포넌트는 단일 책임 원칙을 따름
- 재사용 가능한 컴포넌트 구조

### 2. **비즈니스 로직 분리**

- `useCoursePage` 훅으로 상태 관리 로직 분리
- 테스트하기 쉬운 구조
- 컴포넌트와 로직의 명확한 분리

### 3. **타입 안정성**

- 명확한 타입 정의로 개발 시 오류 방지
- any 타입 사용 최소화
- 인터페이스 기반 컴포넌트 props 정의

### 4. **상수 관리**

- 하드코딩된 값들을 상수로 분리
- 유지보수성 향상
- 매직 넘버 제거

### 5. **GridConfig 문제 해결**

- 컴포넌트 외부에서 t() 함수 사용하던 문제 해결
- 런타임에 그리드 설정을 생성하는 함수로 변경

## 🎯 사용법

### 메인 컴포넌트

```tsx
import { CourseManagementPage } from './course';

// 라우터에서 사용
export const Route = createFileRoute('/_layout/learning/course/')({
  component: CourseManagementPage,
});
```

### 개별 컴포넌트 사용

```tsx
import { CourseSearchForm, CourseGrid } from './course/-components';

// 필요한 곳에서 개별적으로 사용 가능
```

### 커스텀 훅 사용

```tsx
import { useCoursePage } from './course/-hooks/useCoursePage';

function MyComponent() {
  const { selectedRows, buttonState, handleOnSearch } = useCoursePage();
  // ...
}
```

## 🚀 향후 개선 계획

1. **테스트 코드 추가**

   - 각 컴포넌트와 훅에 대한 단위 테스트
   - 통합 테스트 작성

2. **성능 최적화**

   - React.memo() 적용
   - useMemo, useCallback 최적화

3. **접근성 개선**

   - ARIA 라벨 추가
   - 키보드 네비게이션 지원

4. **에러 처리 강화**
   - Error Boundary 추가
   - 사용자 친화적 에러 메시지

## 📋 개발 가이드라인

- 새로운 기능 추가 시 해당하는 컴포넌트나 훅에 추가
- 공통으로 사용되는 로직은 별도 훅으로 분리
- 상수는 `-common/constants.ts`에 정의
- 타입은 `-common/type.ts`에 정의
- 각 컴포넌트는 단일 파일로 관리
- UI 컴포넌트는 `-components` 폴더에서 관리
- 커스텀 훅은 `-hooks` 폴더에서 관리
- 공통 설정과 타입은 `-common` 폴더에서 중앙 관리
