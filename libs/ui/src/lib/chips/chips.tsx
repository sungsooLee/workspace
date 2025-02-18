import React, { forwardRef, PropsWithChildren } from 'react';

import { cn } from '@learnway/shared';
import { IcoXclose } from '@learnway/icons';

import styles from './chips.module.css';
import { Button } from '../button/button';

export interface ChipsComponentProps extends PropsWithChildren {
  option: any;
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  prefixCharacter?: string;
  hideCloseButton?: boolean;
  labelField?: string;
  valueField?: string;
  onClick?: (option: any) => void;
  onDelete?: (option: any) => void;
}

const ChipsComponent = forwardRef<HTMLElement, ChipsComponentProps>(
  ({
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
  }) => {
    // 버튼 모드 사용 여부 - onClick 설정 했을때만 버튼으로 판단 (button style 조정시 사용)
    const isButtonMode = !!onClick;

    const handleClick = (event: React.MouseEvent) => {
      onClick?.(option);
    };

    const handleDeleteClick = (event: React.MouseEvent) => {
      event.stopPropagation(); // onClick 실행 방지
      onDelete?.(option);
    };

    return (
      <span
        {...props}
        className={cn(styles.start, styles.chips, className, 'nlp--chips')}
        onClick={handleClick}>
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

export const Chips = ChipsComponent;
