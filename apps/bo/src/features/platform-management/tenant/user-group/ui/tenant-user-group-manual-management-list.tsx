import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { FC, useEffect } from 'react';

import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { queryOptions as userGroupManualOptions } from '@entities/user-group/service/user-group.queries';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { EnGlobalConst } from '@shared/types/enums';
import { CombineUserGroup } from '@shared/types/user-group';
import { UserGroupChoiceModal } from '@shared/ui/modal';
import { SearchBox } from '@shared/ui/search-box';
import { useCreation } from 'ahooks';

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

  const { openModal } = useModal();

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
          name: 'no',
          label: t('NO.'),
          type: 'numbering',
          enableSorting: false,
        },
        {
          name: 'tenantName',
          label: t('테넌트명'),
          size: 159,
        },
        {
          name: 'userGroupOriginType',
          label: t('유저그룹유형'),
          render: (info: any) => {
            return t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.UserGroupOriginType.${info.getValue()}`,
            );
          },
          size: 163,
        },
        {
          name: 'opt2',
          label: t('채널'),
          size: 106,
          render: (info: any) => {
            if (info.row.original.userGroupOriginType === 'CHANNEL') {
              return info.row.original.originName;
            }
            return info.getValue();
          },
          enableSorting: false,
        },
        {
          name: 'opt3',
          label: t('개인'),
          size: 101,
          render: (info: any) => {
            if (info.row.original.userGroupOriginType === 'PERSONAL') {
              return info.row.original.originName;
            }
            return info.getValue();
          },
          enableSorting: false,
        },
        {
          name: 'userGroupName',
          label: t('유저그룹명'),
          render: (info: any) => {
            return (
              <Button
                className="link"
                onClick={() => _global.linkClick(info.row.original.userGroupId)}
              >
                {info.getValue()}
              </Button>
            );
          },
          size: 207,
        },
        {
          name: 'userCount',
          label: t('대상자'),
          render: (info: any) => {
            return `${info.getValue().toLocaleString('ko-KR')}명`;
          },
          meta: {
            cellAlign: 'right',
          },
          size: 127,
        },
        {
          name: 'userGroupId',
          label: t('대상자 확인'),
          render: (info: any) => {
            const data = info.row.original;
            const combiners: CombineUserGroup[] = [
              {
                // groupId: 0,
                pathKey: '',
                pathValue: '',
                combiners: [
                  {
                    combineType: 'USER_GROUP',
                    combineValue: data.userGroupId,
                    combineName: '',
                  },
                ],
              },
            ];

            return (
              <Button
                variant="gray2"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({
                    width: 'xl',
                    content: <UserGroupChoiceModal groups={combiners} />,
                  });
                }}
              >
                {t('대상자')}
              </Button>
            );
          },
          meta: {
            cellAlign: 'center',
          },
          size: 96,
          enableSorting: false,
        },
        {
          name: 'isUsed',
          label: t('사용여부'),
          render: (info: any) => {
            return info.row.original.isUsed ? t('사용') : t('미사용');
          },
          meta: {
            cellAlign: 'center',
          },
          size: 88,
        },
        {
          name: 'createdDate',
          label: t('등록일'),
          render: (info: any) => {
            return getDateToString(
              new Date(info.row.original.createdDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            );
          },
          meta: {
            cellAlign: 'center',
          },
          size: 194,
        },
        {
          name: 'modifiedDate',
          label: t('수정일'),
          render: (info: any) => {
            return getDateToString(
              new Date(info.row.original.modifiedDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            );
          },
          meta: {
            cellAlign: 'center',
          },
          size: 194,
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
        name: '',
        type: 'hidden',
        value: '',
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
