import { cn } from '@learnway/shared';
import React from 'react';
import ThumbnailItem, { ThumbnailData } from '../item/thumb-nail-item';
import styles from './thumb-nail-list.module.css';

interface ThumbnailListProps {
  items: ThumbnailData[];
  direction?: 'horizontal' | 'vertical';
  stacked?: boolean;
  cols?: number;
  className?: string;
}

const ThumbnailList: React.FC<ThumbnailListProps> = ({
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

export default ThumbnailList;
