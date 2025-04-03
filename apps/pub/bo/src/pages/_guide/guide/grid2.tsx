import { createFileRoute } from '@tanstack/react-router';
import { Table } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export const Route = createFileRoute('/_guide/guide/grid2')({
  component: RouteComponent,
});

function RouteComponent() {
  const data: any[] = [
    {
      name: 'aaaa',
      name2: 'bbbb',
      name3: 'cccc',
      name4: 'dddd',
    },
    {
      name: 'aaaa',
      name2: 'bbbb',
      name3: 'cccc',
      name4: 'dddd',
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('name', {
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('name2', {}),
    columnHelper.accessor('name3', {}),
    columnHelper.accessor('name4', {}),
  ] as ColumnDef<any, unknown>[];
  return (
    <div>
      <Table data={data} columns={columns} tableMode={true} />
    </div>
  );
}
