/* eslint-disable @nx/enforce-module-boundaries */
// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '@learnway/ui';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof NumberInput>;

const BaseFormWrapper: React.FC<any> = (args) => {
  const [value, setValue] = React.useState(args.value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange?.(e);
  };

  return <NumberInput {...args} value={value} onChange={handleChange} />;
};

export const Default: Story = {
  args: {
    placeholder: '값을 입력하세요.',
  },
  render: (args) => <BaseFormWrapper {...args} />,
};
