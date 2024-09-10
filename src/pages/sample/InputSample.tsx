import withInputField from './InputForm/withInputField';
import { Input } from '@/shared/components/Input/input';
import { NumericFormat } from 'react-number-format';
import RenderSample from './RenderSample';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shared/components/Select/select';

export const TextInput = withInputField(Input);

export const NumInput = withInputField(
  ({ className, onChange, error, ...rest }) => (
    <NumericFormat
      thousandSeparator=','
      customInput={Input}
      className={className}
      decimalScale={2}
      allowLeadingZeros={false}
      onValueChange={(values) => {
        onChange(values.floatValue);
      }}
      {...rest}
    />
  )
);

export const SelectInput = withInputField(
  ({ className, onChange, error, options, label, placeholder, ...rest }) => (
    <>
      <Select onValueChange={onChange} {...rest}>
        <SelectTrigger className={`w-[180px] ${className}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options &&
            options.map(({ value, label }: any) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  )
);

const InputSample = () => {
  return (
    <div className='flex flex-col space-y-10'>
      <RenderSample />
    </div>
  );
};

export default InputSample;
