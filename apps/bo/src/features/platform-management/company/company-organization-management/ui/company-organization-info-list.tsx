import { useDeleteDepartment } from '@entities/department/service/department.hook';
import { queryOptions as departmentQuery } from '@entities/department/service/department.queries';
import { hmgQueryOptions as hmgDepartmentQuery } from '@entities/department/service/hmg-department.queries';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Checkbox, Divider, GridBox, useGridBox, useModal } from '@learnway/ui';
import { GridExcelUploadButton } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { EnGlobalConst } from '@types';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { EnOrganizationShowType } from './company-organization-tree';

/**
 * 화면번호: NLP_BO_TMS_1111_03 테넌트-회사조직 대상자 (조직)
 * @returns
 */
const CompanyOrganizationInfoListComponent = ({
  companyCode,
  showType,
  deptId,
  //companyHrInfoManageType,
}: {
  companyCode: string;
  showType: string;
  deptId: number;
  //companyHrInfoManageType: string;
}) => {
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

  const { confirm: openConfirm, alert: openAlert } = useModal();
  const [tableInstance, setTableInstance] = useState<Table<any>>();

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
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

  const handleOnSearch = (data: any) => {
    if (companyCode) {
      gridFetch();
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
    gridFetch();
  }, [deptId]);

  const columnHelper = createColumnHelper<any>();
  const columns = [
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
  const columnsPlatform = [checkboxColumn, ...columns];

  const handleRemoveClick = async () => {
    const deleteRows = tableInstance?.getSelectedRowModel().rows;
    if (deleteRows && deleteRows.length > 0) {
      console.log('deleteRows', deleteRows);
      const deptIdsToRemove = deleteRows.map((r) => r.original.deptId);
      console.log('deptIdsToRemove', deptIdsToRemove);

      if (await openConfirm('삭제 하시겠습니까?')) {
        const payload = {
          companyCode,
          deptIdList: deptIdsToRemove,
        };
        deleteDepartment(payload);
      }
    }
  };

  const handleOnSelectable = (row: any) => {
    const disabled = row.hrInfoManageType !== 'MANUAL_MANAGE';
    return !disabled;
  };

  const handleExcelUpload = async (data: Record<string, any>[]) => {
    gridFetch();
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
          hideRowSelectionCheckBox
          title={t('조직 목록')}
          isRowSelectable={handleOnSelectable}
        />
      )}
      {showType === EnOrganizationShowType.platform && (
        <GridBox
          config={configPlatform}
          columns={columnsPlatform}
          hideRowSelectionCheckBox
          multiple
          title={t('조직 목록')}
          showRemove
          excelButtons={
            <GridExcelUploadButton
              validateUrl={`/department/${companyCode}/child/excelUpload`}
              affairsType="PMS"
              onUpload={handleExcelUpload}
            />
          }
          onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
          onRemoveClick={handleRemoveClick}
          isRowSelectable={handleOnSelectable}
        />
      )}
    </>
  );
};

export const CompanyOrganizationInfoList = CompanyOrganizationInfoListComponent;

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
