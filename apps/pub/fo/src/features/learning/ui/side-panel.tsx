import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import { isMobile } from 'react-device-detect';
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
  IcoLink,
  IcoArrowUp,
} from '@learnway/icons';
import { CurriculumPopup, NextLearningPopup } from '../../../features/learning';

import styles from '@learnway/styles/fo/pages/_learning/side-panel/side-panel.module.css';
import { ChartNoAxesColumnDecreasing } from 'lucide-react';
import { boolean } from 'zod';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { ProgressCheck } from '@learnway/ui/progress';

interface ChildData {
  className?: string;
  panelState: boolean;
}

interface SidePanelProps {
  onValueChange: (data: ChildData) => void;
}

const SidePanelComponent = ({ onValueChange }: SidePanelProps) => {
  const { openModal } = useModal();

  const [menuSelected, setMenuSelected] = useState(false); // content 영역 show/hide
  const [menuContents, setMenuContents] = useState([false, false, false, false]); // 각 메뉴 컨텐츠 영역 show/hide
  const [menuNumber, setMenuNumber] = useState<number>(-1); // -1 : 닫기, 1 ~ n : content 순서
  const [panelState, setPanelState] = useState<boolean>(true); // 퍼블수정 20250717 panel open/close 기능

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

  // 퍼블수정 20250717 panel open/close 기능 추가
  const handlePanelOpenClose = (panelState: boolean) => {
    setMenuSelected(false);
    sendValueToParent(-1);
    setPanelState(!panelState);
  };

  // 퍼블수정 20250717 옵션 new 추가
  const menu = [
    { tit: '커리큘럼', icon: IcoLearning01 },
    { tit: 'AI 요약', icon: IcoLearning02 },
    { tit: '내노트', icon: IcoLearning03 },
    { tit: '댓글', icon: IcoLearning04 },
    { tit: '질문답변', icon: IcoLearning05 },
    { tit: '후기', icon: IcoLearning06, New: true },
  ];

  // 퍼블수정 20250717 confirm 추가
  const { confirm: openConfirm } = useModal();
  const NextLearningConfirm = () => {
    openConfirm({
      title: '레슨 2 이북 (다음 레슨 제목이 옵니다) ',
      content: '삭제버튼을 누르면 선택하신 항목이 모두 저장되며, 복구할 수 없습니다.',
      okButtonLabel: '다음 강의',
      cancelButtonLabel: '다시보기',
    });
  };

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
                {menuContents[0] && (
                  <div className={styles.curriculum}>
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
                                  {/* 퍼블수정 20250717 아이콘 사이즈 수정 */}
                                  <p>
                                    스콤아이템
                                    <Link to={'/'}>
                                      <IcoLink width={24} height={24} fill="#131416" />
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
                )}

                {/* 내노트 */}
                {menuContents[1] && <div className={styles.note}>내노트</div>}

                {/* 커뮤니티 */}
                {menuContents[2] && <div className={styles.community}>커뮤니티</div>}

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
        {/* 퍼블수정 20250717 전체 수정 */}
        <div className={styles.menu}>
          {isMobile || (
            <Button
              className={`${styles.btn_sh} ${panelState && styles.active}`}
              onClick={() => handlePanelOpenClose(panelState)}
            >
              <IcoArrowUp width={20} height={20} stroke="#4d525c" />
            </Button>
          )}

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
                  <item.icon width={24} height={24} />
                  <span>{item.tit}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
        {panelState && (
          <div className={styles.control}>
            <Button disabled>
              <IcoPrevPlay width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} />
              <span>이전</span>
            </Button>
            {/* 퍼블수정 20250717 modal -> confirm으로 변경 */}
            <Button onClick={() => NextLearningConfirm()}>
              <IcoPrevNext width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} />
              <span>다음</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const SidePanel = memo(SidePanelComponent);
