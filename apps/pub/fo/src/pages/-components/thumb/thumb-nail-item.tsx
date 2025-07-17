import React from 'react';
import styles from './thumb-nail-item.module.css';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Badge, Thumbnail } from '@learnway/ui';
import { IcoHeart, IcoStar, IcoEye } from '@learnway/icons';

export interface ThumbnailData {
  imageUrl: string;
  title: string;
  labelCustomNode?: React.ReactNode[];
  tagLabels?: string[];
  infoCustomNode?: React.ReactNode[];
  iconType?: IconType;
  infoText?: string;
}

interface ThumbnailItemProps {
  data: ThumbnailData;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  stacked?: boolean;
}

type IconType = 'alert' | 'check' | 'info';

const iconMap: Record<IconType, JSX.Element> = {
  alert: <IcoStar />,
  check: <IcoHeart />,
  info: <IcoEye />,
};

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
          <p className={styles.thumbnail_title}>{data.title}</p>
          <p className={styles.info}>
            <span></span>
            <IcoStar width={16} height={16} stroke="#0056ff" fill="#0056ff" />
            <IcoHeart width={16} height={16} stroke="#f58b75" fill="#f58b75" />
            <IcoEye width={16} height={16} stroke="#0056ff" />
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ThumbnailItem;
