import React, { useState } from 'react';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Person {
  id: number;
  name: string;
  age: number;
}

const columnHelper = createColumnHelper<Person>();

const columns: ColumnDef<Person, any>[] = [
  // 1) 가장 앞에 라디오 버튼 컬럼
  {
    id: 'select',
    header: '', // 헤더는 비워둠
    size: 40,
    // 정렬, 필터링 등 불필요하면 disable
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div style={{ textAlign: 'center' }}>
<input
  type="radio"
checked={row.getIsSelected()}
onChange={row.getToggleSelectedHandler()}
/>
</div>
),
},
// 2) 나머지 실제 데이터 컬럼
columnHelper.accessor('name', {
  header: 'Name',
  cell: (info) => info.getValue(),
}),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.getValue(),
  }),
];

const data: Person[] = [
  { id: 1, name: '홍길동', age: 20 },
  { id: 2, name: '이몽룡', age: 22 },
  { id: 3, name: '성춘향', age: 18 },
];

function App() {
  // rowSelection 상태
  const [rowSelection, setRowSelection] = useState({});

  // 테이블 객체 생성
  const table = useReactTable<Person>({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    // 단일 선택 모드
    rowSelectionMode: 'single',
    // 각 행의 고유 ID (데이터에 따라 조정 가능)
    getRowId: (row) => String(row.id),
  });

  return (
    <div style={{ padding: '20px' }}>
  <h2>TanStack Table - Radio Button Row Selection</h2>
  <table style={{ borderCollapse: 'collapse', width: '300px' }}>
  <thead>
    {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
              <th
                key={header.id}
            style={{ borderBottom: '1px solid #ccc', padding: '8px' }}
>
  {header.isPlaceholder
    ? null
    : flexRender(header.column.columnDef.header, header.getContext())}
  </th>
))}
  </tr>
))}
  </thead>
  <tbody>
  {table.getRowModel().rows.map((row) => (
      <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
  {row.getVisibleCells().map((cell) => (
    <td key={cell.id} style={{ padding: '8px', textAlign: 'left' }}>
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  ))}
  </tr>
))}
  </tbody>
  </table>

  {/* 어떤 행이 선택되었는지 확인 */}
  <div style={{ marginTop: '16px' }}>
  <strong>Selected Row(s): </strong>
  {Object.keys(rowSelection).length === 0
    ? 'None'
    : Object.keys(rowSelection).join(', ')}
  </div>
  </div>
);
}

export default App;
