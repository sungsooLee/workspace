import {
  IcoArrowUp,
  IcoLearning01,
  IcoLearning02,
  IcoLearning03,
  IcoLearning04,
  IcoLearning05,
  IcoLearning06,
  IcoPrevNext,
  IcoPrevPlay,
  IcoXclose,
} from '@learnway/icons';
import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { CurriculumPopup } from './popup/curriculum-popup';

import styles from '@learnway/styles/fo/pages/_learning/side-panel/side-panel.module.css';

import { DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { t } from 'i18next';
import { Button } from '../../../button';
import { useModal } from '../../../modal';
import { ProgressCheck } from '../../../progress';
import { useLearningWindow } from '../../learnway-learning-window.store';
import { CurriculumItemList } from './curriculum-item-list';

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
    previewMobile,
    setPlayInfo,
    gotoBeforeLesson,
    gotoNextLesson,
    getProgressNumber,
    resetProgressive,
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
      //* 커리큘럼 메뉴 호출 시 Progressive 다시 조회 함 */
      if (index === 0) {
        console.log('진척율 조회 호출');
        resetProgressive();
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

  const isMobileView = previewMobile === undefined ? isMobile : previewMobile;

  return (
    <div className={`${styles.start} ${menuSelected ? styles.active : ''}`}>
      {isMobileView || (
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
                    <CurriculumItemList />
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
                    isMobileView
                      ? openModal({
                          width: 'm_full',
                          content: <CurriculumPopup />,
                        })
                      : sendValueToParent(index)
                  }
                  className={`${menuNumber === index ? styles.active : ''} ${item.New && styles.new}`}
                  disabled={index > 0 && previewMobile !== undefined}
                >
                  <item.icon width={isMobileView ? 24 : 32} height={isMobileView ? 24 : 32} />
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
              <IcoPrevPlay width={isMobileView ? 20 : 32} height={isMobileView ? 20 : 32} />
              <span>
                {!(playIndex !== 0 && playList && playIndex < playList.length)
                  ? t('처음')
                  : t('이전')}
              </span>
            </Button>
            <Button
              disabled={!(playList && playList.length > playIndex + 1)}
              onClick={() => handlePriveNextClick(true)}
            >
              <IcoPrevNext width={isMobileView ? 20 : 32} height={isMobileView ? 20 : 32} />
              <span>
                {!(playList && playList.length > playIndex + 1) ? t('마지막') : t('다음')}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const SidePanel = memo(SidePanelComponent);
