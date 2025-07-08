import { forwardRef, useEffect } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Input } from '@learnway/ui';

type ValueType = {
  minute: number;
  hour: number;
  second: number;
};

const VideoDurationFormFieldComponent = forwardRef<HTMLDivElement, BaseFormFieldProps<ValueType>>(
  ({ value, onChange }, ref) => {
    useEffect(() => {
      console.log('value => ', value);
    }, []);
    return (
      <div ref={ref} className={'flex gap-[16px]'}>
        <Input
          type={'number'}
          className={'w-[200px]'}
          value={String(value.hour)}
          suffixText={'시간'}
        />
        <Input
          type={'number'}
          className={'w-[200px]'}
          value={String(value.minute)}
          suffixText={'분'}
        />
        <Input
          type={'number'}
          className={'w-[200px]'}
          value={String(value.second)}
          suffixText={'초'}
        />
      </div>
    );
  },
);

export const VideoDurationFormField = VideoDurationFormFieldComponent;
