import { memo, useState } from 'react';
import { Button, Avatar, Popover } from '@learnway/ui';
import { IcoStar, IcoPin, IcoThumbsUp, IcoMessageCircle, IcoMoreVertical } from '@learnway/icons';
import { ReviewOptionPopover, Comment } from '../../../features/layout';

import styles from './review.module.css';

interface ReviewProps {
  className?: string;
}

const ReviewComponent = ({ className }: ReviewProps) => {
  const [thumbs, setThumbs] = useState<boolean>(true);
  const [commentShow, setCommentShow] = useState<boolean>(true);

  return (
    <div className={`${styles.start} ${styles.review_wrap} ${className}`}>
      <div className={styles.review}>
        <div className={styles.profile}>
          <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
          <div className={styles.information}>
            <div className={styles.box}>
              <strong>박이나</strong>
              <div className={styles.star}>
                <IcoStar width={16} height={16} fill="#ffb902" />
                <IcoStar width={16} height={16} fill="#ffb902" />
                <IcoStar width={16} height={16} fill="#ffb902" />
                <IcoStar width={16} height={16} fill="#ffb902" />
                <IcoStar width={16} height={16} fill="#ede0f7" stroke="#d6dae1" />
              </div>
            </div>
            <div className={styles.box}>
              <span>현대오토에버</span>
              <span>L&D플랫폼팀</span>
              <span>2026.07.12</span>
              {/* pin */}
              <i className={styles.pin}>
                <IcoPin width={20} height={20} fill="#d6dae1" stroke="#d6dae1" />
              </i>
            </div>
            <Popover
              popoverContent={<ReviewOptionPopover />}
              side="bottom"
              align="end"
              sideOffset={5}
              className={styles.setting}
            >
              <IcoMoreVertical width={24} height={24} fill="#6f798b" stroke="#6f798b" />
            </Popover>
          </div>
        </div>
        <p className={styles.txt}>
          안녕하세요. 저는 영어 발음이 잘 이해가 안갑니다.
          <br />
          그래도 선생님 설명이 아주 좋아요! 저는 만족합니다.
          <br />
          발음때문에 -1점 했어요
        </p>
        <div className={styles.count_box}>
          <Button
            className={thumbs === true ? styles.active : ''}
            onClick={() => (thumbs === true ? setThumbs(false) : setThumbs(true))}
          >
            <IcoThumbsUp width={20} height={20} stroke="#6f798b" />
            34
          </Button>
          <Button
            onClick={() => (commentShow === true ? setCommentShow(false) : setCommentShow(true))}
          >
            <IcoMessageCircle width={20} height={20} />2
          </Button>
        </div>
      </div>

      {commentShow === true ? (
        <>
          <Comment />
          <Comment />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export const Review = memo(ReviewComponent);
