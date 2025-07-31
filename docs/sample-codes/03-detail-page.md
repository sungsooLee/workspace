# 상세/등록 화면 샘플 코드

## 개요

이 샘플 코드는 FSD(Feature-Sliced Design) 아키텍처를 기반으로 한 React + TypeScript 상세/등록 화면 구현을 보여줍니다.
**라우터 기반 페이지 네비게이션**을 사용하여 목록 화면과 연동되는 상세 조회 및 등록 기능을 제공합니다.

## 주요 특징

- **FSD 아키텍처 준수**: 각 레이어별 역할 분담
- **라우터 기반 네비게이션**: 모달이 아닌 페이지 기반 상세/등록 처리
- **CREATE/UPDATE 모드 통합**: 하나의 컴포넌트로 등록과 수정 처리
- **상태 유지**: 목록 페이지의 검색 조건 유지
- **useDynamicForm2**: 프로젝트 표준 폼 관리 훅 활용
- **TypeScript 타입 안전성**: 컴파일 타임 에러 방지

## 핵심 컴포넌트

- **상세 폼 컴포넌트**: `useDynamicForm2`를 활용한 동적 폼 관리
- **비즈니스 로직 훅**: 폼 제출 및 API 연동 로직 분리
- **라우터 State**: TanStack Router를 통한 페이지 간 데이터 전달

## 구현 구조

```
src/
├── entities/
│   └── user/
│       ├── api/
│       │   └── user.ts               # API 호출 로직
│       ├── types/
│       │   └── user.types.ts         # 타입 정의
│       └── service/
│           └── user.hook.ts          # React Query 훅
├── features/
│   └── user-management/
│       ├── ui/
│       │   └── user-detail-form.tsx  # 상세 폼 컴포넌트
│       └── service/
│           ├── use-fetch-user-info.ts      # 사용자 정보 조회
│           └── use-user-content-form.ts    # 폼 비즈니스 로직
├── shared/
│   └── ui/
│       ├── form-row/                 # FormRow2 컴포넌트
│       └── contents-row/             # ContentsRow 컴포넌트
└── pages/
    └── user-management/
        └── detail.lazy.tsx           # 상세/등록 페이지
```

## 전제 조건

이 샘플 코드를 사용하기 전에 먼저 **API 레이어**를 구현해야 합니다.
API 레이어 구현은 별도 문서를 참고하세요: `api-layer-sample.md`

API 레이어가 구현되면 다음과 같이 import하여 사용할 수 있습니다:

```typescript
// entities 레이어에서 필요한 것들 import
import { User, UserCreateRequest, UserUpdateRequest } from '@entities/user';
import { useCreateUser, useUpdateUser } from '@entities/user';
```

## 1. 사용자 정보 훅 (features/user-management/service/use-fetch-user-info.ts)

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

## 2. 사용자 폼 비즈니스 로직 (features/user-management/service/use-user-content-form.ts)

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

## 3. 사용자 상세 폼 컴포넌트 (features/user-management/ui/user-detail-form.tsx)

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

## 4. 사용자 상세 페이지 (pages/user-management/detail.lazy.tsx)

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

## 주요 특징

### 1. 라우터 기반 네비게이션

- **페이지 간 데이터 전달**: TanStack Router의 state를 활용
- **목록 조건 유지**: 상세 페이지에서 목록으로 돌아갈 때 검색 조건 유지
- **모드 전환**: CREATE/UPDATE 모드를 라우터 state로 관리

### 2. 폼 관리

- **useDynamicForm2**: 프로젝트 표준 폼 관리 훅 사용
- **동적 기본값**: 모드에 따라 다른 기본값 설정
- **유효성 검사**: 필수값 및 패턴 검증

### 3. 비즈니스 로직 분리

- **use-fetch-user-info**: 데이터 조회 로직
- **use-user-content-form**: 폼 제출 및 API 연동 로직
- **관심사 분리**: UI와 비즈니스 로직의 명확한 분리

### 4. 타입 안전성

- TypeScript 완전 지원
- 모드별 타입 체크
- API 요청/응답 타입 정의

## 사용법

### 1. 목록에서 상세 페이지로 이동

```typescript
// 상세 조회 (UPDATE 모드)
router.navigate({
  to: '/user-management/detail',
  state: {
    userId: row.original.id,
    mode: 'UPDATE',
    listParam: getValues(), // 현재 검색 조건
  },
});

// 신규 등록 (CREATE 모드)
router.navigate({
  to: '/user-management/detail',
  state: {
    mode: 'CREATE',
    listParam: getValues(),
  },
});
```

### 2. 폼 필드 커스터마이징

```typescript
// 추가 필드 예시
<ContentsRow>
  <FormRow2
    provider={provider}
    name="phone"
    label="전화번호"
    placeholder="전화번호를 입력하세요"
    validation={{ 
      pattern: {
        value: /^[0-9-]+$/,
        message: '올바른 전화번호 형식을 입력하세요.'
      }
    }}
    element={<Input />}
  />
  <FormRow2
    provider={provider}
    name="department"
    label="부서"
    placeholder="부서를 선택하세요"
    element={<Select options={departmentOptions} />}
  />
</ContentsRow>
```

### 3. 저장 후 동작 커스터마이징

```typescript
// 저장 후 목록으로 이동
const { mutate: createUser } = useCreateUser({
  onSuccess: (result: User) => {
    router.navigate({
      to: '/user-management',
      state: listParam,
    });
  },
});

// 저장 후 상세 페이지 유지 (기본 동작)
const { mutate: createUser } = useCreateUser({
  onSuccess: (result: User) => {
    router.navigate(routingParams(result));
  },
});
```

## 체크리스트

### FSD 아키텍처 준수

- [x] API 로직이 entities 레이어에 위치
- [x] UI 컴포넌트가 features 레이어에 위치
- [x] 페이지가 pages 레이어에 위치
- [x] 적절한 의존성 방향 유지

### 프로젝트 표준 패턴

- [x] useDynamicForm2를 활용한 폼 관리
- [x] FormRow2와 ContentsRow를 활용한 레이아웃
- [x] 라우터 기반 페이지 네비게이션
- [x] CREATE/UPDATE 모드 통합 처리

### 기능 완성도

- [x] 신규 등록 기능
- [x] 상세 조회 및 수정 기능
- [x] 폼 유효성 검사
- [x] 저장 확인 다이얼로그
- [x] 목록 페이지 상태 유지
- [x] 에러 처리

### 코드 품질

- [x] TypeScript 타입 정의
- [x] React Query 뮤테이션 활용
- [x] 비즈니스 로직 분리
- [x] 재사용 가능한 컴포넌트 설계