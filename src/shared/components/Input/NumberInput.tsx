import { NumericFormat } from 'react-number-format';
import withInputField from './withInputField';
import { Input } from '../ui/input';

export const NumberInput = withInputField(
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
