import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import withInputField from './withInputField';

export const CheckboxInput = withInputField(
  ({ className, onChange, error, options, label, ...rest }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleCheckboxChange = (value: string, checked: boolean) => {
      let newArr = [];
      if (checked) {
        newArr = [...selectedItems, value];
      } else {
        newArr = selectedItems.filter((item) => item !== value);
      }
      setSelectedItems(newArr);
      onChange(newArr);
    };

    return (
      <>
        {options &&
          options.map(
            ({ value, label: optionLabel }: { value: any; label: any }) => (
              <div key={value} className='items-center space-x-2'>
                <Checkbox
                  id={value}
                  checked={selectedItems.includes(value)}
                  onCheckedChange={(checked: boolean) =>
                    handleCheckboxChange(value, checked)
                  }
                  {...rest}
                />
                <label htmlFor={value}>{optionLabel}</label>
              </div>
            )
          )}
      </>
    );
  }
);
