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
  /** divider 표시 여부 */
  divider?: boolean;
}

/**
 * 리펙토링중
 * @param children
 * @param className
 * @param divider
 * @constructor
 */
const SplitPanelComponent = ({ children, size, className, divider = false }: SplitPanelProps) => {
  const nodes = React.Children.toArray(children);

  return (
    <div className={cn(styles.start, 'split_panel', className)}>
      {nodes.map((child, index) => {
        const width = size?.[index];
        const style =
          width && width !== 'auto'
            ? { width: typeof width === 'number' ? `${width}px` : width }
            : undefined;
        const isLast = index === nodes.length - 1;

        return (
          <>
            <div key={index} className={cn(styles.panel)} style={style}>
              {child}
            </div>
            {!isLast && divider && <Divider orientation="vertical" className={styles.divider} />}
          </>
        );
      })}
    </div>
  );
};

export const SplitPanel = SplitPanelComponent;
