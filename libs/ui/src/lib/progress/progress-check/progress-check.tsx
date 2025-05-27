import React, { forwardRef, ReactNode } from 'react';
import { ProgressDonut, ProgressDonutProps } from '../progress-donut/progress-donut';
import { IcoProgressComplete } from '@learnway/icons';

/**
 * ProgressCheck 컴포넌트의 props 인터페이스
 * 도넛 형태의 원형 진행률 표시기를 정의하며, 완료 상태일 때 아이콘을 표시할 수 있습니다.
 */
interface ProgressCheckProps extends ProgressDonutProps {
  /**
   * 진행률이 100%일 때 표시될 아이콘.
   * `progress`가 100이 아닐 때는 `ProgressDonut`이 표시됩니다.
   * @default <IcoProgressComplete /> (예시 아이콘)
   */
  completedIcon?: ReactNode; // ReactNode 타입을 사용하여 JSX 요소 또는 문자열도 받을 수 있게 함
}

/**
 * 도넛 형태의 원형 진행률 표시기 컴포넌트
 * SVG를 사용하여 원형 진행률을 시각적으로 표현합니다.
 * `forwardRef`를 사용하여 부모 컴포넌트에서 SVG 요소의 Ref에 접근할 수 있도록 합니다.
 */
const ProgressCheckComponent = forwardRef<
  SVGSVGElement,
  ProgressCheckProps // 컴포넌트 props 타입
>(
  ({
    progress,
    size = 24,
    completedIcon = <IcoProgressComplete width={24} height={24} />,
    ...props
  }) => {
    // 진행률이 100%인지 확인
    const isCompleted = progress >= 100;
    return isCompleted ? (
      completedIcon
    ) : (
      <ProgressDonut progress={progress} size={size} {...props} />
    );
  },
);

// 컴포넌트 내보내기
export const ProgressCheck = ProgressCheckComponent;
