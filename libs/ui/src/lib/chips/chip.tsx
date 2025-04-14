import React, { forwardRef, PropsWithChildren } from 'react';

import { cn } from '@learnway/shared';
import { IcoXclose } from '@learnway/icons';

import styles from './chip.module.css';
import { Button } from '../button/button';

export interface ChipComponentProps extends PropsWithChildren {
  option: any;
  variant?: 'primary' | 'secondary';
  size?: 'ts' | 'xs' | 'sm' | 'md' | 'lg'; //  ts(20), xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  prefixCharacter?: string;
  hideCloseButton?: boolean;
  labelField?: string;
  valueField?: string;
  onClick?: (option: any) => void;
  onDelete?: (option: any) => void;
}

const ChipComponent = forwardRef<HTMLElement, ChipComponentProps>(
  (
    {
      className,
      variant,
      size,
      prefixCharacter,
      labelField = 'label',
      valueField = 'value',
      option,
      onClick,
      onDelete,
      hideCloseButton,
      ...props
    },
    ref,
  ) => {
    // 버튼 모드 사용 여부 - onClick 설정 했을때만 버튼으로 판단 (button style 조정시 사용)
    const isButtonMode = !!onClick;

    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      onClick?.(option);
    };

    const handleDeleteClick = (event: React.MouseEvent) => {
      event.stopPropagation(); // onClick 실행 방지
      onDelete?.(option);
    };

    return (
      <span
        {...props}
        ref={ref}
        className={cn(
          styles.start,
          styles.chips,
          variant && styles[variant],
          size && styles[size],
          className,
          'nlp--chips',
        )}
        onClick={handleClick}
      >
        {/* prefix character */}
        {prefixCharacter}

        {/* label */}
        <Button className={cn(styles.label, isButtonMode && styles.button_mode)}>
          {option[labelField]}
        </Button>

        {/* close button */}
        {!hideCloseButton && (
          <Button onClick={handleDeleteClick}>
            <IcoXclose stroke="#131C30" className={styles.close} />
          </Button>
        )}
      </span>
    );
  },
);

export const Chip = ChipComponent;
