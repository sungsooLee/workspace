import React from 'react';
import { cn } from '@learnway/shared';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import styles from './split-panel.module.css';

interface SplitPanelProps {
  children: [React.ReactNode, React.ReactNode];
  /** 외부에서 추가할 CSS 클래스 이름 */
  className?: string;
}

const SplitPanelComponent = ({ children, className }: SplitPanelProps) => {
  const [left, right] = children;
  return (
    <div className={cn(styles.root, boxStyles.start, boxStyles.inner)}>
      <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.ratio_third)}>
        {/*left*/}
        <div className={cn(layoutStyles.inner, layoutStyles.scrollHidden)}>
          <div className={layoutStyles.inner_contents}>{left}</div>
        </div>
        {/*right*/}
        <div className={layoutStyles.inner}>{right}</div>
      </div>
    </div>
  );
};

export const SplitPanel = SplitPanelComponent;
