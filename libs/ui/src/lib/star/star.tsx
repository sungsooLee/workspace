import React, { useState, useCallback } from 'react';
import { cn } from '@learnway/shared';

import styles from './star.module.css';

/**
 * Star 컴포넌트의 props 인터페이스
 */
export interface StarProps {
  /**
   * 별 개수
   * @default 5
   */
  total?: number;

  /**
   * 현재 선택된 별 개수
   * @default 0
   */
  value?: number;

  /**
   * 별 크기(픽셀)
   * @default 24
   */
  size?: number;

  /**
   * 읽기 전용 모드 여부
   * @default false
   */
  readonly?: boolean;

  /**
   * 활성화된 별의 색상
   * @default '#FFB800'
   */
  activeColor?: string;

  /**
   * 비활성화된 별의 색상
   * @default '#E5E5E5'
   */
  inactiveColor?: string;

  /**
   * 별점 변경 시 호출되는 콜백 함수
   */
  onChange?: (value: number) => void;
}

/**
 * 별 모양 아이콘을 사용한 Star 컴포넌트
 *
 * @example
 * ```tsx
 * <Star
 *   value={3}
 *   onChange={(rating) => console.log(rating)}
 *   size={24}
 *   activeColor="#FFB800"
 * />
 * ```
 */
/**
 * 별 모양 아이콘을 사용한 Star 컴포넌트
 *
 * @example
 * ```tsx
 * <Star
 *   value={3}
 *   onChange={(rating) => console.log(rating)}
 *   size={24}
 *   activeColor="#FFB800"
 * />
 * ```
 */
export const Star: React.FC<StarProps> = ({
  total = 5,
  value = 0,
  size = 24,
  readonly = false,
  activeColor = '#FFB800',
  inactiveColor = '#E5E5E5',
  onChange,
}) => {
  const [hoveredValue, setHoveredValue] = useState<number>(0);

  const handleStarClick = useCallback(
    (starValue: number) => {
      if (readonly || !onChange) return;
      onChange(starValue);
    },
    [readonly, onChange],
  );

  const handleStarHover = useCallback(
    (starValue: number) => {
      if (readonly) return;
      setHoveredValue(starValue);
    },
    [readonly],
  );

  const handleMouseLeave = useCallback(() => {
    if (readonly) return;
    setHoveredValue(0);
  }, [readonly]);

  // Determine gap size based on star size
  const gapClass =
    size <= 16 ? styles['gap-small'] : size >= 32 ? styles['gap-large'] : styles['gap-medium'];

  return (
    <div className={cn(styles.starContainer, gapClass)} onMouseLeave={handleMouseLeave}>
      {Array.from({ length: total }, (_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= value;
        const isHovered = starValue <= hoveredValue;

        const currentFill = isActive || isHovered ? activeColor : inactiveColor;

        return (
          <svg
            key={index}
            className={cn(styles.starIcon, {
              [styles.active]: isActive,
              [styles.inactive]: !isActive,
              [styles.readonly]: readonly,
            })}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={{ fill: currentFill }}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            data-testid={`star-${index}`}
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
        );
      })}
    </div>
  );
};

export default Star;
