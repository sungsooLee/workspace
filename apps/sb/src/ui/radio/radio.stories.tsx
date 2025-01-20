// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Radio } from '@learnway/ui';

export default {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Radio>;

const Template: React.FC<any> = (args) => {
  return (
      <Radio
        {...args}
      />
  );
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const RadioStory: Story = {
  name: 'Radio',
  args: {
    defaultValue: 'value0',
    options: Array(5).fill(null).map((d, i) => ({value: `value${i}`, label: `label${i}`}))
  },
  render: (args) => <Template {...args} />,
};

const TemplateValue: React.FC<any> = (args) => {
  const [value, setValue] = useState<string>('value0');
  return (
    <>
      <div className='flex space-x-5'>
        <Button onClick={() => setValue('value2')}>set value('value2')</Button>
        <Button onClick={() => setValue('')}>reset value</Button>
      </div>
      <div className='h-10'></div>
      <Radio
        {...args}
        value={value}
        onValueChange={(selectedValue) => setValue(selectedValue)}
      />
    </>
  );
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ValueControl: Story = {
  args: {
    defaultValue: 'value0',
    options: Array(5).fill(null).map((d, i) => ({value: `value${i}`, label: `label${i}`}))
  },
  render: (args) => <TemplateValue {...args} />,
};
