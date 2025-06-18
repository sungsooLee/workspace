import React from 'react';
import { cn } from '@learnway/shared';
import styles from './split-panel.module.css';
import { Divider } from '../divider/divider';

interface SplitPanelProps {
  children: React.ReactNode | React.ReactNode[];
  /** 외부에서 추가할 CSS 클래스 이름 */
  className?: string;
  /** 각 영역의 사이즈 (ex: ['30%', '70%'] 또는 [300, 'auto']) */
  size?: Array<number | string>;
}

/**
 * 리펙토링중
 * @param children
 * @param className
 * @constructor
 */
const SplitPanelComponent = ({ children, size, className }: SplitPanelProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn(styles.container, className)}>
      {childrenArray.map((child, index) => {
        const width = size?.[index];
        const style = width
          ? { width: typeof width === 'number' ? `${width}px` : width }
          : undefined;
        const isLast = index === childrenArray.length - 1;

        return (
          <div key={index} className={cn(styles.panel)} style={style}>
            {child}
            {!isLast && <Divider orientation="vertical" />}
          </div>
        );
      })}
    </div>
  );
};

export const SplitPanel = SplitPanelComponent;
