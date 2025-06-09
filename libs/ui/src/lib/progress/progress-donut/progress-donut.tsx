import React, { forwardRef } from 'react';

/**
 * ProgressDonut 컴포넌트의 props 인터페이스
 * 도넛 형태의 원형 진행률 표시기를 위한 속성들을 정의합니다.
 */
export interface ProgressDonutProps {
  /**
   * 진행률 값 (0부터 100까지의 숫자)
   */
  progress: number; // 0 ~ 100
  /**
   * 도넛 차트의 전체 크기 (너비와 높이)
   * @default 100
   */
  size?: number;
  /**
   * 도넛의 선 두께 (스트로크 너비)
   * @default 5.6
   */
  strokeWidth?: number;
  /**
   * 트랙(진행되지 않은 부분)의 색상
   * @default 'var(--gray4)'
   */
  trackColor?: string;
  /**
   * 진행률(채워진 부분)의 색상
   * @default 'var(--secondary1)'
   */
  progressColor?: string;
}

/**
 * 도넛 형태의 원형 진행률 표시기 컴포넌트
 * SVG를 사용하여 원형 진행률을 시각적으로 표현합니다.
 * `forwardRef`를 사용하여 부모 컴포넌트에서 SVG 요소의 Ref에 접근할 수 있도록 합니다.
 */
const ProgressDonutComponent = forwardRef<
  SVGSVGElement,
  ProgressDonutProps // 컴포넌트 props 타입
>(
  (
    {
      progress, // 진행률 값
      size = 24, // 전체 크기 (기본값 100)
      strokeWidth = 5.6, // 선 두께 (기본값 10)
      trackColor = 'var(--gray4)', // 트랙 색상 (기본값 #e0e0e0)
      progressColor = 'var(--secondary1)', // 진행률 색상 (기본값 #3b82f6)
    },
    ref, // forwardRef로 전달받은 Ref 객체
  ) => {
    // 원의 반지름 계산: (전체 크기 - 선 두께) / 2
    const radius = (size - strokeWidth) / 2;
    // 원의 둘레 계산: 2 * PI * 반지름
    const circumference = 2 * Math.PI * radius;
    // 진행률에 따른 다시 그릴 원의 둘레 오프셋 계산
    // (둘레 - (진행률 / 100) * 둘레)
    // progress가 0이면 둘레 전체, progress가 100이면 0
    const offset = circumference - (progress / 100) * circumference;

    // SVG 요소를 렌더링
    return (
      <>
        <svg width={size} height={size} ref={ref}>
          {' '}
          {/* ref를 SVG 요소에 연결 */}
          {/* 트랙(진행되지 않은 부분)을 나타내는 원 */}
          <circle
            cx={size / 2} // 원의 중심 x 좌표 (SVG 뷰포트의 중앙)
            cy={size / 2} // 원의 중심 y 좌표 (SVG 뷰포트의 중앙)
            r={radius} // 원의 반지름
            stroke={trackColor} // 선 색상
            strokeWidth={strokeWidth} // 선 두께
            fill="none" // 원 내부를 채우지 않음
          />
          {/* 진행률(채워진 부분)을 나타내는 원 */}
          <circle
            cx={size / 2} // 원의 중심 x 좌표
            cy={size / 2} // 원의 중심 y 좌표
            r={radius} // 원의 반지름
            stroke={progressColor} // 선 색상
            strokeWidth={strokeWidth} // 선 두께
            fill="none" // 원 내부를 채우지 않음
            strokeLinecap="square" // 선의 끝을 둥글게 처리
            strokeDasharray={circumference} // 선의 대시 패턴 (둘레 전체를 하나의 대시로 설정)
            strokeDashoffset={offset} // 선의 대시 오프셋 (진행률에 따라 채워지는 정도 조절)
            transform={`rotate(-90 ${size / 2} ${size / 2})`} // 원을 -90도 회전시켜 상단에서 시작하도록 함
          />
        </svg>
        {/* <p>dd</p> */}
      </>
    );
  },
);

// 컴포넌트 내보내기
export const ProgressDonut = ProgressDonutComponent;
