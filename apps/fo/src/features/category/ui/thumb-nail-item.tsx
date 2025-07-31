import React from 'react';
import styles from '@learnway/styles/fo/features/layout/ui/thumb-nail-item.module.css';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Badge, Thumbnail } from '@learnway/ui';
import { IcoEye, IcoHeart, IcoStar } from '@learnway/icons';

export interface ThumbnailData {
  courseId: number,
  courseName: string,
  courseType: string,
  curriculumId: number,
  starRatingAverage: number,
  viewCount: number,
  likeCount: number

  linkUrl?: string;
  imageUrl: string;
  // title: string;
  // labelCustomNode?: React.ReactNode[];
  // tagLabels?: string[];
  // infoCustomNode?: React.ReactNode[];
  // toggleButton?: boolean;
  // countInfoNode?: React.ReactNode[];
  // indexNumber?: string;
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
      <Link to={data.linkUrl ?? '/'} className={styles.thumbnail_link}>
        {/* thumbnail , badge */}
        <div className={styles.thumbnail_view}>
          <Thumbnail
            stacked={stacked}
            path={data.imageUrl ?? ''}
            enableHover={false}
            className={styles.thumbnail_image}
          />
          {/*{data.labelCustomNode && <div className={styles.custom_node}>{data.labelCustomNode}</div>}*/}
          {/*  {data.indexNumber && <span className={styles.index_node}>{data.indexNumber}</span>}*/}
        </div>
        <div className={styles.thumbnail_info}>
        {/*  {data.infoCustomNode && (*/}
        {/*    <div className={styles.custom_info_node}>{data.infoCustomNode}</div>*/}
        {/*  )}*/}
        {/*  {data.tagLabels && data.tagLabels.length > 0 && (*/}
        {/*    <div className={styles.tag_list}>*/}
        {/*      {data.tagLabels.map((tag, index) => (*/}
        {/*        <Badge*/}
        {/*          key={index}*/}
        {/*          variant="outline"*/}
        {/*          status="gray"*/}
        {/*          size="xs"*/}
        {/*          option={{ label: `${tag}`, value: `${index}` }}*/}
        {/*        />*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  )}*/}
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
      {/*{data.toggleButton && <ToggleButton variant={'heart'} className={styles.toggle_btn} />}*/}
    </div>
  );
};

export default ThumbnailItem;
