import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Input, InputProps } from '../../input/input';

interface EditTextareaCellProps<T> {
  info: CellContext<T, string>;
  input?: InputProps;
}

const EditTextareaCell = <T,>({ info, input: inputProps }: EditTextareaCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    table.options.meta?.updateData(row.index, cell.column.id, value);
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return (
    <Input {...inputProps} value={value as string} onChange={handleChange} onBlur={handleBlur} />
  );
};

export { EditTextareaCell };
