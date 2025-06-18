import React, { CSSProperties } from 'react';
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
              width: columnDef.meta?.size || header.getSize(),
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
                onClick={column.getToggleSortingHandler()}
              >
                {/* render */}
                {header.isPlaceholder ? null : flexRender(columnDef.header, header.getContext())}
                {/* sort */}
                {column.getCanSort() && <SortIcon direction={column.getIsSorted()} />}
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
