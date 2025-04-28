import { memo, useState } from 'react';
import { Button } from '@learnway/ui';

import {
  IcoLearning01,
  IcoLearning02,
  IcoLearning03,
  IcoLearning04,
  IcoPrevPlay,
  IcoPrevNext,
} from '@learnway/icons';

import styles from './side-panel.module.css';

interface SidePanelProps {
  className?: string;
}

const SidePanelComponent = ({ className }: SidePanelProps) => {
  return (
    <div className={styles.start}>
      <div className={styles.panel}>
        <div className={styles.menu}>
          <Button>
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
