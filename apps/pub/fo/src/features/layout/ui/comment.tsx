import { memo, useState } from 'react';
import { Button, Avatar } from '@learnway/ui';
import { IcoThumbsUp, IcoDownArrow } from '@learnway/icons';

import styles from './comment.module.css';

interface CommentProps {
  className?: string;
}

const CommentComponent = ({ className }: CommentProps) => {
  const [thumbs, setThumbs] = useState<boolean>(true);

  return (
    <div className={`${styles.start} ${styles.comment} ${className}`}>
      <i className={styles.ico_comment}>
        <IcoDownArrow width={32} height={32} stroke="#a9afb8" />
      </i>
      <div className={styles.profile}>
        <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
        <div className={styles.information}>
          <div className={styles.box}>
            <strong>박이나</strong>
          </div>
          <div className={styles.box}>
            <span>현대오토에버</span>
            <span>L&D플랫폼팀</span>
            <span>2026.07.12</span>
          </div>
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
      </div>
    </div>
  );
};

export const Comment = memo(CommentComponent);
