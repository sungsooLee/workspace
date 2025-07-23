import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { RadioGroup, RadioGroupComponentProps } from '../../radio-group/radio-group';

interface EditRadioCellProps<T> {
  info: CellContext<T, string>;
  radio?: RadioGroupComponentProps;
  /** 사용하는 곳에서 직접 자료 설정 할떄 사용 */
  onValueChange?: (value: string) => void;
}

const EditRadioCell = <T,>({ info, radio: radioProps, onValueChange }: EditRadioCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<any>(getValue());

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      table.options.meta?.updateData(row.index, cell.column.id, newValue);
    }
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
