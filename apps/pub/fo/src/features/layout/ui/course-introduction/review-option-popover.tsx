import { memo } from 'react';
import { Button } from '@learnway/ui';

import styles from './review-option-popover.module.css';

interface ReviewOptionPopoverProps {
  className?: string;
}

function ReviewOptionPopoverComponent({ className }: ReviewOptionPopoverProps) {
  return (
    <div className={`${styles.start} ${styles.review_option} ${className}`}>
      <ul>
        <li>
          <Button>수정</Button>
        </li>
        <li>
          <Button>삭제</Button>
        </li>
      </ul>
    </div>
  );
}

export const ReviewOptionPopover = memo(ReviewOptionPopoverComponent);
