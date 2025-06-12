import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { TimeRangePicker, TimeRangeFieldProps } from '../../date-picker/time-range-picker';
import { DateRange } from '../../type';

interface EditTimeRangeCellProps<T> {
  info: CellContext<T, DateRange>;
  timeRange?: TimeRangeFieldProps;
}

const EditTimeRangeCell = <T,>({ info, timeRange: timeRangeProps }: EditTimeRangeCellProps<T>) => {
  const { table, row, cell, getValue } = info;
  const [value, setValue] = useState<DateRange>(getValue());

  const handleChange = (newValue: any) => {
    table.options.meta?.updateData(row.index, cell.column.id, newValue);
  };

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return (
    <div className="select_date_wrap" style={{ zIndex: 10 }}>
      <TimeRangePicker {...timeRangeProps} value={value} onChange={handleChange} size={'md'} />
    </div>
  );
};

export { EditTimeRangeCell };
