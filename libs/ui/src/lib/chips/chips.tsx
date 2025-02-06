import React, { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@learnway/shared';

import { SelectOption } from '../select/type';

import styles from './chips.module.css';

export interface ChipsComponentProps extends HTMLAttributes<HTMLDivElement> {
  option: SelectOption;
  variant?: 'primary';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  prefixCharacter?: string;
  hideCloseButton?: boolean;
  onDelete?: (option: SelectOption) => void;
}

const ChipsComponent = forwardRef<HTMLElement, ChipsComponentProps>(
  ({
    className,
    variant,
    size,
    prefixCharacter = '#',
    onDelete,
    hideCloseButton,
     option: {label, value},
    ...props
  }) => {
    const handleDeleteClick = (event: React.MouseEvent) => {
      event.stopPropagation(); // onClick 실행 방지
      const option: SelectOption = {
        label,
        value,
      };
      onDelete?.(option);
    };

    return (
      <span
        {...props}
        className={cn(styles.start, className, 'nlp--chips', 'bg-gray-2 m-1 rounded')}>
        {/* prefix character */}
        {prefixCharacter}

        {/* label */}
        {label}

        {/* close button */}
        {!hideCloseButton && <button onClick={handleDeleteClick} className={'ml-1'}>x</button>}
      </span>
    );
  },
);

export const Chips = ChipsComponent;
