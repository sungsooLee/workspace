import React from 'react';
import styles from './divider.module.css';
import { cn } from '@learnway/shared'; // CSS Modules 사용 가정

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'; // 수평 또는 수직
  spacing?: 'full' | 'inner'; // 여백 조절 (선택 사항)
  className?: string; // 추가 CSS 클래스 (선택 사항)
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal', // 기본값은 수평선
  spacing,
  className,
}) => {
  return (
    <div
      className={cn(
        styles.divider,
        styles[orientation], // horizontal 또는 vertical 클래스 적용
        spacing && styles[spacing], // 좌우 여백 type 적용
        className,
        'divider',
      )}
    />
  );
};
