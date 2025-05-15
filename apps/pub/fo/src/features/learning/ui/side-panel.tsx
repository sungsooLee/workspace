import { memo, useState } from 'react';
import { Button, useModal } from '@learnway/ui';
import { isMobile } from 'react-device-detect';
import {
  IcoLearning01,
  IcoLearning02,
  IcoLearning03,
  IcoLearning04,
  IcoPrevPlay,
  IcoPrevNext,
  IcoXclose,
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

  const sendValueToParent = () => {
    menuSelected === true ? setMenuSelected(false) : setMenuSelected(true);
    const data: ChildData = {
      panelState: menuSelected,
    };
    onValueChange(data);
  };

  return (
    <div className={`${styles.start} ${menuSelected ? styles.active : ''}`}>
      {isMobile || (
        <>
          {menuSelected ? (
            <div className={styles.menu_contents}>
              <div className={styles.title_box}>
                <strong>커리큘럼</strong>
                <Button onClick={() => sendValueToParent()}>
                  <IcoXclose width={24} height={24} stroke="#6f798b" />
                </Button>
              </div>
              <div className={styles.contents_box}>
                {/* 커리큘럼 */}
                <div className={styles.curriculum}>커리큘럼 컨텐츠</div>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      )}

      <div className={styles.panel}>
        <div className={styles.menu}>
          {isMobile ? (
            <Button
              onClick={() =>
                openModal({
                  width: 'm_full',
                  content: <CurriculumPopup />,
                })
              }
            >
              <IcoLearning01 width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
              <span>커리큘럼</span>
            </Button>
          ) : (
            <Button onClick={() => sendValueToParent()}>
              <IcoLearning01 width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
              <span>커리큘럼</span>
            </Button>
          )}
          <Button>
            <IcoLearning02 width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
            <span>내노트</span>
          </Button>
          <Button>
            <IcoLearning03 width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
            <span>커뮤니티</span>
          </Button>
          <Button>
            <IcoLearning04 width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
            <span>FAQ</span>
          </Button>
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
