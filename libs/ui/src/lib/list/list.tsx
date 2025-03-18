import { useTranslation } from 'react-i18next';
import { addOrRemoveItemByKey, cn, toArray } from '@learnway/shared';

import { SelectOption } from '../select/type';
import styles from './list.module.css';
import React, { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { IcoDelete03 } from '@learnway/icons';
import { Button } from '../button/button';

export interface ListComponentProps {
  options: Array<SelectOption>;
  value?: any;
  className?: string;
  labelField?: string;
  valueField?: string;
  selectable?: boolean;
  multiple?: boolean;
  deletable?: boolean;
  hideBorder?: boolean;
  /** chip 삭제 버튼 클릭시 호출 */
  onOptionDeleteClick?: (option: any) => void;
  /** option 선택시 호출 (싱글 모드) */
  onOptionSelect?: (option: any) => void;
  /** option 선택시 호출 (멀티 모드) */
  onOptionsSelect?: (options: any[]) => void;
}

const ListComponent = function ({
  className,
  options,
  value,
  labelField = 'label',
  valueField = 'value',
  selectable = true,
  multiple,
  deletable,
  hideBorder,
  onOptionDeleteClick,
  onOptionSelect,
  onOptionsSelect,
}: ListComponentProps) {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  // changed value from parent component
  useEffect(() => {
    const newSelectedOptions = getOptionsFromValue(options, value, valueField);
    if (!isEqual(selectedOptions, newSelectedOptions) && selectable) {
      setSelectedOptions(newSelectedOptions);
    }
  }, [value]);

  // callback function
  useEffect(() => {
    if (selectable) {
      onOptionSelect?.(selectedOptions?.[0]);
      onOptionsSelect?.(selectedOptions);
    }
  }, [selectedOptions, selectable]);

  const handleOptionClickForSingle = (option: any) => {
    setSelectedOptions([option]);
  };

  const handleOptionClickForMultiple = (option: any) => {
    const newSelectedOptions = addOrRemoveItemByKey(selectedOptions, option, valueField);
    setSelectedOptions(newSelectedOptions);
  };

  const handleDeleteClick = (event: React.MouseEvent, option: any) => {
    event.stopPropagation(); // 이벤트 전파를 중단하여 오버레이 클릭 이벤트를 막음
    onOptionDeleteClick?.(option);
  };

  return (
    <ul className={cn(className, 'nlp--list', styles.start, hideBorder && styles.border_none)}>
      {/* options */}
      {options?.map((d: any) => (
        <li
          role="button"
          className={cn(
            styles.item,
            selectedOptions?.find((x: any) => x[valueField] === d[valueField]) && styles.active, // selected row style
          )}
          key={d[valueField]}
          onClick={() => {
            if (selectable) {
              multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d);
            }
          }}>
          {/* 라벨 */}
          {d[labelField]}
          {/* 삭제 버튼 */}
          {deletable && (
            <Button
              type="button"
              className={cn(styles.clear)}
              onlyIcon
              onClick={(event: React.MouseEvent) => handleDeleteClick(event, d)}>
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </Button>
          )}
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
