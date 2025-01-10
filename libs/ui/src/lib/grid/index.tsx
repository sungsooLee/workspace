import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@learnway/shared';

import { GridProps } from './types/grid';
import { HTMLProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Filter } from './components/filter';
import ColumnSettings from './components/column-setting';
import { ColumnSetting } from './types/column-settings';
import FormCheckBox from '../checkbox/checkbox';
import { CheckFieldProps } from '../checkbox/type';
import { CheckedState } from '@radix-ui/react-checkbox';

interface IndeterminateCheckboxProps extends Omit<CheckFieldProps, 'ref'> {
  indeterminate?: boolean;
}

export const IndeterminateCheckbox = ({
  indeterminate,
  value,
  onChange,
  ...rest
}: IndeterminateCheckboxProps) => {
  const handleChange = (checked: CheckedState) => {
    onChange?.(checked === true);
  };

  const checkedState: CheckedState = indeterminate ? 'indeterminate' : value || false;

  return <FormCheckBox value={checkedState} onChange={handleChange} {...rest} />;
};

const Grid = <T extends object>({
  data,
  columns,
  onStateChange,
  onRowSelect,
  multiSelectable = false,
  pagination,
  infiniteScroll,
  title,
  isLoading,
}: GridProps<T>) => {
  // 테이블 컨테이너 ref (무한 스크롤용)
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // 무한스크롤 핸들러
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (!infiniteScroll || !containerRefElement) return;

      const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
      if (
        scrollHeight - scrollTop - clientHeight < 500 && // 하단 500px 지점에 도달하고
        !infiniteScroll.isFetching && // 데이터 로딩중이 아니고
        infiniteScroll.hasNextPage // 다음 페이지가 있으면
      ) {
        infiniteScroll.fetchNextPage();
      }
    },
    [infiniteScroll],
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
    columns.reduce((acc, col) => {
      acc[col.id as string] = true;
      return acc;
    }, {} as VisibilityState),
  );

  // columnOrder 초기화
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    multiSelectable
      ? ['select', ...columns.map((col) => col.id as string)] // 체크박스가 제일 앞에 오게
      : columns.map((col) => col.id as string),
  );

  // 전달 받은 columns에 다중 선택의 경우 체크박스 추가
  const columnsWithCheckbox = useMemo(
    () =>
      multiSelectable
        ? [
            {
              id: 'select',
              header: ({ table }) => (
                <IndeterminateCheckbox
                  value={table.getIsAllRowsSelected()}
                  indeterminate={table.getIsSomeRowsSelected()}
                  onChange={(checked) => {
                    table.toggleAllRowsSelected(!!checked);
                  }}
                />
              ),
              cell: ({ row }) => (
                <div className="px-1">
                  <IndeterminateCheckbox
                    value={row.getIsSelected()}
                    onChange={(checked) => {
                      row.toggleSelected(!!checked);
                    }}
                  />
                </div>
              ),
            },
            ...columns,
          ]
        : columns,
    [columns, multiSelectable],
  );

  // Row Select handle 이벤트 - 단일/다중 분기 처리
  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
    const updatedState =
      typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;

    if (multiSelectable) {
      // 다중 선택 모드: 모든 선택을 허용
      setRowSelection(updatedState);

      try {
        // 전체 선택된 데이터 가져오기
        const selectedData = table.getSelectedRowModel().flatRows.map((row) => row.original);
        if (onRowSelect) onRowSelect(selectedData);
      } catch (error) {
        console.error('Row selection error:', error);
      }
    } else {
      // 단일 선택 모드: 마지막 선택만 유지
      const selectedRows = Object.entries(updatedState)
        .filter(([_, selected]) => selected)
        .map(([index]) => index);

      if (selectedRows.length > 0) {
        const newlySelectedRow = selectedRows.find((index) => !rowSelection[index]);
        const targetRow = newlySelectedRow || selectedRows[selectedRows.length - 1];

        const newSelection: RowSelectionState = {
          [targetRow]: true,
        };

        setRowSelection(newSelection);
        if (onRowSelect) {
          const row = table.getRow(targetRow);
          onRowSelect(row.original);
        }
      } else {
        setRowSelection({});
        if (onRowSelect) onRowSelect(null);
      }
    }
  };

  const table = useReactTable({
    data,
    // columns,
    columns: columnsWithCheckbox,
    state: {
      columnOrder,
      columnVisibility,
      sorting,
      columnFilters,
      rowSelection,
      ...(pagination && {
        pagination: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        } as PaginationState,
      }),
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: (updater) => {
      if (!pagination) return;
      const newPagination =
        typeof updater === 'function'
          ? updater({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize })
          : updater;

      pagination.onPageChange(newPagination.pageIndex);
      pagination.onPageSizeChange(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: handleRowSelectionChange,
    enableMultiRowSelection: multiSelectable,
    enableHiding: true,
    //// 클라이언트 사이드 처리
    // getFilteredRowModel: getFilteredRowModel(), // 클라이언트 사이드 필터링 (api로만 필터링하려면 제외)
    // getSortedRowModel: getSortedRowModel(), // 클라이언트 사이드 소팅 (소팅 서버 로직일 경우에 제외)
    //// 서버 사이드 처리
    manualSorting: true, // 서버 소팅일 경우 포함.
    manualFiltering: true, // 서버 필터일 경우 포함.
    manualPagination: true, //서버 페이지네이션 처리
    pageCount: pagination ? Math.ceil(pagination.totalRows / pagination.pageSize) : undefined,
    //고유 ID 부여, 페이지네이션에서 selected row를 위해서
    getRowId: (row: T, index: number) => {
      return `${pagination?.pageIndex ?? 0}-${index}`;
    },
  });

  // 무한 스크롤 이벤트
  // useEffect(() => {
  //   fetchMoreOnBottomReached(tableContainerRef.current);
  // }, [fetchMoreOnBottomReached]);

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 40, // 행의 예상 높이
    getScrollElement: () => tableContainerRef.current,
    overscan: 5, // 추가로 렌더링할 행 수
  });

  // 그리드 상태 변화(e.g. 필터, 소팅, 순서, visibility)에 따른 콜백 전달
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

    // 다중 선택 모드일 때만 select 컬럼 추가
    const order = multiSelectable
      ? ['select', ...settings.map((setting) => setting.id)]
      : settings.map((setting) => setting.id);

    setColumnVisibility(visibility);
    setColumnOrder(order);
  };

  //// 테이블 내용 렌더링
  const renderTableContent = () => (
    <div
      ref={tableContainerRef}
      // className="overflow-auto rounded-lg border"
      // style={{ height: '600px' }}
      /// 무한스크롤일때
      // ref={infiniteScroll ? tableContainerRef : null}
      // onScroll={infiniteScroll ? (e) => fetchMoreOnBottomReached(e.currentTarget) : undefined}
      // style={infiniteScroll ? { maxHeight: '600px' } : undefined}
    >
      <table className="min-w-full table-auto divide-y divide-gray-200">
        {' '}
        <thead className="sticky top-0 z-10 bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                    minWidth: header.getSize(),
                  }}
                  className="border-b px-4 py-2 text-left">
                  <div className="flex flex-col gap-2">
                    <div
                      className={cn(
                        header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        'text-xs font-medium uppercase text-gray-500',
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
                    {header.column.columnDef.meta?.filterType && <Filter column={header.column} />}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}>
          {
            isLoading
              ? // 로딩 상태일 때 스켈레톤 UI 표시
                Array.from({ length: pagination?.pageSize || 10 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="px-4 py-2">
                        <div className="h-4 rounded bg-gray-200"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
                  const row = rows[virtualRow.index] as Row<T>;
                  return (
                    <tr
                      data-index={virtualRow.index}
                      ref={(node) => rowVirtualizer.measureElement(node)}
                      key={row.id}
                      style={{
                        display: 'flex',
                        position: 'absolute',
                        transform: `translateY(${virtualRow.start}px)`,
                        width: '100%',
                      }}
                      className={cn(
                        'cursor-pointer border-b hover:bg-gray-50',
                        row.getIsSelected() && 'bg-blue-50 hover:bg-blue-100',
                      )}
                      onClick={() => row.toggleSelected()}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            style={{
                              display: 'flex',
                              width: cell.column.getSize(),
                            }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
            // table.getRowModel().rows.map((row) => (
            //     <tr
            //       key={row.id}
            //       className={cn(
            //         'cursor-pointer border-b hover:bg-gray-50',
            //         row.getIsSelected() && 'bg-blue-50 hover:bg-blue-100',
            //       )}
            //       onClick={() => row.toggleSelected()}>
            //       {row.getVisibleCells().map((cell) => (
            //         <td
            //           key={cell.id}
            //           style={{
            //             width: cell.column.getSize(),
            //             minWidth: cell.column.getSize(),
            //           }}
            //           className="px-4 py-2 text-sm">
            //           {flexRender(cell.column.columnDef.cell, cell.getContext())}
            //         </td>
            //       ))}
            //     </tr>
            //   ))
          }
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
  );

  //// 페이지네이션 렌더링
  const renderPagination = () => {
    if (!pagination) return null;

    const {
      pageSize,
      pageIndex,
      totalRows,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [10, 20, 50, 100],
    } = pagination;
    const totalPages = Math.ceil(totalRows / pageSize);

    return (
      <div className="mt-4 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded border p-1">
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}개씩 보기
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-600">
            총 {totalRows}개 중 {pageIndex * pageSize + 1}-
            {Math.min((pageIndex + 1) * pageSize, totalRows)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
            className="rounded border px-2 py-1 disabled:opacity-50">
            {'<<'}
          </button>
          <button
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="rounded border px-2 py-1 disabled:opacity-50">
            {'<'}
          </button>

          {/* 페이지 번호들 */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={cn(
                  'rounded px-3 py-1',
                  pageIndex === i ? 'bg-blue-500 text-white' : 'border hover:bg-gray-100',
                )}>
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= totalPages - 1}
            className="rounded border px-2 py-1 disabled:opacity-50">
            {'>'}
          </button>
          <button
            onClick={() => onPageChange(totalPages - 1)}
            disabled={pageIndex >= totalPages - 1}
            className="rounded border px-2 py-1 disabled:opacity-50">
            {'>>'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-full">
      <div className="mb-4 flex w-full flex-row">
        {title && <div className="px-4 text-lg font-semibold">{title}</div>}

        <ColumnSettings<T> onColumnChange={handleColumnSettingsChange} table={table} />
      </div>
      {renderTableContent()}
      {renderPagination()}
    </div>
  );
};

export { Grid };
