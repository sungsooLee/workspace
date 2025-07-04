import { ChangeEvent, forwardRef, useState } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Input } from '@learnway/ui';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

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

  const handleChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange({ hour: value, minute: durationTime.minute, second: durationTime.second });
    setDurationTime({ ...durationTime, hour: Number(e.target.value) });
  };

  const handleChangeMinute = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange({ hour: durationTime.hour, minute: value, second: durationTime.second });
    setDurationTime({ ...durationTime, minute: Number(e.target.value) });
  };

  const handleChangeSecond = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange({ hour: durationTime.hour, minute: durationTime.minute, second: value });
    setDurationTime({ ...durationTime, second: Number(e.target.value) });
  };

  return (
    <div ref={ref} className={formStyles.input_box}>
      <div className={formStyles.form_item}>
        <div className={dynamicFormStyles.form_auto}>
          <Input
            type="number"
            className={formStyles.input_time}
            value={durationTime.hour}
            onChange={handleChangeHour}
            placeholder="0"
            suffixText="시간"
          />
          <Input
            type="number"
            className={formStyles.input_time}
            value={durationTime.minute}
            onChange={handleChangeMinute}
            placeholder="0"
            suffixText="분"
          />
          <Input
            type="number"
            className={formStyles.input_time}
            value={durationTime.second}
            onChange={handleChangeSecond}
            placeholder="0"
            suffixText="초"
          />
        </div>
      </div>
    </div>
  );
});

export const DurationTimeFormField = DurationTimeFormFieldComponent;
