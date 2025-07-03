import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { RadioGroup, RadioGroupComponentProps } from '../../radio-group/radio-group';

interface EditRadioCellProps<T> {
  info: CellContext<T, string>;
  radio?: RadioGroupComponentProps;
}

const EditRadioCell = <T,>({ info, radio: radioProps }: EditRadioCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());

  const handleValueChange = (newValue: string) => {
    table.options.meta?.updateData(row.index, cell.column.id, newValue);
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return (
    <RadioGroup
      {...radioProps}
      value={value}
      options={radioProps?.options || []}
      onValueChange={handleValueChange}
    />
  );
};

export { EditRadioCell };
