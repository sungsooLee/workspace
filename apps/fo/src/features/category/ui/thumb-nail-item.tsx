import React from 'react';
import styles from '@learnway/styles/fo/features/layout/ui/thumb-nail-item.module.css';
import { Link } from '@tanstack/react-router';
import { cn, getRandomId } from '@learnway/shared';
import { Badge, Thumbnail, ToggleButton } from '@learnway/ui';
import { IcoEye, IcoHeart, IcoStar } from '@learnway/icons';

// 임시 이미지
import bnrCImage1 from '../../../assets/images/banner/banner_category_02.png';

export interface ThumbnailData {
  courseId: number,
  courseName: string,
  courseType: string,
  curriculumId: number,
  // countInfoNode
  starRatingAverage: number,
  viewCount: number,
  likeCount: number
  // labelCustomNode
  linkUrl: string;
  imageUrl: string;
  toggleButton?: boolean;
  // infoCustomNode
  isNew: boolean;
  isAccepting: boolean;
  dayOrDay: string;
  tagLabels: string[];
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
      <Link to={data.linkUrl ?? '/'} className={styles.thumbnail_link}>
        {/* thumbnail , badge */}
        <div className={styles.thumbnail_view}>
          <Thumbnail
            stacked={stacked}
            path={data.imageUrl ? '' : bnrCImage1}
            enableHover={false}
            className={styles.thumbnail_image}
          />
          <div className={styles.custom_node}>
            {
              data.isNew && (
                <Badge
                  variant="text"
                  status="primary"
                  size="xs"
                  option={{ label: 'New', value: `${getRandomId()}` }}
                />
              )
            }
            {
              data.isAccepting && (
                <Badge
                  variant="text"
                  status="gray"
                  size="xs"
                  option={{ label: '접수중', value: `${getRandomId()}` }}
                />
              )
            }
            {
              data.dayOrDay && (
                <Badge
                  variant="text"
                  status="caution"
                  size="xs"
                  option={{ label: data.dayOrDay, value: `${getRandomId()}` }}
                />
              )
            }
          </div>
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
          {/* title */}
          <p className={styles.thumbnail_title}>{data.courseName}</p>
          {/* icon info  */}
          <div className={styles.count_info_node} >
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
      {data.toggleButton && <ToggleButton variant={'heart'} className={styles.toggle_btn} />}
    </div>
  );
};
