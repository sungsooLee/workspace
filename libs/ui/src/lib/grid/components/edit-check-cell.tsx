import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Checkbox, CheckboxComponentProps } from '../../checkbox/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

interface EditCheckboxCellProps<T> {
  info: CellContext<T, boolean>;
  checkbox?: CheckboxComponentProps;
}

const EditCheckboxCell = <T,>({ info, checkbox: checkboxProps }: EditCheckboxCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<boolean>(getValue());

  const handleCheckedChange = (newValue: CheckedState) => {
    table.options.meta?.updateData(row.index, cell.column.id, newValue);
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return <Checkbox {...checkboxProps} checked={value} onCheckedChange={handleCheckedChange} />;
};

export { EditCheckboxCell };
