import React, { FC, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';

interface SplitPanelProps {
  /** 외부에서 추가할 CSS 클래스 이름 */
  className?: string;
}

const SplitPanelComponent = ({ className }: SplitPanelProps) => {
  return (
    <div className={cn(boxStyles.start, boxStyles.inner)}>
      <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.ratio_third)}>
        <div className={cn(layoutStyles.inner, layoutStyles.scrollHidden)}>
          <div className={layoutStyles.inner_contents}></div>
        </div>
        <div className={layoutStyles.inner}></div>
      </div>
    </div>
  );
};

export const SplitPanel = SplitPanelComponent;

/**
 * Left
 * @param children
 * @constructor
 */
export const ModalTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

/**
 * Left
 * @param children
 * @constructor
 */
export const Left = ({ children }: any) => {
  return <>{children}</>;
};
