import { FC, useState, useEffect, useCallback } from 'react';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { Button, GridBox, useGridBox } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { SearchBox } from '@shared/ui/search-box';

import { tenantQueryOptions } from '@entities/tenant/service/tenant.queries';

/**
 * 화면번호 : NLP_BO_TMS_1000
 * @param param0
 * @returns
 */
const TenantManagmentListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();
  const routerState = useRouterState();
  const handleTenantNameClick = (tenantId: number, tenantName: string) => {
    router.navigate({
      to: `${rootPath}/tenant/management/detail`,
      state: {
        tenantId: tenantId,
        tenantName: tenantName,
        listParam: getValues(),
      },
    });
  };

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
            onClick={() =>
              handleTenantNameClick(info.row.original.tenantId, info.row.original.tenantName)
            }
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

        return companyNames.length > 1
          ? t('{{name}}외 {{count}}', {
              name: companyNames[0],
              count: companyNames.length - 1,
            })
          : companyNames.toString();
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
        return tenantRoleList.length > 1
          ? t('{{name}}외 {{count}}', { name: tenantRoleList[0], count: tenantRoleList.length - 1 })
          : tenantRoleList.toString();
      },
      header: t('테넌트 담당자'),
      size: 120,
    }),
    columnHelper.accessor('isUsed', {
      id: 'isUsed',
      cell: (info) => {
        return info.row.original.isUsed ? t('사용') : t('미사용');
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

  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

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
        label: t('LABEL.common.useYn.isUsed'),
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
