import { useController } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface RadioGroupInputProps {
  name: string;
  label?: string;
  options: { value: any; label: any }[];
  control: any;
  className?: string;
}

export const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
  name,
  label,
  options,
  control,
  className,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className='flex flex-col'>
      {label && (
        <label className='mb-2 flex text-sm font-bold text-gray-700'>
          {label}
        </label>
      )}
      <RadioGroup
        value={field.value}
        onValueChange={field.onChange}
        className={className}
      >
        {options.map(({ value, label: optionLabel }) => (
          <div key={value} className='flex items-center space-x-3'>
            <RadioGroupItem value={value} id={`${name}-${value}`} />
            <label htmlFor={`${name}-${value}`} className='text-sm'>
              {optionLabel}
            </label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className='text-xs italic text-red-500'>{error.message}</p>}
    </div>
  );
};
