import React, { CSSProperties } from 'react';
import { Cell, flexRender, Row, Table } from '@tanstack/react-table';
import { cn } from '@learnway/shared';

import styles from './grid-body.module.css';
import { WordWrap } from '../word-wrap/word-wrap';

// GridBody.tsx (새 파일)
interface GridBodyProps<T extends object> {
  table: Table<T>;
  lastPinnedColumnId: string | undefined;
  disabledSelectionToggle?: boolean;
  onRowDoubleClick?: (selectedRow: any) => void;
}

export const GridBody = <T extends object>({
  table,
  lastPinnedColumnId,
  disabledSelectionToggle,
  onRowDoubleClick,
}: GridBodyProps<T>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        const depth = (row.original as any)?._depth ?? row.depth;
        const isSubRow = depth > 0;

        return (
          <tr
            key={row.id}
            className={cn(
              row.getIsSelected() && styles.selected,
              isSubRow && styles.appended,
              depth > 0 && styles.appended,
            )}
            onClick={() => !row.getIsGrouped() && !disabledSelectionToggle && row.toggleSelected()}
            onDoubleClick={() => onRowDoubleClick?.(row.original)}
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
        );
      })}
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

export const GridCell = <T extends object>({ row, cell, lastPinnedColumnId }: GridCellProps<T>) => {
  const isPinnedLeft = cell.column.getIsPinned() === 'left';
  const isLastPinnedColumn = isPinnedLeft && cell.column.id === lastPinnedColumnId;

  const depth = (row.original as any)?._depth ?? row.depth;
  const showHierarchyIcon = cell.column.columnDef.meta?.showHierarchyIcon;
  const shouldShowIcon = showHierarchyIcon && depth > 0;

  const cellStyle = {
    background: cell.getIsGrouped()
      ? '#0aff0082'
      : // : cell.getIsAggregated()
        //   ? '#ffa50078'
        cell.getIsPlaceholder()
        ? '#ff000042'
        : '',
    width: cell.column.getSize(),
    // position: isPinnedLeft && styles.td_sticky,
    textAlign: cell.column.columnDef.meta?.cellAlign || 'left',
    position: isPinnedLeft ? 'sticky' : undefined,
    left: isPinnedLeft ? `${cell.column.getStart('left')}px` : undefined,
  } as CSSProperties;

  return (
    <td
      key={cell.id}
      className={cn(
        styles.tbody_td,
        isPinnedLeft && styles.td_pinned_left,
        isLastPinnedColumn && styles.td_pinned_last,
        cell.column.columnDef.meta?.cellClass,
      )}
      style={cellStyle}
    >
      {cell.getIsGrouped() ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            row.toggleExpanded();
          }}
          style={{
            cursor: row.getIsGrouped() ? 'default' : 'pointer',
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
        </button>
      ) : row.getCanExpand() ? (
        <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
      ) : cell.getIsAggregated() ? (
        flexRender(
          cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
          cell.getContext(),
        )
      ) : cell.getIsPlaceholder() ? null : (
        <>
          {shouldShowIcon && depth > 0 && <>ㄴ</>}
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </>
        // 다양한 케이스 추가 작업 후 추가 필요.
        // <WordWrap text={flexRender(cell.column.columnDef.cell, cell.getContext())} />
      )}
    </td>
  );
};
