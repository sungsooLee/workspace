import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import withInputField from './withInputField';

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
