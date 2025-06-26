import { memo, useState } from 'react';
import { Button, Carousel } from '@learnway/ui';
import { IcoArrowDown } from '@learnway/icons';
import { Review, ReviewRating } from '../../../../features/layout';

import styles from './review.module.css';

import imgNudge from '@learnway/styles/fo/assets/images/common/img_nudge.png';

const CourseReviewCompoment = () => {
  // 퍼블수정 20250625 swiper (작업 진행 예정)
  const itemSwiper = [<Review />, <Review />, <Review />];

  return (
    <div className={`${styles.start} ${styles.review_wrap}`}>
      <div className={styles.tit_box}>
        <h2>
          과정후기<span>1M+</span>
        </h2>
        <p>472명의 동료들 참여한 평가</p>
      </div>
      <div className={styles.rating_wrap}>
        <div className={styles.know_box}>
          <img src={imgNudge} alt="" />
          <p>
            직무 역량 향상에
            <br />
            도움이 돼요
          </p>
        </div>
        {/* review rating */}
        <ReviewRating className={styles.review_rating} />
      </div>
      <div className={styles.review_box}>
        <Carousel
          items={itemSwiper}
          className={`${styles.review_swiper}`}
          // spaceBetween={20}
          slidesPerView={3}
          // navigation={true}
        />
      </div>
    </div>
  );
};

export const CourseReview = memo(CourseReviewCompoment);
