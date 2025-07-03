import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { FormSubTitle } from '@shared/ui';
import { useSearchBox, SearchBoxConfig, CODE_GROUP, useCodeStore } from '@learnway/hooks';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { queryOptions } from '@entities/user-group/service/user-group-company.queries';
import { EnUserGroupType } from '@types';

interface CompanyDetailHRUsergroupProps {
  userGroupId?: number;
  userGroupType: EnUserGroupType;
}

const CompanyDetailHRUsergroupComponent: FC<any> = ({
  userGroupId,
  userGroupType,
}: CompanyDetailHRUsergroupProps) => {
  const routerState = useRouterState();
  const companyId = routerState.location.state?.companyId;

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

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  useEffect(() => {
    // if (userGroupId) {
    //   console.log('## userGroupType', userGroupType);
    //   gridFetch({
    //     userGroupType: userGroupType,
    //     companyId: companyId,
    //     userGroupIds: [userGroupId],
    //   });
    // }
    gridFetch({
      userGroupType: userGroupType,
      companyId: companyId,
      userGroupIds: userGroupId ? [userGroupId] : [],
    });
  }, [userGroupId]);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch({
      ...data,
      userGroupType: userGroupType,
      companyId: companyId,
      userGroupIds: [userGroupId],
    });
  }, []);

  return (
    <>
      <FormSubTitle label={t('유저그룹 대상자')} lineType={'light'} />
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox config={gConfig} columns={columns} title={t('유저그룹 대상자 목록')} />
        </div>
      </div>
    </>
  );
};

export const CompanyDetailHRUsergroup = CompanyDetailHRUsergroupComponent;

const gridConfig: useGridBoxConfig = {
  query: queryOptions.userGroupUsers,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],

  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: '회사',
    size: 160,
    enableGrouping: false,
  }),
  columnHelper.accessor('deptName', {
    cell: (info) => info.getValue(),
    header: '소속',
    size: 160,
    enableGrouping: false,
  }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: '사번',
    size: 160,
    enableGrouping: false,
  }),
  columnHelper.accessor('userName', {
    cell: (info) => info.getValue(),
    header: '이름',
    size: 160,
    enableGrouping: false,
  }),
  columnHelper.accessor('status', {
    cell: (info) => info.getValue(),
    header: '재직여부',
    size: 80,
    enableGrouping: false,
  }),
  columnHelper.accessor('accountStatus', {
    cell: (info) => info.getValue(),
    header: '계정상태',
    size: 80,
  }),
] as ColumnDef<any, unknown>[];
