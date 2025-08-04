import { memo } from 'react';
import { useRouter, useCanGoBack } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';

import { IcoArrowBackward, IcoChevronRight } from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/pages/_learning/learning-header/learning-header.module.css';
import logo from '@learnway/styles/fo/assets/images/common/logo_learning.png';

import { useLearningWindow } from '../../learnway-learning-window.store';
import { Button } from '../../../button/button';

function LearningHeaderComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { baseInfo, playInfo, previewMobile } = useLearningWindow();
  const handleBackButtonClick = () => {
    if (canGoBack) router.history.back();
  };
  const isMobileView = previewMobile === undefined ? isMobile : previewMobile;
  return (
    <div className={`${styles.start} ${styles.learning_header}`}>
      <header className={styles.header_area}>
        {/* 퍼블수정 20250716 : 마크업 수정 */}
        {isMobileView ? (
          <div className={styles.header_info}>
            <Button onClick={handleBackButtonClick}>
              <IcoArrowBackward width={24} height={24} stroke="#131416" />
            </Button>
            <div className={styles.tit_box}>
              <Button>
                <h1>{playInfo?.lessonName}</h1>
              </Button>
            </div>
          </div>
        ) : (
          // 퍼블수정 20250722 pc header 전체 수정
          <div className={styles.header_info}>
            <Button className={styles.btn_back} onClick={handleBackButtonClick}>
              <img src={logo} alt="" />
            </Button>
            <div className={styles.tit_box}>
              <Button>
                <h1>{baseInfo?.courseName}</h1>
              </Button>
              <IcoChevronRight width={20} height={20} stroke="#b7bbc3" />
              <Button>
                <h2>{playInfo?.lessonName}</h2>
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export const LearningHeader = memo(LearningHeaderComponent);
