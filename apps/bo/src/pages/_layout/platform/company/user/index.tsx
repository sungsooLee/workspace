import { useEffect, useCallback } from 'react';
import { t } from 'i18next';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Button, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { formUtils } from '@entities/form-utils';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/platform/company/user/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  useEffect(() => {
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    console.log('search', data);
    gridFetch(data);
  }, []);

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox config={gConfig} columns={columns} title="유저 목록" />
          </div>
        </div>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        required: true,
        name: 'tenantId',
        type: 'dropdown',
        format: 'number',
        label: t('테넌트'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'name',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyCode'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          placeholder: '선택',
        },
      },
      {
        name: 'type',
        type: 'dropdown',
        label: t('데이터 관리 방식'),
        value: '',
        options: [
          { label: '전체', value: '' },
          { label: '자동 관리', value: 'AUTOMATIC' },
          { label: '수동 관리', value: 'MANUAL' },
        ],
      },
      {
        name: 'sabun',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: '',
      },
    ],
    [
      {
        name: 'role',
        type: 'dropdown',
        label: t('학습자 역할'),
        value: '',
        options: [
          { label: '전체', value: '' },
          { label: '조직장', value: 'A' },
          { label: '조직원', value: 'B' },
          { label: '교육팀장', value: 'C' },
        ],
      },
      {
        name: 'accountStatus',
        type: 'dropdown',
        label: t('계정 상태'),
        value: '',
        options: [
          { label: '전체', value: '' },
          { label: '대기', value: 'A' },
          { label: '정상', value: 'B' },
          { label: '휴면', value: 'C' },
          { label: '잠김', value: 'D' },
        ],
      },
      {
        name: 'regStrDate', // regStrDate, regEndDate
        type: 'date-range',
        label: t('회원가입 기간'),
        value: {
          from: formUtils.now({ unit: 'day', offset: -30 }),
          to: formUtils.now(),
        },
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
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

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('tenant', {
    header: t('테넌트'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('companyType', {
    header: t('그룹'),
    cell: (info) => t('pms.company.CompanyType.' + info.getValue()),
    enableGrouping: false,
  }),
  columnHelper.accessor('company', {
    header: t('회사'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('company', {
    header: t('소속'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('company', {
    header: t('직위'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('company', {
    header: t('데이터 관리 방식'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('company', {
    header: t('사번'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    header: t('이름'),
    cell: (info) => (
      <Link
        to="/platform/company/user/detail"
        // state={{
        //   companyCode: info.row.original.companyCode,
        // }}
        className="link"
      >
        {info.row.original.name}
      </Link>
    ),
    enableGrouping: false,
  }),
  columnHelper.accessor('company', {
    header: t('학습자 역할'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('employmentStatus', {
    header: t('재직여부'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('accountStatus', {
    header: t('계정상태'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('unlock', {
    header: t('잠김해제'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('login', {
    header: t('로그인'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('createdDate', {
    header: t('회원가입일'),
    cell: (info) =>
      info.getValue() === null
        ? ''
        : getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
