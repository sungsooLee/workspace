import { forwardRef, useEffect, useState, ForwardRefRenderFunction, useRef } from 'react';
import Primitive from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';
import { IcoCalendar01 } from '@learnway/icons';

import { cn, getDatePickerPlaceholder, getDefaultLang } from '@learnway/shared';
import { BaseFieldProps } from '../type';

import { CustomDatePickerHeader } from './custom-date-picker-header';
import { ko, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { Locale } from 'react-datepicker/dist/date_utils';

const dayjsToDateFnsLocaleMap: Record<string, any> = {
  ko: ko,
  en: enUS,
};

export interface RangeDatePickerProps extends BaseFieldProps<[Date | null, Date | null]> {
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'md' | 'lg';
  onChange?: (dateRange: [Date | null, Date | null]) => void;
  onChangeStart?: (date: Date | undefined) => void;
  onChangeEnd?: (date: Date | undefined) => void;
  placeholderStart?: string;
  placeholderEnd?: string;
  locale?: string;
}

const RangeDatePickerComponent: ForwardRefRenderFunction<HTMLDivElement, RangeDatePickerProps> = (
  {
    value,
    onChange,
    minDate,
    maxDate,
    disabledDates,
    className,
    readOnly,
    disabled,
    size,
    onChangeStart,
    onChangeEnd,
    locale,
  },
  ref,
) => {
  const { i18n } = useTranslation();

  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    const targetLocale = locale || i18n.language || getDefaultLang();
    return dayjsToDateFnsLocaleMap[targetLocale] || ko;
  });

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (!locale) {
        const newLocale = dayjsToDateFnsLocaleMap[lng] || ko;
        setCurrentLocale(newLocale);
      }
    };

    if (i18n) {
      if (!locale) {
        const newLocale = dayjsToDateFnsLocaleMap[i18n.language] || ko;
        setCurrentLocale(newLocale);
      }

      i18n.on('languageChanged', handleLanguageChange);

      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    }
  }, [i18n, locale]);

  const [startDate, setStartDate] = useState<Date | null>(() => {
    return Array.isArray(value) ? value[0] : null;
  });
  const [endDate, setEndDate] = useState<Date | null>(() => {
    return Array.isArray(value) ? value[1] : null;
  });

  const [isKeyboardInput, setIsKeyboardInput] = useState(false);

  const startPickerRef = useRef<any>(null);
  const endPickerRef = useRef<any>(null);

  useEffect(() => {
    if (Array.isArray(value)) {
      setStartDate(value[0]);
      setEndDate(value[1]);
    }
  }, [value]);

  const getPlaceholderByType = (type: any, locale: any) => {
    const localeString = locale === ko ? 'ko' : 'en';
    return getDatePickerPlaceholder(type, localeString);
  };

  // 시작일 변경 핸들러
  const handleStartDateChange = (date: Date | null) => {
    if (!date) {
      setStartDate(null);
      setEndDate(null);
      onChange?.([null, null]);
      return;
    }

    if (!endDate || date > endDate) {
      setStartDate(date);
      setEndDate(null);
      onChange?.([date, null]);

      if (!isKeyboardInput) {
        setTimeout(() => {
          endPickerRef.current?.setOpen(true);
        }, 100);
      }
    } else {
      setStartDate(date);
      onChange?.([date, endDate]);
    }

    onChangeStart?.(date || undefined);
    setIsKeyboardInput(false);
  };

  // 종료일 변경 핸들러
  const handleEndDateChange = (date: Date | null) => {
    if (!date) {
      setEndDate(null);
      onChange?.([startDate ?? null, null]);
      return;
    }

    if (!startDate || date < startDate) {
      setStartDate(date);
      setEndDate(null);
      onChange?.([date, null]);

      if (!isKeyboardInput) {
        setTimeout(() => {
          endPickerRef.current?.setOpen(true);
        }, 100);
      }
    } else {
      setEndDate(date);
      onChange?.([startDate, date]);
    }

    onChangeEnd?.(date || undefined);
    setIsKeyboardInput(false);
  };

  // 키보드 입력 감지 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const inputKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '-',
      '/',
      'Backspace',
      'Delete',
    ];
    if (inputKeys.includes(e.key) || e.key.length === 1) {
      setIsKeyboardInput(true);
    }
  };

  const dateFormat = currentLocale === ko ? 'yyyy-MM-dd' : 'MM-dd-yyyy';

  return (
    <div className={cn('nlp--datepicker-time', 'nlp--datepicker-from-to', size)} ref={ref}>
      <div className="flex flex-row">
        <Primitive
          ref={startPickerRef}
          showIcon
          selectsStart
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          dateFormat={dateFormat}
          shouldCloseOnSelect={true}
          readOnly={readOnly}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={getPlaceholderByType('day', currentLocale)}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleStartDateChange}
          onKeyDown={handleKeyDown}
          excludeDates={disabledDates}
          renderDayContents={(day) => {
            return <span className="date_text">{day}</span>;
          }}
          renderCustomHeader={(headerProps: any) => (
            <CustomDatePickerHeader {...headerProps} locale={currentLocale} />
          )}
          locale={currentLocale}
        />
        <span className="hyphen"></span>
        <Primitive
          ref={endPickerRef}
          showIcon
          selectsEnd
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          dateFormat={dateFormat}
          shouldCloseOnSelect={true}
          readOnly={readOnly}
          disabled={disabled}
          minDate={startDate || minDate}
          maxDate={maxDate}
          placeholderText={getPlaceholderByType('day', currentLocale)}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleEndDateChange}
          onKeyDown={handleKeyDown}
          excludeDates={disabledDates}
          renderDayContents={(day) => {
            return <span className="date_text">{day}</span>;
          }}
          renderCustomHeader={(headerProps: any) => (
            <CustomDatePickerHeader {...headerProps} locale={currentLocale} />
          )}
          locale={currentLocale}
        />
      </div>
    </div>
  );
};

export const RangeDatePicker = forwardRef<HTMLDivElement, RangeDatePickerProps>(
  RangeDatePickerComponent,
);
