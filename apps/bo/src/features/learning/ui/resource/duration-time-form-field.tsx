import { ChangeEvent, forwardRef, useState } from 'react';
import { NumberFormatValues } from 'react-number-format';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Input } from '@learnway/ui';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

type TimeChangeKeyType = 'hour' | 'minute' | 'second';

type TimeValueType = {
  hour: number;
  minute: number;
  second: number;
};

const DurationTimeFormFieldComponent = forwardRef<
  HTMLDivElement,
  BaseFormFieldProps<TimeValueType>
>(({ value, onChange }, ref) => {
  const [durationTime, setDurationTime] = useState<TimeValueType>({
    hour: value.hour,
    minute: value.minute,
    second: value.second,
  });

  // 숫자 제한 추가하기!
  const handleChangeTimeValue = (key: TimeChangeKeyType) => (e: ChangeEvent<HTMLInputElement>) => {
    let convertedValue = Number(e.target.value);
    if (isNaN(convertedValue) || convertedValue < 0) {
      convertedValue = 0;
    }

    const updatedDurationTime = { ...durationTime, [key]: convertedValue };
    setDurationTime(updatedDurationTime);
    onChange(updatedDurationTime);
  };

  const handleNumberValueAllowed = (key: TimeChangeKeyType) => (values: NumberFormatValues) => {
    const { floatValue = 0 } = values;
    const isInputAllowed = key === 'hour' ? floatValue >= 0 : floatValue >= 0 && floatValue <= 59;
    return isInputAllowed;
  };

  return (
    <div ref={ref} className={formStyles.input_box}>
      <div className={formStyles.form_item}>
        <div className={dynamicFormStyles.form_auto}>
          <Input
            type="number"
            className={formStyles.input_time}
            value={durationTime.hour}
            onChange={handleChangeTimeValue('hour')}
            placeholder="0"
            suffixText="시간"
            isAllowed={handleNumberValueAllowed('hour')}
          />
          <Input
            type="number"
            className={formStyles.input_time}
            value={durationTime.minute}
            onChange={handleChangeTimeValue('minute')}
            placeholder="0"
            suffixText="분"
            maxLength={2}
            isAllowed={handleNumberValueAllowed('minute')}
          />
          <Input
            type="number"
            className={formStyles.input_time}
            value={durationTime.second}
            onChange={handleChangeTimeValue('second')}
            placeholder="0"
            suffixText="초"
            maxLength={2}
            isAllowed={handleNumberValueAllowed('second')}
          />
        </div>
      </div>
    </div>
  );
});

DurationTimeFormFieldComponent.displayName = 'DurationTimeFormField';

export const DurationTimeFormField = DurationTimeFormFieldComponent;
