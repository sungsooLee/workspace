import { ReactNode, useState } from 'react';
import { useLocation } from '@tanstack/react-router';

import { MobileView, BrowserView } from 'react-device-detect';
import { SidePanel, SidePanelDetail } from '../../../../../features/learning';
import styles from './learning-container.module.css';
import { ChartNoAxesColumnDecreasing } from 'lucide-react';

interface LearningContainerComponentProps {
  children: ReactNode;
}

interface ChildData {
  panelState: boolean;
}

function LearningContainerComponent({ children }: LearningContainerComponentProps) {
  const [childInfo, setChildInfo] = useState<boolean>();
  const handleChildData = (data: ChildData) => {
    setChildInfo(data.panelState);
  };

  return (
    <div className={`${styles.start} ${styles.learning_container}`}>
      <div className={`${styles.learning_area} ${styles.acd} ${childInfo && styles.abcde}`}>
        <div className={styles.learning_contents}>{children}</div>
        <div className={styles.side_panel}>
          <SidePanel onValueChange={handleChildData} />
        </div>
      </div>
    </div>
  );
}

export const LearningContainer = LearningContainerComponent;
