import React from 'react';
import ThumbnailItem, { ThumbnailData } from './thumb-nail-item';
import styles from './thumb-nail-list.module.css';
import { cn } from '@learnway/shared';

interface ThumbnailListProps {
  items: ThumbnailData[];
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const ThumbnailList: React.FC<ThumbnailListProps> = ({
  items,
  direction = 'vertical',
  className,
}) => {
  return (
    <div className={cn(styles.thumbnail_list, className, 'thumbnail_list')}>
      {items.map((item, index) => (
        <ThumbnailItem key={index} data={item} direction={direction} />
      ))}
    </div>
  );
};

export default ThumbnailList;
