import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, DatePicker, DatePickerType, Switch, Tooltip } from '@learnway/ui';
import { DATE_TIME_FORMAT, getDefaultLang, setDefaultLang } from '@learnway/shared';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

interface StorybookI18nProviderProps {
  children: React.ReactNode;
}

export const StorybookI18nProvider: React.FC<StorybookI18nProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!i18next.isInitialized) {
      i18next
        .use(initReactI18next)
        .init({
          debug: false,
          lng: getDefaultLang(),
          fallbackLng: 'ko',
          react: {
            useSuspense: false,
          },
          interpolation: {
            escapeValue: false,
          },
        })
        .then(() => {
          setIsInitialized(true);
        });
    } else {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return <div>Loading i18n...</div>;
  }

  return <>{children}</>;
};

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

const DatePickerCollectionWrapper: React.FC<any> = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const [values, setValues] = useState<Record<string, any>>({});

  const toggleLocale = async () => {
    const newLang = currentLanguage === 'ko' ? 'en' : 'ko';

    if (i18n.isInitialized) {
      await setDefaultLang(newLang);
    }
  };

  const handleChange = (type: DatePickerType, value: any) => {
    console.log(value);
    setValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const datePickerTypes: { type: DatePickerType; label: string }[] = [
    { type: 'day', label: 'Day' },
    { type: 'year', label: 'Year' },
    { type: 'month', label: 'Month' },
    { type: 'from-to', label: 'From-to' },
    { type: 'time', label: 'Time (일반 시간)' },
    { type: 'time-hm', label: 'Time (시/분 사용자 시간)' },
    { type: 'day-time', label: 'Day-time' },
    { type: 'day-time-hm', label: 'Day-time-hm' },
    { type: 'day-time-hms', label: 'Day-time-hms' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px' }}>
      {/* 언어 토글 버튼 */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <button
          onClick={toggleLocale}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          언어 변경
        </button>
      </div>

      {/* DatePicker 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        {datePickerTypes.map(({ type, label }) => (
          <div
            key={type}
            style={{
              padding: '20px',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* 타입 라벨 */}
            <div
              style={{
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                borderBottom: '1px solid #f3f4f6',
                paddingBottom: '8px',
              }}
            >
              {label}
            </div>

            {/* DatePicker 컴포넌트 */}
            <div style={{ marginBottom: '12px' }}>
              <DatePicker
                displayType={type}
                value={values[type]}
                onChange={(value) => handleChange(type, value)}
              />
            </div>

            {/* 현재 값 표시 */}
            <div
              style={{
                fontSize: '12px',
                color: '#6b7280',
                backgroundColor: '#f9fafb',
                padding: '8px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                wordBreak: 'break-all',
              }}
            >
              <strong>Value:</strong>{' '}
              {values[type]
                ? Array.isArray(values[type])
                  ? `[${values[type].map((d: Date | null) => (d ? d.toISOString().split('T')[0] : 'null')).join(', ')}]`
                  : values[type].toISOString
                    ? values[type].toISOString().split('T')[0]
                    : String(values[type])
                : 'null'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DatePickerCollect: Story = {
  name: 'Collect',
  decorators: [
    (Story) => (
      <StorybookI18nProvider>
        <Story />
      </StorybookI18nProvider>
    ),
  ],
  render: () => <DatePickerCollectionWrapper />,
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
    // placeholderStart: 'Start date',
    // placeholderEnd: 'End date',
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
    // minDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    // maxDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  },
  render: (args) => <DateWrapper {...args} />,
};
