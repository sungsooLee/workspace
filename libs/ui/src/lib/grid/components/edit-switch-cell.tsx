import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Switch, SwitchComponentProps } from '@learnway/ui';

interface EditSwitchCellProps<T> {
  info: CellContext<T, boolean>;
  switch?: SwitchComponentProps;
}

const EditSwitchCell = <T,>({ info, switch: switchProps }: EditSwitchCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());

  const handleChange = (value: boolean) => {
    setValue(value);
    table.options.meta?.updateData(row.index, cell.column.id, value);
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return <Switch {...switchProps} checked={value} onCheckedChange={handleChange} />;
};

export { EditSwitchCell };
