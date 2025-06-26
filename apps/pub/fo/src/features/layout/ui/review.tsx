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
      <div className={styles.star}>
        <IcoStar width={20} height={20} fill="#0056ff" />
        <IcoStar width={20} height={20} fill="#0056ff" />
        <IcoStar width={20} height={20} fill="#0056ff" />
        <IcoStar width={20} height={20} fill="#0056ff" />
        <IcoStar width={20} height={20} fill="#ede0f7" stroke="#d6dae1" />
      </div>
      <p className={styles.txt}>text</p>
      <div className={styles.profile}>
        <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
        <div className={styles.txt_box}>
          <strong>aa</strong>
          <span>bb</span>
        </div>
      </div>
    </div>
  );
};

export const Review = memo(ReviewComponent);
