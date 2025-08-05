# 목록 조회 화면 샘플 코드

## 개요

이 샘플 코드는 FSD(Feature-Sliced Design) 아키텍처를 기반으로 한 React + TypeScript 목록 조회 화면 구현을 보여줍니다.
프로젝트에서 실제 사용하는 **SearchBoxForm**, **Divider**, **GridBox** 컴포넌트를 활용한 완전한 목록 화면을 제공합니다.

## 주요 특징

- **FSD 아키텍처 준수**: 각 레이어별 역할 분담
- **실제 프로젝트 패턴**: SearchBoxForm + Divider + GridBox 조합
- **React Query 활용**: 효율적인 데이터 페칭 및 캐싱
- **useDynamicForm2 & useGridBox**: 프로젝트 표준 커스텀 훅 활용
- **TypeScript 타입 안전성**: 컴파일 타임 에러 방지

## 핵심 컴포넌트

- **SearchBoxForm**: `useDynamicForm2`를 활용한 동적 검색 폼
- **FormRow2**: 폼 필드의 레이블과 입력 요소를 관리하는 컴포넌트
- **ContentsRow**: 폼 필드를 행 단위로 그룹화하는 레이아웃 컴포넌트
- **Divider**: 검색 영역과 목록 영역 구분
- **GridBox**: `useGridBox`와 TanStack Table 기반 데이터 그리드

## 구현 구조

```
src/
├── entities/
│   └── user/
│       ├── api/
│       │   └── user.ts          # API 호출 로직
│       ├── model/
│       │   └── user.types.ts    # 타입 정의
│       └── service/
│           └── user.hook.ts     # React Query 훅
├── features/
│   └── user-management/
│       └── ui/
│           └── user-list.tsx    # 메인 목록 컴포넌트 (SearchBoxForm 포함)
├── shared/
│   └── ui/
│       ├── search-box/          # SearchBox 컴포넌트
│       ├── divider/             # Divider 컴포넌트
│       └── grid-box/            # GridBox 컴포넌트
└── pages/
    └── user-management/
        └── index.tsx            # 목록 페이지
```

## 전제 조건

이 샘플 코드를 사용하기 전에 먼저 **API 레이어**를 구현해야 합니다.
API 레이어 구현은 별도 문서를 참고하세요: `api-layer-sample.md`

API 레이어가 구현되면 다음과 같이 import하여 사용할 수 있습니다:

```typescript
// entities 레이어에서 필요한 것들 import
import { userQueryOptions, User } from '@entities/user';
```

## 1. 목록 컴포넌트 (features/user-management/ui/user-list.tsx)

```typescript
import React, { useCallback, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useDynamicForm2, CODE_GROUP, getCodeLabel } from '@learnway/hooks';
import { Button, Divider, GridBox, useGridBox, Input } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer, ContentsRow, FormRow2, SearchBoxForm } from '@shared/ui';
import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import { DateRangePickerFormField } from '@features/form/ui/date-range-picker-form-field';
import { userQueryOptions } from '@entities/user';
import { User } from '@entities/user';
import { formatDate, DATE_TIME_FORMAT, generateYears } from '@learnway/shared';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

// GridBox 설정
const gridConfig = {
  query: userQueryOptions.getUsers,
  rowId: 'id',
  columns: [], // props.columns 사용
  gridState: {
    page: 0,
    size: 20,
    sort: ['createdAt,desc'],
  },
};

interface UserListProps {
  // 라우터 네비게이션으로 처리하므로 props 불필요
}

export const UserList: React.FC<UserListProps> = () => {
  const router = useRouter();

  // useDynamicForm2로 검색 폼 관리
  const { provider, getValues, onSubmit } = useDynamicForm2();

  // useGridBox로 그리드 데이터 관리
  const { config: gConfig, gridFetch } = useGridBox<User>(gridConfig, getValues);

  // 검색 핸들러
  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  // 행 더블클릭 핸들러 (상세 조회)
  const handleOnRowDoubleClick = useCallback((row: any) => {
    router.navigate({
      to: '/user-management/detail',
      state: {
        userId: row.original.id,
        mode: 'UPDATE',
        listParam: getValues(), // 현재 검색 조건 유지
      },
    });
  }, [router, getValues]);

  // 테이블 컬럼 정의
  const columnHelper = createColumnHelper<User>();
  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      id: 'name',
      header: t('사용자명'),
      size: 150,
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: t('이메일'),
      size: 200,
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: t('역할'),
      size: 100,
      cell: (info) => {
        const roleLabels = {
          admin: t('관리자'),
          manager: t('매니저'),
          user: t('사용자'),
        };
        return roleLabels[info.getValue()] || info.getValue();
      },
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: t('상태'),
      size: 100,
      cell: (info) => {
        const statusLabels = {
          active: t('활성'),
          inactive: t('비활성'),
          pending: t('대기'),
        };
        return statusLabels[info.getValue()] || info.getValue();
      },
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: t('생성일'),
      size: 160,
      cell: (info) => formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    }),
  ], []);

  // 액션 버튼들
  const customButtonNode = useMemo(() => (
    <Button
      type="button"
      variant="point"
      size="sm"
      label={t('사용자 등록')}
      onClick={() => {
        router.navigate({
          to: '/user-management/detail',
          state: {
            mode: 'CREATE',
            listParam: getValues(), // 현재 검색 조건 유지
          },
        });
      }}
    />
  ), [router, getValues]);

  return (
    <PageContainer>
      <ContentsButtons>
        {customButtonNode}
      </ContentsButtons>

      <MainContents>
        {/* SearchBoxForm 사용 */}
        <SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
          <ContentsRow>
            {/* 사용자명 */}
            <FormRow2
              provider={provider}
              name={'userName'}
              label={t('사용자명')}
              element={<Input placeholder={t('사용자명을 입력하세요')} />}
            />
            {/* 이메일 */}
            <FormRow2
              provider={provider}
              name={'email'}
              label={t('이메일')}
              element={<Input placeholder={t('이메일을 입력하세요')} />}
            />
            {/* 역할 */}
            <FormRow2
              provider={provider}
              name={'role'}
              label={t('역할')}
              element={
                <DropdownFormField
                  presetOptionLabel={t('전체')}
                  optionsConfig={{
                    codeGroup: CODE_GROUP['user.role']
                  }}
                />
              }
            />
            {/* 상태 */}
            <FormRow2
              provider={provider}
              name={'status'}
              label={t('상태')}
              element={
                <DropdownFormField
                  presetOptionLabel={t('전체')}
                  optionsConfig={{
                    codeGroup: CODE_GROUP['user.status']
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            {/* 부서 */}
            <FormRow2
              provider={provider}
              name={'department'}
              label={t('부서')}
              element={<Input placeholder={t('부서명을 입력하세요')} />}
            />
            {/* 직급 */}
            <FormRow2
              provider={provider}
              name={'position'}
              label={t('직급')}
              element={
                <DropdownFormField
                  presetOptionLabel={t('전체')}
                  optionsConfig={{
                    codeGroup: CODE_GROUP['user.position']
                  }}
                />
              }
            />
            {/* 가입년도 */}
            <FormRow2
              provider={provider}
              name={'joinYear'}
              label={t('가입년도')}
              element={
                <DropdownFormField
                  options={generateYears(10)}
                  presetOptionLabel={t('전체')}
                />
              }
            />
            {/* 가입일 */}
            <FormRow2
              provider={provider}
              name={'createdDate'}
              label={t('가입일')}
              element={<DateRangePickerFormField />}
            />
          </ContentsRow>
        </SearchBoxForm>

        <Divider />

        <GridBox
          config={gConfig}
          columns={columns}
          showNumberingColumn
          multiple
          hideRowSelectionCheckBox={false}
          onRowDoubleClick={handleOnRowDoubleClick}
        />
      </MainContents>
    </PageContainer>
  );
};
```

## 2. SearchBoxForm 사용법

`SearchBoxForm`은 검색 조건을 관리하는 폼 래퍼 컴포넌트로, `useDynamicForm2`와 함께 사용됩니다.

### 주요 특징:

- `ContentsRow`로 검색 필드를 행 단위로 그룹화
- `FormRow2`로 각 필드의 레이블과 입력 요소 관리
- `onSubmit` 핸들러로 검색 실행
- 다양한 입력 요소 지원 (Input, DropdownFormField, DateRangePickerFormField 등)

### 사용 예시:

```typescript
<SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
  <ContentsRow>
    <FormRow2 provider={provider} name="field1" label="라벨1" element={<Input />} />
    <FormRow2 provider={provider} name="field2" label="라벨2" element={<DropdownFormField />} />
  </ContentsRow>
</SearchBoxForm>
```

## 3. 목록 페이지 컴포넌트 (pages/user-management/index.tsx)

```typescript
import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { UserList } from '@features/user-management';

// 라우터 설정
export const Route = createFileRoute('/user-management/')({
  component: UserManagementPage
});

function UserManagementPage() {
  return <UserList />;
}
```

## 주요 특징

### 1. 실제 프로젝트 패턴 반영

- **SearchBox**: `useDynamicForm2` 훅을 활용한 동적 검색 폼
- **Divider**: 검색 영역과 그리드 영역 시각적 분리
- **GridBox**: `useGridBox` 훅과 TanStack Table 기반 데이터 그리드

### 2. FSD 아키텍처 준수

- **entities**: API 및 비즈니스 로직
- **features**: UI 컴포넌트 및 기능
- **shared**: 공통 컴포넌트
- **pages**: 라우터와 연결된 페이지

### 3. 타입 안전성

- TypeScript 완전 지원
- GridBox 표준 타입 준수
- React Query 타입 지원

### 4. 성능 최적화

- React Query 캐싱
- useMemo, useCallback 활용
- TanStack Table 가상화

## 사용법

### 1. 기본 사용법

```typescript
// pages에서 사용
import { UserList } from '@features/user-management';

function UserManagementPage() {
  return <UserList />;
}
```

### 2. 커스텀 GridBox 설정

```typescript
// GridBox 설정 커스터마이징
const customGridConfig = {
  query: userQueryOptions.all,
  rowId: 'id',
  gridState: {
    page: 0,
    size: 20, // 페이지 크기 변경
    sort: ['name,asc'], // 기본 정렬 변경
  },
};
```

### 3. SearchBoxForm 필드 커스터마이징

```typescript
// 검색 필드 추가/수정 예제
<SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
  <ContentsRow>
    <FormRow2
      provider={provider}
      name={'keyword'}
      label={t('통합검색')}
      element={<Input placeholder={t('이름, 이메일로 검색')} />}
    />
    <FormRow2
      provider={provider}
      name={'dateRange'}
      label={t('생성일')}
      element={<DateRangePickerFormField />}
    />
  </ContentsRow>
</SearchBoxForm>
```

### 4. FormRow2 hidden 필드 활용

```typescript
// 숨겨진 필드로 고정값 전달
<FormRow2
  provider={provider}
  name={'tenantId'}
  type="hidden"
  value={tenantId}
/>
```
