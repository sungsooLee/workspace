// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@learnway/ui';
import { CheckedState } from '@radix-ui/react-checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Checkbox>;

const Template: React.FC<any> = (args) => {
  return <Checkbox {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const CheckboxStory: Story = {
  name: 'Checkbox',
  args: {
    label: 'checkbox label',
    disabled: false,
    defaultChecked: true,
    onCheckedChange: (checked: CheckedState) => console.log('checked', checked),
  },
  render: (args) => <Template {...args} />,
};

const TemplateSetValue: React.FC<any> = (args) => {
  const [checked, setChecked] = useState<CheckedState>(true);
  return (
    <>
      <div className='flex space-x-5'>
        <button onClick={() => setChecked(true)}>checked</button>
        <button onClick={() => setChecked(false)}>unchecked</button>
      </div>
      <div className='h-5'></div>
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value: CheckedState) => setChecked(value)}
      />
    </>
  );
};

export const ValueControl: Story = {
  args: {
    label: 'checkbox label',
    disabled: false,
  },
  render: (args) => <TemplateSetValue {...args} />,
};
