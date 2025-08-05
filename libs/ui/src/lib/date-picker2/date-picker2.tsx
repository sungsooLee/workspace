import { IcoCalendar01 } from '@learnway/icons';
import { cn, DATE_TIME_FORMAT, getDefaultLang } from '@learnway/shared';
import { enUS, ko } from 'date-fns/locale';
import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import Primitive from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom';
import { CustomDatePickerHeader } from '../date-picker/custom-date-picker-header';
import { PopoverHourInput } from '../date-picker/custom-hour-picker';
import { PopoverTimeInput } from '../date-picker/custom-time-picker';
import { DatePickerType } from '../date-picker/date-picker';
import { useModalStore } from '../stores/useModalStore';
import { BaseFieldProps } from '../type';
import './date-picker.css';
import { getDatePickerVisibility, getParseDate, getPlaceholder } from './date-picker.service';

export const convertDateFormatToFnsWithSlash = (format: string): string => {
  return format.replace(/-/g, '/');
};

export interface DatePickerComponentProps2 extends BaseFieldProps<Date> {
  displayType?: DatePickerType;
  dateTimeFormat?: DATE_TIME_FORMAT;
  minDate?: Date;
  maxDate?: Date;
  startDate?: Date;
  endDate?: Date;
  selected?: Date;
  disabledDates?: Date[];
  timeFormat?: '12' | '24';
  numberOfMonths?: number;
  minuteStep?: number;
  secondStep?: number;
  showTimePicker?: boolean;
  showTimeSelectOnly?: boolean;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'md' | 'lg';
  renderDayContents?: ReactNode;
  locale?: string;
  onChange?: (date: Date | undefined) => void;
}

// DatePicker 컴포넌트 정의
const DatePickerComponent: ForwardRefRenderFunction<HTMLDivElement, DatePickerComponentProps2> = (
  {
    displayType = 'day',
    dateTimeFormat = DATE_TIME_FORMAT.DATE,
    value,
    minDate,
    maxDate,
    startDate,
    endDate,
    disabledDates,
    numberOfMonths = 1,
    minuteStep = 1,
    secondStep = 1,
    className,
    readOnly,
    disabled,
    locale = getDefaultLang(),
    onChange,
  },
  ref,
) => {
  const currentLocale = locale === 'ko' ? ko : enUS;

  const { modals } = useModalStore();
  const pickerRef = useRef<any>(null);

  console.log('#### date-picker2 : locale', locale);

  const { showPicker, showTimeInput, showSeconds, showHourInput } =
    getDatePickerVisibility(displayType);

  const { pickerPlaceholder, hourPlaceholder, timePlaceholder } = getPlaceholder(
    displayType,
    locale,
  );

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    // time 타입일 때는 value가 없으면 undefined 유지
    if (showTimeInput && !value) {
      return undefined;
    }
    return value as Date;
  });

  // DateFormat을 가지고옴.
  // const dateFormat = useCreation(() => {
  //   return getPickerDateFormat(displayType, locale);
  // }, [displayType, locale]);
  const dateFormat = locale === 'ko' ? 'yyyy-MM-dd' : 'MM-dd-yyyy';

  const handleChange = (date: Date | string | null) => {
    console.log('#### date-picker2 : handleChange', date);
    if (readOnly || disabled) return;

    const newDate = getParseDate(date);

    setSelectedDate(newDate);

    onChange?.(newDate);

    pickerRef.current?.setOpen?.(false);
  };

  useEffect(() => {
    console.log('#### date-picker2 : useEffect.value', value);
    setSelectedDate(value as Date | undefined);
  }, [value]);

  const Picker = () => {
    return (
      <Primitive
        showIcon
        toggleCalendarOnIconClick
        dateFormat={dateFormat}
        shouldCloseOnSelect
        readOnly={readOnly}
        disabled={disabled}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        selected={selectedDate}
        placeholderText={pickerPlaceholder}
        icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
        isClearable={true}
        monthsShown={numberOfMonths}
        wrapperClassName={'datepicker_wrap'}
        className={cn('datepicker_input', className)}
        onChange={handleChange}
        excludeDates={disabledDates}
        renderYearContent={
          displayType === 'year'
            ? (year: number) => {
                const isCurrentYear = year === new Date().getFullYear();
                return <span className={isCurrentYear ? 'current-year' : ''}>{year}</span>;
              }
            : undefined
        }
        renderCustomHeader={
          displayType !== 'year'
            ? (headerProps: any) => (
                <CustomDatePickerHeader {...headerProps} locale={currentLocale} />
              )
            : undefined
        }
        locale={currentLocale}
        popperPlacement="bottom-start"
        popperContainer={
          modals.length
            ? undefined
            : (props) => ReactDOM.createPortal(props.children, document.body)
        }
      />
    );
  };

  const HourInput = () => {
    return (
      <div className="nlp--datepicker-time">
        <PopoverHourInput
          value={selectedDate}
          onChange={(date: Date | undefined) => {
            console.log('#### date-picker2 : HourInput', date);
            // if (date) {
            //   handleChange(date);
            // }
          }}
          placeholder={hourPlaceholder}
          locale={currentLocale}
        />
      </div>
    );
  };

  const TimeInput = () => {
    return (
      <div className="nlp--datepicker-time">
        <PopoverTimeInput
          value={selectedDate}
          onChange={handleChange}
          minuteStep={minuteStep}
          secondStep={secondStep}
          showSeconds={showSeconds}
          locale={currentLocale}
          placeholder={timePlaceholder}
        />
      </div>
    );
  };

  return (
    <div className={cn('nlp--datepicker-time', 'nlp--datepicker-from-to')}>
      <div className="datepicker_from_to">
        <div className="nlp--datepicker-calendar">
          {showPicker && <Picker />}
          {showHourInput && <HourInput />}
          {showTimeInput && <TimeInput />}
        </div>
      </div>
    </div>
  );
};

export const DatePicker2 = forwardRef<HTMLDivElement, DatePickerComponentProps2>(
  DatePickerComponent,
);
