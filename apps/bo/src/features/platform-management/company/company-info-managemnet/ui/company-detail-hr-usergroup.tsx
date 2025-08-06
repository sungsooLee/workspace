import { queryOptions } from '@entities/user-group/service/user-group-company.queries';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { EnGlobalConst, EnUserGroupType } from '@shared/types/enums';
import { SearchBox } from '@shared/ui/search-box';
import { useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { FC, useCallback, useEffect, useState } from 'react';
import {
  LinkColumnsForDesignation,
  LinkColumnsForGroup,
  LinkColumnsForPosition,
  LinkColumnsForRole,
} from './company-detail-ht-link';

interface CompanyDetailHRUsergroupProps {
  userGroupId?: number;
  userGroupType: EnUserGroupType;
  enableInquiryAll?: boolean;
}

const CompanyDetailHRUsergroupComponent: FC<any> = ({
  userGroupId,
  userGroupType,
  enableInquiryAll = true,
}: CompanyDetailHRUsergroupProps) => {
  const routerState = useRouterState();
  const companyId = routerState.location.state?.companyId;

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const [columns, setColumns] = useState<any[]>([]);

  const getSearchParam = () => {
    const retval = {
      ...getValues(),
      userGroupType,
      companyId,
      userGroupIds: userGroupId ? [userGroupId] : [],
    };

    return retval;
  };

  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getSearchParam);

  useEffect(() => {
    console.log('### enableInquiryAll', enableInquiryAll);
    console.log('### userGroupId', userGroupId);
    if (enableInquiryAll || userGroupId) {
      gridFetch({
        userGroupType,
        companyId,
        userGroupIds: userGroupId ? [userGroupId] : [],
      });
    }
  }, [enableInquiryAll, companyId, userGroupType, userGroupId, gridFetch]);

  const handleOnSearch = useCallback(
    (data: any) => {
      if (enableInquiryAll || userGroupId) {
        gridFetch({
          ...data,
          userGroupType,
          companyId,
          userGroupIds: userGroupId ? [userGroupId] : [],
        });
      }
    },
    [enableInquiryAll, companyId, userGroupType, userGroupId, gridFetch],
  );

  const columnHelper = createColumnHelper<any>();

  const columnsPrev = [
    columnHelper.accessor('companyName', {
      cell: (info) => info.getValue(),
      header: t('회사'),
      size: 160,
      enableGrouping: false,
    }),
    columnHelper.accessor('deptName', {
      cell: (info) => info.getValue(),
      header: t('소속'),
      size: 160,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  const columnsNext = [
    columnHelper.accessor('employeeNumber', {
      cell: (info) => info.getValue(),
      header: t('사번'),
      size: 160,
      enableGrouping: false,
    }),
    columnHelper.accessor('userName', {
      cell: (info) => info.getValue(),
      header: t('이름'),
      size: 160,
      enableGrouping: false,
    }),
    columnHelper.accessor('userStatus', {
      cell: (info) =>
        t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.AccountStatus.${info.row.original.userStatus}`,
        ),
      header: t('재직여부'),
      size: 80,
      enableGrouping: false,
    }),
    columnHelper.accessor('accountStatus', {
      cell: (info) =>
        t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.AccountStatus.${info.row.original.accountStatus}`,
        ),
      header: t('계정상태'),
      size: 80,
    }),
  ] as ColumnDef<any, unknown>[];

  useEffect(() => {
    switch (userGroupType) {
      case EnUserGroupType.ORGANIZATION:
        setColumns([...columnsPrev, ...columnsNext]);
        break;
      case EnUserGroupType.JOB_GROUP:
        setColumns([
          ...columnsPrev,
          ...LinkColumnsForGroup.map((col) => ({ ...col, searchable: false })),
          ...columnsNext,
        ]);
        break;
      case EnUserGroupType.JOB:
        setColumns([
          ...columnsPrev,
          ...LinkColumnsForRole.map((col) => ({ ...col, searchable: false })),
          ...columnsNext,
        ]);
        break;
      case EnUserGroupType.JOB_TITLE:
        setColumns([
          ...columnsPrev,
          ...LinkColumnsForDesignation.map((col) => ({ ...col, searchable: false })),
          ...columnsNext,
        ]);
        break;
      case EnUserGroupType.JOB_POSITION:
        setColumns([
          ...columnsPrev,
          ...LinkColumnsForPosition.map((col) => ({ ...col, searchable: false })),
          ...columnsNext,
        ]);
        break;
    }
  }, [userGroupType]);

  return (
    <>
      <FormSubTitle label={t('유저그룹 대상자')} lineType={'light'} />
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns}
        title={t('유저그룹 대상자 목록')}
        disabledSelectionToggle
        emptyMessage={t('좌측 유저 그룹을 선택하면  유저 그룹 대상자를 확인할 수 있습니다.')}
        height={70}
        showNumberingColumn
      />
    </>
  );
};

export const CompanyDetailHRUsergroup = CompanyDetailHRUsergroupComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
      },
      {
        name: 'userName',
        type: 'text',
        label: t('이름'),
        value: '',
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: queryOptions.userGroupUsers,
  columns: [],
  data: [],

  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};
