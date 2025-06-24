import React, { useEffect, useState } from 'react';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import { Checkbox, GridBox, useGridBox, useModal } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { GridExcelUploadButton } from '@features/shared';
import { EnOrganizationShowType } from './company-organization-tree';
import { queryOptions as departmentQuery } from '@entities/department/service/department.queries';
import { hmgQueryOptions as hmgDepartmentQuery } from '@entities/department/service/hmg-department.queries';
import { useDeleteDepartment } from '@entities/department/service/department.hook';
import { EnGlobalConst } from '@types';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css';

/**
 * 화면번호: NLP_BO_TMS_1111_03 테넌트-회사조직 대상자 (조직)
 * @returns
 */
const CompanyOrganizationInfoListComponent = ({
  companyCode,
  showType,
  deptId,
  companyHrInfoManageType,
}: {
  companyCode: string;
  showType: string;
  deptId: number;
  companyHrInfoManageType: string;
}) => {
  const { confirm: openConfirm, alert: openAlert } = useModal();
  const [gridConfig, setGridConfig] = useState<any>(gridConfigOrg);
  const [tableInstance, setTableInstance] = useState<Table<any>>();

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
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

  const { delete: deleteDepartment } = useDeleteDepartment({
    onSuccess: () => {
      openAlert({
        title: t('삭제되었습니다.'),
        onClose: () => {
          gridFetch();
        },
      });
    },
  });

  useEffect(() => {
    switch (showType) {
      case EnOrganizationShowType.origin:
        setGridConfig(gridConfigOrg);
        break;
      case EnOrganizationShowType.platform:
        setGridConfig(gridConfigPlat);
    }
  }, [showType]);

  useEffect(() => {
    gridFetch(getSearchParam());
  }, [deptId]);

  const columnHelper = createColumnHelper<any>();
  let columns = [
    columnHelper.accessor('hrInfoManageType', {
      cell: (info) =>
        t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.HrInfoManageType.${info.getValue()}`),
      header: t('조직 등록 유형'),
      size: 152,
    }),
    columnHelper.accessor('deptCode', {
      cell: (info) => info.getValue(),
      header: t('조직코드'),
      size: 240,
    }),

    columnHelper.accessor('deptName', {
      cell: (info) => info.getValue(),
      header: t('조직명'),
      size: 200,
    }),
    columnHelper.accessor('managerEmployeeNumber', {
      cell: (info) => info.getValue(),
      header: t('조직장 사번'),
      size: 120,
    }),
    columnHelper.accessor('managerName', {
      cell: (info) => info.getValue(),
      header: t('조직장 이름'),
      size: 104,
    }),
  ] as ColumnDef<any, unknown>[];

  if (showType === EnOrganizationShowType.platform && companyHrInfoManageType === 'MANUAL_MANAGE') {
    const checkboxColumn = columnHelper.accessor('checkbox', {
      // 상태에 따른 checkbox disabled를 위해 checkbox 따로 구현
      id: 'select-check',
      size: 50,
      maxSize: 50,
      minSize: 50,
      meta: {
        align: 'center',
        headerAlign: 'center',
        cellAlign: 'center',
      },
      enableSorting: false,
      header: ({ table }) => (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(checked) => {
              table.toggleAllRowsSelected(!!checked);
            }}
          />
        </div>
      ),
      cell: ({ row }) => {
        const disabled = row.original.hrInfoManageType !== 'MANUAL_MANAGE';
        return (
          <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
            <Checkbox
              checked={row.getIsSelected()}
              disabled={row.getIsGrouped() || disabled}
              onCheckedChange={() => {
                if (!row.getIsGrouped()) {
                  row.getToggleSelectedHandler();
                }
              }}
            />
          </div>
        );
      },
    });
    columns = [checkboxColumn, ...columns];
  }

  const handleRemoveClick = async () => {
    const deleteRows = tableInstance?.getSelectedRowModel().rows;
    if (deleteRows && deleteRows.length > 0) {
      console.log('deleteRows', deleteRows);
      const deptIdsToRemove = deleteRows.map((r) => r.original.deptId);
      console.log('deptIdsToRemove', deptIdsToRemove);

      if (await openConfirm('삭제 하시겠습니까?')) {
        const payload = {
          companyCode: companyCode,
          deptIdList: deptIdsToRemove,
        };
        deleteDepartment(payload);
      }
    }
  };

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox
            config={gConfig}
            columns={columns}
            showNumberingColumn={
              showType === EnOrganizationShowType.origin ||
              companyHrInfoManageType !== 'MANUAL_MANAGE'
            }
            hideRowSelectionCheckBox
            multiple={
              showType === EnOrganizationShowType.platform &&
              companyHrInfoManageType === 'MANUAL_MANAGE'
            }
            title={t('조직 목록')}
            showRemove={
              showType === EnOrganizationShowType.platform &&
              companyHrInfoManageType === 'MANUAL_MANAGE'
            }
            excelButtons={
              showType === EnOrganizationShowType.platform &&
              companyHrInfoManageType === 'MANUAL_MANAGE' && <GridExcelUploadButton />
            }
            onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
            onRemoveClick={handleRemoveClick}
          />
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
        type: 'dropdown',
        label: t('조직 등록 유형'),
        value: '',
        presetOptionLabel: t('전체'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.company.HrInfoManageType'],
        },
      },
      {
        name: 'deptName',
        type: 'text',
        label: t('조직명'),
        value: '',
        placeholder: t('입력'),
      },
      {
        name: 'deptManagerName',
        type: 'text',
        label: t('조직장 이름'),
        value: '',
        placeholder: t('입력'),
      },
    ],
  ],
};

const gridConfigOrg = {
  query: hmgDepartmentQuery.child,
  columns: [],
  data: [],

  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const gridConfigPlat = {
  query: departmentQuery.child,
  columns: [],
  data: [],

  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};
