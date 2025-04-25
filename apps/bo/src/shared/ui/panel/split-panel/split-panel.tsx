import React from 'react';
import { cn } from '@learnway/shared';
import styles from './split-panel.module.css';

interface SplitPanelProps {
  children: [React.ReactNode, React.ReactNode];
  /** 외부에서 추가할 CSS 클래스 이름 */
  className?: string;
  /** 좌측 사이즈 */
  leftSize?: number | string;
  /** 우측 사이즈 */
  rightSize?: number | string;
}

/**
 * 리펙토링중
 * @param children
 * @param className
 * @constructor
 */
const SplitPanelComponent = ({ children, className, leftSize, rightSize }: SplitPanelProps) => {
  const [left, right] = children;
  const { leftPanelStyle, rightPanelStyle } = getPanelStyle(leftSize, rightSize);
  return (
    <div className={cn(styles.root, styles.wrap)}>
      <div className={cn(styles.container)}>
        {/*left*/}
        <div className={cn(styles.inner)} style={leftPanelStyle}>
          <div className={styles.inner_contents}>{left}</div>
        </div>
        {/*right*/}
        <div className={cn(styles.inner)} style={rightPanelStyle}>
          {right}
        </div>
      </div>
    </div>
  );
};

const getPanelStyle = (leftSize?: number | string, rightSize?: number | string) => {
  const isRightSizeNumber = typeof rightSize === 'number';
  // CSS Flexbox 스타일을 위한 객체 초기화
  const leftPanelStyle: React.CSSProperties = {
    width: isRightSizeNumber
      ? `calc(100% - ${rightSize}px)`
      : leftSize
        ? `${leftSize}px`
        : undefined,
  };

  const rightPanelStyle: React.CSSProperties = {
    width: isRightSizeNumber
      ? `${rightSize}px`
      : rightSize
        ? `calc(100% - ${leftSize}px)`
        : undefined,
  };

  return { leftPanelStyle, rightPanelStyle };
};

export const SplitPanel = SplitPanelComponent;
