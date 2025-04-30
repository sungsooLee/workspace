import { memo, useState } from 'react';
import { Button } from '@learnway/ui';

import {
  IcoLearning01,
  IcoLearning02,
  IcoLearning03,
  IcoLearning04,
  IcoPrevPlay,
  IcoPrevNext,
  IcoXclose,
} from '@learnway/icons';

import styles from './side-panel.module.css';

interface SidePanelProps {
  className?: string;
}

const SidePanelComponent = ({ className }: SidePanelProps) => {
  const [menuSelected, setMenuSelected] = useState(false);

  return (
    <div className={`${styles.start} ${menuSelected ? styles.active : ''}`}>
      {menuSelected ? (
        <div className={styles.menu_contents}>
          <div className={styles.title_box}>
            <strong>커리큘럼</strong>
            <Button onClick={() => setMenuSelected(false)}>
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
      <div className={styles.panel}>
        <div className={styles.menu}>
          <Button onClick={() => setMenuSelected(true)}>
            <IcoLearning01 width={32} height={32} />
            <span>커리큘럼</span>
          </Button>
          <Button>
            <IcoLearning02 width={32} height={32} />
            <span>내노트</span>
          </Button>
          <Button>
            <IcoLearning03 width={32} height={32} />
            <span>커뮤니티</span>
          </Button>
          <Button>
            <IcoLearning04 width={32} height={32} />
            <span>FAQ</span>
          </Button>
        </div>
        <div className={styles.control}>
          <Button>
            <IcoPrevPlay width={32} height={32} />
            <span>이전</span>
          </Button>
          <Button>
            <IcoPrevNext width={32} height={32} />
            <span>다음</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const SidePanel = memo(SidePanelComponent);
