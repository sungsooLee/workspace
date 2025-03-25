/* eslint-disable @nx/enforce-module-boundaries */
// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, InputTimer } from '@learnway/ui';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Input>;

// Text
export const Template: any = (args: any) => {
  const [value, setValue] = useState('');
  const handleChange = (event: any) => {
    console.log(event);
    setValue(event.target.value);
  };
  return (
    <div className={'flex flex-col gap-3'}>
      <Input {...args} maxLength={20} value={value} onChange={handleChange} />
      <Input {...args} unitText={'명'} value={value} onChange={handleChange} />
      <Input {...args} showCounter value={value} onChange={handleChange} />
      <Input {...args} unitText={'명'} value={value} showCounter onChange={handleChange} />
      <Input
        {...args}
        showSearchIcon
        value={value}
        onChange={handleChange}
        onEnterKeyDown={() => console.log('enter')}
      />
    </div>
  );
};
Template.storyName = 'Text';

// Value Control
export const TemplateValueControl: any = (args: any) => {
  const [value, setValue] = React.useState('');
  const handleChange = (event: any) => {
    // console.log(values);
    setValue(event.target.value);
  };
  return (
    <div className={'flex flex-col gap-3'}>
      <button onClick={() => setValue('XX')}>Set</button>
      <Input {...args} value={value} onChange={handleChange} />
    </div>
  );
};
TemplateValueControl.storyName = 'Value Control';

// Number
export const TemplateNumber: any = (args: any) => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: any) => {
    console.log(value);
    setValue(event.target.value);
  };
  return <Input {...args} type="number" value={value} onChange={handleChange} />;
};
TemplateNumber.storyName = 'Number';

// Mask
export const TemplateMask: any = (args: any) => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <Input
      {...args}
      type="mask"
      mask={'_'}
      format={'###-####-####'}
      value={value}
      onChange={handleChange}
    />
  );
};
TemplateMask.storyName = 'Mask';

// Timer
export const TemplateTimer: any = (args: any) => {
  const [value, setValue] = React.useState('');
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const [startTimer, setStartTimer] = React.useState(0);
  return (
    <>
      <div className={'mb-5 flex flex-row gap-3'}>
        <Button
          label={'타이머 시작'}
          variant={'point'}
          size={'sm'}
          onClick={() => setStartTimer((prev) => prev + 1)}
        />
        <Button
          label={'타이머 종료'}
          variant={'point'}
          size={'sm'}
          onClick={() => setStartTimer(0)}
        />
      </div>
      <InputTimer
        {...args}
        value={value}
        startTimer={startTimer}
        initialTime={300}
        onTimerEnd={() => alert('End Timer')}
        onChange={handleChange}
      />
    </>
  );
};
TemplateTimer.storyName = 'Timer';
