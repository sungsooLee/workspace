import { useEffect } from 'react';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { SearchBox } from '@shared/ui/search-box';

import { queryOptions as companyQueryOptions } from '@entities/companies/service/companies.queries';
import { EnGlobalConst } from '@types';

const _global = {
  linkClick: (companyCode: string) => {
    return;
  },
};

/**
 * NLP_BO_TMS_1111_01 : 임시 회사 api 호출
 * @returns
 */
const TenantCompanyOrganizationListComponent = ({ rootPath }: { rootPath: string }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const {
    provider: searchProvider,
    onFormChange,
    onFormValid,
    getValues,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  _global.linkClick = (companyCode: string) => {
    console.log('getValues', getValues());
    router.navigate({
      to: `${rootPath}/tenant/organization/detail`,
      state: {
        companyCode: companyCode,
        listParam: getValues(),
      },
    });
  };

  const handleOnSearch = (data: any) => {
    gridFetch(data);
  };

  useEffect(() => {
    const init = async () => {
      const listParam = routerState.location.state.listParam;
      if (listParam) {
        onFormChange(listParam);
        if (await onFormValid()) {
          handleOnSearch(getValues());
        }
      }
    };
    init();
  }, []);
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

export const TenantCompanyOrganizationList = TenantCompanyOrganizationListComponent;

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
        name: 'name',
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
  query: companyQueryOptions.list,
  columns: [],
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
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.getValue()}`),
    enableGrouping: false,
  }),
  columnHelper.accessor('isUseLinkageSystem', {
    cell: (info) => {
      return info.getValue() ? '자동 관리' : '수동 관리';
    },
    header: '데이터 관리 방식',
  }),
  columnHelper.accessor('name', {
    header: t('회사명'),
    cell: (info) => (
      <Button
        className="link"
        onClick={() => {
          _global.linkClick(info.row.original.companyCode as string);
        }}
        label={info.getValue() as string}
      />
    ),
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
        : getDateToString(new Date(info.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC),
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
        : getDateToString(new Date(info.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC),
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
