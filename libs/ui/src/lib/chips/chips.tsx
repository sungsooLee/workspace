import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import { SelectOption } from '../select/type';
import { IcoXclose } from '@learnway/icons';

import styles from './chips.module.css';
import { Button } from '../button/button';

export interface ChipsComponentProps {
  option: SelectOption;
  variant?: 'primary' | 'secondary';
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
    option: { label, value },
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
      <span {...props} className={cn(styles.start, styles.chips, className, 'nlp--chips')}>
        {/* prefix character */}
        {prefixCharacter}

        {/* label */}
        {label}

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
