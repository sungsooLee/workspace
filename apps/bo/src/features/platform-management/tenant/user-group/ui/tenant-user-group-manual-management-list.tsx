import React, { FC, useState, useEffect, useCallback } from 'react';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

import { Button, Divider, GridBox, useGridBox, useModal } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { SearchBox } from '@shared/ui/search-box';
import { useCreation } from 'ahooks';
import { queryOptions as userGroupManualOptions } from '@entities/user-group/service/user-group.queries';
import { EnGlobalConst } from '@types';
import { UserGroupChoiceModal, UserGroupOrganizationShuttleModal } from '@shared/ui';
import { useFetchUserGroupDetail } from '@entities/user-group';

const _global = {
  linkClick: (userGroupId: number) => {
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

  const { open: openModal } = useModal();

  _global.linkClick = (userGroupId: number) => {
    router.navigate({
      to: `/platform/tenant/usr-group/manual-detail`,
      state: {
        userGroupId,
        listParam: getValues(),
      },
    });
  };

  const gridInitConfig = useCreation(
    () => ({
      query: userGroupManualOptions.userGroupManualList,
      columns: [
        {
          name: 'no', label: t('NO.'), type: 'numbering'
        },
        {
          name: 'tenantName', label: t('테넌트명'), size: 159
        },
        {
          name: 'userGroupOriginType', label: t('유저그룹유형'), render: (row: any) => {
            return t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.UserGroupOriginType.${row.getValue()}`);
          },
          size: 163
        },
        {
          name: 'opt2', label: t('채널'), size: 106, render: (row: any) => {
            if( row.row.original.userGroupOriginType === 'CHANNEL' ) {
              return row.row.original.originName;
            }
            return row.getValue();
          }
        },
        {
          name: 'opt3', label: t('개인'), size: 101, render: (row: any) => {
            if( row.row.original.userGroupOriginType === 'PERSONAL' ) {
              return row.row.original.originName;
            }
            return row.getValue();
          }
        },
        {
          name: 'userGroupName', label: t('유저그룹명'), render: (row: any) => {
            return (
              <Button
                className="link"
                onClick={() =>
                  _global.linkClick(row.row.original.userGroupId)
                }
              >
                {row.getValue()}
              </Button>
            )
          },
          size: 207
        },
        {
          name: 'userCount', label: t('대상자'), render: (row: any) => {
            return `${row.getValue().toLocaleString('ko-KR')}명`;
          },
          meta: {
            cellAlign: 'right',
          },
          size: 127
        },
        {
          name: 'userGroupId', label: t('대상자 확인'), render: (row: any) => {
            return <Button
              variant="gray2" size="xs"
              onClick={(e) => {
                e.stopPropagation();
                openModal({
                  width: 'xl',
                  content: <UserGroupChoiceModal />,
                });
              }}
            >
              {t('대상자')}
            </Button>
          },
          meta: {
            cellAlign: 'center',
          },
          size: 96
        },
        {
          name: 'isUsed', label: t('사용여부'), render: (row: any) => {
            return row.row.original.isUsed ? t('사용') : t('미사용');
          },
          meta: {
            cellAlign: 'center',
          },
          size: 88
        },
        {
          name: 'createdDate', label: t('등록일'), render: (row: any) => {
            return getDateToString(
              new Date(row.row.original.createdDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            );
          },
          meta: {
            cellAlign: 'center',
          },
          size: 194
        },
        {
          name: 'modifiedDate', label: t('수정일'), render: (row: any) => {
            return getDateToString(
              new Date(row.row.original.modifiedDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            );
          },
          meta: {
            cellAlign: 'center',
          },
          size: 194
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
    getValues,
    setOptions,
    setValue,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig());
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig);

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
      <Divider />
      {/*<GridBox config={gConfig} columns={columns} />*/}
      <GridBox config={gConfig} />
    </>
  );
};

export const TenantUserGroupManualManagementList = TenantUserGroupManualManagementListComponent;

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
        name: 'userGroupOriginType',
        type: 'dropdown',
        label: t('유저그룹유형'),
        value: '',
        presetOptionLabel: t('전체'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.user.UserGroupOriginType'],
        },
      },
      {
        name: 'originName',
        type: 'text',
        label: t('채널'),
        value: '',
      },
      {
        name: 'originName',
        type: 'text',
        label: t('개인'),
        value: '',
      },
    ],
    [
      {
        name: 'userGroupName',
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
      {
        name: '', type: 'hidden', value: ''
      },
    ],
  ],
  validator: {
    tenantId: true,
  },
});

// const gridConfig = {
//   query: '',
//   columns: [],
//   data: [],
//
//   pagination: {
//     pageSize: 20,
//     pageIndex: 0,
//     totalRows: 0,
//   },
// };
//
// const columnHelper = createColumnHelper<any>();
// const columns = [
//   columnHelper.accessor('no', {
//     cell: (info) => info.row.index + 1,
//     header: t('NO.'),
//     size: 64,
//   }),
//   columnHelper.accessor('tenantName', {
//     cell: (info) => info.getValue(),
//     header: t('테넌트명'),
//     size: 159,
//   }),
//   columnHelper.accessor('opt1', {
//     cell: (info) => info.getValue(),
//     header: t('유저그룹유형'),
//     size: 163,
//   }),
//   columnHelper.accessor('opt2', {
//     cell: (info) => info.getValue(),
//     header: t('채널'),
//     size: 106,
//   }),
//   columnHelper.accessor('opt3', {
//     cell: (info) => info.getValue(),
//     header: t('개인별'),
//     size: 101,
//   }),
//   columnHelper.accessor('opt4', {
//     cell: (info) => (
//       <Link to={info.row.original.tenantSite} className="link">
//         {info.row.original.tenantId}
//       </Link>
//     ),
//     header: t('유저그룹명'),
//     size: 207,
//   }),
//   columnHelper.accessor('opt5', {
//     cell: (info) => info.getValue(),
//     header: t('대상자'),
//     size: 127,
//   }),
//   columnHelper.accessor('opt6', {
//     cell: (info) => info.getValue(),
//     header: t('확인'),
//     size: 96,
//   }),
//   columnHelper.accessor('isUsed', {
//     cell: (info) => {
//       return info.row.original.isUsed ? t('사용') : t('미사용');
//     },
//     header: t('사용여부'),
//     size: 88,
//   }),
//   columnHelper.accessor('createdDate', {
//     cell: (info) => {
//       return getDateToString(
//         new Date(info.row.original.createdDate),
//         DATE_TIME_FORMAT.DATETIME_SEC,
//       );
//     },
//     header: t('등록일'),
//     size: 194,
//   }),
//   columnHelper.accessor('modifyedDate', {
//     cell: (info) => {
//       return getDateToString(
//         new Date(info.row.original.modifiedDate),
//         DATE_TIME_FORMAT.DATETIME_SEC,
//       );
//     },
//     header: t('등록일'),
//     size: 194,
//   }),
// ] as ColumnDef<any, unknown>[];
