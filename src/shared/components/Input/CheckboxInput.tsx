import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { useController } from 'react-hook-form';

interface CheckboxInputProps {
  name: string;
  label?: string;
  options: { value: any; label: any }[];
  control: any;
  className?: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  label,
  options,
  control,
  className,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const [selectedItems, setSelectedItems] = useState<any[]>(field.value || []);

  const handleChange = (value: any) => {
    const newSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];
    setSelectedItems(newSelectedItems);
    field.onChange(newSelectedItems);
  };

  return (
    <>
      {label && (
        <label className='mb-2 flex text-sm font-bold text-gray-700'>
          {label}
        </label>
      )}
      <div className={`flex ${className}`}>
        {options.map(({ value, label: optionLabel }) => (
          <div key={value} className='flex items-center space-x-2'>
            <Checkbox
              id={value}
              checked={selectedItems.includes(value)}
              onCheckedChange={() => handleChange(value)}
            />
            <label htmlFor={`${name}-${value}`} className='text-sm'>
              {optionLabel}
            </label>
          </div>
        ))}
      </div>

      {error && <p className='text-xs italic text-red-500'>{error.message}</p>}
    </>
  );
};
