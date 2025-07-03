import { createFileRoute } from '@tanstack/react-router';
import { ShuttleGridToGrid } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export const Route = createFileRoute('/_guide/guide/shuttle-grid')({
  component: RouteComponent,
});

function RouteComponent() {
  const gridData = Array(10)
    .fill(null)
    .map((d, i) => ({ id: `id${i}`, name: `name${i}` }));
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Last Name',
      cell: (info) => info.getValue(),
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <div>
      <ShuttleGridToGrid
        gridData={gridData}
        columns={columns}
        rowKey={'id'}
        leftTitle={'HRD 담당자 역할 목록'}
        rightTitle={'HRD 담당자 역할 선택'}
      />
    </div>
  );
}
