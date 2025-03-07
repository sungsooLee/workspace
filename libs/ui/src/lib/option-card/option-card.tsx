import { useTranslation } from 'react-i18next';
import { cn, toArray } from '@learnway/shared';
import React, { ReactNode, useEffect, useState } from 'react';

import { Button } from '../button/button';
import styles from './option-card.module.css';
import { isEqual } from 'lodash';

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
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<OptionCardItem[]>(
    getOptionsFromValue(options, value),
  );

  // changed value from parent component
  useEffect(() => {
    const newSelectedOptions = getOptionsFromValue(options, value);
    if (!isEqual(selectedOptions, newSelectedOptions)) {
      setSelectedOptions(newSelectedOptions);
    }
  }, [value]);

  // callback function
  useEffect(() => {
    onOptionSelect?.(selectedOptions?.[0]);
    onOptionsSelect?.(selectedOptions);
  }, [selectedOptions]);

  const handleOptionClickForSingle = (option: OptionCardItem) => {
    setSelectedOptions([option]);
  };

  const handleOptionClickForMultiple = (option: OptionCardItem) => {
    const isDelete = selectedOptions.find((d: OptionCardItem) => d.value === option.value);
    const appendedData = [...selectedOptions, option];
    const deletedData = selectedOptions?.filter((d: OptionCardItem) => d.value !== option.value);

    setSelectedOptions(isDelete ? deletedData : appendedData);
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

// move to utils
const getOptionsFromValue = (options: any, value: any, valueKey = 'value') => {
  const values = toArray(value);
  return options?.filter((d: any) => values.includes(d[valueKey]));
};
