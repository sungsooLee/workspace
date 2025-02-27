// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DateRangePicker } from '@learnway/ui';
import { DATE_TIME_FORMAT } from '@learnway/shared';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof DatePicker>;

const BaseWrapper: React.FC<any> = (args) => {
  const [date, setDate] = useState(new Date());

  const handleDate = (value: any) => {
    setDate(value);
  };
  return <DatePicker {...args} readOnly={true} onChange={handleDate} value={date} />;
};

const BaseRangeWrapper: React.FC<any> = (args) => {
  const [date, setDate] = useState(new Date());

  const handleDate = (value: any) => {
    setDate(value);
  };
  return <DateRangePicker {...args} onChange={handleDate} value={date} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const DatePickerStory: Story = {
  name: 'DatePicker',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};

export const DateTimePickerStory: Story = {
  name: 'DateTimePicker',
  args: {
    dateTimeFormat: DATE_TIME_FORMAT.DATETIME_MIN,
    disabled: true,
  },
  render: (args) => <BaseWrapper {...args} />,
};

export const DateRangePickerStory: Story = {
  name: 'DateRangePicker',
  args: {
    disabled: true,
  },
  render: (args) => <BaseRangeWrapper {...args} />,
};
