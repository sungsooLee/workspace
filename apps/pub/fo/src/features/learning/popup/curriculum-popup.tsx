import { useState, memo } from 'react';
import { Link } from '@tanstack/react-router';
import { ModalBody, ModalContainer, ModalTitle, ProgressCheck } from '@learnway/ui';
import { SidePanel } from '../../../features/learning';
import { IcoLinkblank } from '@learnway/icons';

import styles from './curriculum-popup.module.css';

interface ChildData {
  panelState: boolean;
}

const CurriculumPopupComponent = () => {
  const [childInfo, setChildInfo] = useState<boolean>();
  const handleChildData = (data: ChildData) => {
    setChildInfo(data.panelState);
  };

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
                    <li>
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
                          <Link to="">
                            <IcoLinkblank width={16} height={16} stroke="#4c515e" />
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
