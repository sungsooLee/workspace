import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@/libs/hooks/src';
import { useRouter } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import {
  Button,
  GridBox,
  // Tooltip,
  // ThumbnailImageUpload,
  // ChipList,
  // SelectOption,
  Input,
  DynamicFormField,
  Dropdown,
} from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';

export const Route = createFileRoute('/_layout/platform/tenant/')({
  component: RouteComponent,
});

function RouteComponent() {
  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const [selectedValues3, setSelectedValues3] = useState<string[]>([]);
  const [selectedValues4, setSelectedValues4] = useState<string[]>([]);
  const [selectedValues5, setSelectedValues5] = useState<string[]>([]);

  const router = useRouter();

  useDynamicForm(formConfig);
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const handleOnSearch = (data: any) => {
    console.log(data);
  };

  const data: any[] = [
    {
      order: '1',
      tenantName: (
        <Button
          className="link"
          onClick={() => {
            router.navigate({ to: '/platform/tenant/detail', state: { tenantId: 1 } });
          }}
        >
          테스트 테넌트 1 클릭하면 상세
        </Button>
      ),
      tenantSite: (
        <Link to="/" className="link">
          /1000001
        </Link>
      ),
      company: '현대자동차, 기아자동차',
      tenantOwner: '담당자명',
      companyOwner: '담당자명',
      useable: '사용',
      register: '김현대',
      registerDate: '2025-01-01 07:12',
      modifier: '김현대',
      modificationDate: '2025-01-01 07:12',
    },
  ];

  return (
    <form className="form_row">
      <PageContainer>
        <MainContents>
          <div className={cn(searchStyles.start, searchStyles.wrap)}>
            <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          </div>
          <div className={cn(boxStyles.start, boxStyles.inner)}>
            <div className="grid_wrap">
              <GridBox
                data={data}
                columns={columns}
                height={440}
                showColumnSettings={false}
                pagination={{
                  pageSize,
                  pageIndex,
                  totalRows: 100,
                  onPageChange: setPageIndex,
                  onPageSizeChange: setPageSize,
                }}
                title="타이틀"
              />
            </div>
          </div>
        </MainContents>
      </PageContainer>
    </form>
  );
}

const options = [
  { value: 'option1', label: '전체' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];
const options2 = [
  { value: 'option1', label: '전체' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];
const options3 = [
  { value: 'option1', label: '전체' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];
const options4 = [
  { value: 'option1', label: '전체' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];
const options5 = [
  { value: 'option1', label: '전체' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('order', {
    cell: (info) => info.getValue(),
    header: 'NO.',
    footer: (props) => `Total: ${props.table.getRowModel().rows.length}`,
    size: 64,
    meta: {
      headerAlign: 'left',
      cellAlign: 'center',
    },
    enableGrouping: false,
  }),
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: '테넌트명',
    enableGrouping: false,
    size: 152,
  }),
  columnHelper.accessor('tenantSite', {
    cell: (info) => info.getValue(),
    header: '테넌트 사이트',
    size: 240,
    enableGrouping: false,
  }),
  columnHelper.accessor('company', {
    cell: (info) => info.getValue(),
    header: '회사',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('tenantOwner', {
    cell: (info) => info.getValue(),
    header: '테넌트 담당자',
    size: 120,
    enableGrouping: false,
  }),
  columnHelper.accessor('companyOwner', {
    cell: (info) => info.getValue(),
    header: '회사 담당자',
    size: 120,
    enableGrouping: false,
  }),
  columnHelper.accessor('useable', {
    cell: (info) => info.getValue(),
    header: '사용여부',
    size: 104,
    enableGrouping: false,
  }),
  columnHelper.accessor('register', {
    cell: (info) => info.getValue(),
    header: '등록자',
    enableGrouping: false,
    size: 104,
  }),
  columnHelper.accessor('registerDate', {
    cell: (info) => info.getValue(),
    header: '등록일시',
    enableGrouping: false,
    size: 152,
  }),
  columnHelper.accessor('modifier', {
    cell: (info) => info.getValue(),
    header: '수정자',
    enableGrouping: false,
    size: 104,
  }),
  columnHelper.accessor('modificationDate', {
    cell: (info) => info.getValue(),
    header: '수정일',
    enableGrouping: false,
    size: 152,
  }),
] as ColumnDef<any, unknown>[];

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트명'),
      value: '',
      placeholder: '',
    },
    {
      label: t('테넌트 로고 (Size : 000x000)'),
      name: 'tenantLogo',
      type: 'custom',
      format: 'array',
      value: [],
    },
    {
      name: 'managerName',
      label: t('테넌트 담당자'),
      type: 'custom',
      value: '',
    },
  ],
  validator: {
    tenantName: { required: true },
    thumbnails: { required: true },
  },
};

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('테넌트명'),
        value: '',
        options: [
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
        dropdownConfig: {
          // onChange: () => {
          //   return '';
          // },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사명'),
        value: '',
        options: [
          { value: 'companyA', label: t('회사A') },
          { value: 'companyB', label: t('회사B') },
          { value: 'companyC', label: t('회사C') },
          { value: 'companyD', label: t('회사D') },
          { value: 'companyE', label: t('회사E') },
          { value: 'companyF', label: t('회사F') },
        ],
        dropdownConfig: {
          // onChange: () => {
          //   return '';
          // },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'tenantOwner',
        type: 'dropdown',
        label: t('테넌트담당자'),
        value: '',
        options: [
          { value: 'tenantOwner', label: t('회사A') },
          { value: 'companyB', label: t('회사B') },
          { value: 'companyC', label: t('회사C') },
          { value: 'companyD', label: t('회사D') },
          { value: 'companyE', label: t('회사E') },
          { value: 'companyF', label: t('회사F') },
        ],
        dropdownConfig: {
          // onChange: () => {
          //   return '';
          // },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
    ],
    [
      {
        name: 'companyOwner',
        type: 'dropdown',
        label: t('회사 담당자'),
        value: '',
        options: [
          { value: 'companyOwner1', label: t('회사담당1') },
          { value: 'companyOwner2', label: t('회사담당2') },
          { value: 'companyOwner3', label: t('회사담당3') },
          { value: 'companyOwner4', label: t('회사담당4') },
          { value: 'companyOwner5', label: t('회사담당5') },
        ],
        dropdownConfig: {
          // onChange: () => {
          //   return '';
          // },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'useable',
        type: 'dropdown',
        label: t('사용여부'),
        value: 'ALL',
        options: [
          { value: 'ALL', label: t('전체') },
          { value: 'Y', label: t('사용') },
          { value: 'N', label: t('미사용') },
        ],
      },
    ],
  ],
};

const gridConfig = {
  query: '',
  data: [
    {
      managerId: 1,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
    {
      managerId: 2,
      tenantName: '테넌트A',
      channelName: '내 관리 채널명',
      company: '현대자동차',
      affiliation: '경영지원팀',
      hrdOwner: '테넌트 담당자',
      companyNumber: '1234567',
      name: '김현대',
      roleTerm: '2025-01-03 ~ 2025-01-03',
      tenure: '재직',
      roleStatus: '정상',
    },
  ],
  columns: [
    { name: 'tenantName', label: t('테넌트명') },
    { name: 'channelName', label: t('채널명') },
    { name: 'company', label: t('회사') },
    { name: 'affiliation', label: t('테넌트 담당자') },
    { name: 'hrdOwner', label: '회사 담당자' },
    { name: 'companyNumber', label: '사번' },
    { name: 'name', label: '이름' },
    { name: 'roleTerm', label: '역할 기간' },
    { name: 'tenure', label: '재직 여부' },
    { name: 'roleStatus', label: '역할 상태' },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
