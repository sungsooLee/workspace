import React, { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { TimeRangePicker, TimeRangeFieldProps } from '../../date-picker/time-range-picker';
import { DateRange } from '../../type';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

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
    console.log('#### EditTimeRangeCell getValue', getValue());
    setValue(changeDateRangeToday(getValue()));
  }, [getValue]);

  // 시간만 사용하니, 오늘로 날짜 변경
  const changeDateRangeToday = (dateRange: DateRange): DateRange => {
    dateRange = dateRange ?? { from: undefined, to: undefined };
    return {
      from: dateRange.from ? changeDateToToday(dateRange.from) : undefined,
      to: dateRange.to ? changeDateToToday(dateRange.to) : undefined,
    };
  };

  const changeDateToToday = (date: Date): Date => {
    const time = dayjs(date);
    if (time.isToday()) return date;
    return dayjs()
      .hour(time.hour())
      .minute(time.minute())
      .second(time.second())
      .millisecond(time.millisecond())
      .toDate();
  };

  return (
    <div className="select_date_wrap">
      <TimeRangePicker {...timeRangeProps} value={value} onChange={handleChange} size={'md'} />
    </div>
  );
};

export { EditTimeRangeCell };
