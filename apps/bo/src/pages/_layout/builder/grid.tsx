import { createFileRoute } from '@tanstack/react-router';
import useSearchBox from '../../../shared/ui/search-box/use-search-box';
import { SearchBox } from '../../../shared/ui/search-box';
import z from 'zod';
import '../../../builder.css';

export const Route = createFileRoute('/_layout/builder/grid')({
  component: RouteComponent,
});

function RouteComponent() {
  const { config } = useSearchBox(searchConfig);

  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <SearchBox config={config} onSearch={handleOnSearch} />
    </div>
  );
}

const searchConfig = {
  searchMethod: 'change',
  builders: [
    {
      name: 'register_date',
      label: '등록일',
      type: 'date-range',
      required: true,
      value: {
        startDate: '2024-01-01',
        endDate: '2024-01-01',
      },
    },
    {
      name: 'keyword',
      label: '키워드',
      type: 'text',
      value: '',
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
        { value: 'tech', label: '기술' },
        { value: 'finance', label: '금융' },
        { value: 'healthcare', label: '헬스케어' },
        { value: 'education', label: '교육' },
        { value: 'retail', label: '리테일' },
      ],
    },
    {
      name: 'role',
      type: 'dropdown',
      label: '역할',
      value: 'admin',
      items: [
        { value: 'admin', label: '관리자' },
        { value: 'editor', label: '편집자' },
        { value: 'viewer', label: '뷰어' },
      ],
    },
    {
      name: 'regions',
      type: 'multi-dropdown',
      label: '지역',
      value: [],
      items: [
        { value: 'na', label: '북아메리카' },
        { value: 'eu', label: '유럽' },
        { value: 'asia', label: '아시아' },
        { value: 'sa', label: '남아메리카' },
        { value: 'africa', label: '아프리카' },
      ],
    },
    {
      name: 'priority',
      type: 'dropdown',
      label: '우선순위',
      value: '',
      items: [
        { value: 'high', label: '높음' },
        { value: 'medium', label: '중간' },
        { value: 'low', label: '낮음' },
      ],
    },
    {
      name: 'tags',
      type: 'multi-dropdown',
      label: '태그',
      value: [],
      items: [
        { value: 'urgent', label: '긴급' },
        { value: 'follow_up', label: '추적' },
        { value: 'internal', label: '내부' },
        { value: 'external', label: '외부' },
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
      type: 'check-group',
      label: '색선택',
      value: [],
      items: [
        {
          value: 'red',
          label: '빨강',
        },
        {
          value: 'yellow',
          label: '노랑',
        },
        {
          value: 'blue',
          label: '파랑',
        },
      ],
    },
    {
      name: 'area',
      type: 'radio-group',
      label: '지역',
      value: '',
      items: [
        {
          value: '',
          label: '전체',
        },
        {
          value: 'seoul',
          label: '서울',
        },
        {
          value: 'pusan',
          label: '부산',
        },
      ],
    },
  ],
  validator: {
    keyword: z.string(),
    userName: z.string(),
  },
};
