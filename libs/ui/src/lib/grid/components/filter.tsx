import { Column } from '@tanstack/react-table';
import DebouncedInput from '../../input/debounced-input';
import { useModalContext } from '../../modal/modal-context';
import { useState } from 'react';

interface FilterProps {
  column: Column<any, unknown>;
}
export const Filter = ({ column }: FilterProps) => {
  const { closeModal } = useModalContext();
  const columnFilterValue = column.getFilterValue();

  const { filterType } = column.columnDef.meta ?? {};

  return filterType === 'range' ? (
    <div className="flex flex-col space-y-1">
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder="Min"
          className="w-full"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder="Max"
          className="w-full"
        />
      </div>
    </div>
  ) : filterType === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="w-full text-sm border rounded px-2 py-1">
      <option value="">All</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
  ) : (
    <DebouncedInput
      value={(columnFilterValue ?? '') as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder="Search..."
      className="w-full"
    />
  );
};
