import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { Carousel } from '@learnway/ui';
import { IcoStar } from '@learnway/icons';
import { Review, ReviewRating } from '../../../../features/layout/';

import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/review.module.css';

const CourseReviewCompoment = ({reviews}: {reviews: any}) => {
  const itemSwiper = [<Review />, <Review />, <Review />, <Review />];

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
          <span>총 평점</span>
          <div>
            <IcoStar width={36} height={36} fill="#0056ff" />
            <strong>4.2</strong>
          </div>
        </div>
        {/* review rating */}
        <ReviewRating className={styles.review_rating} />
      </div>
      <div className={styles.review_box}>
        <Carousel
          loop={false}
          items={itemSwiper}
          className={`${styles.review_swiper}`}
          spaceBetween={20}
          slidesPerView={isMobile ? 'auto' : 3}
          showNavigation={isMobile ? false : true}
        />
      </div>
    </div>
  );
};

export const CourseReview = memo(CourseReviewCompoment);
