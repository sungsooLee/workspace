import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { t } from 'i18next';

import { Button, useModal, ProgressCheck } from '@learnway/ui';
import {
  IcoLearning01,
  IcoLearning02,
  IcoLearning03,
  IcoLearning04,
  IcoLearning05,
  IcoLearning06,
  IcoPrevPlay,
  IcoPrevNext,
  IcoXclose,
  IcoArrowUp,
} from '@learnway/icons';
import { CurriculumPopup } from './popup/curriculum-popup';

import styles from '@learnway/styles/fo/pages/_learning/side-panel/side-panel.module.css';

import { useLearningWindow } from '../../learnway-learning-window.store';
import { DATE_TIME_FORMAT, duration } from '@learnway/shared';

interface ChildData {
  className?: string;
  panelState: boolean;
}

interface SidePanelProps {
  onValueChange: (data: ChildData) => void;
}

const SidePanelComponent = ({ onValueChange }: SidePanelProps) => {
  const {
    curriculum,
    playInfo,
    playList,
    playIndex,
    setPlayInfo,
    gotoBeforeLesson,
    gotoNextLesson,
    getProgressNumber,
  } = useLearningWindow();
  const { openModal, confirm: openConfirm } = useModal();

  const [menuSelected, setMenuSelected] = useState(false); // content 영역 show/hide
  const [menuContents, setMenuContents] = useState([false, false, false, false]); // 각 메뉴 컨텐츠 영역 show/hide
  const [menuNumber, setMenuNumber] = useState<number>(-1); // -1 : 닫기, 1 ~ n : content 순서
  const [panelState, setPanelState] = useState<boolean>(true); // 퍼블수정 20250716 panel open/close 기능

  const handlePriveNextClick = async (isNext: boolean) => {
    const addValue = isNext ? 1 : -1;
    const moduleName = playList ? playList[playIndex + addValue].moduleName : '';
    const lessonName = playList ? playList[playIndex + addValue].lessonName : '';
    const result = await openConfirm({
      title: `${moduleName} (${lessonName})`,
      content: t('삭제버튼을 누르면 선택하신 항목이 모두 저장되며, 복구할 수 없습니다.'),
      okButtonLabel: isNext ? t('다음 강의') : t('이전 강의'),
      cancelButtonLabel: t('다시보기'),
    });
    if (result) {
      if (isNext) {
        gotoNextLesson();
      } else {
        gotoBeforeLesson();
      }
    }
  };

  const sendValueToParent = (index: number) => {
    if (menuNumber === index || index === -1) {
      setMenuSelected(false);
      setMenuNumber(-1);
    } else {
      handleMenuContentsClick(index);
      setMenuSelected(true);
      setMenuNumber(index);

      if (menuSelected === true) {
        return;
      }
    }
    const data: ChildData = {
      panelState: menuSelected,
    };
    onValueChange(data);
  };

  // 각 메뉴 컨텐츠 number (boolean)
  const handleMenuContentsClick = (index: number) => {
    const newContents = menuContents.map((_, i) => i === index);
    setMenuContents(newContents);
  };

  // 퍼블수정 20250716 panel open/close 기능 추가
  const handlePanelOpenClose = (panelState: boolean) => {
    setMenuSelected(false);
    sendValueToParent(-1);
    setPanelState(!panelState);
  };

  const menu = [
    { tit: t('커리큘럼'), icon: IcoLearning01 },
    { tit: t('AI 요약'), icon: IcoLearning02 },
    { tit: t('내노트'), icon: IcoLearning03 },
    { tit: t('댓글'), icon: IcoLearning04 },
    { tit: t('질문답변'), icon: IcoLearning05 },
    { tit: t('후기'), icon: IcoLearning06, New: true },
  ];

  return (
    <div className={`${styles.start} ${menuSelected ? styles.active : ''}`}>
      {isMobile || (
        <div>
          {menuSelected ? (
            <div className={styles.menu_contents}>
              <div className={styles.title_box}>
                <strong>{menu[menuNumber].tit}</strong>
                <Button onClick={() => sendValueToParent(-1)}>
                  <IcoXclose width={24} height={24} stroke="#6f798b" />
                </Button>
              </div>
              <div className={styles.contents_box}>
                {/* 커리큘럼 */}
                {menuContents[0] && curriculum && (
                  <div className={styles.curriculum}>
                    <ul>
                      {curriculum.moduleList.map((module: any) => {
                        if (module.isDummy) {
                          return (
                            <li key={`learning-window-module-${module.moduleId}`}>
                              <div className={styles.box}>
                                <div className={styles.contents}>
                                  <ul
                                    key={`learning-window-module-ul-${module.moduleId}`}
                                    className={styles.step}
                                  >
                                    <li
                                      key={`learning-window-lesson-${module.moduleId}_${module.lessonId}`}
                                      className={
                                        playInfo && playInfo.lessonId === module.lessonId
                                          ? styles.active
                                          : ''
                                      }
                                      onClick={() => {
                                        setPlayInfo(module.moduleId, module.lessonId);
                                      }}
                                    >
                                      <div className={styles.step_box}>
                                        <ProgressCheck
                                          progress={getProgressNumber(
                                            module.moduleId,
                                            module.lessonId,
                                          )}
                                        />
                                        <p>{module.lessonName}</p>
                                        {module.learningTime && (
                                          <span>
                                            {duration(
                                              module.learningTime,
                                              DATE_TIME_FORMAT.HOUR_MIN,
                                            )}
                                          </span>
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
                                    <span>
                                      {duration(module.learningTime, DATE_TIME_FORMAT.HOUR_MIN)}
                                    </span>
                                  )}
                                </div>
                                <div className={styles.contents}>
                                  <ul
                                    key={`learning-window-module-ul-${module.moduleId}`}
                                    className={styles.step}
                                  >
                                    {module.lessonList &&
                                      module.lessonList.map((lesson: any) => {
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
                                            }}
                                          >
                                            <div className={styles.step_box}>
                                              <ProgressCheck
                                                progress={getProgressNumber(
                                                  module.moduleId,
                                                  lesson.lessonId,
                                                )}
                                              />
                                              <p>{lesson.lessonName}</p>
                                              {lesson.learningTime && (
                                                <span>
                                                  {duration(
                                                    lesson.learningTime,
                                                    DATE_TIME_FORMAT.HOUR_MIN,
                                                  )}
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
                  </div>
                )}

                {/* 내노트 */}
                {menuContents[1] && <div className={styles.note}>{t('내노트')}</div>}

                {/* 커뮤니티 */}
                {menuContents[2] && <div className={styles.community}>{t('커뮤니티')}</div>}

                {/* 내노트 */}
                {menuContents[3] && <div className={styles.faq}>FAQ</div>}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}

      <div className={styles.panel}>
        {/* 퍼블수정 20250716 전체 수정 */}
        <div className={styles.menu}>
          <Button
            className={`${styles.btn_sh} ${panelState && styles.active}`}
            onClick={() => handlePanelOpenClose(panelState)}
          >
            <IcoArrowUp width={20} height={20} stroke="#4d525c" />
          </Button>
          {panelState && (
            <div>
              {menu.map((item, index) => (
                <Button
                  key={index}
                  onClick={() =>
                    isMobile
                      ? openModal({
                          width: 'm_full',
                          content: <CurriculumPopup />,
                        })
                      : sendValueToParent(index)
                  }
                  className={`${menuNumber === index ? styles.active : ''} ${item.New && styles.new}`}
                >
                  <item.icon width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
                  <span>{item.tit}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
        {panelState && (
          <div className={styles.control}>
            <Button
              disabled={!(playIndex !== 0 && playList && playIndex < playList.length)}
              onClick={() => handlePriveNextClick(false)}
            >
              <IcoPrevPlay width={isMobile ? 20 : 32} height={isMobile ? 20 : 32} />
              <span>{t('이전')}</span>
            </Button>
            <Button
              disabled={!(playList && playList.length > playIndex + 1)}
              onClick={() => handlePriveNextClick(true)}
            >
              <IcoPrevNext width={isMobile ? 20 : 32} height={isMobile ? 20 : 32} />
              <span>{t('다음')}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const SidePanel = memo(SidePanelComponent);
