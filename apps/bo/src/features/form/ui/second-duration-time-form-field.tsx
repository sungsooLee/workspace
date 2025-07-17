import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { NumberFormatValues } from 'react-number-format';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Button, Input } from '@learnway/ui';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import {
  changeSecoundToTimeValue,
  changeTimeValueToSecound,
  TimeValueType,
} from '@learnway/shared';

type TimeChangeKeyType = 'hour' | 'minute' | 'second';

const SecondDurationTimeFormFieldComponent = forwardRef<HTMLDivElement, BaseFormFieldProps<number>>(
  ({ value, onChange }, ref) => {
    const [durationTime, setDurationTime] = useState<TimeValueType>({
      hour: 0,
      minute: 0,
      second: 0,
    });

    const handleChangeTimeValue =
      (key: TimeChangeKeyType) => (e: ChangeEvent<HTMLInputElement>) => {
        let convertedValue = Number(e.target.value);
        if (isNaN(convertedValue) || convertedValue < 0) {
          convertedValue = 0;
        } else if (key !== 'hour' && convertedValue > 59) {
          convertedValue = 59;
        }

        const updatedDurationTime = { ...durationTime, [key]: convertedValue };
        const nowval = changeTimeValueToSecound(updatedDurationTime);
        const oldval = changeTimeValueToSecound(durationTime);
        if (nowval === oldval) return;
        setDurationTime(updatedDurationTime);
        onChange(nowval);
      };

    const handleNumberValueAllowed = (key: TimeChangeKeyType) => (values: NumberFormatValues) => {
      const { floatValue = 0 } = values;
      const isInputAllowed = key === 'hour' ? floatValue >= 0 : floatValue >= 0 && floatValue <= 59;
      return isInputAllowed;
    };

    useEffect(() => {
      const nowValue = changeTimeValueToSecound(durationTime);
      if (nowValue === value) return;
      const newTime = changeSecoundToTimeValue(value);
      setDurationTime({
        hour: newTime.hour ?? 0,
        minute: newTime.minute ?? 0,
        second: newTime.second ?? 0,
      });
    }, [value]);

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
              isAllowed={handleNumberValueAllowed('hour')}
            />
            <p>&nbsp;:&nbsp;</p>
            <Input
              type="number"
              className={formStyles.input_time}
              value={durationTime.minute}
              onChange={handleChangeTimeValue('minute')}
              placeholder="0"
              maxLength={2}
              isAllowed={handleNumberValueAllowed('minute')}
            />
            <p>&nbsp;:&nbsp;</p>
            <Input
              type="number"
              className={formStyles.input_time}
              value={durationTime.second}
              onChange={handleChangeTimeValue('second')}
              placeholder="0"
              maxLength={2}
              isAllowed={handleNumberValueAllowed('second')}
            />
          </div>
        </div>
      </div>
    );
  },
);

SecondDurationTimeFormFieldComponent.displayName = 'SecondDurationTimeFormField';

export const SecondDurationTimeFormField = SecondDurationTimeFormFieldComponent;
