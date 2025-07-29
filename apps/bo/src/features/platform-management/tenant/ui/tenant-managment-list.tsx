import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';

import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, Divider, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { EnGlobalConst, Tenant } from '@types';

import { tenantQueryOptions } from '@entities/tenant';
import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { useCreation } from 'ahooks';
import { TenantByRoleDropdownFormField } from '@shared/ui';

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
  const isPlatformManager = roleInfo === 'PLATFORM';
  const linkClick = (tenantId: number, tenantName: string) => {
    router.navigate({
      to: `${rootPath}/tenant/management/detail`,
      state: {
        tenantId,
        tenantName,
        listParam: getValues(),
        roleInfo,
      },
    });
  };
  const searchConfig: SearchBoxConfig = useMemo(
    () => ({
      builders: [
        [
          {
            name: 'tenantId',
            type: 'custom',
            label: t('LABEL.form.label.tenant', '테넌트'),
            value: '',
            format: 'number',
            element: <TenantByRoleDropdownFormField />, // presetOptionLabel: t('LABEL.form.label.select', '선택'),
          },
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
          required: !isPlatformManager,
          conditions: [
            {
              fn: (values: any) => {
                if (isPlatformManager) return false;
                console.log(values);
                return !values.tenantId;
              },
              message: t('{{type}}를 선택해주세요.', { type: t('테넌트') }),
            },
          ],
        },
      },
    }),
    [roleInfo],
  );

  const gridInitConfig = useCreation(
    () => ({
      query: tenantQueryOptions.list,
      columns: [
        {
          name: 'tenantName',
          label: t('LABEL.grid.column.tenantName'),
          render: (info: any) => {
            return (
              <Button
                className="link"
                onClick={() => linkClick(info.row.original.tenantId, info.row.original.tenantName)}
              >
                {info.getValue()}
              </Button>
            );
          },
          size: 192,
        },
        {
          name: 'companyTenantList',
          label: t('LABEL.grid.column.company'),
          enableSorting: false,
          render: (info: any) => {
            return (
              info.getValue() &&
              info
                .getValue()
                .map((item: any) => item.companyName)
                .join(',')
            );
          },
          size: 200,
        },
        {
          name: 'tenantUserList',
          label: t('LABEL.grid.column.tenantManager'),
          enableSorting: false,
          render: (info: any) => {
            return (
              info.getValue() &&
              info
                .getValue()
                .map((item: any) => item.userName)
                .join(',')
            );
          },
          size: 120,
        },
        {
          name: 'isUsed',
          label: t('사용여부'),
          render: (info: any) => {
            return info.row.original.isUsed ? t('LABEL.common.enable') : t('미사용');
          },
          size: 104,
        },
        {
          name: 'createdDate',
          label: t('등록일시'),
          render: (info: any) => {
            return getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_SEC);
          },
          meta: {
            cellAlign: 'center',
          },
          size: 192,
        },
        {
          name: 'modifiedDate',
          label: t('수정일시'),
          render: (info: any) => {
            return getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_SEC);
          },
          meta: {
            cellAlign: 'center',
          },
          size: 192,
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 20,
        sort: [],
      },
    }),
    [],
  );

  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
    setOptions,
    setValue,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, getValues);

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
      <Divider />
      {/*<GridBox config={gConfig} columns={columns} showNumberingColumn />*/}
      <GridBox config={gConfig} showNumberingColumn />
    </>
  );
};

export const TenantManagmentList = TenantManagmentListComponent;
