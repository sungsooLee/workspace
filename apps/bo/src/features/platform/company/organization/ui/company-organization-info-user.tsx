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

import { EnOrganizationShowType } from './company-organization-tree';

import { transformDepartmentApiDataToTreeData } from '@features/platform/company/organization/service/company-organization.service';

import { queryOptions as departmentQuery } from '@entities/department/service/department.queries';
import { queryOptions as hmgDepartmentQuery } from '@entities/department/service/hmg-department.queries';

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
  showType: string;
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
          <GridBox config={gConfig} columns={columns} showNumberingColumn />
        </div>
      </div>
    </>
  );
};

export const CompanyOrganizationUserList = CompanyOrganizationInfoUserComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'hrInfoManageType',
        type: 'text',
        label: t('유저등록유형'),
        value: '',
      },
      {
        name: 'deptName',
        type: 'text',
        label: t('소속'),
        value: '',
      },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
      },
    ],
  ],
};

const gridConfigOrg = {
  query: hmgDepartmentQuery.user,
  columns: [],
  data: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};

const gridConfigPlat = {
  query: departmentQuery.user,
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
  columnHelper.accessor('hrInfoManageType', {
    cell: (info) => info.getValue(),
    header: t('유저등록유형'),
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
  columnHelper.accessor('c1', {
    cell: (info) => info.getValue(),
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
  columnHelper.accessor('c2', {
    cell: (info) => info.getValue(),
    header: t('재직여부'),
    size: 60,
  }),
  columnHelper.accessor('userState', {
    header: '계정상태',
    size: 60,
  }),
] as ColumnDef<any, unknown>[];
