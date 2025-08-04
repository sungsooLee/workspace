import { IcoEye, IcoHeart, IcoStar } from '@learnway/icons';
import { cn, getRandomId } from '@learnway/shared';
import { Badge } from '@learnway/ui/badge';
import { ToggleButton } from '@learnway/ui/toggle-button';
import React from 'react';
import styles from './thumbnail-item.module.css';

import { Link } from '@tanstack/react-router';
import { t } from 'i18next';

// 임시 이미지
import bnrCImage1 from '@assets/images/banner/banner_category_02.png';
import { ImageFallBack } from '@learnway/ui/image-fallback/image-fallback';

export interface ThumbnailData {
  courseId: number;
  courseName: string;
  courseType: string;
  curriculumId: number;
  // countInfoNode
  starRatingAverage: number;
  viewCount: number;
  likeCount: number;
  // labelCustomNode
  imageUrl: string;
  toggleButton?: boolean;
  // infoCustomNode
  isNew: boolean;
  isEnrollOpen: boolean;
  isLike: boolean;
  dday: number;
  tags: string[];
}

interface ThumbnailItemProps {
  data: ThumbnailData;
  direction?: 'horizontal' | 'vertical';
  stacked?: boolean;
  className?: string;
}

export const ThumbnailItem: React.FC<ThumbnailItemProps> = ({
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
      <Link to={'/'} state={{}} className={styles.thumbnail_link}>
        {/* thumbnail , badge */}
        <div className={styles.thumbnail_view}>
          <ImageFallBack
            stacked={stacked}
            imageUrl={data.imageUrl ? data.imageUrl : bnrCImage1}
            className={styles.thumbnail_image}
          />
          <div className={styles.custom_node}>
            {data.isNew && (
              <Badge
                variant="text"
                status="primary"
                size="xs"
                option={{ label: 'New', value: `${getRandomId()}` }}
              />
            )}
            {data.isEnrollOpen && (
              <Badge
                variant="text"
                status="gray"
                size="xs"
                option={{ label: t('적용'), value: `${getRandomId()}` }}
              />
            )}
            {data.dday && data.dday !== 0 && (
              <Badge
                variant="text"
                status="caution"
                size="xs"
                option={{ label: `D-${data.dday}`, value: `${getRandomId()}` }}
              />
            )}
          </div>
        </div>
        <div className={styles.thumbnail_info}>
          {data.tags && data.tags.length > 0 && (
            <div className={styles.tag_list}>
              {data.tags.map((tag, index) => (
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
          <p className={styles.thumbnail_title}>{data.courseName}</p>
          {/* icon info  */}
          <div className={styles.count_info_node}>
            <span>
              <IcoStar width={20} height={20} stroke="#0056FF" fill="#0056FF" />
              <em>{data.starRatingAverage}</em>
            </span>
            <span>
              <IcoEye width={20} height={20} fill="none" stroke="#4D525C" />
              <em>{data.viewCount}</em>
            </span>
            <span>
              <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
              <em>{data.likeCount}</em>
            </span>
          </div>
        </div>
      </Link>
      <ToggleButton variant={'heart'} className={styles.toggle_btn} />
    </div>
  );
};
