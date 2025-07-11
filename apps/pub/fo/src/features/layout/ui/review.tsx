import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Avatar, Popover } from '@learnway/ui';
import { IcoStar, IcoMoreVertical } from '@learnway/icons';
import { ReviewOptionPopover, Comment } from '../../../features/layout';

import styles from './review.module.css';

interface ReviewProps {
  className?: string;
}

const ReviewComponent = ({ className }: ReviewProps) => {
  return (
    <div className={`${styles.start} ${styles.review_wrap} ${className}`}>
      <Popover
        popoverContent={<ReviewOptionPopover />}
        side="bottom"
        align="end"
        sideOffset={5}
        className={styles.btn}
      >
        <IcoMoreVertical width={24} height={24} fill="#6b7280" />
      </Popover>
      <div className={styles.star}>
        <IcoStar width={20} height={20} fill="#0056ff" />
        <IcoStar width={20} height={20} fill="#0056ff" />
        <IcoStar width={20} height={20} fill="#0056ff" />
        <IcoStar width={20} height={20} fill="#0056ff" />
        <IcoStar width={20} height={20} fill="#ede0f7" stroke="#d6dae1" />
      </div>
      <p className={styles.txt}>“넘 좋은것 같아요! 단, ....”</p>
      <div className={styles.profile}>
        <Avatar
          imageUrl="https://github.com/shadcn.png"
          size={isMobile ? 'md' : 'lg'}
          className={styles.info_avata}
        />
        <div className={styles.txt_box}>
          <strong>김현우님의 리뷰</strong>
          <span>전략사업본부 소속</span>
        </div>
      </div>
    </div>
  );
};

export const Review = memo(ReviewComponent);
