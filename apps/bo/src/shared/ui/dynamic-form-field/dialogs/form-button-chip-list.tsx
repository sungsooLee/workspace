import { forwardRef, useEffect, useState } from 'react';
import { Button, ButtonComponentProps, ChipList, SelectOption } from '@learnway/ui';

export interface FormButtonChipListProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  selectOptions: Array<SelectOption>;
  button?: ButtonComponentProps;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormButtonChipListComponent = forwardRef<HTMLDivElement, FormButtonChipListProps>(
  ({ value = [], selectOptions, onChange: ownerOnChange, button = {}, ...props }, ref) => {
    const [selectedChipOptions, setSelectedChipOptions] = useState<SelectOption[]>(value);

    const {
      type = 'button',
      variant = 'point',
      size = 'sm',
      label = '선택',
      onClick: buttonOnClick,
    } = button;

    useEffect(() => {
      ownerOnChange?.(selectedChipOptions);
    }, [selectedChipOptions]);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const newChip = buttonOnClick?.(event);
      // const hasSelectedOption = !!selectedSelectOption;
      // const isDuplicated = !!selectedChipOptions?.find(
      //   (d: SelectOption) => d.value === selectedSelectOption?.value,
      // );
      //
      // if (hasSelectedOption && !isDuplicated) {
      //   setSelectedChipOptions([...selectedChipOptions, selectedSelectOption]);
      // }
    };

    const handleChipListChange = (event: SelectOption[]) => {
      setSelectedChipOptions(event);
    };

    return (
      <div ref={ref} className={'flex flex-row'}>
        <Button label={label} variant={variant} size={size} onClick={handleButtonClick} />
        <ChipList options={selectedChipOptions} onChange={handleChipListChange} />
      </div>
    );
  },
);
export const FormButtonChipList = FormButtonChipListComponent;
