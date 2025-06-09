/* eslint-disable @nx/enforce-module-boundaries */
import React, { useState, useRef, useEffect } from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { IcoArrowForward, IcoArrowBackward, IcoArrowDownFilled } from '@learnway/icons';
import styles from './custom-date-picker-header.module.css';

interface CustomDatePickerHeaderProps extends ReactDatePickerCustomHeaderProps {
  locale?: any;
  type?: string;
}

export const CustomDatePickerHeader: React.FC<CustomDatePickerHeaderProps> = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  decreaseYear,
  increaseMonth,
  increaseYear,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  locale,
  type,
}) => {
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const yearPickerRef = useRef<HTMLDivElement>(null);
  const monthPickerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const yearItemRefs = useRef<(HTMLButtonElement | null)[]>([]); // 년도 Item Ref - 스크롤 처리
  const monthItemRefs = useRef<(HTMLButtonElement | null)[]>([]); // 월 Item Ref - 스크롤 처리

  const currentYear = date?.getFullYear?.();
  const currentMonth = date?.getMonth?.();

  const generateYearRange = () => {
    const years = [];
    const startYear = currentYear - 20;
    const endYear = currentYear + 20;
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthNamesKo = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  // 년도 스크롤 처리
  const scrollToYear = (index: number) => {
    const el = yearItemRefs.current[index];
    if (el) {
      yearPickerRef?.current?.scrollTo({ behavior: 'smooth', top: el?.offsetTop });
    }
  };

  // 월 스크롤 처리
  const scrollToMonth = (index: number) => {
    const el = monthItemRefs.current[index];
    if (el) {
      monthPickerRef?.current?.scrollTo({ behavior: 'smooth', top: el?.offsetTop });
    }
  };

  const getMonthNames = () => {
    if (locale?.code === 'ko') {
      return monthNamesKo;
    }
    return monthNames;
  };

  const handleYearSelect = (year: number) => {
    changeYear(year);
    setShowYearPicker(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    changeMonth(monthIndex);
    setShowMonthPicker(false);
  };

  const toggleYearPicker = () => {
    setShowYearPicker(!showYearPicker);
    setShowMonthPicker(false);
  };

  const toggleMonthPicker = () => {
    setShowMonthPicker(!showMonthPicker);
    setShowYearPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        yearPickerRef.current &&
        !yearPickerRef.current.contains(event.target as Node) &&
        monthPickerRef.current &&
        !monthPickerRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setShowYearPicker(false);
        setShowMonthPicker(false);
      }
    };

    if (showYearPicker || showMonthPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showYearPicker, showMonthPicker]);

  useEffect(() => {
    if (showYearPicker && yearPickerRef.current) {
      const currentYearElement = yearPickerRef.current.querySelector(
        `[data-year="${currentYear}"]`,
      );
      if (currentYearElement) {
        currentYearElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }, [showYearPicker, currentYear]);

  // 년도 스크롤 처리 Effect
  useEffect(() => {
    if (showYearPicker) {
      const index = generateYearRange().findIndex((year) => year === currentYear);
      index && scrollToYear(index);
    }
  }, [showYearPicker]);

  // 월 스크롤 처리 Effect
  useEffect(() => {
    if (showMonthPicker) {
      scrollToMonth(currentMonth);
    }
  }, [showMonthPicker]);

  return (
    <div className={styles.start}>
      <div ref={headerRef} className={styles.header}>
        <Button
          onlyIcon
          icon={<IcoArrowBackward width={20} height={20} stroke="#4C515E" />}
          onClick={type === 'year' ? decreaseYear : decreaseMonth}
          disabled={prevMonthButtonDisabled}
        />

        <div className={styles.select_value_wrap}>
          {type !== 'year' && (
            <Button onClick={toggleMonthPicker} className={showMonthPicker ? styles.active : ''}>
              {getMonthNames()[currentMonth]}
              <IcoArrowDownFilled width={16} height={16} stroke="#4C515E" />
            </Button>
          )}
          <Button onClick={toggleYearPicker} className={showYearPicker ? styles.active : ''}>
            {currentYear}
            <IcoArrowDownFilled width={16} height={16} stroke="#4C515E" />
          </Button>
        </div>
        <Button
          onlyIcon
          icon={<IcoArrowForward width={20} height={20} stroke="#4C515E" />}
          onClick={type === 'year' ? increaseYear : increaseMonth}
          disabled={nextMonthButtonDisabled}
        />
      </div>

      {showMonthPicker && type !== 'year' && (
        <div ref={monthPickerRef} className={styles.select_month_wrap}>
          {getMonthNames().map((month, index) => (
            <Button
              ref={(el) => (monthItemRefs.current[index] = el)}
              key={index}
              type={'button'}
              className={cn(styles.btn_item, index === currentMonth && styles.active)}
              onClick={() => handleMonthSelect(index)}
            >
              {month}
            </Button>
          ))}
        </div>
      )}

      {showYearPicker && (
        <div ref={yearPickerRef} className={styles.select_year_wrap}>
          {generateYearRange()
            ?.reverse()
            ?.map((year, index) => (
              <Button
                ref={(el) => (yearItemRefs.current[index] = el)}
                key={year}
                type={'button'}
                onClick={() => handleYearSelect(year)}
                className={cn(styles.btn_item, year === currentYear && styles.active)}
              >
                {year}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};
