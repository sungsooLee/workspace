import React, { useEffect, useState, useRef } from 'react';
import { CellContext } from '@tanstack/react-table';
import { DatePicker, DatePickerComponentProps } from '../../date-picker/date-picker';

interface EditDatePickerComponentProps<T> {
  info: CellContext<T, T>;
  dateOptions?: DatePickerComponentProps;
}

const EditDatePickerCell = <T,>({
  info,
  dateOptions: dateOptionsProps,
}: EditDatePickerComponentProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());
  const lastSavedValueRef = useRef<any>(getValue());

  const saveValue = (newValue: any) => {
    if (newValue !== lastSavedValueRef.current) {
      table.options.meta?.updateData(row.index, cell.column.id, newValue);
      lastSavedValueRef.current = newValue;
    }
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

  return (
    <DatePicker
      {...dateOptionsProps}
      value={new Date(value)}
      size="md"
      onChange={handleDateChange}
    />
  );
};

export { EditDatePickerCell };
