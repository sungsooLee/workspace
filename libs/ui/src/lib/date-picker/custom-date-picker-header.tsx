import React, { useState, useRef, useEffect } from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

interface CustomDatePickerHeaderProps extends ReactDatePickerCustomHeaderProps {
  locale?: any;
  type?: string;
}

export const CustomDatePickerHeader: React.FC<CustomDatePickerHeaderProps> = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
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

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

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

  return (
    <div style={{ position: 'relative' }}>
      <div ref={headerRef} className="flex w-full flex-row justify-between">
        <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          ‹
        </button>

        <div className="flex flex-row items-center space-x-5">
          {type !== 'year' && (
            <button type="button" onClick={toggleMonthPicker}>
              <span>{getMonthNames()[currentMonth]}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: showMonthPicker ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div className="flex flex-row" onClick={toggleYearPicker}>
            <button type="button">
              <span>{currentYear}</span>
            </button>

            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{
                transform: showYearPicker ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          ›
        </button>
      </div>

      {showMonthPicker && type !== 'year' && (
        <div ref={monthPickerRef}>
          <div>
            {getMonthNames().map((month, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleMonthSelect(index)}
                onMouseEnter={(e) => {
                  if (index !== currentMonth) {
                    e.currentTarget.style.background = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentMonth) {
                    e.currentTarget.style.background = 'white';
                  }
                }}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}

      {showYearPicker && (
        <div ref={yearPickerRef}>
          <div>
            {generateYearRange().map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => handleYearSelect(year)}
                style={{
                  padding: '8px 4px',
                  border: year === currentYear ? '2px solid ' : '1px solid ',
                  borderRadius: '4px',
                  background: year === currentYear ? 'lightBlue' : 'white',
                  cursor: 'pointer',
                  color: year === currentYear ? 'blue' : 'black',
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
