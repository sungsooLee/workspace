import { memo, useState } from 'react';
import { Button } from '@learnway/ui';
import { IcoArrowDown } from '@learnway/icons';
import { Review, ReviewRating } from '../../../../features/layout';

import styles from './review.module.css';

const CourseReviewCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.review_wrap}`}>
      <h2>
        후기<span>999,999+</span>
      </h2>
      {/* review rating */}
      <ReviewRating className={styles.review_rating} />
      <div className={styles.review_box}>
        <ul className={styles.review_list}>
          {/* review */}
          <li>
            <Review />
          </li>
          <li>
            <Review />
          </li>
        </ul>
        {/* 더보기 */}
        <div className={styles.more_box}>
          <Button className={styles.btn_more}>
            <span>더보기</span>
            <IcoArrowDown width={16} height={16} stroke="#6f798b" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CourseReview = memo(CourseReviewCompoment);
