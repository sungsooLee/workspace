// BaseForm.stories.tsx
import React, { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContentsRow, Textarea, TextareaFormField } from '@learnway/ui';
import { FormRow } from '../../../../../libs/auth/src/lib/shared';
import { DynamicFormConfig, useDynamicForm } from '../../../../../libs/hooks/src';

export default {
  title: 'Bo-Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Textarea>;

const Template: React.FC<any> = (args) => {
  const { provider } = useDynamicForm(formConfig);
  return (
    <div className="w-full">
      <ContentsRow>
        <FormRow provider={provider} name={'test'} element={<TextareaFormField {...args} />} />
      </ContentsRow>
    </div>
  );
};

export const Text: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    resize: 'vertical',
    size: 'sm',
    readOnly: false,
    rows: 5,
    cols: 33,
    maxLength: 1000,
    disabled: false,
  },
  render: (args) => <Template {...args} />,
};

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'test',
      type: 'textarea',
      label: 'Label',
      value: '',
      guideText: '주요 안내문구 노출하고, 되도록 버튼을 통해 안내문 작성',
      tooltip: 'TextArea 툴팁',
    },
  ],
  validator: {
    test: {
      required: true,
    },
  },
};
