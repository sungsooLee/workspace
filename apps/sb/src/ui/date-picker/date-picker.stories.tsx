import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@learnway/ui';
import { DATE_TIME_FORMAT } from '@learnway/shared';
import 'react-datepicker/dist/react-datepicker.css';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    displayType: {
      control: 'select',
      options: [
        'day',
        'year',
        'month',
        'from-to',
        'time',
        'time-hm',
        'day-time',
        'day-time-hm',
        'day-time-hms',
      ],
      description: 'Type of date picker to display',
    },
    dateTimeFormat: {
      control: 'select',
      options: Object.values(DATE_TIME_FORMAT),
      description: 'Date format to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the date picker is read-only',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    minuteStep: {
      control: { type: 'number', min: 1, max: 60 },
      description: 'Minute step interval',
    },
    secondStep: {
      control: { type: 'number', min: 1, max: 60 },
      description: 'Second step interval',
    },
    timeFormat: {
      control: 'select',
      options: ['12', '24'],
      description: 'Time format (12 or 24 hour)',
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Number of months to display at once',
    },
  },
} as Meta;

type Story = StoryObj<typeof DatePicker>;

// Basic wrapper with state management for single date value
const DateWrapper: React.FC<any> = (args) => {
  const [date, setDate] = useState<Date | undefined>(args.initialValue || new Date());

  const handleDate = (value: any) => {
    // setDate(value);
  };

  return <DatePicker {...args} onChange={handleDate} value={date} />;
};

// Wrapper for date range
const DateRangeWrapper: React.FC<any> = (args) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(
    args.initialValue || [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))],
  );

  const handleDateRange = (value: any) => {
    setDateRange(value);
  };

  return <DatePicker {...args} onChange={handleDateRange} value={dateRange} />;
};

// Day Picker (Default)
export const DayPicker: Story = {
  name: 'Day Picker',
  args: {
    displayType: 'day',
    dateTimeFormat: DATE_TIME_FORMAT.DATE,
    placeholder: 'Select a date',
  },
  render: (args) => <DateWrapper {...args} />,
};

// Year Picker
export const YearPicker: Story = {
  name: 'Year Picker',
  args: {
    displayType: 'year',
    dateTimeFormat: DATE_TIME_FORMAT.YEAR,
    placeholder: 'Select a year',
  },
  render: (args) => <DateWrapper {...args} />,
};

// Month Picker
export const MonthPicker: Story = {
  name: 'Month Picker',
  args: {
    displayType: 'month',
    dateTimeFormat: DATE_TIME_FORMAT.MONTH,
    placeholder: 'Select a month',
  },
  render: (args) => <DateWrapper {...args} />,
};

// Date Range Picker
export const DateRangePicker: Story = {
  name: 'Date Range Picker',
  args: {
    displayType: 'from-to',
    dateTimeFormat: DATE_TIME_FORMAT.DATE,
    placeholderStart: 'Start date',
    placeholderEnd: 'End date',
    numberOfMonths: 2,
  },
  render: (args) => <DateRangeWrapper {...args} />,
};

// Time Picker
export const TimePicker: Story = {
  name: 'Time Picker',
  args: {
    displayType: 'time',
    dateTimeFormat: DATE_TIME_FORMAT.HOUR_MIN,
    placeholder: 'Select time',
    minuteStep: 1,
  },
  render: (args) => <DateWrapper {...args} />,
};

// Time Picker (HM)
export const TimePickerHM: Story = {
  name: 'Time Picker with Hour/Minute',
  args: {
    displayType: 'time-hm',
    dateTimeFormat: DATE_TIME_FORMAT.HOUR_MIN,
    placeholder: 'Select time (HH:MM)',
    minuteStep: 1,
  },
  render: (args) => <DateWrapper {...args} />,
};

// Date Time Picker
export const DateTimePicker: Story = {
  name: 'Date and Time Picker',
  args: {
    displayType: 'day-time',
    dateTimeFormat: DATE_TIME_FORMAT.DATETIME_HOUR,
    placeholder: 'Select date and time',
    minuteStep: 1,
  },
  render: (args) => <DateWrapper {...args} />,
};

// Date Time Picker (HM)
export const DateTimePickerHM: Story = {
  name: 'Date and Time (HM) Picker',
  args: {
    displayType: 'day-time-hm',
    dateTimeFormat: DATE_TIME_FORMAT.DATETIME_MIN,
    placeholder: 'Select date and time (HH:MM)',
    minuteStep: 1,
  },
  render: (args) => <DateWrapper {...args} />,
};

// Date Time Picker (HMS)
export const DateTimePickerHMS: Story = {
  name: 'Date and Time (HMS) Picker',
  args: {
    displayType: 'day-time-hms',
    dateTimeFormat: DATE_TIME_FORMAT.DATETIME_SEC,
    placeholder: 'Select date and time (HH:MM:SS)',
    minuteStep: 1,
    secondStep: 1,
  },
  render: (args) => <DateWrapper {...args} />,
};

// Disabled DatePicker
export const DisabledDatePicker: Story = {
  name: 'Disabled Date Picker',
  args: {
    displayType: 'day',
    disabled: true,
    placeholder: 'Disabled date picker',
  },
  render: (args) => <DateWrapper {...args} />,
};

// ReadOnly DatePicker
export const ReadOnlyDatePicker: Story = {
  name: 'Read-only Date Picker',
  args: {
    displayType: 'day',
    readOnly: true,
    placeholder: 'Read-only date picker',
  },
  render: (args) => <DateWrapper {...args} />,
};

// Date picker with min/max date restrictions
export const DatePickerWithRestrictions: Story = {
  name: 'Date Picker with Min/Max Restrictions',
  args: {
    displayType: 'day',
    minDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    maxDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    placeholder: 'Select a date (±7 days)',
  },
  render: (args) => <DateWrapper {...args} />,
};

// Date picker with specific date exclusions
export const DatePickerWithExclusions: Story = {
  name: 'Date Picker with Exclusions',
  args: {
    displayType: 'day',
    disabledDates: [
      new Date(new Date().setDate(new Date().getDate() + 1)),
      new Date(new Date().setDate(new Date().getDate() + 3)),
      new Date(new Date().setDate(new Date().getDate() + 5)),
    ],
    placeholder: 'Some dates are disabled',
  },
  render: (args) => <DateWrapper {...args} />,
};

// 12-hour format time picker
export const TimePickerTwelveHour: Story = {
  name: 'Time Picker (12-hour format)',
  args: {
    displayType: 'time',
    timeFormat: '12',
    placeholder: 'Select time (12h format)',
    minuteStep: 1,
  },
  render: (args) => <DateWrapper {...args} />,
};

// All Features Combined
export const AllFeaturesCombined: Story = {
  name: 'Date Time Picker (All Features)',
  args: {
    displayType: 'day-time-hms',
    dateTimeFormat: DATE_TIME_FORMAT.DATETIME_SEC,
    placeholder: 'Complete date time picker',
    minuteStep: 1,
    secondStep: 1,
    timeFormat: '24',
    minDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    maxDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  },
  render: (args) => <DateWrapper {...args} />,
};
