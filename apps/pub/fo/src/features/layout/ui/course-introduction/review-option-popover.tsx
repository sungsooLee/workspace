import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { Button, useModal } from '@learnway/ui';
import { ReviewPopup } from '../../../../features/layout';
import styles from './review-option-popover.module.css';

interface ReviewOptionPopoverProps {
  className?: string;
}

function ReviewOptionPopoverComponent({ className }: ReviewOptionPopoverProps) {
  const { open: openModal } = useModal();
  const { confirm: openConfirm } = useModal();

  // 후기 삭제 confirm
  const ReviewDeleteConfirm = () => {
    openConfirm({
      title: '후기를 삭제하시겠습니까? ',
      okButtonLabel: '예',
      cancelButtonLabel: '아니요',
    });
  };

  return (
    <div className={`${styles.start} ${styles.review_option} ${className}`}>
      <ul>
        <li>
          {/* 후기 팝업 미정 */}
          <Button
            onClick={() =>
              openModal({
                width: isMobile ? 'm_full' : 'sm',
                content: <ReviewPopup />,
              })
            }
          >
            수정
          </Button>
        </li>
        <li>
          {/* 후기 팝업 미정 */}
          <Button onClick={() => ReviewDeleteConfirm()}>삭제</Button>
        </li>
      </ul>
    </div>
  );
}

export const ReviewOptionPopover = memo(ReviewOptionPopoverComponent);
