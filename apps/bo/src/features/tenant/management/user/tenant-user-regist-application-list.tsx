import { FC, useState, useEffect, useCallback } from 'react';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

const _global = {
  linkClick: (tenantId: number, tenantName: string) => {
    return;
  },
};

/**
 * 화면번호 : NLP_BO_TMS_1111_15 테넌트-유저관리 (회원 가입 신청)
 * @param param0
 * @returns
 */
const TenantUserRegistApplicationListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();
  const routerState = useRouterState();
  _global.linkClick = (tenantId: number, tenantName: string) => {
    router.navigate({
      to: `${rootPath}/tenant/management/user-group/handmade-detail`,
      state: {
        tenantId: tenantId,
        tenantName: tenantName,
        listParam: getValues(),
      },
    });
  };

  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  const handleOnSearch = (data: any) => {
    console.log('search', data);
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
          <GridBox config={gConfig} columns={columns} showNumberingColumn />
        </div>
      </div>
    </>
  );
};

export const TenantUserRegistApplicationList = TenantUserRegistApplicationListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'text',
        label: t('테넌트명'),
        format: 'object',
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 또는 선택',
        },
      },
      {
        name: 'companyId',
        type: 'text',
        label: t('회사'),
        value: '',
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('사번'),
        value: '',
      },
    ],
    [
      {
        name: 'companyManagerName',
        type: 'text',
        label: t('학습자 역할'),
        value: '',
      },
      {
        name: 'opt2',
        type: 'text',
        label: t('계정상태'),
        value: '',
      },
      {
        name: 'dateRange',
        type: 'date-range',
        label: t('회원가입 기간'),
        format: 'object',
        value: { from: undefined, to: undefined },
      },
    ],
  ],
  validator: {
    tenantId: true,
  },
};

const gridConfig = {
  query: '',
  columns: [],
  data: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: t('테넌트'),
    size: 120,
  }),
  columnHelper.accessor('opt1', {
    cell: (info) => info.getValue(),
    header: t('그룹'),
    size: 120,
  }),
  columnHelper.accessor('opt2', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 120,
  }),
  columnHelper.accessor('opt3', {
    cell: (info) => info.getValue(),
    header: t('소속'),
    size: 120,
  }),
  columnHelper.accessor('opt4', {
    cell: (info) => (
      <Link to={info.row.original.tenantSite} className="link">
        {info.row.original.tenantId}
      </Link>
    ),
    header: t('지위'),
    size: 120,
  }),
  columnHelper.accessor('opt5', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    size: 120,
  }),
  columnHelper.accessor('opt6', {
    cell: (info) => info.getValue(),
    header: t('이름'),
    size: 120,
  }),
  columnHelper.accessor('opt7', {
    cell: (info) => info.getValue(),
    header: t('학습자 역할'),
    size: 120,
  }),
  columnHelper.accessor('opt8', {
    cell: (info) => info.getValue(),
    header: t('재직여부'),
    size: 88,
  }),
  columnHelper.accessor('opt9', {
    cell: (info) => info.getValue(),
    header: t('계정상태'),
    size: 88,
  }),
  columnHelper.accessor('opt10', {
    cell: (info) => info.getValue(),
    header: t('잠김해제'),
    size: 88,
  }),
  columnHelper.accessor('opt11', {
    cell: (info) => info.getValue(),
    header: t('로그인'),
    size: 88,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => {
      return getDateToString(
        new Date(info.row.original.createdDate),
        DATE_TIME_FORMAT.DATETIME_SEC,
      );
    },
    header: t('회원가입일'),
    size: 120,
  }),
] as ColumnDef<any, unknown>[];
