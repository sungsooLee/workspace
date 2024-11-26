import { forwardRef } from 'react';
import { DateRangeFieldConfig } from './type';
import { cn } from '@/libs/shared/src';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import { Button } from '../button/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../calendar/calendar';

const FormDateRangePicker = forwardRef<HTMLDivElement, DateRangeFieldConfig>(
  (
    {
      value,
      onChange,
      error,
      mode = 'edit',
      placeholder = 'Pick a date range',
      fromLabel = 'From',
      toLabel = 'To',
      ...props
    },
    ref,
  ) => {
    if (mode === 'read') {
      return (
        <div className={cn('py-2 px-3 text-sm text-gray-900', props.className)}>
          {value?.from && value?.to
            ? `${format(value.from, 'PPP')} - ${format(value.to, 'PPP')}`
            : '-'}
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
              props.className,
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'PPP')} - {format(value.to, 'PPP')}
                </>
              ) : (
                format(value.from, 'PPP')
              )
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            {...props}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

export default FormDateRangePicker;
