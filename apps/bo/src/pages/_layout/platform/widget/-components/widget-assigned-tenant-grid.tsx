import { useCreation } from 'ahooks';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { GridBox } from '@learnway/ui';

export function WidgetAssignedTenantGrid({ data }: { data: any }) {
  const gridColumns = useCreation(() => {
    const columnHelper = createColumnHelper<any>();
    return [
      columnHelper.accessor('tenantName', {
        header: '테넌트명',
        meta: {
          headerAlign: 'left',
          cellAlign: 'left',
        },
      }),
      columnHelper.accessor('isVisible', {
        header: '노출여부',
        cell: ({ row }: any) => (row?.isVisible ? 'Y' : 'N'),
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      }),
      columnHelper.accessor('isRequired', {
        header: '필수여부',
        cell: ({ row }: any) => (row?.isRequired ? 'Y' : 'N'),
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
      }),
    ] as ColumnDef<any, unknown>[];
  }, []);

  return (
    <GridBox
      data={data}
      columns={gridColumns}
      title={'테넌트 정보(해당 위젯을 사용하는 테넌트)'}
      disabledSelectionToggle
      hideColumnSettings
    />
  );
}
