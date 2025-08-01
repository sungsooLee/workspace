import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from '@tanstack/react-router';
import { Button } from '@learnway/ui/button';

import { IcoArrowBackward, IcoChevronRight } from '@learnway/icons';

import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/pages/_learning/learning-header/learning-header.module.css';

import logo from '@learnway/styles/fo/assets/images/common/logo_learning.png';

function LearningHeaderComponent() {
  return (
    <div className={`${styles.start} ${styles.learning_header}`}>
      <header className={styles.header_area}>
        {/* 퍼블수정 20250716 : 마크업 수정 */}
        {isMobile ? (
          <div className={styles.header_info}>
            <Button>
              <IcoArrowBackward width={24} height={24} stroke="#131416" />
            </Button>
            <div className={styles.tit_box}>
              <Button>
                <h1>과정명과정명과정명과정명</h1>
              </Button>
            </div>
          </div>
        ) : (
          // 퍼블수정 20250722 pc header 전체 수정
          <div className={styles.header_info}>
            <Button className={styles.btn_back}>
              <img src={logo} alt="" />
            </Button>
            <div className={styles.tit_box}>
              <Button>
                <h1>과정명과정명과정명과정명</h1>
              </Button>
              <IcoChevronRight width={20} height={20} stroke="#b7bbc3" />
              <Button>
                <h2>레슨명레슨명레슨명레슨명</h2>
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export const LearningHeader = memo(LearningHeaderComponent);
