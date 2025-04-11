import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Textarea, TextareaProps } from '@learnway/ui';

interface EditTextareaCellProps<T> {
  info: CellContext<T, string>;
  textarea?: TextareaProps;
}

const EditTextareaCell = <T,>({ info, textarea: textareaProps }: EditTextareaCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    table.options.meta?.updateData(row.index, cell.column.id, value);
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return (
    <Textarea
      {...textareaProps}
      value={value as string}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export { EditTextareaCell };
