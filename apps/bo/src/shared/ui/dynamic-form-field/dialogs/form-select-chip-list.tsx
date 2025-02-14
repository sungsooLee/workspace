import { FC, useEffect, useState } from 'react';
import { SelectOption } from '@learnway/ui';

/**
 * 공통 Form Textarea
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormSelectChipListComponent: FC<any> = ({ value, onChange: ownerOnChange, ...props }) => {
  const [selectedSelectOption, setSelectedSelectOption] = useState<SelectOption>();
  const [selectedChipOptions, setSelectedChipOptions] = useState<SelectOption[]>(value);

  console.log('asdasdajsdashkjdasaksjdh');
  console.log('asdasdajsdashkjdasaksjdh');
  console.log('asdasdajsdashkjdasaksjdh');
  console.log('asdasdajsdashkjdasaksjdh');
  useEffect(() => {
    ownerOnChange?.(selectedChipOptions);
  }, [selectedChipOptions]);

  const handleSelectChange = (option: SelectOption) => {
    console.log('FormSelectChipListComponent : ', option);
    setSelectedSelectOption(option);
  };

  const handleChipListChange = (event: SelectOption[]) => {
    console.log('handleSelectChange', event);
    setSelectedChipOptions(event);
  };

  const handleButtonClick = () => {
    if (selectedSelectOption) {
      setSelectedChipOptions([...selectedChipOptions, selectedSelectOption]);
    }
  };

  return (
    <h1>XX</h1>
    // <div>
    //   <div>
    //     <Select {...props} onChange={handleSelectChange} />
    //     <Button onClick={handleButtonClick}>{t('선택')}</Button>
    //   </div>
    //   <ChipList options={value} onChange={handleChipListChange} />
    // </div>
  );
};
export const FormSelectChipList = FormSelectChipListComponent;
