import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { MainContents, PageContainer } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EnGlobalConst } from '@types';
import { t } from 'i18next';
import { useCallback } from 'react';

export const Route = createFileRoute('/_layout/platform/company/hr-history/')({
  component: RouteComponent });

function RouteComponent() {
  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'companyType',
          type: 'dropdown',
          label: t('그룹'),
          value: '',
          optionsConfig: {
            options: [{ value: '', label: t('전체') }],
            codeGroup: CODE_GROUP['pms.company.CompanyType'] } },
        {
          name: 'name',
          type: 'text',
          label: t('회사명'),
          value: '',
          placeholder: '' },
        {
          name: 'isUsed',
          type: 'dropdown',
          label: t('회사정보 사용'),
          value: '',
          options: [
            { value: '', label: t('전체') },
            { value: true, label: t('사용') },
            { value: false, label: t('미사용') },
          ] },
        {
          name: 'modifyDate',
          type: 'date-range',
          label: t('수정 기간'),
          value: {
            from: undefined,
            to: undefined } },
      ],
    ],
    validator: {
      modifyDate: {
        conditions: [
          {
            fn: (values: any) => !values.modifyDate?.from && values.modifyDate?.to,
            message: t('시작 날짜를 선택하세요') },
          {
            fn: (values: any) => values.modifyDate?.from && !values.modifyDate?.to,
            message: t('종료 날짜를 선택하세요.') },
          {
            fn: (values: any) => values.modifyDate.from > values.modifyDate.to,
            message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.') },
        ] } } };

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('companyType', {
      header: t('그룹'),
      cell: (info) =>
        t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompayType.${info.getValue()}`),
      enableGrouping: false,
      meta: {
        size: 'auto' } }),
    columnHelper.accessor('name', {
      header: t('회사명'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
      meta: {
        size: 'auto' } }),
    columnHelper.accessor('api', {
      header: t('API'),
      cell: (info) => 'API',
      enableGrouping: false,
      meta: {
        size: 'auto' } }),
    columnHelper.accessor('method', {
      header: t('Method 구분'),
      cell: (info) => 'POST',
      enableGrouping: false,
      meta: {
        size: 'auto' } }),
    columnHelper.accessor('lastModifiedBy', {
      header: t('수정자'),
      cell: (info) =>
        info.row.original.isUseLinkageSystem ? '시스템' : info.row.original.lastModifiedBy,
      enableGrouping: false,
      meta: {
        size: 'auto' } }),
    columnHelper.accessor('modifiedDate', {
      header: t('수정일'),
      cell: (info) =>
        info.getValue() === null
          ? ''
          : getDateToString(
              new Date(info.row.original.modifiedDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            ),
      enableGrouping: false,
      meta: {
        size: 'auto' } }),
  ] as ColumnDef<any, unknown>[];

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    const searchData = {
      companyType: data.companyType,
      name: data.name,
      isUsed: data.isUsed,
      modifyStartDate: data.modifyDate.from
        ? getDateToString(new Date(data.modifyDate.from), 'YYYYMMDD')
        : '',
      modifyEndDate: data.modifyDate.to
        ? getDateToString(new Date(data.modifyDate.to), 'YYYYMMDD')
        : '' };
    gridFetch(searchData);
  }, []);

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox config={gConfig} columns={columns} title="회사 연결 목록" />
      </MainContents>
    </PageContainer>
  );
}

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering' },
  ],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [] } };
