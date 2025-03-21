import { DatePicker } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/date-picker')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>day</h2>
      <DatePicker displayType={'day'} />
      <br />
      <h2>year</h2>
      <DatePicker displayType={'year'} />
      <br />
      <h2>month</h2>
      <DatePicker displayType={'month'} />
      <br />
      <h2>from-to</h2>
      <DatePicker displayType={'from-to'} />
      <br />
      <h2>time</h2>
      <DatePicker displayType={'time'} />
      <br />
      <h2>time-hm</h2>
      <DatePicker displayType={'time-hm'} />
      <br />
      <h2>day-time</h2>
      <DatePicker displayType={'day-time'} />
      <br />
      <h2>day-time-hm</h2>
      <DatePicker displayType={'day-time-hm'} />
    </div>
  );
}
