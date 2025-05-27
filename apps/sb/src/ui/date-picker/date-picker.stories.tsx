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
  },
} as Meta;

type Story = StoryObj<typeof DatePicker>;

const DatePickerCollectionWrapper: React.FC<any> = () => {
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(getDefaultLang());
  const [values, setValues] = useState<Record<string, any>>({});

  const toggleLocale = async () => {
    const newLang = currentLanguage === 'ko' ? 'en' : 'ko';

    if (i18n.isInitialized) {
      await setDefaultLang(newLang);
      setCurrentLanguage(newLang);
    }
  };

  const handleChange = (type: DatePickerType, value: any) => {
    setValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const datePickerTypes: { type: DatePickerType; label: string; minuteStep?: number }[] = [
    { type: 'day', label: 'Day' },
    { type: 'year', label: 'Year' },
    { type: 'month', label: 'Month' },
    { type: 'from-to', label: 'From-to' },
    { type: 'time-step', label: 'Time-Step', minuteStep: 30 },
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
        >
          Change Language
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
        {datePickerTypes.map(({ type, label, minuteStep }) => (
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
                minuteStep={minuteStep ?? 1}
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
