import { FC, useState, useEffect, useCallback } from 'react';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { Button, GridBox, useGridBox } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { SearchBox } from '@shared/ui/search-box';

const _global = {
  linkClick: (tenantId: number, tenantName: string) => {
    return;
  },
};

/**
 * 화면번호 : NLP_BO_PMS_2001 (유저그룹수동관리)
 * @param param0
 * @returns
 */
const TenantUserGroupManualManagementListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();

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
    setOptions,
    setValue,
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

  useEffect(() => {
    if (!loginUser) return;

    const tenantIdOptions = loginUser.tenants.map((tenant) => ({
      value: tenant.tenantId,
      label: tenant.tenantName,
    }));

    setOptions('tenantId', tenantIdOptions);
    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');
  }, [loginUser]);

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

export const TenantUserGroupManualManagementList = TenantUserGroupManualManagementListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        format: 'object',
        value: '',
        presetOptionLabel: t('LABEL.form.label.select'),
        options: [],
      },
      {
        name: 'companyName',
        type: 'text',
        label: t('유저그룹유형'),
        value: '',
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('채널'),
        value: '',
      },
    ],
    [
      {
        name: 'companyManagerName',
        type: 'text',
        label: t('개인별'),
        value: '',
      },
      {
        name: 'opt2',
        type: 'text',
        label: t('유저그룹명'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ],
      },
      {
        name: 'dateRange',
        type: 'date-range',
        label: t('수정기간'),
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
  columnHelper.accessor('no', {
    cell: (info) => info.row.index + 1,
    header: t('NO.'),
    size: 64,
  }),
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: t('테넌트명'),
    size: 159,
  }),
  columnHelper.accessor('opt1', {
    cell: (info) => info.getValue(),
    header: t('유저그룹유형'),
    size: 163,
  }),
  columnHelper.accessor('opt2', {
    cell: (info) => info.getValue(),
    header: t('채널'),
    size: 106,
  }),
  columnHelper.accessor('opt3', {
    cell: (info) => info.getValue(),
    header: t('개인별'),
    size: 101,
  }),
  columnHelper.accessor('opt4', {
    cell: (info) => (
      <Link to={info.row.original.tenantSite} className="link">
        {info.row.original.tenantId}
      </Link>
    ),
    header: t('유저그룹명'),
    size: 207,
  }),
  columnHelper.accessor('opt5', {
    cell: (info) => info.getValue(),
    header: t('대상자'),
    size: 127,
  }),
  columnHelper.accessor('opt6', {
    cell: (info) => info.getValue(),
    header: t('확인'),
    size: 96,
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => {
      return info.row.original.isUsed ? t('사용') : t('미사용');
    },
    header: t('사용여부'),
    size: 88,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => {
      return getDateToString(
        new Date(info.row.original.createdDate),
        DATE_TIME_FORMAT.DATETIME_SEC,
      );
    },
    header: t('등록일'),
    size: 194,
  }),
  columnHelper.accessor('modifyedDate', {
    cell: (info) => {
      return getDateToString(
        new Date(info.row.original.modifiedDate),
        DATE_TIME_FORMAT.DATETIME_SEC,
      );
    },
    header: t('등록일'),
    size: 194,
  }),
] as ColumnDef<any, unknown>[];
