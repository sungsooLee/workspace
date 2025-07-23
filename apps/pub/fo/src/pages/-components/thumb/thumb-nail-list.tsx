import React from 'react';
import ThumbnailItem, { ThumbnailData } from './thumb-nail-item';
import styles from './thumb-nail-list.module.css';
import { cn } from '@learnway/shared';

interface ThumbnailListProps {
  items: ThumbnailData[];
  direction?: 'horizontal' | 'vertical';
  stacked?: boolean;
  className?: string;
  cols?: number;
}

const ThumbnailList: React.FC<ThumbnailListProps> = ({
  items,
  direction = 'vertical',
  stacked = false,
  className,
  cols,
}) => {
  return (
    <div
      className={cn(
        styles.start,
        styles.thumbnail_list,
        className,
        cols && styles[`item_col${cols}`],
        'thumbnail_list',
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
