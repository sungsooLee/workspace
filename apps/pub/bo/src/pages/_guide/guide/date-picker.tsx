import { DatePicker } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/date-picker')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DatePicker displayType={'day'} />
      <br />
      <DatePicker displayType={'year'} />
      <br />
      <DatePicker displayType={'month'} />
      <br />
      <DatePicker displayType={'from-to'} />
      <br />
      <DatePicker displayType={'time'} />
      <br />
      <DatePicker displayType={'time-hm'} />
      <br />
      <DatePicker displayType={'day-time'} />
      <br />
      <DatePicker displayType={'day-time-hm'} />
      <br />
      <DatePicker displayType={'day-time-hm'} />
    </div>
  );
}
