import React, { memo, useState } from 'react';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/layout/ui/thumbnail-list.module.css';
import ThumbnailItem, { ThumbnailData } from '@features/category/ui/thumb-nail-item';

interface ThumbnailListProps {
  items: ThumbnailData[];
  direction?: 'horizontal' | 'vertical';
  stacked?: boolean;
  cols?: number;
  className?: string;
}

const ThumbnailListComponent: React.FC<ThumbnailListProps> = (
  {
    items,
    direction = 'vertical',
    stacked = false,
    cols,
    className,
  }) => {
  return (
    <div
      className={cn(
        styles.start,
        styles.thumbnail_list,
        cols && styles[`item_col${cols}`],
        direction && styles[direction],
        'thumbnail_list',
        className,
      )}
      style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
    >
      {items.map((item, index) => (
        <ThumbnailItem
          stacked={stacked}
          key={index}
          data={item}
          direction={direction}
          className={styles.thumbnail_item}
        />
      ))}
    </div>
  );
};

export const ThumbnailList = memo(ThumbnailListComponent);
