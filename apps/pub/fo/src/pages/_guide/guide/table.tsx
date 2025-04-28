import { createFileRoute } from '@tanstack/react-router';
import { TableBox } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export const Route = createFileRoute('/_guide/guide/table')({
  component: RouteComponent,
});

function RouteComponent() {
  const columnHelper = createColumnHelper<any>();
  // thead : 'value'
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

  // Thead 정의
  const columns = [
    columnHelper.accessor('name', {
      meta: {
        headerAlign: 'left', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('name2', {
      meta: {
        headerAlign: 'center', // 헤더 정렬
        cellAlign: 'center', // 셀 정렬
      },
    }),
    columnHelper.accessor('name3', {
      meta: {
        headerAlign: 'right', // 헤더 정렬
        cellAlign: 'right', // 셀 정렬
      },
    }),
    columnHelper.accessor('name4', {}),
  ] as ColumnDef<any, unknown>[];
  return (
    <div>
      <h2 className="guide_tit2">Table Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/grid/</p>
      <p className="info">grid바탕으로 table 사용</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { TableBox } from '@learnway/ui';
  import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
  
  const columnHelper = createColumnHelper<any>();
  
  // thead : 'value'
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
  
  // Thead 정의
  const columns = [
    columnHelper.accessor('name', {
      meta: {
        headerAlign: 'left', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('name2', {
      meta: {
        headerAlign: 'left', // 헤더 정렬
        cellAlign: 'left', // 셀 정렬
      },
    }),
    columnHelper.accessor('name3', {}),
    columnHelper.accessor('name4', {}),
  ] as ColumnDef<any, unknown>[];
  
  
    <TableBox
    data={data}
    columns={columns}
    tableMode={true}
  />
  `}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">Table basic</h3>
        <TableBox data={data} columns={columns} tableMode={true} />
      </div>
    </div>
  );
}
