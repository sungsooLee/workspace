// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@learnway/ui';
import useSelect from '@/libs/ui/src/lib/select/logic';

export default {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Select>;

const Template: React.FC<any> = (args) => {
  return <Dropdown {...args} />;
};

const TemplateControl: React.FC<any> = (args) => {
  const [value, setValue] = useState<string>('value2');
  return (
    <div>
      <span>
        <button onClick={() => setValue('value1')}>Set Value</button>
      </span>
      <Dropdown {...args} value={value} />
    </div>
  );
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const SelectStory: Story = {
  name: 'Select',
  args: {
    options: Array(5)
      .fill(null)
      .map((d, i) => ({ value: `value${i}`, label: `label${i}` })),
  },
  render: (args) => <Template {...args} onChange={(option: any) => console.log(option)} />,
};

export const SetValue: Story = {
  args: {
    // value: 'value2',
    options: Array(5)
      .fill(null)
      .map((d, i) => ({ value: `value${i}`, label: `label${i}` })),
  },
  render: (args) => <TemplateControl {...args} />,
};
