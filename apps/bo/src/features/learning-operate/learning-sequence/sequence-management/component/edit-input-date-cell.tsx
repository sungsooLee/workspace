import React, { useEffect, useState, useRef } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Input, InputProps } from '@learnway/ui';
import { DatePicker } from '@learnway/ui';

interface EduRow {
  id?: string;
  learningStartType: string;
  courseSequenceEndDateTime: Date;
  learningStartDays: number;
}

interface EditInputDateCellProps<T extends EduRow> {
  info: CellContext<T, any>;
  input?: InputProps;
}

/**
 * 1개의 cell안에 date, number를 렌더링해야하므로 커스터마이징
 * status(학습중) : number, status(그 외) : date
 */
const EditInputDateCell = <T extends EduRow>({
  info,
  input: inputProps,
}: EditInputDateCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const { learningStartType, courseSequenceEndDateTime, learningStartDays } = row.original;

  const [value, setValue] = useState<any>(getValue());
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedValueRef = useRef<any>(getValue());

  const saveValue = (newValue: any) => {
    if (newValue !== lastSavedValueRef.current) {
      let columnId = '' as string;
      if (learningStartType === 'DAYS_AFTER_ENROLL') columnId = 'learningStartDays';
      else columnId = 'courseSequenceEndDateTime';
      table.options.meta?.updateData(row.index, columnId, newValue);
      lastSavedValueRef.current = newValue;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => saveValue(Number(newValue)), 500);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    saveValue(Number(value));
    inputProps?.onBlur?.(e);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      saveValue(Number(value));
      if (e.key === 'Enter') e.currentTarget.blur();
    }
    inputProps?.onKeyDown?.(e);
  };

  const handleDateChange = (newDate: any) => {
    setValue(newDate);
    saveValue(newDate);
  };

  useEffect(() => {
    const newValue = getValue();
    setValue(newValue);
    lastSavedValueRef.current = newValue;
  }, [getValue]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // 조건 분기
  if (learningStartType === 'DAYS_AFTER_ENROLL') {
    return (
      <Input
        {...inputProps}
        type="number"
        value={learningStartDays}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
      />
    );
  } else {
    return (
      <DatePicker
        displayType="day-time-h"
        value={courseSequenceEndDateTime}
        size="md"
        onChange={handleDateChange}
      />
    );
  }
};

export { EditInputDateCell };
