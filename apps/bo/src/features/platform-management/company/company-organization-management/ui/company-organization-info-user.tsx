import React, { useEffect, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import { cn } from '@learnway/shared';
import { Divider, GridBox, useGridBox } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { EnOrganizationShowType } from './company-organization-tree';
import { queryOptions as departmentQuery } from '@entities/department/service/department.queries';
import { hmgQueryOptions as hmgDepartmentQuery } from '@entities/department/service/hmg-department.queries';
import { EnGlobalConst } from '@types';

/**
 * 화면번호: NLP_BO_TMS_1111_03 테넌트-회사조직 대상자 (조직)
 * @returns
 */
const CompanyOrganizationInfoUserComponent = ({
  companyCode,
  deptId,
  showType,
}: {
  companyCode: string;
  deptId: number;
  showType: EnOrganizationShowType;
}) => {
  const { provider: searchProvider, getValues, onFormChange } = useSearchBox(searchConfig());

  const getSearchParam = () => {
    const retval = { ...getValues(), companyCode, parentDeptId: deptId };
    return retval;
  };
  const { config: configOrigin, gridFetch: gridFetchOrigin } = useGridBox(
    gridConfigOrg,
    getSearchParam,
  );
  const { config: configPlatform, gridFetch: gridFetchPlatform } = useGridBox(
    gridConfigPlat,
    getSearchParam,
  );

  const handleOnSearch = (data: any) => {
    if (companyCode) {
      gridFetch();
    }
  };

  useEffect(() => {
    // 부서 변경하면 SearchBox reset
    onFormChange({
      hrInfoManageType: '',
      deptName: '',
      employeeNumber: '',
    });
    gridFetch();
  }, [deptId]);

  const gridFetch = () => {
    switch (showType) {
      case EnOrganizationShowType.origin:
        gridFetchOrigin(getSearchParam());
        break;
      case EnOrganizationShowType.platform:
        gridFetchPlatform(getSearchParam());
        break;
    }
  };

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      {showType === EnOrganizationShowType.origin && (
        <GridBox
          config={configOrigin}
          columns={columns}
          showNumberingColumn
          title={t('유저 목록')}
        />
      )}
      {showType === EnOrganizationShowType.platform && (
        <GridBox
          config={configPlatform}
          columns={columns}
          showNumberingColumn
          title={t('유저 목록')}
        />
      )}
    </>
  );
};

export const CompanyOrganizationUserList = CompanyOrganizationInfoUserComponent;

const searchConfig = () => ({
  builders: [
    [
      {
        name: 'hrInfoManageType',
        type: 'dropdown',
        label: t('유저 등록 유형'),
        value: '',
        presetOptionLabel: t('전체'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.company.HrInfoManageType'],
        },
      },
      {
        name: 'deptName',
        type: 'text',
        label: t('소속'),
        value: '',
        placeholder: t('입력'),
      },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: t('입력'),
      },
    ],
  ],
});

const gridConfigOrg = {
  query: hmgDepartmentQuery.user,
  columns: [],
  data: [],

  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const gridConfigPlat = {
  query: departmentQuery.user,
  columns: [],
  data: [],

  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('hrInfoManageType', {
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.HrInfoManageType.${info.getValue()}`),
    header: t('유저 등록 유형'),
    size: 100,
  }),
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 100,
  }),

  columnHelper.accessor('deptName', {
    cell: (info) => info.getValue(),
    header: t('소속'),
    size: 100,
  }),
  columnHelper.accessor('isLeader', {
    cell: (info) => (info.row.original.isLeader ? t('조직장') : t('조직원')),
    header: t('학습자 역할'),
    size: 120,
  }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    size: 104,
  }),
  columnHelper.accessor('name', {
    header: t('이름'),
    size: 104,
  }),
  columnHelper.accessor('userStatus', {
    cell: (info) => t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.Status.${info.getValue()}`),
    header: t('재직여부'),
    size: 60,
  }),
  columnHelper.accessor('accountStatus', {
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.AccountStatus.${info.getValue()}`),
    header: t('계정상태'),
    size: 60,
  }),
] as ColumnDef<any, unknown>[];
