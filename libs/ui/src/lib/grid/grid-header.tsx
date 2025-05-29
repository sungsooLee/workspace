import React, { CSSProperties, forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Cell, flexRender, Row, Table } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import { useTranslation } from 'react-i18next';
import { IcoGridOrder } from '@learnway/icons';
import { useModal } from '../modal/modal.hook';

import { GridProps } from './types/grid';

import styles from './grid.module.css';

// 새로 분리된 훅 import
import { useGridTable } from './use-grid-table';

// --- 새로 분리될 컴포넌트 (예시) ---

// GridHeader.tsx (새 파일)
interface GridHeaderProps<T extends object> {
  table: Table<T>;
  hideHeader?: boolean;
  lastPinnedColumnId: string | undefined;
}

const GridHeader = <T extends object>({ table, lastPinnedColumnId }: GridHeaderProps<T>) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const { column } = header;
            const { columnDef } = column;
            const isPinnedLeft = column.getIsPinned() === 'left';
            const isLastPinnedColumn = isPinnedLeft && column.id === lastPinnedColumnId;
            const thStyle = {
              width: columnDef.meta?.size || header.getSize(),
            } as CSSProperties;
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={thStyle}
                className={cn(
                  styles.thead_th,
                  isPinnedLeft && styles.th_pinned_left,
                  isLastPinnedColumn && styles.th_pinned_last,
                )}
              >
                <div
                  className={cn(
                    styles.th_wrap,
                    column.getCanSort() ? 'cursor-pointer select-none' : '',
                  )}
                  style={{
                    justifyContent:
                      columnDef.meta?.headerAlign || columnDef.meta?.align || 'justify-start',
                  }}
                  onClick={column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : flexRender(columnDef.header, header.getContext())}
                  {{
                    asc: (
                      <IcoGridOrder
                        width={7}
                        height={4}
                        fill={'#00afd5'}
                        stroke={'#00afd5'}
                        className={styles.icon_up}
                      />
                    ),
                    desc: (
                      <IcoGridOrder
                        width={7}
                        height={4}
                        fill={'#00afd5'}
                        stroke={'#00afd5'}
                        className={styles.icon_down}
                      />
                    ),
                  }[column.getIsSorted() as string] ?? null}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

// GridBody.tsx (새 파일)
interface GridBodyProps<T extends object> {
  table: Table<T>;
  lastPinnedColumnId: string | undefined;
  disabledSelectionToggle?: boolean;
}

const GridBody = <T extends object>({
  table,
  lastPinnedColumnId,
  disabledSelectionToggle,
}: GridBodyProps<T>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className={cn(
            row.getIsSelected() && styles.selected,
            row.getIsSelected() && 'bg-[#edfcff]',
          )}
          onClick={() => !row.getIsGrouped() && !disabledSelectionToggle && row.toggleSelected()}
        >
          {row.getVisibleCells().map((cell: Cell<T, unknown>) => (
            <GridCell
              key={cell.id}
              row={row}
              cell={cell}
              lastPinnedColumnId={lastPinnedColumnId}
              disabledSelectionToggle={disabledSelectionToggle}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
};

// GridCell.tsx (새 파일)
interface GridCellProps<T extends object> {
  row: Row<T>;
  cell: Cell<T, unknown>;
  lastPinnedColumnId: string | undefined;
  disabledSelectionToggle?: boolean;
}

const GridCell = <T extends object>({ row, cell, lastPinnedColumnId }: GridCellProps<T>) => {
  const isPinnedLeft = cell.column.getIsPinned() === 'left';
  const isLastPinnedColumn = isPinnedLeft && cell.column.id === lastPinnedColumnId;

  const cellStyle = {
    background: cell.getIsGrouped()
      ? '#0aff0082'
      : cell.getIsAggregated()
        ? '#ffa50078'
        : cell.getIsPlaceholder()
          ? '#ff000042'
          : '',
    width: cell.column.getSize(),
    textAlign: cell.column.columnDef.meta?.cellAlign || cell.column.columnDef.meta?.align || 'left',
    position: isPinnedLeft ? 'sticky' : undefined,
    left: isPinnedLeft ? `${cell.column.getStart('left')}px` : undefined,
    zIndex: isPinnedLeft ? 3 : undefined,
  } as CSSProperties;

  return (
    <td
      key={cell.id}
      className={cn(
        styles.tbody_td,
        isPinnedLeft && styles.td_pinned_left,
        isLastPinnedColumn && styles.td_pinned_last,
      )}
      style={cellStyle}
    >
      {cell.getIsGrouped() ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            row.toggleExpanded();
          }}
          style={{ cursor: row.getIsGrouped() ? 'default' : 'pointer' }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}{' '}
          {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
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
  );
};

// GridEmptyMessage.tsx (새 파일)
interface GridEmptyMessageProps {
  emptyMessage?: string;
}

const GridEmptyMessage = ({ emptyMessage }: GridEmptyMessageProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.empty_message_container}>
      <p className={styles.empty_message}>
        {emptyMessage || t('LABEL.grid.emptyText', '조회 결과가 없습니다.')}
      </p>
    </div>
  );
};

// --- 메인 컴포넌트 GridComponent.tsx ---
const GridComponent = forwardRef(
  <T extends object>(
    {
      data,
      columns,
      multiple,
      disabledSelectionToggle,
      hideRowSelectionRadioBox = true,
      hideRowSelectionCheckBox,
      hideHeader,
      showNumberingColumn,
      pagination,
      visibleRowCount = 20,
      rowHeight = 40,
      isLoading,
      columnGrouping,
      columnPinning = { columns: [] },
      className,
      tableMode,
      onStateChange,
      onRowSelect,
      onRowsSelect,
      onChange,
      emptyMessage,
      variant = 'line',
      autoSelectFirstRow,
      clientSideFiltering,
      clientSideSorting,
      onTableInstanceChange,
    }: GridProps<T>,
    ref: any,
  ) => {
    const { t } = useTranslation();
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { open } = useModal();

    // useGridTable 훅 사용
    const { table, columnFilters, sorting, columnVisibility, columnOrder } = useGridTable({
      data,
      columns,
      multiple,
      pagination,
      columnGrouping,
      columnPinning,
      clientSideFiltering,
      clientSideSorting,
      onStateChange,
      onRowSelect,
      onRowsSelect,
      onChange,
      autoSelectFirstRow,
      tableMode,
      hideRowSelectionRadioBox, // props로 전달
      hideRowSelectionCheckBox, // props로 전달
      showNumberingColumn, // props로 전달
      onTableInstanceChange, // table 인스턴스 전달 콜백
    });

    // 부모 컴포넌트에서 grid 특정 기능 수행시 필요
    useImperativeHandle(ref, () => ({
      resetRowSelection: () => {
        table.toggleAllRowsSelected(false); // table 인스턴스 사용
      },
      selectRowById: (idField: string, idValue: string) => {
        const row = table
          .getRowModel()
          .rows.find(({ original }: any) => original?.[idField] === idValue);
        if (row) {
          table.setRowSelection({ [row.id]: true }); // table 인스턴스 사용
          return true;
        }
        return false;
      },
      toggleRowById: (idField: string, idValue: string) => {
        const selectedRow = table
          .getSelectedRowModel()
          .rows.find(({ original }: any) => original?.[idField] === idValue);
        selectedRow?.toggleSelected();
      },
      toggleAllRowsSelected: (selected: boolean) => {
        table.toggleAllRowsSelected(selected);
      },
    }));

    // 고정된 왼쪽 열의 ID들 가져오기
    const pinnedLeftColumns = table.getState().columnPinning.left || [];
    // 마지막 고정 열의 ID
    const lastPinnedColumnId = pinnedLeftColumns[pinnedLeftColumns.length - 1];

    const gridClass = useMemo(
      () =>
        cn(
          className,
          tableMode ? styles.table : styles.grid,
          multiple && !hideRowSelectionCheckBox && styles.has_select_all_checkbox,
          tableMode ? 'table' : 'grid',
          tableMode && styles[variant],
          tableMode && variant,
        ),
      [className, tableMode, multiple, hideRowSelectionCheckBox, variant],
    );

    const gridStyle = useMemo(
      () =>
        ({
          maxHeight: visibleRowCount * rowHeight + table.getHeaderGroups().length * 41 + 16,
          overflow: !data?.length ? 'hidden' : 'auto',
        }) as CSSProperties,
      [visibleRowCount, rowHeight, table, data?.length],
    );

    const tableStyle = useMemo(
      () =>
        ({
          width: '100%',
          tableLayout: 'fixed',
        }) as CSSProperties,
      [],
    );

    return (
      <div className={gridClass} style={gridStyle} ref={tableContainerRef}>
        <table style={tableStyle}>
          {!hideHeader && <GridHeader table={table} lastPinnedColumnId={lastPinnedColumnId} />}
          {!isLoading && (
            <GridBody
              table={table}
              lastPinnedColumnId={lastPinnedColumnId}
              disabledSelectionToggle={disabledSelectionToggle}
            />
          )}
          {isLoading && (
            <tbody>
              <tr>
                <td colSpan={table.getAllColumns().length} style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {!data?.length && <GridEmptyMessage emptyMessage={emptyMessage} />}
      </div>
    );
  },
);

export const Grid = GridComponent;
