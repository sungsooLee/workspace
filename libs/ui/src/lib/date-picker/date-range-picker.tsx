import { forwardRef } from 'react';
import { cn } from '@learnway/shared';
import { format } from 'date-fns';
import { Popover } from '../popover/popover';
import { Button } from '../shadcn/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../shadcn/calendar';
import { DateRangeFieldProps } from './type';

const FormDateRangePicker = forwardRef<HTMLDivElement, DateRangeFieldProps>(
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
        <div className={cn('px-3 py-2 text-sm text-gray-900', props.className)}>
          {value?.from && value?.to
            ? `${format(value.from, 'PPP')} - ${format(value.to, 'PPP')}`
            : '-'}
        </div>
      );
    }

    return (
      <Popover
        popoverContent={
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            {...props}
          />
        }
        className="w-auto p-0"
        align="start">
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
      </Popover>
    );
  },
);

export default FormDateRangePicker;
