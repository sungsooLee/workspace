import { CellContext } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { Textarea, TextareaProps } from '../../textarea/textarea';

interface EditTextareaCellProps<T> {
  info: CellContext<T, string>;
  textarea?: TextareaProps;
}

const EditTextareaCell = <T,>({ info, textarea: textareaProps }: EditTextareaCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());
  // const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  // const lastSavedValueRef = useRef<any>(getValue());

  const saveValue = (newValue: any) => {
    // if (newValue !== lastSavedValueRef.current) {
    table.options.meta?.updateData(row.index, cell.column.id, newValue);
    //   lastSavedValueRef.current = newValue;
    // }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    // if (debounceTimerRef.current) {
    //   clearTimeout(debounceTimerRef.current);
    // }

    // debounceTimerRef.current = setTimeout(() => {
    //   saveValue(newValue);
    // }, 500);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      // if (debounceTimerRef.current) {
      //   clearTimeout(debounceTimerRef.current);
      // }
      saveValue(value);
    }
    textareaProps?.onKeyDown?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    // if (debounceTimerRef.current) {
    //   clearTimeout(debounceTimerRef.current);
    // }
    // saveValue(value);
    textareaProps?.onBlur?.(event);
  };

  useEffect(() => {
    const newValue = getValue();
    setValue(newValue);
    // lastSavedValueRef.current = newValue;
  }, [getValue]);

  // useEffect(() => {
  //   return () => {
  //     if (debounceTimerRef.current) {
  //       clearTimeout(debounceTimerRef.current);
  //     }
  //   };
  // }, []);

  return (
    <Textarea
      {...textareaProps}
      value={value as string}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export { EditTextareaCell };
