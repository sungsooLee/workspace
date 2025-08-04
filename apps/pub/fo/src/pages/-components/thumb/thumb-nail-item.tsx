import { cn } from '@learnway/shared';
import { Badge } from '@learnway/ui/badge';
import { ImageFallBack } from '@learnway/ui/image-fallback/image-fallback';
import { Link } from '@tanstack/react-router';
import React from 'react';
import ToggleButton from '../toggle-button/toggle-button';
import styles from './thumb-nail-item.module.css';

export interface ThumbnailData {
  linkUrl?: string;
  imageUrl: string;
  title: string;
  labelCustomNode?: React.ReactNode[];
  tagLabels?: string[];
  infoCustomNode?: React.ReactNode[];
  toggleButton?: boolean;
  countInfoNode?: React.ReactNode[];
  indexNumber?: string;
}

interface ThumbnailItemProps {
  data: ThumbnailData;
  direction?: 'horizontal' | 'vertical';
  stacked?: boolean;
  className?: string;
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
      <Link to={data.linkUrl} className={styles.thumbnail_link}>
        {/* thumbnail , badge */}
        <div className={styles.thumbnail_view}>
          <ImageFallBack
            imageUrl={data.imageUrl}
            className={styles.thumbnail_image}
            stacked={stacked}
          />

          {data.labelCustomNode && <div className={styles.custom_node}>{data.labelCustomNode}</div>}
          {data.indexNumber && <span className={styles.index_node}>{data.indexNumber}</span>}
        </div>
        <div className={styles.thumbnail_info}>
          {data.infoCustomNode && (
            <div className={styles.custom_info_node}>{data.infoCustomNode}</div>
          )}
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
          {/* title */}
          <p className={styles.thumbnail_title}>{data.title}</p>
          {/* icon info  */}
          {data.countInfoNode && <div className={styles.count_info_node}>{data.countInfoNode}</div>}
        </div>
      </Link>
      {data.toggleButton && <ToggleButton variant={'heart'} className={styles.toggle_btn} />}
    </div>
  );
};

export default ThumbnailItem;
