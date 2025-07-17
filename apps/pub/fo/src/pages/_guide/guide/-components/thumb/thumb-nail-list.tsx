import React from 'react';
import ThumbnailItem, { ThumbnailData } from './thumb-nail-item';
import styles from './thumb-nail-list.module.css';
import { cn } from '@learnway/shared';

interface ThumbnailListProps {
  items: ThumbnailData[];
  direction?: 'horizontal' | 'vertical';
  stacked?: boolean;
  className?: string;
}

const ThumbnailList: React.FC<ThumbnailListProps> = ({
  items,
  direction = 'vertical',
  stacked = false,
  className,
}) => {
  return (
    <div className={cn(styles.start, styles.thumbnail_list, className, 'thumbnail_list')}>
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
