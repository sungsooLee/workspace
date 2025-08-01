import { CellContext } from '@tanstack/react-table';
import React, { useEffect, useRef, useState } from 'react';
import { Input, InputProps } from '../../input/input';

interface EditInputCellProps<T> {
  info: CellContext<T, string>;
  input?: InputProps;
}

const EditInputCell = <T,>({ info, input: inputProps }: EditInputCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedValueRef = useRef<any>(getValue());

  const saveValue = (newValue: any) => {
    if (newValue !== lastSavedValueRef.current) {
      table.options.meta?.updateData(row.index, cell.column.id, newValue);
      lastSavedValueRef.current = newValue;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    // if (debounceTimerRef.current) {
    //   clearTimeout(debounceTimerRef.current);
    // }

    // debounceTimerRef.current = setTimeout(() => {
    //   saveValue(newValue);
    // }, 500);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' || event.key === 'Enter') {
      // if (debounceTimerRef.current) {
      //   clearTimeout(debounceTimerRef.current);
      // }
      saveValue(value);

      if (event.key === 'Enter') {
        event.currentTarget.blur();
      }
    }
    inputProps?.onKeyDown?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // if (debounceTimerRef.current) {
    //   clearTimeout(debounceTimerRef.current);
    // }
    saveValue(value);
    inputProps?.onBlur?.(event);
  };

  useEffect(() => {
    const newValue = getValue();
    setValue(newValue);
    lastSavedValueRef.current = newValue;
  }, [getValue]);

  // useEffect(() => {
  //   return () => {
  //     if (debounceTimerRef.current) {
  //       clearTimeout(debounceTimerRef.current);
  //     }
  //   };
  // }, []);

  return (
    <Input
      {...inputProps}
      value={value as string}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export { EditInputCell };
