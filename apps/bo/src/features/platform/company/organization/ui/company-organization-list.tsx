import { useEffect, useState } from 'react';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { useFetchAuthUser } from '@learnway/auth/entities';

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
const CompanyOrganizationListComponent = ({ rootPath }: { rootPath: string }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();

  const [tenantId, setTenantId] = useState<number>();

  const searchParam = () => {
    const data = getValues();
    const searchData = {
      tenantId: tenantId,
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
    return searchData;
  };

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
    if (!tenantId) return;
    gridFetch(data);
  };

  useEffect(() => {
    if (!loginUser) return;

    if (loginUser.activeTenant) {
      setTenantId(loginUser.activeTenant.tenantId);
    } else {
      if (loginUser.tenants && loginUser.tenants.length > 0) {
        setTenantId(loginUser.tenants[0].tenantId);
      }
    }
  }, [loginUser]);

  useEffect(() => {
    if (!tenantId) return;
    gridFetch(searchParam());
  }, [tenantId]);

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

export const TenantCompanyOrganizationList = CompanyOrganizationListComponent;

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
