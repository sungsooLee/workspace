// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@learnway/ui';
import { CheckedState } from '@radix-ui/react-checkbox';

export default {
  title: 'Bo-Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
- 항목을 복수 선택하는 경우, 체크박스 형태의 Button으로 구성할 수 있다.
        `,
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof Checkbox>;

const Template: React.FC<any> = (args) => {
  return <Checkbox {...args} />;
};

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
