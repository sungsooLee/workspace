import { createFileRoute, Link } from '@tanstack/react-router';
import { FC, useState, useCallback } from 'react';
import { t } from 'i18next';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { SearchBox } from '@shared/ui/search-box';
import { useRouter } from '@tanstack/react-router';

import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';

import { Button, GridBox, useGridBox } from '@learnway/ui';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { tenantQueryOptions } from '@entities/tenant/service/tenant.queries';

/**
 * 화면번호 : NLP_BO_TMS_1000
 * @param param0
 * @returns
 */
const TenantManagmentListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();

  const gridConfig = {
    query: tenantQueryOptions.list,
    columns: [
      {
        name: 'no1',
        label: 'NO.',
        type: 'numbering',
      },
    ],
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
      cell: (info) => {
        return (
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
        );
      },
      header: t('테넌트명'),
      size: 152,
    }),
    columnHelper.accessor('tenantSite', {
      id: 'tenantSite',
      cell: (info) => (
        <Link to={info.row.original.tenantSite} className="link">
          {info.row.original.tenantId}
        </Link>
      ),
      header: t('테넌트 사이트'),
      size: 240,
    }),

    columnHelper.accessor('companyTenantList', {
      id: 'companyTenantList',
      cell: (info) => {
        const companyNames = info.row.original.companyTenantList.map((item: any) => {
          return item.companyName;
        });
        return companyNames.toString();
      },
      header: t('회사'),
      size: 200,
    }),
    columnHelper.accessor('tenantRoleList', {
      id: 'tenantRoleList',
      cell: (info) => {
        const tenantRoleList = info.row.original.tenantRoleList.map((item: any) => {
          return item.roleName;
        });
        return tenantRoleList.toString();
      },
      header: t('테넌트 담당자'),
      size: 120,
    }),
    columnHelper.accessor('companyManager', {
      id: 'companyManager',
      cell: (info) => {
        const companyManagerList = info.row.original.companyTenantList.map((item: any) => {
          return item.managerName;
        });
        return companyManagerList.toString();
      },
      header: t('회사 담당자'),
      size: 120,
    }),
    columnHelper.accessor('isUsed', {
      id: 'isUsed',
      cell: (info) => {
        return info.row.original.isUsed ? t('LABEL.common.enable') : t('LABEL.common.disable');
      },
      header: t('사용여부'),
      size: 104,
    }),
    columnHelper.accessor('createdBy', {
      id: 'createdBy',
      header: t('등록자'),
      size: 104,
    }),
    columnHelper.accessor('createdDate', {
      id: 'createdDate',
      cell: (info) => {
        return getDateToString(
          new Date(info.row.original.createdDate),
          DATE_TIME_FORMAT.DATETIME_SEC,
        );
      },
      header: t('등록일'),
      size: 152,
    }),
    columnHelper.accessor('lastModifiedBy', {
      header: '수정자',
      size: 104,
    }),
    columnHelper.accessor('createdDate', {
      id: 'createdDate',
      cell: (info) => {
        return getDateToString(
          new Date(info.row.original.modifiedDate),
          DATE_TIME_FORMAT.DATETIME_SEC,
        );
      },
      header: t('등록일'),
      size: 152,
    }),
  ] as ColumnDef<any, unknown>[];

  const { provider: searchProvider } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  // useDynamicForm(formConfig);

  const handleOnSearch = (data: any) => {
    console.log('search', data);
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
      // {
      //   name: 'companyName',
      //   type: 'dropdown',
      //   label: t('회사명'),
      //   value: '',
      //   optionsConfig: {
      //     codeGroup: CODE_GROUP['manual.company.companyCode'],
      //   },
      //   dropdownConfig: {
      //     onchange: () => {
      //       return '';
      //     },
      //     isSearchable: true,
      //     placeholder: '입력 선택',
      //   },
      // },
      {
        name: 'companyName',
        type: 'text',
        label: t('회사명'),
        value: '',
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('테넌트담당자'),
        value: '',
      },
    ],
    [
      {
        name: 'companyManagerName',
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
