import { queryOptions as userQueryOptions } from './api-mock/service/mock-user.queries';
import { CODE_GROUP } from '@learnway/config';
import { queryOptions as codeQueryOptions } from './api-mock/service/mock-code.queries';
import z from 'zod';
import { t } from 'i18next';
import { formUtils } from './form-utils'; // i18next 사용
export const tableConfig = {
  query: userQueryOptions.all,
  builders: [
    {
      name: 'id',
      label: '아이디',
      width: '50px',
    },
    { name: 'name', label: '이름', width: '100px' },
    { name: 'age', label: '나이', width: '100px' },
    { name: 'department', label: '부서', width: '100px' },
    { name: 'jobType', label: '직업구분', width: '100px' },
    { name: 'position', label: '위치', width: '100px' },
    { name: 'contact', label: '연락처', width: '100px' },
  ],
};

export const searchConfig = {
  searchMethod: 'change',
  builders: [
    {
      name: 'language_code',
      type: 'dropdown',
      label: '언어코드',
      value: '',
      items: [{ code: '', name: '언어전체' }],
      itemsConfig: {
        type: 'self',
        codeGroup: CODE_GROUP.LANGUAGE_CODE,
      },
    },
    {
      name: 'language_detail',
      type: 'dropdown',
      label: '언어상세',
      value: '',
      items: [{ code: '', name: '언어코드를 선택하세요.' }],
      itemsConfig: {
        type: 'target',
        target: 'language_code',
        codeGroup: CODE_GROUP.LANGUAGE_CODE,
      },
    },
    {
      name: 'language_code2',
      type: 'dropdown',
      label: '언어코드2',
      value: '',
      items: [{ code: '', name: '언어전체' }],
      itemsConfig: {
        type: 'self',
        api: codeQueryOptions.getTestCodes,
        callback: (response: any) => {
          return response.data;
        },
      },
    },
    {
      name: 'language_detail2',
      type: 'dropdown',
      label: '언어상세2',
      value: '',
      items: [{ code: '', name: '언어코드를 선택하세요.' }],
      itemsConfig: {
        type: 'target',
        target: 'language_code2',
        api: codeQueryOptions.getTestCode,
        callback: (response: any) => {
          return response.data;
        },
      },
    },
    {
      name: 'register_date',
      label: '등록일',
      type: 'date-range',
      value: {
        from: formUtils.now({ unit: 'day', offset: -30 }),
        to: formUtils.now(),
      },
    },
    {
      name: 'keyword',
      label: '키워드',
      type: 'text',
      value: '',
      placeholder: '키워드를 입력하세요',
      description: '기본 메세지',
    },
    {
      name: 'password',
      label: '비밀번호',
      type: 'password',
      value: '',
      placeholder: '비밀번호를 입력하세요',
    },
    {
      name: 'age',
      label: '나이',
      type: 'text',
      value: '',
    },
    {
      name: 'categories',
      type: 'multi-dropdown',
      label: '카테고리',
      value: ['tech'],
      items: [
        { code: 'tech', name: '기술' },
        { code: 'finance', name: '금융' },
        { code: 'healthcare', name: '헬스케어' },
        { code: 'education', name: '교육' },
        { code: 'retail', name: '리테일' },
      ],
    },
    {
      name: 'role',
      type: 'dropdown',
      label: '역할',
      value: 'admin',
      items: [
        { code: 'admin', name: '관리자' },
        { code: 'editor', name: '편집자' },
        { code: 'viewer', name: '뷰어' },
      ],
    },
    {
      name: 'regions',
      type: 'multi-dropdown',
      label: '지역',
      value: [],
      items: [
        { code: 'na', name: '북아메리카' },
        { code: 'eu', name: '유럽' },
        { code: 'asia', name: '아시아' },
        { code: 'sa', name: '남아메리카' },
        { code: 'africa', name: '아프리카' },
      ],
    },
    {
      name: 'priority',
      type: 'dropdown',
      label: '우선순위',
      value: 'medium',
      items: [
        { code: 'high', name: '높음' },
        { code: 'medium', name: '중간' },
        { code: 'low', name: '낮음' },
      ],
    },
    {
      name: 'tags',
      type: 'multi-dropdown',
      label: '태그',
      value: [],
      items: [
        { code: 'urgent', name: '긴급' },
        { code: 'follow_up', name: '추적' },
        { code: 'internal', name: '내부' },
        { code: 'external', name: '외부' },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: '전화번호',
    },
    {
      name: 'userName',
      type: 'user-search-pop',
      label: '사용자명',
      value: '',
    },
    {
      name: 'check',
      type: 'checkbox',
      label: '체크',
      value: 'Y',
    },
    {
      name: 'color',
      type: 'checkbox-group',
      label: '색선택',
      value: [],
      items: [
        {
          code: 'red',
          name: '빨강',
        },
        {
          code: 'yellow',
          name: '노랑',
        },
        {
          code: 'blue',
          name: '파랑',
        },
      ],
    },
    {
      name: 'area',
      type: 'radio-group',
      label: '지역',
      value: 'seoul',
      items: [
        {
          code: '',
          name: '전체',
        },
        {
          code: 'seoul',
          name: '서울',
        },
        {
          code: 'pusan',
          name: '부산',
        },
      ],
    },
  ],
  validator: {
    /*keyword: z.string().nonempty(t('LOGIN')),
    age: z.string().nonempty(t('사용자명을 입력해주세요.')),
    password: z.string().nonempty(t('비밀번호를 입력해주세요.')),*/
  },
};
