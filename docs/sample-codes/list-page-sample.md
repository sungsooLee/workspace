# 목록 조회 화면 샘플 코드

## 개요

이 샘플 코드는 FSD(Feature-Sliced Design) 아키텍처를 기반으로 한 React + TypeScript 목록 조회 화면 구현을 보여줍니다. 
프로젝트에서 실제 사용하는 **SearchBox**, **Divider**, **GridBox** 컴포넌트를 활용한 완전한 목록 화면과 **라우터 기반 상세/등록 페이지**를 제공합니다.

## 주요 특징

- **FSD 아키텍처 준수**: 각 레이어별 역할 분담
- **실제 프로젝트 패턴**: SearchBox + Divider + GridBox 조합
- **React Query 활용**: 효율적인 데이터 페칭 및 캐싱
- **useDynamicForm2 & useGridBox**: 프로젝트 표준 커스텀 훅 활용
- **라우터 기반 네비게이션**: 모달이 아닌 페이지 기반 상세/등록 처리
- **TypeScript 타입 안전성**: 컴파일 타임 에러 방지

## 핵심 컴포넌트

- **SearchBox**: `useDynamicForm2`를 활용한 동적 검색 폼
- **Divider**: 검색 영역과 목록 영역 구분
- **GridBox**: `useGridBox`와 TanStack Table 기반 데이터 그리드
- **라우터 State**: TanStack Router를 통한 페이지 간 데이터 전달

## 구현 구조

```
src/
├── entities/
│   └── user/
│       ├── api/
│       │   └── user.ts          # API 호출 로직
│       ├── types/
│       │   └── user.types.ts    # 타입 정의
│       └── service/
│           └── user.hook.ts     # React Query 훅
├── features/
│   └── user-management/
│       ├── ui/
│       │   ├── user-list.tsx        # 메인 목록 컴포넌트
│       │   ├── search-box.tsx       # 검색 박스 래퍼
│       │   └── user-detail-form.tsx # 상세 폼 컴포넌트
│       └── service/
│           ├── use-fetch-user-info.ts     # 사용자 정보 조회
│           └── use-user-content-form.ts   # 폼 비즈니스 로직
├── shared/
│   └── ui/
│       ├── search-box/          # SearchBox 컴포넌트
│       ├── divider/             # Divider 컴포넌트
│       └── grid-box/            # GridBox 컴포넌트
└── pages/
    └── user-management/
        ├── index.tsx            # 목록 페이지
        └── detail.lazy.tsx      # 상세/등록 페이지
```

## 전제 조건

이 샘플 코드를 사용하기 전에 먼저 **API 레이어**를 구현해야 합니다.
API 레이어 구현은 별도 문서를 참고하세요: `api-layer-sample.md`

API 레이어가 구현되면 다음과 같이 import하여 사용할 수 있습니다:

```typescript
// entities 레이어에서 필요한 것들 import
import { userQueryOptions, User, UserCreateRequest, UserUpdateRequest } from '@entities/user';
import { useCreateUser, useUpdateUser } from '@entities/user';
```

## 1. 검색 박스 컴포넌트 (features/user-management/ui/user-search-box.tsx)

```typescript
import React, { FC } from 'react';
import { SearchBox } from '@shared/ui';
import { useDynamicForm2 } from '@learnway/hooks';

// 검색 필드 설정
const searchFields = [
  [
    {
      name: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름을 입력하세요',
    },
    {
      name: 'email',
      label: '이메일',
      type: 'text',
      placeholder: '이메일을 입력하세요',
    },
  ],
  [
    {
      name: 'role',
      label: '역할',
      type: 'select',
      placeholder: '역할을 선택하세요',
      options: [
        { value: '', label: '전체' },
        { value: 'admin', label: '관리자' },
        { value: 'manager', label: '매니저' },
        { value: 'user', label: '사용자' },
      ],
    },
    {
      name: 'status',
      label: '상태',
      type: 'select',
      placeholder: '상태를 선택하세요',
      options: [
        { value: '', label: '전체' },
        { value: 'active', label: '활성' },
        { value: 'inactive', label: '비활성' },
        { value: 'pending', label: '대기' },
      ],
    },
  ],
];

interface UserSearchBoxProps {
  onSearch: (data: any) => void;
}

export const UserSearchBox: FC<UserSearchBoxProps> = ({ onSearch }) => {
  // useDynamicForm2 초기화 (프로젝트 표준 훅)
  const dynamicFormProvider = useDynamicForm2({
    builders: searchFields,
    defaultValues: {},
  });

  return (
    <SearchBox 
      provider={dynamicFormProvider} 
      onSearch={onSearch}
    />
  );
};
```

## 2. 메인 목록 컴포넌트 (features/user-management/ui/user-list.tsx)

```typescript
import React, { useCallback, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useDynamicForm2 } from '@learnway/hooks';
import { Button, Divider, GridBox, useGridBox } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { userQueryOptions } from '@entities/user';
import { User } from '@entities/user';
import { formatDate, DATE_TIME_FORMAT } from '@learnway/shared';
import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { UserSearchBox } from './user-search-box';

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
  }, [gridFetch]);

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
          admin: '관리자',
          manager: '매니저', 
          user: '사용자',
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
          active: '활성',
          inactive: '비활성',
          pending: '대기',
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
        <UserSearchBox onSearch={handleOnSearch} />
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

## 3. 사용자 정보 훅 (features/user-management/service/use-fetch-user-info.ts)

```typescript
import { useCurrentRoute } from '@learnway/hooks';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '@entities/user';

export const useFetchUserInfo = () => {
  const { state } = useCurrentRoute();

  // 사용자 상세 정보 조회 (UPDATE 모드일 때만)
  const { data, error: fetchError } = useQuery({
    ...userQueryOptions.getUser(state?.userId),
    enabled: !!state?.userId && state?.mode === 'UPDATE',
  });

  return {
    mode: state?.mode as 'CREATE' | 'UPDATE',
    userId: state?.userId,
    data,
    listParam: state?.listParam,
  };
};
```

## 4. 사용자 폼 비즈니스 로직 (features/user-management/service/use-user-content-form.ts)

```typescript
import { useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { DynamicFormProvider } from '@learnway/hooks';
import { useModal } from '@learnway/ui';
import { User, UserCreateRequest, UserUpdateRequest } from '@entities/user';
import { useCreateUser, useUpdateUser } from '@entities/user';

export const useUserContentForm = (options: {
  mode: 'CREATE' | 'UPDATE';
  provider: DynamicFormProvider;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { confirm: openConfirm } = useModal();

  const { watch } = options.provider;
  const userId = watch('id');

  // 성공 시 라우팅 파라미터 생성
  const routingParams = useCallback((user: User) => {
    return {
      to: '/user-management/detail',
      state: {
        userId: user.id,
        mode: 'UPDATE',
        listParam: {
          // 목록으로 돌아갈 때 필요한 파라미터
        },
      },
      replace: true,
    };
  }, []);

  // 사용자 생성 뮤테이션
  const { mutate: createUser } = useCreateUser({
    onSuccess: (result: User) => {
      if (result?.id) {
        router.navigate(routingParams(result));
      }
    },
  });

  // 사용자 수정 뮤테이션
  const { mutate: updateUser } = useUpdateUser({
    onSuccess: (result: User) => {
      if (result?.id) {
        router.navigate(routingParams(result));
      }
    },
  });

  // 폼 제출 핸들러
  const handleOnSubmit = async (data: Record<string, any>): Promise<void> => {
    const payload = {
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
    };

    // 저장 확인 다이얼로그
    if (
      await openConfirm({
        title: t('사용자 저장'),
        content: t('사용자 정보를 저장하시겠습니까?'),
      })
    ) {
      if (options.mode === 'CREATE') {
        createUser(payload as UserCreateRequest);
      } else {
        updateUser({ id: userId, ...payload } as UserUpdateRequest);
      }
    }
  };

  return { handleOnSubmit };
};
```

## 5. 사용자 상세 폼 컴포넌트 (features/user-management/ui/user-detail-form.tsx)

```typescript
import React from 'react';
import { DynamicFormProvider } from '@learnway/hooks';
import { Input, Select } from '@learnway/ui';
import { ContentsRow, FormRow2 } from '@shared/ui';
import { User } from '@entities/user';

type FormMode = 'CREATE' | 'UPDATE';

interface UserDetailFormProps {
  form: {
    provider: DynamicFormProvider;
  };
  mode: FormMode;
  userInfo?: User | null;
}

export const UserDetailForm: React.FC<UserDetailFormProps> = ({
  form,
  mode,
  userInfo,
}) => {
  const { provider } = form;

  // 역할 옵션
  const roleOptions = [
    { value: 'admin', label: '관리자' },
    { value: 'manager', label: '매니저' },
    { value: 'user', label: '사용자' },
  ];

  // 상태 옵션
  const statusOptions = [
    { value: 'active', label: '활성' },
    { value: 'inactive', label: '비활성' },
    { value: 'pending', label: '대기' },
  ];

  return (
    <div className="user-detail-form">
      {/* 첫 번째 행: 사용자명, 이메일 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="name"
          label="사용자명"
          placeholder="사용자명을 입력하세요"
          validation={{ required: '사용자명은 필수입니다.' }}
          element={<Input />}
        />
        <FormRow2
          provider={provider}
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          validation={{ 
            required: '이메일은 필수입니다.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 형식을 입력하세요.'
            }
          }}
          element={<Input />}
        />
      </ContentsRow>

      {/* 두 번째 행: 역할, 상태 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="role"
          label="역할"
          placeholder="역할을 선택하세요"
          validation={{ required: '역할은 필수입니다.' }}
          element={<Select options={roleOptions} />}
        />
        <FormRow2
          provider={provider}
          name="status"
          label="상태"
          placeholder="상태를 선택하세요"
          validation={{ required: '상태는 필수입니다.' }}
          element={<Select options={statusOptions} />}
        />
      </ContentsRow>
    </div>
  );
};
```

## 6. 사용자 상세 페이지 (pages/user-management/detail.lazy.tsx)

```typescript
import { useCallback, useRef } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useDynamicForm2 } from '@learnway/hooks';
import { Button } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { useRouter } from '@tanstack/react-router';
import {
  useFetchUserInfo,
  useUserContentForm,
} from '@features/user-management/service';
import { UserDetailForm } from '@features/user-management';

export const Route = createLazyFileRoute('/user-management/detail')({ 
  component: RouteComponent 
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // 사용자 정보 조회
  const { mode, userId, data, listParam } = useFetchUserInfo();

  // 폼 관리
  const form = useDynamicForm2({
    builders: [], // UserDetailForm에서 정의
    defaultValues: mode === 'CREATE' ? {
      name: '',
      email: '',
      role: 'user',
      status: 'active',
    } : {
      name: data?.name || '',
      email: data?.email || '',
      role: data?.role || 'user',
      status: data?.status || 'active',
    },
  });
  const { provider, onSubmit } = form;

  // 폼 비즈니스 로직
  const { handleOnSubmit } = useUserContentForm({ mode, provider });

  // 목록으로 돌아가기
  const handleBackToList = useCallback(() => {
    router.navigate({
      to: '/user-management',
      state: listParam,
    });
  }, [router, listParam]);

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBackToList}
          >
            {t('목록')}
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            size="sm"
          >
            {mode === 'CREATE' ? t('등록') : t('수정')}
          </Button>
        </ContentsButtons>

        <MainContents>
          <UserDetailForm
            form={form}
            mode={mode}
            userInfo={data}
          />
        </MainContents>
      </PageContainer>
    </form>
  );
}
```

## 7. 목록 페이지 컴포넌트 (pages/user-management/index.tsx)

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

## 8. 스타일링 (선택사항)

프로젝트에서 CSS Modules나 Styled Components를 사용하는 경우, 각 컴포넌트에 맞는 스타일을 추가할 수 있습니다.

```css
/* user-list.module.css */
.page_container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.contents_buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.main_contents {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search_section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.grid_section {
  flex: 1;
  min-height: 400px;
}

/* user-detail-form.module.css */
.user_detail_form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form_row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form_field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.required {
  color: #e74c3c;
}

.error_message {
  color: #e74c3c;
  font-size: 12px;
}
```

## 주요 특징

### 1. 실제 프로젝트 패턴 반영

- **SearchBox**: `useDynamicForm2` 훅을 활용한 동적 검색 폼
- **Divider**: 검색 영역과 그리드 영역 시각적 분리
- **GridBox**: `useGridBox` 훅과 TanStack Table 기반 데이터 그리드
- **라우터 기반**: 모달이 아닌 페이지 기반 네비게이션

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

### 2. 라우터 설정

```typescript
// 라우터 설정 예시
const router = createBrowserRouter({
  path: '/user-management',
  component: UserListPage,
  children: [
    {
      path: '/detail',
      component: UserDetailPage,
    },
  ],
});
```

### 3. 커스텀 GridBox 설정

```typescript
// GridBox 설정 커스터마이징
const customGridConfig = {
  query: userQueryOptions.all,
  rowId: 'id',
  gridState: {
    page: 0,
    size: 50, // 페이지 크기 변경
    sort: ['name,asc'], // 기본 정렬 변경
  },
};
```

### 4. SearchBox 필드 커스텀마이징

```typescript
// 검색 필드 추가/수정
const searchFields = [
  [
    {
      name: 'keyword',
      label: '통합검색',
      type: 'text',
      placeholder: '이름, 이메일로 검색',
    },
    {
      name: 'dateRange',
      label: '생성일',
      type: 'dateRange',
    },
  ],
];
```

## 체크리스트

### FSD 아키텍처 준수

- [x] API 로직이 entities 레이어에 위치
- [x] UI 컴포넌트가 features 레이어에 위치
- [x] 페이지가 pages 레이어에 위치
- [x] 적절한 의존성 방향 유지

### 프로젝트 표준 패턴

- [x] SearchBox + useDynamicForm2 사용
- [x] Divider로 영역 구분
- [x] GridBox + useGridBox 사용
- [x] TanStack Table 컬럼 정의
- [x] 라우터 기반 상세/등록 페이지
- [x] CREATE/UPDATE 모드 처리

### 기능 완성도

- [x] 동적 검색 및 필터링
- [x] 자동 페이지네이션
- [x] 정렬 기능
- [x] 로딩 및 에러 상태 처리
- [x] 행 선택 및 더블클릭
- [x] 라우터 기반 네비게이션
- [x] 상태 유지 (목록↔상세)

### 코드 품질

- [x] TypeScript 타입 정의
- [x] React Query 최적화
- [x] 성능 최적화 (메모이제이션)
- [x] 재사용 가능한 컴포넌트 설계
- [x] 실제 프로젝트 패턴 반영