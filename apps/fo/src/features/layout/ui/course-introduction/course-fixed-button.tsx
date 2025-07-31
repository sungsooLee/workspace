import { IcoHeart, IcoShare } from '@learnway/icons';
import { Button, useModal } from '@learnway/ui';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';

import {
  CourseSelectionPopup, // 차수선택 팝업
} from '../../../../features/layout/';

import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/course-fixed-button.module.css';
import { t } from 'i18next';

interface CourseFixedButton {
  course?: boolean; // 차수 유/무
  likeCount?: number;
  handleCourseLike?: () => void;
  heart?: boolean;
}

const CourseFixedButtonComponent = ({
  course,
  likeCount,
  handleCourseLike,
  heart = false,
}: CourseFixedButton) => {
  const { openModal } = useModal();

  // 찜
  // const [heart, setHeart] = useState(false);

  return (
    <div className={`${styles.start} ${styles.course_button}`}>
      <Button
        onClick={() => {
          // heart === true ? setHeart(false) : setHeart(true);
          handleCourseLike && handleCourseLike();
        }}
      >
        {/* 퍼블수정 20250624 색상 수정 */}
        <IcoHeart
          width={20}
          height={20}
          stroke={heart === true ? '#f58b75' : '#b7bbc3'}
          fill={heart === true ? '#f58b75' : '#b7bbc3'}
        />
        {likeCount}
      </Button>
      <Button>
        <IcoShare width={20} height={20} stroke="#4c515e" />
        {t('공유')}
      </Button>

      {/* 수강신청 차수가 있을 때 */}
      {course && (
        <div className={styles.course}>
          {/* 수강신청 가능 */}
          <Button
            variant="primary"
            onClick={() =>
              isMobile
                ? openModal({
                    width: 'm_full',
                    content: <CourseSelectionPopup />,
                  })
                : ''
            }
          >
            {t('수강신청')}
          </Button>
          {/* 수강신청 불가능 */}
          {/* <Button variant="line">차수개설 알림신청</Button> */}
          {/* tip */}
          <span className={styles.tip}>{t('차수를 선택해 주세요')}</span>
        </div>
      )}
    </div>
  );
};

export const CourseFixedButton = memo(CourseFixedButtonComponent);
