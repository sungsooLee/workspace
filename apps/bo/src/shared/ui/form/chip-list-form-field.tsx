import { forwardRef } from 'react';
import { ChipList } from '@learnway/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { BaseFormFieldProps } from '@learnway/hooks';

export interface ChipListFormFieldProps extends BaseFormFieldProps<string[]> {
  limitPlaceholder?: string;
  prefixCharacter?: string;
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
    // const handleOnChange = (chips: any) => {
    //   const labels = chips.map((chip: SelectOption) => chip.label);
    //   onChange(labels);
    // };
    const handleAddInputEnterKeyDown = (text: string) => {
      const newValue = [...value, text];
      onChange(newValue);
    };
    const handlerChipDelete = (option: any) => {
      const newValue = value?.filter((d) => d !== option.label); // option[labelField]
      onChange(newValue);
      console.log('handlerChipDelete', option);
    };

    return (
      <div ref={ref} className={formStyles.tag_wrap}>
        <ChipList
          className={formStyles.chips_wrap}
          options={value.map((val) => ({ value: val, label: val }))}
          placeholder={placeHolder}
          showInput
          hideBorder
          // onChange={handleOnChange}
          onAddInputEnterKeyDown={handleAddInputEnterKeyDown}
          onChipDeleteClick={handlerChipDelete}
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
