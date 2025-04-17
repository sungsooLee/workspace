import { memo, useState } from 'react';
import { Progress } from '@learnway/ui';
import { IcoStar, IcoDownArrow } from '@learnway/icons';

import styles from './review-rating.module.css';

interface ReviewRatingProps {
  className?: string;
}

const ReviewRatingComponent = ({ className }: ReviewRatingProps) => {
  return (
    <div className={`${styles.start} ${styles.rating_box} ${className}`}>
      <div className={styles.box}>
        <strong className={styles.tit}>총 평점</strong>
        <p className={styles.number}>
          <IcoStar width={32} height={32} fill="#ffb902" />
          4.2
        </p>
      </div>
      <div className={styles.box}>
        <strong className={styles.tit}>전체 참가자수</strong>
        <p className={styles.number}>999,999+</p>
      </div>
      <div className={styles.box}>
        <ul>
          <li>
            <span>5점</span>
            <Progress value={100} />
            <span>999,999+</span>
          </li>
          <li>
            <span>4점</span>
            <Progress value={40} />
            <span>10</span>
          </li>
          <li>
            <span>3점</span>
            <Progress value={40} />
            <span>999,999+</span>
          </li>
          <li>
            <span>2점</span>
            <Progress value={40} />
            <span>999,999+</span>
          </li>
          <li>
            <span>1점</span>
            <Progress value={40} />
            <span>999,999+</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const ReviewRating = memo(ReviewRatingComponent);
