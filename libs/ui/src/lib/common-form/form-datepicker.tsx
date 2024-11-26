import { forwardRef } from 'react';
import { DateFieldConfig } from './type';
import { cn } from '@/libs/shared/src';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import { Button } from '../button/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../calendar/calendar';

const FormDatePicker = forwardRef<HTMLDivElement, DateFieldConfig>(
  (
    {
      value,
      onChange,
      error,
      mode = 'edit',
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
    if (mode === 'read') {
      return (
        <div className={cn('py-2 px-3 text-sm text-gray-900', className)}>
          {value ? format(value, showTimePicker ? 'PPpp' : 'PPP') : '-'}
        </div>
      );
    }

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              error && 'border-red-500',
              className,
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, showTimePicker ? 'PPpp' : 'PPP') : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);

export default FormDatePicker;
