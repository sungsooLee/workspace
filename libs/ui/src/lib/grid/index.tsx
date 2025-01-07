import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { cn } from '@learnway/shared';

import { GridProps } from './types/grid';
import { useCallback, useEffect, useState } from 'react';
import { Filter } from './components/filter';
import ColumnSettings from './components/column-setting';
import { ColumnSetting } from './types/column-settings';

const Table = <T extends object>({ data, columns, onStateChange }: GridProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  // 컬럼 관련 내부 상태 추가 - 초기값 설정
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
    columns.reduce((acc, col) => {
      acc[col.id as string] = true;
      return acc;
    }, {} as VisibilityState),
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((col) => col.id as string),
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
      columnVisibility,
      sorting,
      columnFilters,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(), // 클라이언트 사이드 필터링 (api로만 필터링하려면 제외)
    // getSortedRowModel: getSortedRowModel(), // 클라이언트 사이드 소팅 (소팅 서버 로직일 경우에 제외)
    enableHiding: true,
    manualSorting: true, // 서버 소팅일 경우 포함.
    manualFiltering: true, // 서버 필터일 경우 포함.
  });

  useEffect(() => {
    if (!onStateChange) return;

    onStateChange({
      filter: columnFilters,
      sorting,
      columnVisibility,
      columnOrder,
    });
  }, [columnFilters, sorting, columnVisibility, columnOrder]);

  // ColumnSettings의 변경 사항 처리
  const handleColumnSettingsChange = (settings: ColumnSetting[]) => {
    const visibility = settings.reduce((acc, setting) => {
      acc[setting.id] = setting.isVisible;
      return acc;
    }, {} as VisibilityState);

    const order = settings.map((setting) => setting.id);

    setColumnVisibility(visibility);
    setColumnOrder(order);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end">
        <ColumnSettings<T> onColumnChange={handleColumnSettingsChange} table={table} />
      </div>
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full table-fixed">
          {' '}
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(), // 컬럼 너비 적용
                      minWidth: header.getSize(),
                    }}
                    className="px-4 py-2 text-left border-b">
                    <div className="flex flex-col gap-2">
                      <div
                        className={cn(
                          header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          'text-xs font-medium text-gray-500 uppercase',
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                            : undefined
                        }>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.columnDef.meta?.filterType && (
                        <Filter column={header.column} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                    }}
                    className="px-4 py-2 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      minWidth: header.getSize(),
                    }}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;
