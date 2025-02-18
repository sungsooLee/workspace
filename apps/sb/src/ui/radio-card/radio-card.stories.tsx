// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, RadioCard } from '@learnway/ui';
import { IcoBuilding01, IcoOverseasDealer } from '@learnway/icons';

export default {
  title: 'Components/RadioCard',
  component: RadioCard,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof RadioCard>;

const RADIO_CARD_OPTIONS = [
  {
    value: 'type1',
    label: (
      <div>
        <IcoBuilding01 width={48} height={48} stroke="#131C30" />
        <span>휴대폰 인증</span>
      </div>
    ),
  },
  {
    value: 'type2',
    label: (
      <div>
        <IcoOverseasDealer width={48} height={48} />
        <span>이메일 인증</span>
      </div>
    ),
  },
];

export const Template: any = (args: any) => {
  return (
    <div className="bg-gray-1 flex h-[300px] w-[500px] flex-col gap-5">
      <RadioCard defaultValue="type1" options={RADIO_CARD_OPTIONS} />
    </div>
  );
};
Template.storyName = 'RadioCard';
Template.args = {};

export const TemplateValueControl: any = (args: any) => {
  const [value, setValue] = useState<string>('value0');
  return (
    <>
      <div className="flex space-x-5">
        <Button onClick={() => setValue('value2')}>select label 2</Button>
        <Button onClick={() => setValue('')}>reset</Button>
      </div>
      <div className="h-10"></div>
      <RadioCard
        {...args}
        value={value}
        options={RADIO_CARD_OPTIONS}
        onValueChange={(selectedValue: any) => setValue(selectedValue)}
      />
    </>
  );
};
TemplateValueControl.storyName = 'Value Control';
TemplateValueControl.args = {};
