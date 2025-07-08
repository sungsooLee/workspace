import { useCreation } from 'ahooks';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { TableBox } from '@learnway/ui';

export function WidgetComponentTable({ data }: { data: any }) {
  const tableColumns = useCreation(() => {
    const columnHelper = createColumnHelper<any>();
    return [
      columnHelper.accessor('type', {
        header: '구분',
        meta: {
          headerAlign: 'left',
          cellAlign: 'left',
        },
      }),
      columnHelper.accessor('componentId', {
        header: '컴포넌트 ID',

        meta: {
          headerAlign: 'center',
          cellAlign: 'left',
        },
      }),
      columnHelper.accessor('size', {
        header: '사이즈(가로*세로) pixel',
        meta: {
          headerAlign: 'center',
          cellAlign: 'left',
        },
      }),
    ] as ColumnDef<any, unknown>[];
  }, []);

  return <TableBox data={data} columns={tableColumns} tableMode={true} />;
}
