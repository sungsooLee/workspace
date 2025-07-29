import { queryOptions } from '@entities/companies/service/companies.queries';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Divider, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EnGlobalConst } from '@types';
import { t } from 'i18next';
import { useCallback } from 'react';

interface CompanyListProps {
  detailPath: string;
}

const CompanyListComponent = ({ detailPath }: CompanyListProps) => {
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig());
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
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('name', {
      header: t('회사명'),
      cell: (info) => {
        return (
          <Link
            to={detailPath}
            state={{
              companyCode: info.row.original.companyCode,
              companyId: info.row.original.companyId,
            }}
            className="link"
          >
            {info.row.original.name}
          </Link>
        );
      },
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('isUsed', {
      header: t('사용여부'),
      cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
      enableGrouping: false,
      meta: {
        cellAlign: 'center',
        size: 'auto',
      },
    }),
    columnHelper.accessor('lastModifiedBy', {
      header: t('수정자'),
      cell: (info) =>
        info.row.original.isUseLinkageSystem ? t('시스템') : info.row.original.lastModifiedBy,
      enableGrouping: false,
      meta: {
        size: 'auto',
      },
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
      meta: {
        cellAlign: 'center',
        size: 'auto',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox config={gConfig} columns={columns} title="회사 목록" />
    </>
  );
};

export const CompanyList = CompanyListComponent;

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'companyType',
        type: 'dropdown',
        label: t('그룹'),
        value: '',
        presetOptionLabel: t('전체'),
        optionsConfig: {
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
        label: t('사용 여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
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
});

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
