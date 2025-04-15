import React, { ReactNode } from 'react';
import { cn } from '@learnway/shared';

import styles from './form-sub-title.module.css';

interface FormSubTitleProps {
  /** action node */
  actionNode?: ReactNode;
  /** 제목으로 표시될 문자열 */
  label?: string;
  /** 시각적 변형 (예: 텍스트 색상 등) */
  variant?: 'text' | 'primary';
  /** 크기 변형 (예: 폰트 크기, 패딩 등) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 하단 밑줄 표시 여부 */
  underLine?: boolean;
  /** 외부에서 추가할 CSS 클래스 이름 */
  className?: string;
}

const FormSubTitleComponent = ({
  actionNode,
  label,
  underLine,
  variant = 'text', // 기본값 설정
  size = 'md', // 기본값 설정
  className,
}: FormSubTitleProps) => {
  return (
    <div
      className={cn(
        styles.root,
        'title_wrap',
        underLine && 'border-b border-solid',
        'flex items-center justify-between',
        className,
      )}
    >
      {/* Label */}
      <div className="">
        <strong className={'title'}>{label}</strong>
      </div>
      {/* Action Node */}
      {actionNode && <div className="flex justify-end">{actionNode}</div>}
    </div>
  );
};

export const FormSubTitle = FormSubTitleComponent;
