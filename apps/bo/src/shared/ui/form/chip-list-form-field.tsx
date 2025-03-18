import { forwardRef, useEffect, useState } from 'react';
import { Button, ChipList, Select, SelectOption } from '@learnway/ui';
import { t } from 'i18next';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { BaseFormFieldProps } from '@learnway/hooks';

export interface ChipListFormFieldProps extends BaseFormFieldProps<string[]> {
  limitPlaceholder?: string;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ChipListFormFieldComponent = forwardRef<HTMLDivElement, ChipListFormFieldProps>(
  ({ value = [], onChange, placeHolder, limitPlaceholder }, ref) => {
    const handleOnChange = (chips: any) => {
      const labels = chips.map((chip: SelectOption) => chip.label);
      onChange(labels);
    };

    return (
      <div ref={ref} className={formStyles.tag_wrap}>
        <ChipList
          onChange={handleOnChange}
          className={formStyles.chips_wrap}
          options={value.map((val) => ({ value: val, label: val }))}
          placeholder={placeHolder}
          showInput
          prefixCharacter="#"
          hideBorder
        />
        {limitPlaceholder && (
          <p className={formStyles.text_limit}>
            {limitPlaceholder},<em className={formStyles.num}>1개</em>
            /200개
          </p>
        )}
      </div>
    );
  },
);
export const ChipListFormField = ChipListFormFieldComponent;
