import { useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { queryOptions as companyQueryOptions } from '@entities/companies/service/companies.queries';

/**
 * NLP_BO_TMS_1111_01 : 임시 회사 api 호출
 * @returns
 */
const TenantCompanyDepartmentListComponent = ({ rootPath }: { rootPath: string }) => {
  const router = useRouter();

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  const handleCompanyNameClick = (companyId: number) => {
    router.navigate({
      to: `${rootPath}/tenant/department/detail`,
      state: {
        companyId: companyId,
        listParam: getValues(),
      },
    });
  };
  const handleOnSearch = (data: any) => {
    console.log('search', data);
    gridFetch(data);
  };

  //Column Helper 정의
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('numbering', {
      id: 'numbering',
      cell: ({ row }) => row.index,
      header: 'NO.',
      size: 64,
    }),
    columnHelper.accessor('tenant', {
      id: 'tenant',
      cell: (info) => {
        return <strong>{info.row.original.c1}</strong>;
      },
      header: t('테넌트'),
      size: 180,
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: t('회사명'),
      cell: (info) => {
        return (
          <Button
            className="link"
            onClick={() => handleCompanyNameClick(info.row.original.companyId)}
          >
            {info.row.original.name}
          </Button>
        );
      },
      size: 180,
    }),
    columnHelper.accessor('c3', {
      id: 'c3',
      header: t('HR 연동 여부'),
      size: 180,
    }),
    columnHelper.accessor('c4', {
      id: 'c4',
      header: t('HR 연동 방식'),
      size: 180,
    }),
    columnHelper.accessor('c5', {
      id: 'c5',
      header: t('등록자'),
      size: 180,
    }),
    columnHelper.accessor('c6', {
      id: 'c6',
      header: t('등록일'),
      size: 180,
      cell: (info) => {
        return getDateToString(new Date(info.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC);
      },
    }),
    columnHelper.accessor('c7', {
      id: 'c7',
      header: t('수정자'),
      size: 180,
    }),
    columnHelper.accessor('c8', {
      id: 'c8',
      header: t('수정일'),
      size: 180,
      cell: (info) => {
        return getDateToString(new Date(info.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC);
      },
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox config={gConfig} columns={columns} />
        </div>
      </div>
    </>
  );
};

export const TenantCompanyDepartmentList = TenantCompanyDepartmentListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantName',
        type: 'text',
        label: t('테넌트명'),
        value: '',
      },
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
  query: companyQueryOptions.all,
  columns: [],
  data: [],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
