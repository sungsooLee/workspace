// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Switch } from '@learnway/ui';

export default {
  title: 'Bo-Components/Toggle',
  component: Switch,
  tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
- 두 가지 상태를 전환하는 기능을 제공하는 요소이다. ‘활성 / 비활성화’와 같이 상반되는 두 상태 사이를 전환하기 위해 사용된다.
        `,
      },
    },
  },
} as Meta;

export const Template: any = (args: any) => {
  return <Switch {...args} />;
};
Template.storyName = 'Switch';
Template.args = {
  label: 'label',
  labelAlign: 'right',
};
