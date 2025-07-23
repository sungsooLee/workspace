import { useState, memo } from 'react';
import { Link } from '@tanstack/react-router';
import { ModalBody, ModalContainer, ModalTitle, ProgressCheck } from '@learnway/ui';
import { IcoLink } from '@learnway/icons';

import styles from '@learnway/styles/fo/pages/_learning/side-panel/popup/curriculum-popup.module.css';

interface ChildData {
  panelState: boolean;
}

const CurriculumPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'커리큘럼'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.curriculum_wrap}`}>
          <ul>
            <li>
              <div className={styles.box}>
                <div className={styles.header}>
                  <strong>모듈명</strong>
                  <span>13:40</span>
                </div>
                <div className={styles.contents}>
                  <ul className={styles.step}>
                    <li>
                      <div className={styles.step_box}>
                        <ProgressCheck progress={100} />
                        <p>스콤아이템</p>
                        <span>4:11</span>
                      </div>
                    </li>
                    {/* 퍼블수정 20250703 현재 학습 active 추가 */}
                    <li className={styles.active}>
                      <div className={styles.step_box}>
                        <ProgressCheck progress={50} />
                        <p>스콤아이템</p>
                        <span>4:11</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.step_box}>
                        <ProgressCheck progress={0} />
                        <p>스콤아이템</p>
                        <span>4:11</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.box}>
                <div className={styles.header}>
                  <strong>모듈명</strong>
                  <span>13:40</span>
                </div>
                <div className={styles.contents}>
                  <ul className={styles.step}>
                    <li>
                      <div className={styles.step_box}>
                        <ProgressCheck progress={100} />
                        <p>스콤아이템</p>
                        <span>4:11</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.step_box}>
                        <ProgressCheck progress={50} />
                        <p>
                          스콤아이템
                          <Link to={'/'}>
                            {/* 퍼블수정 20250717 아이콘 수정 */}
                            <IcoLink width={20} height={20} fill="#131416" />
                          </Link>
                        </p>
                        <span>4:11</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.step_box}>
                        <ProgressCheck progress={0} />
                        <p>스콤아이템</p>
                        <span>4:11</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const CurriculumPopup = memo(CurriculumPopupComponent);
