import { memo } from 'react';
import { Button, useModal } from '@learnway/ui';
import { ReviewPopup, ReviewDeletePopup } from '../../../../features/layout';
import styles from './review-option-popover.module.css';

interface ReviewOptionPopoverProps {
  className?: string;
}

function ReviewOptionPopoverComponent({ className }: ReviewOptionPopoverProps) {
  const { open: openModal } = useModal();

  return (
    <div className={`${styles.start} ${styles.review_option} ${className}`}>
      <ul>
        <li>
          {/* 후기 팝업 미정 */}
          <Button
          // onClick={() =>
          //   openModal({
          //     width: 'sm',
          //     content: <ReviewPopup />,
          //   })
          // }
          >
            수정
          </Button>
        </li>
        <li>
          {/* 후기 팝업 미정 */}
          <Button
            onClick={() =>
              openModal({
                width: 's',
                content: <ReviewDeletePopup />,
              })
            }
          >
            삭제
          </Button>
        </li>
      </ul>
    </div>
  );
}

export const ReviewOptionPopover = memo(ReviewOptionPopoverComponent);
