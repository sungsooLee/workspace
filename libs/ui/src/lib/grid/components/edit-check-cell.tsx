import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Checkbox, CheckboxComponentProps } from '../../checkbox/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

interface EditCheckboxCellProps<T> {
  info: CellContext<T, boolean>;
  checkbox?: CheckboxComponentProps;
  /** 사용하는 곳에서 직접 자료 설정 할떄 사용 */
  onCheckedChange?: (checked: CheckedState) => void;
}

const EditCheckboxCell = <T,>({
  info,
  checkbox: checkboxProps,
  onCheckedChange,
}: EditCheckboxCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<boolean>(getValue());

  const handleCheckedChange = (newValue: CheckedState) => {
    if (onCheckedChange) {
      onCheckedChange(newValue);
    } else {
      table.options.meta?.updateData(row.index, cell.column.id, newValue);
    }
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return <Checkbox {...checkboxProps} checked={value} onCheckedChange={handleCheckedChange} />;
};

export { EditCheckboxCell };
