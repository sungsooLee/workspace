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

import { Tenant } from '@types';

import { tenantQueryOptions } from '@entities/tenant';
import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';

const _global = {
  tenantIdValidator: false,
  linkClick: (tenantId: number, tenantName: string) => {
    return;
  },
};

/**
 * 화면번호 : NLP_BO_TMS_1000
 * @param param0
 * @returns
 */
const TenantManagmentListComponent: FC<any> = ({ rootPath, roleInfo }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  _global.tenantIdValidator = !roleInfo;

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
    setValue('companyCode', '');
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(tenantIdWatch),
        );

        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyCode,
        }));
        console.log(companyIdOptions);
        setOptions('companyCode', companyIdOptions);
      })();
    } else {
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
        label: t('LABEL.form.label.tenant'),
        format: 'object',
        value: '',
        options: [],
        isClearable: true,
        isSearchable: true,
        placeholder: t('LABEL.grid.header.inputSelect'),
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
        label: t('LABEL.grid.column.company'),
        presetOptionLabel: t('LABEL.form.label.select'),
        value: '',
        options: [],
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('LABEL.grid.column.tenantManager'),
        value: '',
      },
    ],
    [
      {
        name: 'companyManagerName',
        type: 'text',
        label: t('LABEL.grid.column.companyManager'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('LABEL.form.label.useYn'),
        value: '',
        options: [
          { value: '', label: t('LABEL.all') },
          { value: 'true', label: t('LABEL.common.enable') },
          { value: 'false', label: t('LABEL.common.disable') },
        ],
      },
    ],
  ],
  validator: {
    tenantId: {
      required: false,
      conditions: [
        {
          fn: (values: any) => {
            if (!_global.tenantIdValidator) return false;
            console.log(values);
            return !values.tenantId;
          },
          message: t('{{type}}를 선택해주세요.', { type: t('테넌트') }),
        },
      ],
    },
  },
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
    header: t('LABEL.grid.column.tenantName'),
    size: 192,
  }),
  columnHelper.accessor('companyTenantList', {
    cell: (info) =>
      info.getValue() &&
      info
        .getValue()
        .map((item) => item.companyName)
        .join(','),
    header: t('LABEL.grid.column.company'),
    size: 200,
  }),
  columnHelper.accessor('tenantUserList', {
    cell: (info) =>
      info.getValue() &&
      info
        .getValue()
        .map((item) => item.userName)
        .join(','),
    header: t('LABEL.grid.column.tenantManager'),
    size: 120,
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => {
      return info.row.original.isUsed ? t('LABEL.common.enable') : t('미사용');
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
