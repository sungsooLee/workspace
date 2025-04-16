import { forwardRef, useEffect, useState } from 'react';
import { Button, ChipList, Dropdown, SelectOption } from '@learnway/ui';
import { t } from 'i18next';

export interface FormSelectChipListComponentProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  selectOptions: Array<SelectOption>;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormSelectChipListComponent = forwardRef<HTMLDivElement, FormSelectChipListComponentProps>(
  ({ value = [], selectOptions, onChange: ownerOnChange, ...props }, ref) => {
    const [selectedSelectOption, setSelectedSelectOption] = useState<SelectOption>();
    const [selectedChipOptions, setSelectedChipOptions] = useState<SelectOption[]>(value);

    useEffect(() => {
      ownerOnChange?.(selectedChipOptions);
    }, [selectedChipOptions]);

    const handleSelectChange = (option: SelectOption) => {
      setSelectedSelectOption(option);
    };

    const handleChipListChange = (event: SelectOption[]) => {
      setSelectedChipOptions(event);
    };

    const handleButtonClick = () => {
      const hasSelectedOption = !!selectedSelectOption;
      const isDuplicated = !!selectedChipOptions?.find(
        (d: SelectOption) => d.value === selectedSelectOption?.value,
      );

      if (hasSelectedOption && !isDuplicated) {
        setSelectedChipOptions([...selectedChipOptions, selectedSelectOption]);
      }
    };

    return (
      <div ref={ref}>
        <div>
          <Dropdown {...props} options={selectOptions} onChange={handleSelectChange} />
          <Button onClick={handleButtonClick}>{t('선택')}</Button>
        </div>
        <ChipList options={selectedChipOptions} />
      </div>
    );
  },
);
export const SelectChipListFormField = FormSelectChipListComponent;
