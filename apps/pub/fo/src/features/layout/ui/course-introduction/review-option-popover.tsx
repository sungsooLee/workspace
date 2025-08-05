import { memo } from 'react';
import { isMobile } from 'react-device-detect';

import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/review-option-popover.module.css';
import dropdownPopoverStyles from '@learnway/styles/fo/shared/ui/dropdown-popover/dropdown-popover.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { ReviewPopup } from '../../../../features/layout';

// 퍼블수정 20250805 interface 및 className 삭제

function ReviewOptionPopoverComponent() {
  const { openModal } = useModal();
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
    // 퍼블수정 20250805 className 수정
    <div
      className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap} ${styles.review_option}`}
    >
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
