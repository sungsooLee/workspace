import React, { useState, useCallback } from 'react';
import { cn } from '@learnway/shared';
import { IcoStar, IcoStar02 } from '@learnway/icons';

import styles from './star-rating.module.css';

/**
 * StarRating 컴포넌트의 props 인터페이스
 */
export interface StarRatingProps {
  /**
   * 현재 별점 값 (1-5)
   */
  value?: number;
  /**
   * 별점 변경 시 호출되는 콜백 함수
   */
  onChange?: (rating: number) => void;
  /**
   * 최대 별점 개수 (기본값: 5)
   */
  maxRating?: number;
  /**
   * 읽기 전용 모드 여부
   */
  readonly?: boolean;
  /**
   * 별의 크기
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 별점 변경 시 애니메이션 효과 활성화 여부
   */
  animated?: boolean;
}

/**
 * 별점을 표시하고 선택할 수 있는 StarRating 컴포넌트
 * 
 * @example
 * ```tsx
 * <StarRating
 *   value={3}
 *   onChange={(rating) => console.log(rating)}
 *   size="md"
 *   animated
 * />
 * ```
 */
export const StarRating: React.FC<StarRatingProps> = ({
  value = 0,
  onChange,
  maxRating = 5,
  readonly = false,
  size = 'md',
  className,
  animated = true,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [animatingStars, setAnimatingStars] = useState<Set<number>>(new Set());

  const handleStarClick = useCallback((rating: number) => {
    if (readonly || !onChange) return;
    
    if (animated) {
      // 애니메이션 효과를 위해 클릭된 별부터 순차적으로 애니메이션 적용
      for (let i = 1; i <= rating; i++) {
        setTimeout(() => {
          setAnimatingStars(prev => new Set([...prev, i]));
        }, (i - 1) * 50); // 50ms 간격으로 순차 애니메이션
      }
      
      // 애니메이션 완료 후 상태 초기화
      setTimeout(() => {
        setAnimatingStars(new Set());
        onChange(rating);
      }, rating * 50 + 200);
    } else {
      onChange(rating);
    }
  }, [readonly, onChange, animated]);

  const handleStarHover = useCallback((rating: number) => {
    if (readonly) return;
    setHoveredRating(rating);
  }, [readonly]);

  const handleMouseLeave = useCallback(() => {
    if (readonly) return;
    setHoveredRating(0);
  }, [readonly]);

  const getStarState = (starIndex: number) => {
    const currentRating = hoveredRating || value;
    const isAnimating = animatingStars.has(starIndex);
    const isFilled = starIndex <= currentRating;
    
    return { isFilled, isAnimating };
  };

  return (
    <div
      className={cn(
        styles.starRating,
        styles[size],
        {
          [styles.readonly]: readonly,
          [styles.interactive]: !readonly,
        },
        className
      )}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const starIndex = index + 1;
        const { isFilled, isAnimating } = getStarState(starIndex);

        return (
          <button
            key={starIndex}
            type="button"
            className={cn(
              styles.star,
              {
                [styles.filled]: isFilled,
                [styles.animating]: isAnimating,
                [styles.readonly]: readonly,
              }
            )}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleStarHover(starIndex)}
            disabled={readonly}
            aria-label={`${starIndex}점 별점`}
          >
            {isFilled ? (
              <IcoStar 
                className={styles.starIcon} 
                style={{ 
                  fill: '#fbbf24', 
                  stroke: '#fbbf24',
                  color: '#fbbf24',
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : (
              <IcoStar02 
                className={styles.starIcon} 
                style={{ 
                  fill: '#d1d5db', 
                  stroke: '#d1d5db',
                  color: '#d1d5db',
                  width: '100%',
                  height: '100%'
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
