import { ReactNode, useState } from 'react';
import { useLocation } from '@tanstack/react-router';

import { MobileView, BrowserView } from 'react-device-detect';
import { SidePanel, SidePanelDetail } from '../../../../../features/learning';
import styles from './learning-container.module.css';

interface LearningContainerComponentProps {
  children: ReactNode;
}

function LearningContainerComponent({ children }: LearningContainerComponentProps) {
  return (
    <div className={`${styles.start} ${styles.learning_container}`}>
      <div className={`${styles.learning_area}`}>
        <div className={styles.learning_contents}>{children}</div>
        <div className={styles.side_panel}>
          <SidePanel />
        </div>
      </div>
    </div>
  );
}

export const LearningContainer = LearningContainerComponent;
