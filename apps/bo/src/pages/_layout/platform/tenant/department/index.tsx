import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { PageContainer, MainContents, ContentsButtons } from '@widgets/layout';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { TenantCompanyDepartmentList } from '@features/tenant/department/ui/tenant-company-department-list';

export const Route = createFileRoute('/_layout/platform/tenant/department/')({
  component: RouteComponent,
});

/**
 * 화면번호: NLP_BO_TMS_1111_01
 * @returns
 */
function RouteComponent() {
  const router = useRouter();

  const { provider: searchProvider } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  const handleOnSearch = (data: any) => {
    console.log('search', data);
    gridFetch(data);
  };

  return (
    <PageContainer>
      <MainContents>
        <TenantCompanyDepartmentList rootPath="/platform" />
        {/* <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox config={gConfig} columns={columns} />
          </div>
        </div> */}
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantName',
        type: 'text',
        label: t('테넌트명'),
        value: '',
      },
      // {
      //   name: 'companyName',
      //   type: 'dropdown',
      //   label: t('회사명'),
      //   value: '',
      //   optionsConfig: {
      //     codeGroup: CODE_GROUP['manual.company.companyCode'],
      //   },
      //   dropdownConfig: {
      //     onchange: () => {
      //       return '';
      //     },
      //     isSearchable: true,
      //     placeholder: '입력 선택',
      //   },
      // },
      {
        name: 'companyName',
        type: 'text',
        label: t('회사명'),
        value: '',
      },
    ],
    [
      {
        name: 'tenantMappingCompanyName',
        type: 'text',
        label: t('HR연동 여부'),
        value: '',
        options: [
          { label: '전체', value: '' },
          { label: 'HR연동', value: 'HR' },
          { label: '수동등록', value: 'MANUAL' },
        ],
      },
      {
        name: 'isUsed',
        type: 'date-range',
        label: t('등록기간'),
        value: '',
      },
    ],
  ],
};

const gridConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

//Column Helper 정의
const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('c1', {
    id: 'c1',
    cell: (prop: any) => {
      return <strong>{prop.row.original.c1}</strong>;
    },
    header: t('테넌트'),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('c2', {
    id: 'c2',
    header: t('회사명'),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('c3', {
    id: 'c3',
    header: t('HR 연동 여부'),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('c4', {
    id: 'c4',
    header: t('HR 연동 방식'),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('c5', {
    id: 'c5',
    header: t('등록자'),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('c6', {
    id: 'c6',
    header: t('등록일'),
    enableGrouping: false,
    size: 180,
    cell: (info) => {
      return getDateToString(new Date(info.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC);
    },
  }),
  columnHelper.accessor('c7', {
    id: 'c7',
    header: t('수정자'),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('c8', {
    id: 'c8',
    header: t('수정일'),
    enableGrouping: false,
    size: 180,
    cell: (info) => {
      return getDateToString(new Date(info.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC);
    },
  }),
] as ColumnDef<any, unknown>[];
