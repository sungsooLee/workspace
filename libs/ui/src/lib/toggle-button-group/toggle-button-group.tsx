import React, { forwardRef, useState } from 'react';

import { cn } from '@learnway/shared';
import styles from './toggle-button-group.module.css';
import { Button, ButtonSizeType, ButtonVariantType } from '../button/button';
import { SelectOption } from '../type';

// ToggleButtonGroup의 props 인터페이스
// 기본 HTMLButtonElement의 모든 속성을 포함하며, 추가적인 스타일 및 기능 관련 속성을 정의합니다.
export interface ToggleButtonGroupProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onChange'> {
  // 버튼의 시각적 형태 (스타일)
  variant?: ButtonVariantType;
  // 버튼의 크기
  size?: ButtonSizeType;
  // 기본 선택 값
  defaultValue?: string;
  // 버튼 onClick시 선택 값 상태관리 여부
  disableInternalState?: boolean;
  // 버튼 옵션
  options: SelectOption[];
  // 버튼 클릭 시 호출되는 콜백 함수
  onClick?: (value: string) => void;
  // 버튼 선택 변경 시 호출되는 콜백 함수
  onChange?: (value: string) => void;
}

// ToggleButtonGroup 컴포넌트
const ToggleButtonGroupComponent = forwardRef<HTMLButtonElement, ToggleButtonGroupProps>(
  (
    {
      disabled,
      children,
      className,
      variant,
      size,
      defaultValue,
      options,
      onClick,
      onChange,
      ...props
    },
    ref,
  ) => {
    // 현재 선택된 버튼의 value 상태 관리
    const [selected, setSelected] = useState<string | null>(
      defaultValue || options?.[0]?.value || null,
    );

    // 버튼 클릭 시 실행되는 핸들러
    // 상태값 변경 없이 이벤트만 호출
    const handleClick = (option: SelectOption) => {
      onClick?.(option.value);
    };

    // 버튼 클릭 시 실행되는 핸들러
    // 상태값 변경 후 이벤트 호출 (선택된 값이 변경될 때만 onChange 콜백 호출)
    const handleChange = (option: SelectOption) => {
      // 내부 상태 관리 활성화 시 선택 상태 변경
      setSelected(option.value);
      if (selected !== option.value) {
        onChange?.(option.value);
      }
    };

    return (
      <div className={cn(styles.start, 'nlp--toggle-button-group', className)}>
        {options.map((option: SelectOption) => (
          <Button
            key={option.value}
            label={option.label}
            className={cn(styles.btn, selected === option.value && styles.active)}
            disabled={disabled}
            onClick={() => (handleClick ? handleClick(option) : handleChange(option))}
            size={'sm'}
          />
        ))}
      </div>
    );
  },
);

export const ToggleButtonGroup = ToggleButtonGroupComponent;
