import React from 'react';
import styles from './thumb-nail-item.module.css';
import { cn, getRandomId } from '@learnway/shared';
import { Badge, Thumbnail } from '@learnway/ui';
import ToggleButton from '../toggle-button/toggle-button';

export interface ThumbnailData {
  imageUrl: string;
  title: string;
  showNewLabel?: boolean;
  showTimeText?: string;
  tagLabels?: string[];
  toggleBtnLabel?: string;
  toggleBtnIcon?: React.ReactNode;
}

interface ThumbnailItemProps {
  data: ThumbnailData;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const ThumbnailItem: React.FC<ThumbnailItemProps> = ({
  data,
  direction = 'vertical',
  className,
}) => {
  return (
    <div
      className={cn(
        styles.start,
        styles.thumbnail_item,
        direction && styles[direction],
        className,
        'thumbnail_item',
      )}
    >
      <div className={styles.thumbnail_view}>
        <Thumbnail path={data.imageUrl} className={styles.thumbnail_image} />
        {data.showNewLabel && (
          <Badge
            variant="text"
            status="primary"
            size="xs"
            option={{ label: 'New', value: `${getRandomId()}` }}
            className={styles.new_badge}
          />
        )}
        {data.showTimeText && <span className={styles.time}>{data.showTimeText}</span>}
      </div>
      {data.tagLabels && data.tagLabels.length > 0 && (
        <div className={styles.tag_list}>
          {data.tagLabels.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              status="gray"
              size="xs"
              option={{ label: `${tag}`, value: `${index}` }}
            />
          ))}
        </div>
      )}
      <p className={styles.thumbnail_title}>{data.title}</p>
      <ToggleButton label={data.toggleBtnLabel} icon={data.toggleBtnIcon} />
    </div>
  );
};

export default ThumbnailItem;
