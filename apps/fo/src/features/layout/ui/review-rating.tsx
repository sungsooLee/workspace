import { memo } from 'react';
import { ProgressBar } from '@learnway/ui';
import { IcoStar } from '@learnway/icons';

import styles from '@learnway/styles/fo/features/layout/ui/review-rating.module.css';

interface ReviewRatingProps {
  className?: string;
}

const ReviewRatingComponent = ({ className }: ReviewRatingProps) => {
  return (
    <div className={`${styles.start} ${styles.rating_box} ${className}`}>
      <ul>
        <li>
          <div className={styles.box}>
            <strong>5점</strong>
            <div>
              <ProgressBar progress={89} />
              <span className={styles.blue}>89%</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <strong>4점</strong>
            <div>
              <ProgressBar progress={40} />
              <span>40%</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <strong>3점</strong>
            <div>
              <ProgressBar progress={30} />
              <span>30%</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <strong>2점</strong>
            <div>
              <ProgressBar progress={10} />
              <span>10%</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <strong>1점</strong>
            <div>
              <ProgressBar progress={0} />
              <span>0%</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export const ReviewRating = memo(ReviewRatingComponent);
