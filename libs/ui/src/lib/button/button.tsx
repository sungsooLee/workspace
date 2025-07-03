import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@learnway/shared';

import styles from './button.module.css';

/**
 * 버튼의 시각적 형태(스타일) 타입
 */
export type ButtonVariantType =
  | 'primary'
  | 'line'
  | 'gray'
  | 'gray2'
  | 'secondary'
  | 'search'
  | 'save'
  | 'point'
  | 'text'
  | 'chips'
  | 'expand'
  | 'expand2'
  | 'danger'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'gray-outline'
  | 'ghost'
  | 'link'
  | 'soft';

/**
 * 버튼의 크기 타입
 * ts(24), xs(28), sm(32), md(36), lg(40), xl(48) 픽셀 높이에 해당
 */
export type ButtonSizeType = 'ts' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2';

/**
 * ButtonComponent의 props 인터페이스
 * 기본 HTMLButtonElement의 모든 속성을 포함하며, 추가적인 스타일 및 기능 관련 속성을 정의합니다.
 */
export interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 시각적 형태 (스타일)
   */
  variant?: ButtonVariantType;
  /**
   * 버튼의 크기
   */
  size?: ButtonSizeType;
  /**
   * 버튼 내부에 표시될 아이콘 엘리먼트
   */
  icon?: React.ReactNode;
  /**
   * 아이콘의 위치 (텍스트 기준)
   * @default 'left'
   */
  iconAlign?: 'left' | 'right';
  /**
   * 텍스트 없이 아이콘만 표시할지 여부
   * @default false
   */
  onlyIcon?: boolean;
  /**
   * 로딩 상태 여부 (로딩 아이콘 표시 및 비활성화 처리)
   */
  isLoading?: boolean;
  /**
   * 더미 속성 (코드 내에서 사용되지 않음)
   */
  dummy?: boolean;
  /**
   * 외부에서 추가될 CSS 클래스 이름
   */
  className?: string;
  /**
   * 버튼에 표시될 텍스트 레이블 (children 대신 사용 가능)
   */
  label?: string;
  /**
   * 클릭 이벤트 발생 시 이벤트 전파를 중지할지 여부
   */
  stopPropagation?: boolean;
  /**
   * 클릭 이벤트 발생 시 기본 동작(예: form submit)을 막을지 여부
   */
  preventDefault?: boolean;
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  (
    {
      icon,
      iconAlign = 'left',
      onlyIcon = false,
      isLoading,
      disabled,
      children,
      className,
      variant,
      size,
      label,
      type = 'button',
      onClick,
      stopPropagation,
      preventDefault,
      ...props
    },
    ref,
  ) => {
    /**
     * 클릭 이벤트 발생 시 실행될 커스텀 핸들러
     * 이벤트 전파 및 기본 동작 방지 로직을 포함하고 원래 onClick 핸들러를 호출합니다.
     * @param e - React 마우스 이벤트 객체
     */
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      if (preventDefault) {
        e.preventDefault();
      }
      onClick?.(e);
    };

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={cn(
          styles.start,
          styles.btn,
          'nlp--button',
          variant && styles[variant],
          variant,
          size && styles[size],
          size,
          onlyIcon && 'only_icon',
          className,
        )}
        disabled={disabled || isLoading}
        onClick={handleClick}
      >
        {/* isLoading이 true일 때 로딩 아이콘 표시 */}
        {isLoading && <Loader2 className="animate-spin" />}

        {/* 아이콘 정렬이 'left'이고 icon prop이 있을 때 아이콘 표시 */}
        {iconAlign === 'left' && icon}

        {/* children이 있거나 label이 있을 때 내용 표시 */}
        {children || label}

        {/* 아이콘 정렬이 'right'이고 icon prop이 있을 때 아이콘 표시 */}
        {iconAlign === 'right' && icon}
      </button>
    );
  },
);

export const Button = ButtonComponent;
