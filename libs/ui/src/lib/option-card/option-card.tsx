import { useTranslation } from 'react-i18next';
import { cn, toArray } from '@learnway/shared';
import React, { ReactNode, useEffect, useState } from 'react';

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
  onOptionSelect?: (option: any) => void;
  onOptionsSelect?: (options: any[]) => void;
}

const OptionCardComponent = function ({
  className,
  options,
  value,
  cols,
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
      className={cn(styles.start, styles.option_card_wrap, className, 'nlp--option-card')}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`, // cols 값에 따라 열 개수를 설정
      }}>
      {/* options */}
      {options?.map((d: OptionCardItem) => (
        <div
          className={cn(
            styles.card_item,
            selectedOptions?.find((x: OptionCardItem) => x.value === d.value) && 'bg-amber-100', // selected row style
          )}
          key={d.value}
          onClick={() =>
            multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d)
          }>
          {/* Icon */}
          {d.icon && <div>{d.icon}</div>}
          {/* label */}
          {d.label && <div>{d.label}</div>}
          {/* descrition */}
          {d.description && <div>{d.description}</div>}
        </div>
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
