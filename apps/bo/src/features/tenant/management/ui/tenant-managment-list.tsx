import { FC, useState, useEffect, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { tenantQueryOptions } from '@entities/tenant';
import { Tenant } from '@types';

const _global = {
  linkClick: (tenantId: number, tenantName: string) => {
    return;
  },
};

/**
 * 화면번호 : NLP_BO_TMS_1000
 * @param param0
 * @returns
 */
const TenantManagmentListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  _global.linkClick = (tenantId: number, tenantName: string) => {
    router.navigate({
      to: `${rootPath}/tenant/management/detail`,
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
    setOptions,
    setValue,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });

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

  useEffect(() => {
    if (!loginUser) return;

    const tenantIdOptions = loginUser.tenants.map((tenant) => ({
      value: tenant.tenantId,
      label: tenant.tenantName,
    }));
    const tenantIds = tenantIdOptions.map((item) => item.value);
    setOptions('tenantId', tenantIdOptions);
    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');
  }, [loginUser]);

  useEffect(() => {
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          tenantQueryOptions.tenantCompanys([tenantIdWatch]),
        );
        console.log(companys);
        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyCode,
        }));
        console.log(companyIdOptions);
        setOptions('companyCode', companyIdOptions);
      })();
    } else {
      setValue('companyCode', '');
      setOptions('companyCode', []);
    }
  }, [tenantIdWatch]);

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

export const TenantManagmentList = TenantManagmentListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        format: 'object',
        value: '',
        options: [],
        isClearable: true,
        isSearchable: true,
        placeholder: t('입력 선택'),
      },
      // {
      //   name: 'companyName',
      //   type: 'dropdown',
      //   label: t('회사명'),
      //   value: '',
      //   optionsConfig: {
      //     codeGroup: CODE_GROUP['manual.company.companyCode'],
      //   },

      {
        name: 'companyCode',
        type: 'dropdown',
        label: t('회사'),
        presetOptionLabel: t('LABEL.form.label.select'),
        value: '',
        options: [],
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('테넌트담당자'),
        value: '',
      },
    ],
    [
      {
        name: 'companyManagerName',
        type: 'text',
        label: t('회사 담당자'),
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
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: tenantQueryOptions.list,
  columns: [],
  data: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<Tenant>();
const columns = [
  columnHelper.accessor('tenantName', {
    cell: (info) => {
      return (
        <Button
          className="link"
          onClick={() =>
            _global.linkClick(info.row.original.tenantId, info.row.original.tenantName)
          }
        >
          {info.getValue()}
        </Button>
      );
    },
    header: t('테넌트명'),
    size: 192,
  }),
  columnHelper.accessor('companyTenantList', {
    cell: (info) =>
      info.getValue() &&
      info
        .getValue()
        .map((item) => item.companyName)
        .join(','),
    header: t('회사'),
    size: 200,
  }),
  columnHelper.accessor('tenantUserList', {
    cell: (info) =>
      info.getValue() &&
      info
        .getValue()
        .map((item) => item.userName)
        .join(','),
    header: t('테넌트담당자'),
    size: 120,
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => {
      return info.row.original.isUsed ? t('사용') : t('미사용');
    },
    header: t('사용여부'),
    size: 104,
  }),
  columnHelper.accessor('createdBy', {
    header: t('등록자'),
    size: 104,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => {
      return getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_SEC);
    },
    header: t('등록일시'),
    size: 192,
  }),
  columnHelper.accessor('lastModifiedBy', {
    header: '수정자',
    size: 104,
  }),
  columnHelper.accessor('modifiedDate', {
    cell: (info) => {
      return getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_SEC);
    },
    header: t('수정일시'),
    size: 192,
  }),
] as ColumnDef<any, unknown>[];
