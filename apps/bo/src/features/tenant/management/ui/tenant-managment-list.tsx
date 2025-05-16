import { FC, useState, useCallback } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { SearchBox } from '@shared/ui/search-box';
import { useRouter } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Button, GridBox, useGridBox, Input, DynamicFormField, Dropdown } from '@learnway/ui';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';

import { tenantQueryOptions } from '@entities/tenant/service/tenant.queries';

const TenantManagmentListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();

  const gridConfig = {
    query: tenantQueryOptions.all,
    columns: [
      {
        name: 'no1',
        label: 'NO.',
        type: 'numbering',
      },
      {
        name: 'tenantName',
        label: t('테넌트명'),
        render: (info: any) => (
          <Button
            className="link"
            onClick={() => {
              router.navigate({
                to: `${rootPath}/tenant/management/detail`,
                state: {
                  tenantId: info.row.original.tenantId,
                  tenantName: info.row.original.tenantName,
                },
              });
            }}
          >
            {info.row.original.tenantName}
          </Button>
        ),
      },
      {
        name: 'tenantSite',
        label: t('테넌트 사이트'),
        render: (info: any) => (
          <Link to={info.row.original.tenantSite} className="link">
            {info.row.original.tenantId}
          </Link>
        ),
      },
      {
        name: 'companyTenantList',
        label: t('회사'),
        render: (info: any) => {
          const companyNames = info.row.original.companyTenantList.map((item: any) => {
            return item.companyName;
          });
          return companyNames.toString();
        },
      },
      {
        name: 'tenantRoleList',
        label: t('테넌트 담당자'),
        render: (info: any) => {
          const tenantRoleList = info.row.original.tenantRoleList.map((item: any) => {
            return item.roleName;
          });
          return tenantRoleList.toString();
        },
      },
      {
        name: 'isUsed',
        label: '사용여부',
        render: (info: any) => {
          return info.row.original.isUsed ? t('LABEL.common.enable') : t('LABEL.common.disable');
        },
      },
      { name: 'createdBy', label: '등록자' },
      { name: 'createdDate', label: '등록일시' },
      { name: 'lastModifiedBy', label: '수정자' },
      { name: 'modifiedDate', label: '수정일시' },
    ],
    data: [],

    pagination: {
      pageSize: 10,
      pageIndex: 0,
      totalRows: 100,
    },
  };

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);

  // useDynamicForm(formConfig);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox config={gConfig} />
        </div>
      </div>
    </>
  );
};

export const TenantManagmentList = TenantManagmentListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantName',
        type: 'text',
        label: t('테넌트명'),
        format: 'object',
        value: '',
      },
      {
        name: 'companyName',
        type: 'text',
        label: t('회사명'),
        value: '',
        // options: [
        //   { value: 'companyA', label: t('회사A') },
        //   { value: 'companyB', label: t('회사B') },
        //   { value: 'companyC', label: t('회사C') },
        //   { value: 'companyD', label: t('회사D') },
        //   { value: 'companyE', label: t('회사E') },
        //   { value: 'companyF', label: t('회사F') },
        // ],
        // dropdownConfig: {
        //   // onChange: () => {
        //   //   return '';
        //   // },
        //   isSearchable: true,
        //   placeholder: '입력 선택',
        // },
      },
      {
        name: 'tenantMappingRoleName',
        type: 'text',
        label: t('테넌트담당자'),
        value: '',
      },
    ],
    [
      {
        name: 'tenantMappingCompanyName',
        type: 'text',
        label: t('회사 담당자'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('LABEL.isUsed'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ],
      },
    ],
  ],
};
