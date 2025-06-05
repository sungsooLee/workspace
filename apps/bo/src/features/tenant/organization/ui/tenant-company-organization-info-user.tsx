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

import { transformDepartmentApiDataToTreeData } from '@features/platform/company/service/company-detail-tree';

import { useGetCompanyDepartmentTree } from '@entities/department/service/department.hook';

/**
 * 화면번호: NLP_BO_TMS_1111_03 테넌트-회사조직 대상자 (조직)
 * @returns
 */
const TenantCompanyOrganizationInfoUserComponent = ({
  companyCode,
  deptId,
}: {
  companyCode: string;
  deptId: string;
}) => {
  const router = useRouter();

  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  const handleOnSearch = (data: any) => {
    gridFetch(data);
  };

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

export const TenantCompanyOrganizationUserList = TenantCompanyOrganizationInfoUserComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantName',
        type: 'text',
        label: t('유저등록유형'),
        format: 'object',
        value: '',
      },
      {
        name: 'companyName',
        type: 'text',
        label: t('소속'),
        value: '',
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('사번'),
        value: '',
      },
    ],
  ],
};

const gridConfig = {
  query: '',
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
    cell: (info) => info.row.index + 1,
    header: t('NO.'),
    size: 64,
  }),
  columnHelper.accessor('userType', {
    id: 'userType',
    cell: (info) => info.getValue(),
    header: t('유저등록유형'),
    size: 100,
  }),
  columnHelper.accessor('tenantSite', {
    id: 'tenantSite',
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 100,
  }),

  columnHelper.accessor('companyTenantList', {
    id: 'companyTenantList',
    cell: (info) => info.getValue(),
    header: t('소속'),
    size: 100,
  }),
  columnHelper.accessor('tenantRoleList', {
    id: 'tenantRoleList',
    cell: (info) => info.getValue(),
    header: t('학습자 역할'),
    size: 120,
  }),
  columnHelper.accessor('isUsed', {
    id: 'isUsed',
    cell: (info) => info.getValue(),
    header: t('사번'),
    size: 104,
  }),
  columnHelper.accessor('createdBy', {
    id: 'createdBy',
    header: t('이름'),
    size: 104,
  }),
  columnHelper.accessor('createdDate', {
    id: 'createdDate',
    cell: (info) => info.getValue(),
    header: t('재직여부'),
    size: 60,
  }),
  columnHelper.accessor('lastModifiedBy', {
    header: '계정상태',
    size: 60,
  }),
] as ColumnDef<any, unknown>[];
