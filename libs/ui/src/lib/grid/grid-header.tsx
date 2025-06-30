import React, { CSSProperties, useCallback, useRef } from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import { IcoGridOrder } from '@learnway/icons';

import styles from './grid-header.module.css';

// GridHeader.tsx (새 파일)
interface GridHeaderProps<T extends object> {
  table: Table<T>;
  hideHeader?: boolean;
  lastPinnedColumnId: string | undefined;
}

export const GridHeader = <T extends object>({ table, lastPinnedColumnId }: GridHeaderProps<T>) => {
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resizeColumnRef = useRef<string | null>(null);

  const handleResizeEnd = useCallback((columnId: string, newSize: number) => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      console.log(`resize`);
      resizeColumnRef.current = null;
    }, 300);
  }, []);

  const createCustomResizeHandler = useCallback(
    (header: any) => {
      const originalHandler = header.getResizeHandler();

      return (event: React.MouseEvent | React.TouchEvent) => {
        resizeColumnRef.current = header.column.id;

        originalHandler(event);

        const handleMouseUp = () => {
          if (resizeColumnRef.current) {
            const currentSize = header.getSize();
            handleResizeEnd(resizeColumnRef.current, currentSize);
          }
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('touchend', handleMouseUp);
        };

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);
      };
    },
    [handleResizeEnd],
  );
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const { column } = header;
            const { columnDef } = column;
            const isPinnedLeft = column.getIsPinned() === 'left';
            const isLastPinnedColumn = isPinnedLeft && column.id === lastPinnedColumnId;

            const thClass = cn(
              styles.thead_th,
              isPinnedLeft && styles.th_pinned_left,
              isLastPinnedColumn && styles.th_pinned_last,
            );

            const thStyle = {
              width: columnDef.meta?.size || `${header.getSize()}px`, // px 단위로 명시
              minWidth: `${header.getSize()}px`,
              maxWidth: `${header.getSize()}px`,
              position: isPinnedLeft && styles.th_sticky,
              left: isPinnedLeft ? `${column.getStart('left')}px` : undefined,
              // zIndex: isPinnedLeft ? 3 : undefined, // 헤더는 더 높은 z-index
              textAlign: columnDef.meta?.headerAlign || 'left',
            } as CSSProperties;

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={cn(
                  thClass,
                  styles.th_wrap,
                  column.getCanSort() ? 'cursor-pointer select-none' : '',
                  columnDef.meta?.headerAlign === 'center' && styles.text_center,
                )}
                style={thStyle}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  column.getToggleSortingHandler()?.(e);
                }}
              >
                <div className={styles.th_content}>
                  {/* render */}
                  {header.isPlaceholder ? null : flexRender(columnDef.header, header.getContext())}
                  {/* sort */}
                  {column.getCanSort() && <SortIcon direction={column.getIsSorted()} />}
                </div>
                {column.getCanResize() && (
                  <div
                    onMouseDown={createCustomResizeHandler(header)}
                    onTouchStart={createCustomResizeHandler(header)}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    className={cn(styles.resizer, column.getIsResizing() && styles.resizing)}
                  />
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

const SortIcon = ({ direction }: { direction: 'asc' | 'desc' | false }) => {
  if (!direction) return null;
  return direction === 'asc' ? (
    <IcoGridOrder
      width={7}
      height={4}
      fill={'#00afd5'}
      stroke={'#00afd5'}
      className={styles.icon_up}
    />
  ) : (
    <IcoGridOrder
      width={7}
      height={4}
      fill={'#00afd5'}
      stroke={'#00afd5'}
      className={styles.icon_down}
    />
  );
};
