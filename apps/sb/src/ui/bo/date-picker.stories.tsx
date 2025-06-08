import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, DatePicker, DatePickerType, Switch, Tooltip } from '@learnway/ui';
import { DATE_TIME_FORMAT, getDefaultLang, setDefaultLang } from '@learnway/shared';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
// import { addDays } from 'react-datepicker/dist/date_utils';/
import { addDays } from 'date-fns';

interface StorybookI18nProviderProps {
  children: React.ReactNode;
  forceLocale?: 'ko' | 'en';
}

const StorybookI18nProvider: React.FC<StorybookI18nProviderProps> = ({ children, forceLocale }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const targetLang = forceLocale || getDefaultLang();

    if (!i18next.isInitialized) {
      i18next
        .use(initReactI18next)
        .init({
          debug: false,
          lng: targetLang,
          fallbackLng: 'ko',
          react: {
            useSuspense: false,
          },
          interpolation: {
            escapeValue: false,
          },
        })
        .then(async () => {
          if (forceLocale) {
            await setDefaultLang(forceLocale);
          }
          setIsInitialized(true);
        });
    } else {
      if (forceLocale && i18next.language !== forceLocale) {
        i18next.changeLanguage(forceLocale).then(async () => {
          await setDefaultLang(forceLocale);
          setIsInitialized(true);
        });
      } else {
        setIsInitialized(true);
      }
    }
  }, [forceLocale]);

  if (!isInitialized) {
    return <div>Loading i18n...</div>;
  }

  return <>{children}</>;
};

export default {
  title: 'Bo-Components/DatePicker&TimePicker',
  component: DatePicker,
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
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
        - 날짜 및 시간은 직접 입력하거나 레이어드 팝업을 제공하여 선택할 수 있다.  
        - 시간 설정이 필요한 경우 날짜 입력필드 우측에 시간 입력필드를 배치한다.  
        - 시간 설정은 30분(오전/오후) 단위를 기본으로 하나 업무에 따라 10-20분 등 설계 시 다르게 설계될 수 있다.  
        - 상세 시/분, 시/분/초 설정은 오전/오후를 제공하지 않고 상세하게 설정할 수 있도록 제공하며, 업무에 따라 다르게 설계될 수 있다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <StorybookI18nProvider>
        <Story />
      </StorybookI18nProvider>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof DatePicker>;

interface ComparisonTemplateProps {
  datePickerTypes: { type: DatePickerType; label: string; minuteStep?: number }[];
}

const ComparisonTemplate: React.FC<ComparisonTemplateProps> = ({ datePickerTypes }) => {
  const [koValues, setKoValues] = useState<Record<string, any>>({});
  const [enValues, setEnValues] = useState<Record<string, any>>({});

  const handleKoChange = (type: DatePickerType, value: any) => {
    console.log('KO:', type, value);
    setKoValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleEnChange = (type: DatePickerType, value: any) => {
    console.log('EN:', type, value);
    setEnValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const renderDatePickerCard = (
    type: DatePickerType,
    label: string,
    locale: 'ko' | 'en',
    values: Record<string, any>,
    onChange: (type: DatePickerType, value: any) => void,
    minuteStep?: number,
  ) => (
    <div
      key={`${type}-${locale}`}
      style={{
        padding: '20px',
        border: '2px solid',
        borderColor: locale === 'ko' ? '#3b82f6' : '#8b5cf6',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
      }}
    >
      <div>{label}</div>

      <div style={{ marginBottom: '12px' }}>
        <DatePicker
          displayType={type}
          value={values[type]}
          onChange={(value) => onChange(type, value)}
          minuteStep={minuteStep ?? 1}
          locale={locale}
          disabledDates={[addDays(new Date(), 5)]}
        />
      </div>

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
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      {datePickerTypes.map(({ type, label, minuteStep }) => (
        <div key={type} style={{ marginBottom: '40px' }}>
          <h4
            style={{
              textAlign: 'center',
              margin: '0 0 20px 0',
              color: '#374151',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            {label}
          </h4>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            {renderDatePickerCard(
              type,
              `${label} (한국어)`,
              'ko',
              koValues,
              handleKoChange,
              minuteStep,
            )}
            {renderDatePickerCard(
              type,
              `${label} (English)`,
              'en',
              enValues,
              handleEnChange,
              minuteStep,
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export const Compare_DatePicker: Story = {
  name: '📅 Date Picker',
  decorators: [
    (Story) => (
      <StorybookI18nProvider forceLocale="ko">
        <Story />
      </StorybookI18nProvider>
    ),
  ],
  args: {},
  render: (args) => {
    return (
      <>
        <div className="mb-6 text-base text-gray-600">
          <ul className="list-inside list-disc space-y-1">
            <li>데이트 피커가 노출될 경우, 투데이가 표시된 현재 달 노출.</li>
            <li>투데이를 기준으로 과거일 선택이 불가할 경우 비활성 노출.</li>
            <li>특정 일자 선택이 불가할 경우 비활성 노출. </li>
            <li>투데이가 비활성 일자일 경우 별도 표시 하지 않음. </li>
            <li>플레이스홀더는 투데이 날자로 제공 (그렇지 않을 경우, 설계 정의 필요)</li>
          </ul>
        </div>
        <ComparisonTemplate datePickerTypes={[{ type: 'day', label: 'Date Picker' }]} />
      </>
    );
  },
};

export const Compare_MonthYearPicker: Story = {
  name: '📅 Month/Year Picker',
  decorators: [
    (Story) => (
      <StorybookI18nProvider forceLocale="ko">
        <Story />
      </StorybookI18nProvider>
    ),
  ],
  render: (args) => {
    return (
      <>
        <ComparisonTemplate
          datePickerTypes={[
            { type: 'year', label: 'Year Picker' },
            { type: 'month', label: 'Month Picker' },
          ]}
        />{' '}
      </>
    );
  },
};

export const Compare_TimePicker: Story = {
  name: '⏰ Time Picker',
  decorators: [
    (Story) => (
      <StorybookI18nProvider forceLocale="ko">
        <Story />
      </StorybookI18nProvider>
    ),
  ],
  render: () => (
    <TimePickerTemplate
      datePickerTypes={[
        { type: 'time-step', label: 'Time-Step', minuteStep: 30 },
        { type: 'time', label: 'Time' },
        { type: 'time-hm', label: 'Time-HH:MM:SS' },
      ]}
    />
  ),
};

export const Compare_RangePicker: Story = {
  name: '📅 Range Picker',
  decorators: [
    (Story) => (
      <StorybookI18nProvider forceLocale="ko">
        <Story />
      </StorybookI18nProvider>
    ),
  ],
  render: () => (
    <ComparisonTemplate datePickerTypes={[{ type: 'from-to', label: 'Range Picker' }]} />
  ),
};

export const Compare_DateTimePicker: Story = {
  name: '🕐 Date + Time Picker',
  decorators: [
    (Story) => (
      <StorybookI18nProvider forceLocale="ko">
        <Story />
      </StorybookI18nProvider>
    ),
  ],
  render: () => (
    <ComparisonTemplate
      datePickerTypes={[
        { type: 'day-time', label: 'Day-time' },
        { type: 'day-time-hm', label: 'Day-time-hm' },
        { type: 'day-time-hms', label: 'Day-time-hms' },
      ]}
    />
  ),
};

const TimePickerTemplate: React.FC<ComparisonTemplateProps> = ({ datePickerTypes }) => {
  const [koValues, setKoValues] = useState<Record<string, any>>({});

  const handleKoChange = (type: DatePickerType, value: any) => {
    console.log('KO:', type, value);
    setKoValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const renderDatePickerCard = (
    type: DatePickerType,
    label: string,
    locale: 'ko' | 'en',
    values: Record<string, any>,
    onChange: (type: DatePickerType, value: any) => void,
    minuteStep?: number,
  ) => (
    <div
      key={`${type}-${locale}`}
      style={{
        padding: '20px',
        border: '2px solid',
        borderColor: locale === 'ko' ? '#3b82f6' : '#8b5cf6',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
      }}
    >
      <div>{label}</div>

      <div style={{ marginBottom: '12px' }}>
        <DatePicker
          displayType={type}
          value={values[type]}
          onChange={(value) => onChange(type, value)}
          minuteStep={minuteStep ?? 1}
          locale={locale}
          disabledDates={[addDays(new Date(), 5)]}
        />
      </div>

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
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      {datePickerTypes.map(({ type, label, minuteStep }) => (
        <div key={type} style={{ marginBottom: '40px' }}>
          <h4
            style={{
              textAlign: 'center',
              margin: '0 0 20px 0',
              color: '#374151',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            {label}
          </h4>

          {renderDatePickerCard(
            type,
            `${label} (한국어)`,
            'ko',
            koValues,
            handleKoChange,
            minuteStep,
          )}
        </div>
      ))}
    </div>
  );
};
