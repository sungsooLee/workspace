// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FieldType } from '../type';
import Input from './input';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [FieldType.TEXT, FieldType.PASSWORD],
      defaultValue: FieldType.TEXT,
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} as Meta;
type Story = StoryObj<typeof Input>;

const BaseFormWrapper: React.FC<any> = (args) => {
  const [value, setValue] = React.useState(args.value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange?.(e);
  };

  return <Input {...args} value={value} onChange={handleChange} />;
};

export const Text: Story = {
  args: {
    type: FieldType.TEXT,
    placeholder: '값을 입력하세요.',
  },
  render: (args) => <BaseFormWrapper {...args} />,
};

export const Password: Story = {
  args: {
    type: FieldType.PASSWORD,
  },
  render: (args) => <BaseFormWrapper {...args} />,
};
