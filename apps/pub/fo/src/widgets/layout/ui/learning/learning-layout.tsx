import { memo, ReactNode } from 'react';

import { MobileView } from 'react-device-detect';
import { LearningContainer } from './learning-container/learning-container';
import { LearningHeader } from './learning-header/learning-header';

import styles from '@learnway/styles/fo/pages/_learning/learning-layout.module.css';

interface LearningLayoutComponentProps {
  children: ReactNode;
}

function LearningLayoutComponent({ children }: LearningLayoutComponentProps) {
  return (
    <>
      <LearningHeader />

      <div className={`${styles.start} ${styles.container}`}>
        <div className={styles.inner}>
          <main>
            <LearningContainer>
              {/* 퍼블수정 20250811 모바일 레슨명 추가 */}
              <MobileView>
                <div className={styles.lesson_box}>
                  <strong>
                    레슨명레슨명레슨명레슨명레슨명레슨명레슨명레슨명레슨명레슨명레슨명레슨명레슨명레슨명
                  </strong>
                </div>
              </MobileView>
              {children}
            </LearningContainer>
          </main>
        </div>
      </div>
    </>
  );
}

export const LearningLayout = memo(LearningLayoutComponent);
