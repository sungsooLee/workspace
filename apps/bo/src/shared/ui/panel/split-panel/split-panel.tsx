import React from 'react';
import { cn } from '@learnway/shared';
import styles from './split-panel.module.css';

interface SplitPanelProps {
  children: [React.ReactNode, React.ReactNode];
  /** 외부에서 추가할 CSS 클래스 이름 */
  className?: string;
}

const SplitPanelComponent = ({ children, className }: SplitPanelProps) => {
  const [left, right] = children;
  return (
    <div className={cn(styles.root, styles.wrap)}>
      <div className={cn(styles.container)}>
        {/*left*/}
        <div className={cn(styles.inner)}>
          <div className={styles.inner_contents}>{left}</div>
        </div>
        {/*right*/}
        <div className={styles.inner}>{right}</div>
      </div>
    </div>
  );
};

export const SplitPanel = SplitPanelComponent;
