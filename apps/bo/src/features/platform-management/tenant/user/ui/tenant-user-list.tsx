import { FC, useState, useEffect, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';

import { Button, Divider, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { useSearchBox, SearchBoxConfig, CODE_GROUP, SelectOption } from '@learnway/hooks';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { SearchBox } from '@shared/ui/search-box';

import { EnGlobalConst } from '@types';
import { tenantQueryOptions } from '@entities/tenant';
import { usersQueryOptions } from '@entities/users/service/users.queries';
import { queryOptions, queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { useCreation } from 'ahooks';

const _global = {
  linkClick: (userUuid: string) => {
    return;
  },
};

/**
 * 화면번호 : NLP_BO_TMS_1111_07 테넌트-유저관리
 * @param param0
 * @returns
 */
const TenantUserListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  _global.linkClick = (userUuid: string) => {
    router.navigate({
      to: `${rootPath}/tenant/user/detail`,
      state: {
        userUuid,
        listParam: getValues(),
      },
    });
  };

  const gridInitConfig = useCreation(
    () => ({
      query: usersQueryOptions.list,
      columns: [
        {
          name: 'tenantName', label: t('테넌트'), size: 120
        },
        {
          name: 'company', label: t('그룹'), render: (row: any) => {
            return t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${row.row.original.company.companyType}`,
            );
          },
          size: 120
        },
        {
          name: 'company', label: t('회사'), render: (row: any) => {
            return row.row.original.company.name
          },
          size: 120
        },
        {
          name: 'opt3', label: t('소속'), render: (row: any) => {
            return row.row.original.dept?.deptName
          },
          size: 120
        },
        {
          name: 'opt4', label: t('직위'), render: (row: any) => {
            return (
              <Link to={row.row.original.tenantSite} className="link">
                {row.row.original.tenantId}
              </Link>
            )
          },
          size: 120
        },
        {
          name: 'employeeNumber', label: t('사번'), size: 120
        },
        {
          name: 'name', label: t('이름'), render: (row: any) => {
            return (
              <Button
                label={`${row.getValue()}`}
                className="link"
                onClick={() => _global.linkClick(row.row.original.uuid)}
              />
            )
          },
          size: 120
        },
        {
          name: 'opt7', label: t('학습자 역할'), size: 120
        },
        {
          name: 'opt8', label: t('재직여부'), size: 88
        },
        {
          name: 'userState', label: t('계정상태'), render: (row: any) => {
            return t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.UserState.${row.getValue()}`)
          },
          size: 88,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'opt10', label: t('잠김해제'), size: 88
        },
        {
          name: 'opt11', label: t('로그인'), render: (row: any) => {
            return (<Button variant="gray" label={t('로그인')} />)
          },
          size: 88
        },
        {
          name: 'createdDate', label: t('회원가입일'), render: (row: any) => {
            return getDateToString(new Date(row.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC)
          },
          size: 120
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 20,
        sort: [],
      }
    }),
    []
  );

  const {
    provider: searchProvider,
    setValue,
    setOptions,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig());
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, getValues);

  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });

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

  useEffect(() => {
    setValue('companyId', '');
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(tenantIdWatch),
        );
        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyId,
        }));
        setOptions('companyId', companyIdOptions);
      })();
    } else {
      setOptions('companyId', []);
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

export const TenantUserList = TenantUserListComponent;

const searchConfig = (): SearchBoxConfig => ({
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
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        format: 'object',
        value: '',
        presetOptionLabel: t('LABEL.form.label.select'),
        options: [],
      },
      {
        name: 'employeeNumber',
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
});

// const gridConfig = (): useGridBoxConfig => ({
//   query: usersQueryOptions.list,
//   columns: [],
//   data: [],
//   pagination: {
//     pageSize: 20,
//     pageIndex: 0,
//     totalRows: 0,
//   },
// });
//
// const columnHelper = createColumnHelper<any>();
// const columns = [
//   columnHelper.accessor('tenantName', {
//     cell: (info) => info.getValue(),
//     header: t('테넌트'),
//     size: 120,
//   }),
//   columnHelper.accessor('company', {
//     cell: (info) =>
//       t(
//         `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.row.original.company.companyType}`,
//       ),
//     header: t('그룹'),
//     size: 120,
//   }),
//   columnHelper.accessor('company', {
//     cell: (info) => info.row.original.company.name,
//     header: t('회사'),
//     size: 120,
//   }),
//   columnHelper.accessor('opt3', {
//     cell: (info) => info.row.original.dept?.deptName,
//     header: t('소속'),
//     size: 120,
//   }),
//   columnHelper.accessor('opt4', {
//     cell: (info) => (
//       <Link to={info.row.original.tenantSite} className="link">
//         {info.row.original.tenantId}
//       </Link>
//     ),
//     header: t('지위'),
//     size: 120,
//   }),
//   columnHelper.accessor('employeeNumber', {
//     cell: (info) => info.getValue(),
//     header: t('사번'),
//     size: 120,
//   }),
//   columnHelper.accessor('name', {
//     cell: (info) => {
//       return (
//         <Button
//           label={`${info.getValue()}`}
//           className="link"
//           onClick={() => _global.linkClick(info.row.original.uuid)}
//         />
//       );
//     },
//     header: t('이름'),
//     size: 120,
//   }),
//   columnHelper.accessor('opt7', {
//     cell: (info) => info.getValue(),
//     header: t('학습자 역할'),
//     size: 120,
//   }),
//   columnHelper.accessor('opt8', {
//     cell: (info) => info.getValue(),
//     header: t('재직여부'),
//     size: 88,
//   }),
//   columnHelper.accessor('userState', {
//     cell: (info) => t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.UserState.${info.getValue()}`),
//     header: t('계정상태'),
//     size: 88,
//     meta: {
//       cellAlign: 'center',
//     },
//   }),
//   columnHelper.accessor('opt10', {
//     cell: (info) => info.getValue(),
//     header: t('잠김해제'),
//     size: 88,
//   }),
//   columnHelper.accessor('opt11', {
//     cell: (info) => <Button variant="gray" label={t('로그인')} />,
//     header: t('로그인'),
//     size: 88,
//   }),
//   columnHelper.accessor('createdDate', {
//     cell: (info) => {
//       return getDateToString(new Date(info.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC);
//     },
//     header: t('회원가입일'),
//     size: 120,
//   }),
// ] as ColumnDef<any, unknown>[];
