import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button, useModal, ProgressCheck } from '@learnway/ui';
import { isMobile } from 'react-device-detect';
import {
  IcoLearning01,
  IcoLearning02,
  IcoLearning03,
  IcoLearning04,
  IcoPrevPlay,
  IcoPrevNext,
  IcoXclose,
  IcoLinkblank,
} from '@learnway/icons';
import { CurriculumPopup, NextLearningPopup } from '../../../features/learning';

import styles from './side-panel.module.css';
import { ChartNoAxesColumnDecreasing } from 'lucide-react';

interface ChildData {
  className?: string;
  panelState: boolean;
}

interface SidePanelProps {
  onValueChange: (data: ChildData) => void;
}

const SidePanelComponent = ({ onValueChange }: SidePanelProps) => {
  const { open: openModal } = useModal();

  const [menuSelected, setMenuSelected] = useState(false);
  const [menuNumber, setMenuNumber] = useState<number>(-1); // -1 : 닫기, 1 ~ n : content 순서

  const sendValueToParent = (index: number) => {
    if (menuNumber === index || index === -1) {
      setMenuSelected(false);
      setMenuNumber(-1);
    } else {
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

  const menu = [
    { tit: '커리큘럼', icon: IcoLearning01 },
    { tit: '내노트', icon: IcoLearning02 },
    { tit: '커뮤니티', icon: IcoLearning03 },
    { tit: 'FAQ', icon: IcoLearning04 },
  ];

  return (
    <div className={`${styles.start} ${menuSelected ? styles.active : ''}`}>
      {isMobile || (
        <div>
          {menuSelected ? (
            <div className={styles.menu_contents}>
              <div className={styles.title_box}>
                <strong>커리큘럼</strong>
                <Button onClick={() => sendValueToParent(-1)}>
                  <IcoXclose width={24} height={24} stroke="#6f798b" />
                </Button>
              </div>
              <div className={styles.contents_box}>
                {/* 커리큘럼 */}
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
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}

      <div className={styles.panel}>
        <div className={styles.menu}>
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
              className={menuNumber === index ? styles.active : ''}
            >
              <item.icon width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
              <span>{item.tit}</span>
            </Button>
          ))}
        </div>
        <div className={styles.control}>
          <Button disabled>
            <IcoPrevPlay width={isMobile ? 20 : 32} height={isMobile ? 20 : 32} />
            <span>이전</span>
          </Button>
          <Button
            onClick={() =>
              openModal({
                width: 's',
                content: <NextLearningPopup />,
              })
            }
          >
            <IcoPrevNext width={isMobile ? 20 : 32} height={isMobile ? 20 : 32} />
            <span>다음</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const SidePanel = memo(SidePanelComponent);
