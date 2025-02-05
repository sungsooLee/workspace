import React, { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@learnway/shared';

import styles from './chips.module.css';
import { SelectOption } from '../select/type';

export interface ChipsComponentProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  prefixCharacter?: string;
  onDelete?: (option: SelectOption) => void;
  label: string;
  value: string;
}

const ChipsComponent = forwardRef<HTMLDivElement, ChipsComponentProps>(
  ({
    children,
    className,
    variant,
    size,
    prefixCharacter = '#',
    label,
    value,
    onDelete,
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
      <div {...props} className={cn(styles.start, className, 'nlp--chips', 'rounded-full bg-gray-2')}>
        {/* prefix character */}
        {prefixCharacter}

        {/* label */}
        {label}

        {/* close button */}
        <button onClick={handleDeleteClick}>x</button>
      </div>
    );
  },
);

export const Chips = ChipsComponent;
