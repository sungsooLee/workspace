import { useTranslation } from 'react-i18next';
import { cn, toArray } from '@learnway/shared';

import { SelectOption } from '../select/type';
import styles from './list.module.css';
import React, { useEffect, useState } from 'react';

export interface ListComponentProps {
  options: Array<SelectOption>;
  value?: any;
  className?: string;
  labelField?: string;
  valueField?: string;
  multiple?: boolean;
  onOptionSelect?: (option: any) => void;
  onOptionsSelect?: (options: any[]) => void;
}

const ListComponent = function ({
  className,
  options,
  value,
  labelField = 'label',
  valueField = 'value',
  multiple,
  onOptionSelect,
  onOptionsSelect,
}: ListComponentProps) {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<any[]>(
    getOptionsFromValue(options, value),
  );

  // changed value from parent component
  useEffect(() => {
    setSelectedOptions(getOptionsFromValue(options, value));
  }, [value]);

  // callback function
  useEffect(() => {
    onOptionSelect?.(selectedOptions?.[0]);
    onOptionsSelect?.(selectedOptions);
  }, [selectedOptions]);

  const handleOptionClickForSingle = (option: any) => {
    setSelectedOptions([option]);
  };

  const handleOptionClickForMultiple = (option: any) => {
    const isDelete = selectedOptions.find((d: any) => d[valueField] === option[valueField]);
    const appendedData = [...selectedOptions, option];
    const deletedData = selectedOptions?.filter((d: any) => d[valueField] !== option[valueField]);

    setSelectedOptions(isDelete ? deletedData : appendedData);
  };

  return (
    <ul className={cn(className, 'nlp--list', styles.list_wrap)}>
      {/* options */}
      {options?.map((d: any) => (
        <li
          role="button"
          className={cn(
            styles.item,
            selectedOptions?.find((x: any) => x[valueField] === d[valueField]) && styles.active, // selected row style
          )}
          key={d[valueField]}
          onClick={() =>
            multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d)
          }>
          {d[labelField]}
        </li>
      ))}
    </ul>
  );
};

export const List = ListComponent;

// move to utils
const getOptionsFromValue = (options: any, value: any, valueKey = 'value') => {
  const values = toArray(value);
  return options?.filter((d: any) => values.includes(d[valueKey]));
};
