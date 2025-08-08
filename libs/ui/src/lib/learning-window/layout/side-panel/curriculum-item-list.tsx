import { isMobile } from 'react-device-detect';

import stylesPc from '@learnway/styles/fo/pages/_learning/side-panel/side-panel.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/side-panel/popup/curriculum-popup.module.css';

import { DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { ProgressCheck } from '../../../progress';
import { useLearningWindow } from '../../learnway-learning-window.store';
import { useModal } from '../../../modal';

const CurriculumItemListComponent = ({ popupClose = false }: { popupClose?: boolean }) => {
  const { closeModal } = useModal();
  const { curriculum, playInfo, setPlayInfo, getProgressNumber } = useLearningWindow();

  const styles = isMobile ? stylesMobile : stylesPc;

  return (
    <ul>
      {curriculum?.moduleList.map((module: any) => {
        if (module.isDummy) {
          return (
            <li key={`learning-window-module-${module.moduleId}`}>
              <div className={styles.box}>
                <div className={styles.contents}>
                  <ul key={`learning-window-module-ul-${module.moduleId}`} className={styles.step}>
                    <li
                      key={`learning-window-lesson-${module.moduleId}_${module.lessonId}`}
                      className={
                        playInfo && playInfo.lessonId === module.lessonId ? styles.active : ''
                      }
                      onClick={() => {
                        setPlayInfo(module.moduleId, module.lessonId);
                        if (popupClose) closeModal();
                      }}
                    >
                      <div className={styles.step_box}>
                        <ProgressCheck
                          progress={getProgressNumber(module.moduleId, module.lessonId)}
                        />
                        <p>{module.lessonName}</p>
                        {module.learningTime && (
                          <span>{duration(module.learningTime, DATE_TIME_FORMAT.HOUR_MIN)}</span>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          );
        } else {
          return (
            <li key={`learning-window-module-${module.moduleId}`}>
              <div className={styles.box}>
                <div className={styles.header}>
                  <strong>{module.moduleName}</strong>
                  {module.learningTime && (
                    <span>{duration(module.learningTime, DATE_TIME_FORMAT.HOUR_MIN)}</span>
                  )}
                </div>
                <div className={styles.contents}>
                  <ul key={`learning-window-module-ul-${module.moduleId}`} className={styles.step}>
                    {module.lessonList &&
                      module.lessonList.map((lesson: any) => {
                        return (
                          <li
                            key={`learning-window-lesson-${module.moduleId}_${lesson.lessonId}`}
                            className={
                              playInfo && playInfo.lessonId === lesson.lessonId ? styles.active : ''
                            }
                            onClick={() => {
                              setPlayInfo(module.moduleId, lesson.lessonId);
                              if (popupClose) closeModal();
                            }}
                          >
                            <div className={styles.step_box}>
                              <ProgressCheck
                                progress={getProgressNumber(module.moduleId, lesson.lessonId)}
                              />
                              <p>{lesson.lessonName}</p>
                              {lesson.learningTime && (
                                <span>
                                  {duration(lesson.learningTime, DATE_TIME_FORMAT.HOUR_MIN)}
                                </span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
};

export const CurriculumItemList = CurriculumItemListComponent;
