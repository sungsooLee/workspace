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
import { queryOptions } from '@entities/companies/service/companies.queries';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/platform/company/management/')({
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
      <ContentsButtons>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.navigate({ to: '/platform/company/management/regist' })}
        >
          {t('등록')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox config={gConfig} columns={columns} title="회사 목록" />
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
        name: 'isUseLinkageSystem',
        type: 'dropdown',
        label: t('HR 연동 여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('HR 연동') },
          { value: 'false', label: t('수동 등록') },
        ],
      },
      {
        name: 'companyType',
        type: 'dropdown',
        label: t('회사 구분'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('전체') }],
          codeGroup: CODE_GROUP['pms.company.CompanyType'],
        },
      },
      {
        name: 'name',
        type: 'dropdown',
        label: t('회사명'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyCode'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
    ],
    [
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: true, label: t('사용') },
          { value: false, label: t('미사용') },
        ],
      },
      {
        name: 'managerName',
        type: 'text',
        label: t('담당자'),
        value: '',
      },
      /*
      {
        name: 'regStrDate', // regStrDate, regEndDate
        type: 'date-range',
        label: t('등록기간'),
        value: {
          from: formUtils.now({ unit: 'day', offset: -30 }),
          to: formUtils.now(),
        },
      },*/
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: queryOptions.list,
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
  columnHelper.accessor('companyType', {
    header: t('그룹'),
    cell: (info) => t('pms.company.CompanyType.' + info.getValue()),
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    header: t('회사명'),
    cell: (info) => (
      <Link
        to="/platform/company/management/detail"
        state={{
          companyCode: info.row.original.companyCode,
        }}
        className="link"
      >
        {info.row.original.name}
      </Link>
    ),
    enableGrouping: false,
  }),
  columnHelper.accessor('useYn', {
    header: t('회사정보 사용'),
    cell: (info) => (info.getValue() ? t('사용') : t('미사용')), // API 확인
    enableGrouping: false,
  }),
  columnHelper.accessor('createdBy', {
    header: t('등록자'),
    cell: (info) => (info.row.original.isUseLinkageSystem ? '시스템' : info.row.original.createdBy),
    enableGrouping: false,
  }),
  columnHelper.accessor('createdDate', {
    header: t('등록일'),
    cell: (info) =>
      info.getValue() === null
        ? ''
        : getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
    enableGrouping: false,
  }),
  columnHelper.accessor('lastModifiedBy', {
    header: t('수정자'),
    cell: (info) =>
      info.row.original.isUseLinkageSystem ? '시스템' : info.row.original.lastModifiedBy,
    enableGrouping: false,
  }),
  columnHelper.accessor('modifiedDate', {
    header: t('수정일'),
    cell: (info) =>
      info.getValue() === null
        ? ''
        : getDateToString(new Date(info.row.original.modifiedDate), DATE_TIME_FORMAT.DATETIME_SEC),
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
