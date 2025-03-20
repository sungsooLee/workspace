import { addOrRemoveItemByKey, cn, getMatchingItemsByKey } from '@learnway/shared';
import React, { ReactNode } from 'react';

import { Button } from '../button/button';
import styles from './option-card.module.css';

export interface OptionCardItem {
  label: string;
  value: any;
  icon?: ReactNode;
  description?: string;
}

export interface OptionCardComponentProps {
  options: OptionCardItem[];
  value?: any;
  className?: string;
  labelField?: string;
  valueField?: string;
  multiple?: boolean;
  cols?: number; // row length
  size?: 'md' | 'lg';
  onOptionSelect?: (option: any) => void;
  onOptionsSelect?: (options: any[]) => void;
}

const OptionCardComponent = function ({
  className,
  options,
  value,
  cols,
  size,
  multiple,
  onOptionSelect,
  onOptionsSelect,
}: OptionCardComponentProps) {
  const selectedOptions = getMatchingItemsByKey(options, value, 'value');

  const handleOptionClickForSingle = (option: OptionCardItem) => {
    onOptionSelect?.(option);
  };

  const handleOptionClickForMultiple = (option: OptionCardItem) => {
    const newSelectedOptions = addOrRemoveItemByKey(selectedOptions, option, 'value');
    onOptionsSelect?.(newSelectedOptions);
  };

  return (
    <div
      className={cn(
        styles.start,
        styles.option_card_wrap,
        className,
        'nlp--option-card',
        !cols && styles.type_flex,
      )}
      style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}>
      {/* options */}
      {options?.map((d: OptionCardItem) => (
        <Button
          type="button"
          className={cn(
            styles.card_item,
            selectedOptions?.find((x: OptionCardItem) => x.value === d.value) && styles.active, // selected row style
            size && styles[size],
          )}
          key={d.value}
          onClick={() =>
            multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d)
          }>
          {/* Icon */}
          {d.icon && <span className={styles.icon}>{d.icon}</span>}
          {/* label */}
          {d.label && <span className={styles.label}>{d.label}</span>}
          {/* descrition */}
          {d.description && <span className={styles.description}>{d.description}</span>}
        </Button>
      ))}
    </div>
  );
};

export const OptionCard = OptionCardComponent;
