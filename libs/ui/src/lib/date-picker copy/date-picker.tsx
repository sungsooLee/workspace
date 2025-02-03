import { forwardRef } from 'react';
import { cn } from '@learnway/shared';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Popover } from '../popover/popover';
import { Button } from '../shadcn/button';
import { Calendar } from '../shadcn/calendar';
import { DateProps } from './type';

const DatePickerComponent = forwardRef<HTMLDivElement, DateProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Pick a date',
      minDate,
      maxDate,
      disabledDates,
      numberOfMonths = 1,
      showTimePicker = false,
      timeFormat = '24',
      minuteStep = 15,
      className,
    },
    ref,
  ) => {
    return (
      <div>
        <Popover
          className="w-auto p-0"
          align="start"
          popoverContent={
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              numberOfMonths={numberOfMonths}
              initialFocus
            />
          }>
          <Button
            type="button"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
              className,
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, showTimePicker ? 'PPpp' : 'PPP') : placeholder}
          </Button>
        </Popover>
      </div>
    );
  },
);

export const DatePicker = DatePickerComponent;
