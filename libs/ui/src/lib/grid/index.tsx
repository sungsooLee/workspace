import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Column,
  ColumnFiltersState,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  GroupingState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CheckedState } from '@radix-ui/react-checkbox';
import { cn } from '@learnway/shared';
import { FilterIcon } from 'lucide-react';

import { GridProps } from './types/grid';
import ColumnSettings, { ColumnSetting } from './components/column-setting';
import { FilterContent } from './components/filter-content';

import { useModalControl } from '../modal/modal.hook';
import { Button } from '../shadcn/button';
import { CheckFieldProps } from '../checkbox/type';
import { Checkbox } from '../checkbox/checkbox';

interface IndeterminateCheckboxProps extends Omit<CheckFieldProps, 'ref'> {
  indeterminate?: boolean;
}

/// 체크 박스
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

  return <Checkbox value={checkedState} onChange={handleChange} {...rest} />;
};
///////

const Grid = <T extends object>({
  data,
  columns,
  onStateChange,
  onRowSelect,
  multiSelectable = false,
  pagination,
  title,
  isLoading,
  columnGrouping,
  columnPinning = { columns: [] },
}: GridProps<T>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { open } = useModalControl();
  const [expanded, setExpanded] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const groupingState = useMemo<GroupingState>(
    () => columnGrouping?.columns || [],
    [columnGrouping?.columns],
  );
  const [columnPinningState, setColumnPinningState] = useState<ColumnPinningState>({
    left: multiSelectable ? ['select', ...columnPinning.columns] : columnPinning.columns, // 체크박스가 있으면 'select'를 기본으로 고정
    right: [],
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
    columns.reduce((acc, col) => {
      acc[col.id as string] = true;
      return acc;
    }, {} as VisibilityState),
  );

  // columnOrder 초기화
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((col) => col.id as string),
  );

  // 전달 받은 columns에 다중 선택의 경우 체크박스 추가
  const columnsWithCheckbox = useMemo(
    () =>
      multiSelectable
        ? [
            {
              id: 'select',
              size: 50,
              maxSize: 50,
              minSize: 50,
              enablePinning: true, // 핀 기능 활성화
              header: ({ table }: { table: Table<T> }) => (
                <IndeterminateCheckbox
                  value={table.getIsAllRowsSelected()}
                  indeterminate={table.getIsSomeRowsSelected()}
                  onChange={(checked) => {
                    table.toggleAllRowsSelected(!!checked);
                  }}
                />
              ),
              // 바디 체크 박스
              cell: ({ row }: { row: Row<T> }) => (
                <div className="px-1">
                  <IndeterminateCheckbox
                    value={row.getIsSelected()}
                    onChange={(checked) => {
                      // 그룹핑된 행은 체크박스 비활성화
                      if (row.getIsGrouped()) {
                        return;
                      }
                      row.toggleSelected(!!checked);
                    }}
                    disabled={row.getIsGrouped()} // 그룹핑된 행은 비활성화
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
    columns: columnsWithCheckbox,
    state: {
      columnOrder,
      columnVisibility,
      sorting,
      columnFilters,
      rowSelection,
      grouping: groupingState,
      expanded,
      ...(pagination && {
        pagination: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        } as PaginationState,
      }),
      columnPinning: columnPinningState,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    onColumnPinningChange: setColumnPinningState,
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
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: handleRowSelectionChange,
    enableMultiRowSelection: multiSelectable,
    enableHiding: true,
    enableGrouping: true,
    enableExpanding: true,
    enablePinning: true,
    //// 클라이언트 사이드 처리 ///////
    // getFilteredRowModel: getFilteredRowModel(), // 클라이언트 사이드 필터링 (api로만 필터링하려면 제외)
    // getSortedRowModel: getSortedRowModel(), // 클라이언트 사이드 소팅 (소팅 서버 로직일 경우에 제외)
    //// 서버 사이드 처리 //////
    manualSorting: true, // 서버 소팅일 경우 포함.
    manualFiltering: true, // 서버 필터일 경우 포함.
    manualPagination: true, //서버 페이지네이션 처리
    // manualGrouping: true,  // 서버 그루핑. 그루핑 데이터 자체를 서버에서 내려줘야됨.
    // manualExpanding: true,
    pageCount: pagination ? Math.ceil(pagination.totalRows / pagination.pageSize) : undefined,
    //고유 ID 부여, 페이지네이션에서 selected row를 위해서
    getRowId: (row: T, index: number) => {
      return `${pagination?.pageIndex ?? 0}-${index}`;
    },
  });

  // 가상 스크롤 관련 설정
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  // 그리드 상태 변화(e.g. 필터, 소팅, 순서, visibility)에 따른 콜백 전달
  useEffect(() => {
    if (!onStateChange) return;

    onStateChange({
      filters: columnFilters,
      sorting,
      columnVisibility,
      columnOrder,
    });
  }, [columnFilters, sorting, columnVisibility, columnOrder]);

  // 컬럼 팝업에서 컬럼에 대한 항목 설정
  const handleColumnSettingsChange = (settings: ColumnSetting[]) => {
    // 숨기기 설정
    const visibility = settings.reduce((acc, setting) => {
      acc[setting.id] = setting.isVisible;
      return acc;
    }, {} as VisibilityState);
    // 순서 설정
    const order = settings.map((setting) => setting.id);

    setColumnVisibility(visibility);
    setColumnOrder(order);
  };

  /// 필터 팝업 오픈
  const openFilterPopup = (e: React.MouseEvent, column: Column<T, unknown>) => {
    e.stopPropagation();

    const filterType = column.columnDef.meta?.filterType;
    const currentValue = column.getFilterValue();
    const filterOptions =
      column.columnDef.meta?.filterType === 'select' ? column.columnDef.meta.filterOptions : [];

    open(
      <FilterContent
        column={column.id}
        type={filterType as 'text' | 'range' | 'select'}
        initialValue={currentValue}
        onApply={(value) => {
          column.setFilterValue(value);
          // 필터 변경 시 상위 컴포넌트에 알림
          if (onStateChange) {
            onStateChange({
              filters: columnFilters,
              sorting,
              columnVisibility,
              columnOrder,
            });
          }
        }}
        options={filterOptions}
      />,
      {
        title: `${column.columnDef.header as string} 필터`,
        width: 'sm',
      },
    );
  };
  ////

  //// 테이블 내용 렌더링
  const renderTableContent = () => {
    const paginationGrid = pagination ? true : false;

    const renderRows = () => {
      if (paginationGrid) {
        return rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
          const row = rows[virtualRow.index] as Row<T>;
          return (
            <tr
              data-index={virtualRow.index}
              ref={(node) => rowVirtualizer.measureElement(node)}
              key={row.id}
              className={cn(
                'cursor-pointer border-b hover:bg-gray-50',
                row.getIsSelected() && 'bg-blue-50 hover:bg-blue-100',
              )}
              style={{
                display: 'flex',
                position: 'absolute',
                transform: `translateY(${virtualRow.start}px)`,
                width: '100%',
              }}
              onClick={() => row.toggleSelected()}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    display: 'flex',
                    width: cell.column.getSize(),
                  }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        });
      }
      const virtualRows = rowVirtualizer.getVirtualItems();
      const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
      const paddingBottom =
        virtualRows.length > 0
          ? rowVirtualizer.getTotalSize() - (virtualRows[virtualRows.length - 1].end || 0)
          : 0;

      return (
        <>
          {paddingTop > 0 && <tr style={{ height: `${paddingTop}px`, width: '100%' }} />}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>;
            return (
              <tr
                key={row.id}
                data-index={virtualRow.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                className={cn(
                  'border-b hover:bg-gray-50',
                  row.getIsSelected() && 'bg-blue-50 hover:bg-blue-100',
                )}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'flex',
                }}
                onClick={() => !row.getIsGrouped() && row.toggleSelected()}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2"
                    style={{
                      background: cell.getIsGrouped()
                        ? '#0aff0082'
                        : cell.getIsAggregated()
                          ? '#ffa50078'
                          : cell.getIsPlaceholder()
                            ? '#ff000042'
                            : '',
                      width: cell.column.getSize(),
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    {cell.getIsGrouped() ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          row.toggleExpanded();
                        }}
                        style={{
                          cursor: row.getIsGrouped() ? 'default' : 'pointer',
                        }}>
                        {row.getIsExpanded() ? '👇' : '👉'}{' '}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())} (
                        {row.subRows.length})
                      </button>
                    ) : cell.getIsAggregated() ? (
                      flexRender(
                        cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                        cell.getContext(),
                      )
                    ) : cell.getIsPlaceholder() ? null : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
          {paddingBottom > 0 && <tr style={{ height: `${paddingBottom}px`, width: '100%' }} />}
        </>
      );
    };

    return (
      <div
        ref={tableContainerRef}
        className="relative overflow-auto rounded-lg border"
        style={{
          height: '600px',
          width: '100%',
        }}>
        <table
          style={{
            display: paginationGrid ? 'table' : 'grid', // 가상 스크롤일 때 grid 사용
            width: '100%',
          }}>
          <thead
            style={{
              display: paginationGrid ? 'table-header-group' : 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'rgb(249 250 251)',
            }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{
                  display: paginationGrid ? 'table-row' : 'flex',
                  width: '100%',
                }}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: paginationGrid ? undefined : header.getSize(),
                      display: paginationGrid ? 'table-cell' : 'flex',
                    }}
                    className="border-b px-4 py-2 text-left">
                    <div className="flex flex-col gap-2">
                      <div
                        className={cn(
                          header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          'text-xs font-medium uppercase text-gray-500',
                        )}
                        onClick={header.column.getToggleSortingHandler()}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                        {/* 필터 */}
                        {header.column.columnDef.meta?.filterType && (
                          <Button
                            onClick={(e) => openFilterPopup(e, header.column)}
                            size="xs"
                            className="m-2">
                            <FilterIcon />
                          </Button>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            style={{
              display: paginationGrid ? 'table-row-group' : 'grid',
              position: 'relative',
              height: paginationGrid ? undefined : `${rowVirtualizer.getTotalSize()}px`,
            }}>
            {isLoading ? <p>Loading...</p> : renderRows()}
          </tbody>
        </table>
      </div>
    );
  };

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
    <div className="flex h-full w-full flex-col">
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
