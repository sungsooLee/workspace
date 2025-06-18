import { useEffect, useCallback } from 'react';
import { useLocation } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { queryOptions } from '@entities/companies/service/companies.queries';
import { EnGlobalConst } from '@types';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

const CompanyListComponent = () => {
  const location = useLocation();

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  useEffect(() => {
    gridFetch();
  }, []);

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
        : '',
    };
    gridFetch(searchData);
  }, []);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('companyType', {
      header: t('그룹'),
      cell: (info) =>
        t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.getValue()}`),
      enableGrouping: false,
    }),
    columnHelper.accessor('name', {
      header: t('회사명'),
      cell: (info) => (
        <Link
          to={location.pathname + '/detail'}
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
    columnHelper.accessor('isUsed', {
      header: t('사용여부'),
      cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
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
          : getDateToString(
              new Date(info.row.original.modifiedDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            ),
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox config={gConfig} columns={columns} title="회사 목록" />
        </div>
      </div>
    </>
  );
};

export const CompanyList = CompanyListComponent;

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
          codeGroup: CODE_GROUP['pms.company.CompanyType'],
        },
      },
      {
        name: 'name',
        type: 'text',
        label: t('회사명'),
        value: '',
        placeholder: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('회사정보 사용'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: true, label: t('사용') },
          { value: false, label: t('미사용') },
        ],
      },
      {
        name: 'modifyDate',
        type: 'date-range',
        label: t('수정 기간'),
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
  validator: {
    modifyDate: {
      conditions: [
        {
          fn: (values: any) => !values.modifyDate?.from && values.modifyDate?.to,
          message: t('시작 날짜를 선택하세요'),
        },
        {
          fn: (values: any) => values.modifyDate?.from && !values.modifyDate?.to,
          message: t('종료 날짜를 선택하세요.'),
        },
        {
          fn: (values: any) => values.modifyDate.from > values.modifyDate.to,
          message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
        },
      ],
    },
  },
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
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};
