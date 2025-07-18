import React from 'react';
import styles from './thumb-nail-item.module.css';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Badge, Thumbnail } from '@learnway/ui';
import ToggleButton from '../toggle-button/toggle-button';

export interface ThumbnailData {
  imageUrl: string;
  title: string;
  labelCustomNode?: React.ReactNode[];
  tagLabels?: string[];
  toggleBtnLabel?: string;
  toggleBtnIcon?: React.ReactNode;
}

interface ThumbnailItemProps {
  data: ThumbnailData;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  stacked?: boolean;
}

const ThumbnailItem: React.FC<ThumbnailItemProps> = ({
  data,
  direction = 'vertical',
  stacked = false,
  className,
}) => {
  return (
    <div
      className={cn(
        styles.start,
        styles.thumbnail_item,
        stacked && styles.stacked_item,
        direction && styles[direction],
        className,
        'thumbnail_item',
      )}
    >
      <Link to={'/'} className={styles.thumbnail_link}>
        <div className={styles.thumbnail_view}>
          <Thumbnail
            stacked={stacked}
            path={data.imageUrl}
            enableHover={false}
            className={styles.thumbnail_image}
          />
          {data.labelCustomNode && <div className={styles.custom_node}>{data.labelCustomNode}</div>}
        </div>
        <div className={styles.thumbnail_info}>
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
        </div>
      </Link>
      <ToggleButton label={data.toggleBtnLabel} icon={data.toggleBtnIcon} />
    </div>
  );
};

export default ThumbnailItem;
