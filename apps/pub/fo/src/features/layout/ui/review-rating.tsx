import { memo } from 'react';
import { ProgressBar } from '@learnway/ui';
import { IcoStar } from '@learnway/icons';

import styles from './review-rating.module.css';

interface ReviewRatingProps {
  className?: string;
}

const ReviewRatingComponent = ({ className }: ReviewRatingProps) => {
  return (
    <div className={`${styles.start} ${styles.rating_box} ${className}`}>
      <ul>
        <li>
          <div className={styles.box}>
            <p>직무 역량 향상에 도움이 돼요</p>
            <div>
              <ProgressBar progress={89} />
              <span className={styles.blue}>89%</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <p>실무에 적용하기 유용해요</p>
            <div>
              <ProgressBar progress={76} />
              <span>76%</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <p>직무 역량 향상에 도움이 돼요</p>
            <div>
              <ProgressBar progress={18} />
              <span>18%</span>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <p>직무 역량 향상에 도움이 돼요</p>
            <div>
              <ProgressBar progress={3} />
              <span>3%</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export const ReviewRating = memo(ReviewRatingComponent);
