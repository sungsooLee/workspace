import { TreeNode } from '@learnway/ui';

// 역할 목록 트리 모킹 데이터
export const roleTreeMockData: TreeNode[] = [
  {
    key: 'root',
    title: 'root',
    isUsed: true,
    children: [
      {
        key: 'role-001',
        title: '시스템 관리자',
        isUsed: true,
        children: [
          {
            key: 'role-001-1',
            title: '시스템 운영자',
            isUsed: true,
            children: [
              {
                key: 'role-001-1-1',
                title: '백오피스 관리자',
                isUsed: true,
                children: [],
              },
            ],
          },
          {
            key: 'role-001-2',
            title: '통계 담당자',
            isUsed: true,
            children: [],
          },
        ],
      },
      {
        key: 'role-002',
        title: '일반 사용자',
        isUsed: true,
        children: [
          {
            key: 'role-002-1',
            title: '강사',
            isUsed: true,
            children: [],
          },
          {
            key: 'role-002-2',
            title: '학생',
            isUsed: true,
            children: [],
          },
        ],
      },
      {
        key: 'role-003',
        title: '게스트',
        isUsed: false,
        children: [],
      },
    ],
  },
];

// 메뉴 목록 트리 모킹 데이터
export const menuTreeMockData: TreeNode[] = [
  {
    key: 'root',
    title: 'root',
    isUsed: true,
    children: [
      {
        key: 'menu-001',
        title: '대시보드',
        isUsed: true,
        children: [],
      },
      {
        key: 'menu-002',
        title: '사용자 관리',
        isUsed: true,
        children: [
          {
            key: 'menu-002-1',
            title: '회원 목록',
            isUsed: true,
            children: [],
          },
          {
            key: 'menu-002-2',
            title: '역할 관리',
            isUsed: true,
            children: [],
          },
        ],
      },
      {
        key: 'menu-003',
        title: '콘텐츠 관리',
        isUsed: true,
        children: [
          {
            key: 'menu-003-1',
            title: '강의 관리',
            isUsed: true,
            children: [],
          },
          {
            key: 'menu-003-2',
            title: '자료 관리',
            isUsed: true,
            children: [],
          },
        ],
      },
      {
        key: 'menu-004',
        title: '설정',
        isUsed: true,
        children: [
          {
            key: 'menu-004-1',
            title: '시스템 설정',
            isUsed: true,
            children: [],
          },
          {
            key: 'menu-004-2',
            title: 'API 관리',
            isUsed: true,
            children: [],
          },
        ],
      },
    ],
  },
];

// 특정 메뉴에 속한 API 목록 모킹 데이터
export const apiListMockData: any = [
  {
    apiId: 'API-001',
    apiName: 'Common API',
    apiPath: '/api/common/users',
    apiMethod: 'GET',
    apiDesc: '사용자 목록 조회',
  },
  {
    apiId: 'API-002',
    apiName: 'Common API',
    apiPath: '/api/common/users/{id}',
    apiMethod: 'GET',
    apiDesc: '사용자 상세 조회',
  },
  {
    apiId: 'API-003',
    apiName: 'PMS API',
    apiPath: '/api/pms/roles',
    apiMethod: 'GET',
    apiDesc: '역할 목록 조회',
  },
  {
    apiId: 'API-004',
    apiName: 'PMS API',
    apiPath: '/api/pms/roles/{id}',
    apiMethod: 'GET',
    apiDesc: '역할 상세 조회',
  },
  {
    apiId: 'API-005',
    apiName: 'Common API',
    apiPath: '/api/common/menus',
    apiMethod: 'GET',
    apiDesc: '메뉴 목록 조회',
  },
  {
    apiId: 'API-006',
    apiName: 'CMS API',
    apiPath: '/api/cms/contents',
    apiMethod: 'GET',
    apiDesc: '콘텐츠 목록 조회',
  },
  {
    apiId: 'API-007',
    apiName: 'CMS API',
    apiPath: '/api/cms/contents/{id}',
    apiMethod: 'GET',
    apiDesc: '콘텐츠 상세 조회',
  },
  {
    apiId: 'API-008',
    apiName: 'CMS API',
    apiPath: '/api/cms/lectures',
    apiMethod: 'GET',
    apiDesc: '강의 목록 조회',
  },
];

// 특정 역할에 할당된 메뉴 ID 목록 모킹 데이터
export const roleMenuMockData: any = {
  'role-001': ['root', 'menu-001', 'menu-002', 'menu-003', 'menu-004', 'menu-004-2'], // 시스템 관리자는 모든 메뉴 접근 가능
  'role-001-1': ['root', 'menu-001', 'menu-002', 'menu-003'], // 시스템 운영자는 설정 제외 접근 가능
  'role-001-1-1': ['root', 'menu-001', 'menu-002'], // 백오피스 관리자는 대시보드, 사용자 관리만 접근 가능
  'role-001-2': ['root', 'menu-001', 'menu-003'], // 통계 담당자는 대시보드, 콘텐츠 관리만 접근 가능
  'role-002': ['root', 'menu-001'], // 일반 사용자는 대시보드만 접근 가능
  'role-002-1': ['root', 'menu-001', 'menu-003-1'], // 강사는 대시보드, 강의 관리만 접근 가능
  'role-002-2': ['root', 'menu-001'], // 학생은 대시보드만 접근 가능
  'role-003': [], // 게스트는 아무것도 접근 불가
};

// 메뉴별 API 매핑 모킹 데이터
export const menuApiMappingMockData: any = {
  'menu-001': ['API-001'], // 대시보드
  'menu-002-1': ['API-001', 'API-002'], // 회원 목록
  'menu-002-2': ['API-003', 'API-004'], // 역할 관리
  'menu-003-1': ['API-008'], // 강의 관리
  'menu-003-2': ['API-006', 'API-007'], // 자료 관리
  'menu-004-1': ['API-005'], // 시스템 설정
  'menu-004-2': [
    'API-001',
    'API-002',
    'API-003',
    'API-004',
    'API-005',
    'API-006',
    'API-007',
    'API-008',
  ], // API 관리 (모든 API)
};

export const roleApiUsageMockData: any = {
  'role-001': {
    'API-001': true,
    'API-002': true,
    'API-003': true,
  },
  'role-001-1': {
    'API-001': true,
    'API-002': true,
    'API-003': false,
  },
  'role-002': {
    'API-001': true,
    'API-002': false,
    'API-003': false,
  },
};
