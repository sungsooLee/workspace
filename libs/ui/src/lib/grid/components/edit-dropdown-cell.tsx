import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Dropdown } from '../../dropdown/dropdown';

interface EditDropdownCellProps<T> {
  info: CellContext<T, string>;
  dropdown?: any; // TODO: dropdown prop 타입이 없음
}

const EditDropdownCell = <T,>({ info, dropdown: dropdownProps }: EditDropdownCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<string>(getValue());

  const handleChange = (newValue: any) => {
    table.options.meta?.updateData(row.index, cell.column.id, newValue);
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return (
    <Dropdown
      {...dropdownProps}
      options={dropdownProps?.options || []}
      value={value}
      onChange={handleChange}
    />
  );
};

export { EditDropdownCell };
