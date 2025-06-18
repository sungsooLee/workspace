import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css';

import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { isEqual } from 'lodash';

import { transformDepartmentApiDataToTreeData } from '@features/platform/company/organization/service/company-organization.service';

import { useGetCompanyDepartmentTree } from '@entities/department/service/department.hook';

import { EnOrganizationShowType } from './company-organization-tree';
import { queryOptions as departmentQuery } from '@entities/department/service/department.queries';
import { queryOptions as hmgDepartmentQuery } from '@entities/department/service/hmg-department.queries';

/**
 * 화면번호: NLP_BO_TMS_1111_03 테넌트-회사조직 대상자 (조직)
 * @returns
 */
const CompanyOrganizationInfoListComponent = ({
  companyCode,
  showType,
  deptId,
}: {
  companyCode: string;
  showType: string;
  deptId: number;
}) => {
  const router = useRouter();

  const [gridConfig, setGridConfig] = useState<any>(gridConfigOrg);

  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);
  const getSearchParam = () => {
    const retval = { ...getValues(), companyCode: companyCode, parentDeptId: deptId };

    return retval;
  };
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getSearchParam);

  const handleOnSearch = (data: any) => {
    if (companyCode) {
      gridFetch(getSearchParam());
    }
  };

  useEffect(() => {
    switch (showType) {
      case EnOrganizationShowType.origin:
        setGridConfig(gridConfigOrg);
        break;
      case EnOrganizationShowType.platform:
        setGridConfig(gridConfigPlat);
    }
  }, [showType]);

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

export const CompanyOrganizationInfoList = CompanyOrganizationInfoListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'hrInfoManageType',
        type: 'text',
        label: t('조직등록유형'),
        value: '',
      },
      {
        name: 'deptName',
        type: 'text',
        label: t('조직명'),
        value: '',
      },
      {
        name: 'deptManagerName',
        type: 'text',
        label: t('조직장이름'),
        value: '',
      },
    ],
  ],
};

const gridConfigOrg = {
  query: hmgDepartmentQuery.child,
  columns: [],
  data: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};

const gridConfigPlat = {
  query: departmentQuery.child,
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
  columnHelper.accessor('tenantName', {
    id: 'tenantName',
    cell: (info) => info.getValue(),
    header: t('조직등록유형'),
    size: 152,
  }),
  columnHelper.accessor('tenantSite', {
    id: 'tenantSite',
    cell: (info) => info.getValue(),
    header: t('조직코드'),
    size: 240,
  }),

  columnHelper.accessor('companyTenantList', {
    id: 'companyTenantList',
    cell: (info) => info.getValue(),
    header: t('조직명'),
    size: 200,
  }),
  columnHelper.accessor('tenantRoleList', {
    id: 'tenantRoleList',
    cell: (info) => info.getValue(),
    header: t('조직사번'),
    size: 120,
  }),
  columnHelper.accessor('isUsed', {
    id: 'isUsed',
    cell: (info) => info.getValue(),
    header: t('조직장 이름'),
    size: 104,
  }),
] as ColumnDef<any, unknown>[];
