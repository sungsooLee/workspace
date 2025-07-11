import { useState, memo } from 'react';

import styles from '@learnway/styles/fo/pages/_learning/side-panel/popup/curriculum-popup.module.css';
import { useLearningWindow, Button, useModal, ProgressCheck } from '@learnway/ui';
import { ModalBody, ModalContainer, ModalTitle } from '../../../../modal/modal-container';

interface ChildData {
  panelState: boolean;
}

const CurriculumPopupComponent = () => {
  const { close: closeModal } = useModal();

  const { curriculum, playInfo, playList, playIndex, setPlayInfo } = useLearningWindow();

  return (
    <ModalContainer>
      <ModalTitle>{'커리큘럼'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.curriculum_wrap}`}>
          <ul>
            {curriculum?.moduleList.map((module: any) => {
              return (
                <li key={`learning-window-module-${module.moduleId}`}>
                  <div className={styles.box}>
                    <div className={styles.header}>
                      <strong>{module.moduleName}</strong>
                      <span>--:--</span>
                    </div>
                    <div className={styles.contents}>
                      <ul
                        key={`learning-window-module-ul-${module.moduleId}`}
                        className={styles.step}
                      >
                        {module.lessonList.map((lesson: any) => {
                          return (
                            <li
                              key={`learning-window-lesson-${module.moduleId}_${lesson.lessonId}`}
                              className={
                                playInfo && playInfo.lessonId === lesson.lessonId
                                  ? styles.active
                                  : ''
                              }
                              onClick={() => {
                                setPlayInfo(module.moduleId, lesson.lessonId);
                                closeModal();
                              }}
                            >
                              <div className={styles.step_box}>
                                <ProgressCheck progress={100} />
                                <p>{lesson.lessonName}</p>
                                <span>--:--</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const CurriculumPopup = memo(CurriculumPopupComponent);
