import React, { CSSProperties, useRef } from 'react';
import { Cell, flexRender, Row, Table } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import { IcoDownArrow } from '@learnway/icons';

import styles from './grid-body.module.css';
import { WordWrap } from '../word-wrap/word-wrap';
import { useTooltip } from './tooltip-context';

// GridBody.tsx (새 파일)
interface GridBodyProps<T extends object> {
  table: Table<T>;
  lastPinnedColumnId: string | undefined;
  disabledSelectionToggle?: boolean;
  onRowDoubleClick?: (selectedRow: any) => void;
  isRowSelectable?: (row: T) => boolean;
  getRowClassName?: (row: T) => string;
}

export const GridBody = <T extends object>({
  table,
  lastPinnedColumnId,
  disabledSelectionToggle,
  onRowDoubleClick,
  isRowSelectable,
  getRowClassName,
}: GridBodyProps<T>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        const depth = (row.original as any)?._depth ?? row.depth;
        const isSubRow = depth > 0;
        const canSelect = isRowSelectable ? isRowSelectable(row.original) : true;

        return (
          <tr
            key={row.id}
            className={cn(
              row.getIsSelected() && styles.selected,
              isSubRow && styles.appended,
              depth > 0 && styles.appended,
              getRowClassName?.(row.original),
            )}
            onClick={() =>
              !row.getIsGrouped() && !disabledSelectionToggle && canSelect && row.toggleSelected()
            }
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
  const cellRef = useRef<HTMLTableCellElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { showTooltip, hideTooltip } = useTooltip();

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
    width: `${cell.column.getSize()}px`,
    // position: isPinnedLeft && styles.td_sticky,
    textAlign: cell.column.columnDef.meta?.cellAlign || 'left',
    position: isPinnedLeft ? 'sticky' : undefined,
    left: isPinnedLeft ? `${cell.column.getStart('left')}px` : undefined,
  } as CSSProperties;

  const handleMouseEnter = (event: React.MouseEvent<HTMLTableCellElement>) => {
    const element = event.currentTarget;

    // 이전 타이머 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!element || !element.isConnected) return;

      const textElement = element.querySelector('span, div') || element;

      // 텍스트가 잘렸는지 확인
      if (
        textElement.scrollWidth > textElement.clientWidth ||
        textElement.scrollHeight > textElement.clientHeight
      ) {
        const cellValue = cell.getValue();
        const text = typeof cellValue === 'string' ? cellValue : String(cellValue || '');

        if (text && text.trim()) {
          const rect = element.getBoundingClientRect();
          showTooltip(text, {
            x: rect.left + rect.width / 2,
            y: rect.top - 5,
          });
        }
      }
    }, 500); // 500ms 지연 호버 툴팁 표시
  };

  const handleMouseLeave = () => {
    // 타이머 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    hideTooltip();
  };

  return (
    <td
      ref={cellRef}
      key={cell.id}
      className={cn(
        styles.tbody_td,
        isPinnedLeft && styles.td_pinned_left,
        isLastPinnedColumn && styles.td_pinned_last,
        shouldShowIcon && styles.show_icon,
        cell.column.columnDef.meta?.cellClass,
      )}
      style={cellStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
      ) : cell.getIsAggregated() ? (
        flexRender(
          cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
          cell.getContext(),
        )
      ) : cell.getIsPlaceholder() ? null : (
        <>
          {shouldShowIcon && depth > 0 && (
            <IcoDownArrow width={16} height={16} stroke={'#4C515E'} className={styles.depth_icon} />
          )}
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </>
      )}
    </td>
  );
};
