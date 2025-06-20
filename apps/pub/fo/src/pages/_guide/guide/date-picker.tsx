import { DatePicker } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/date-picker')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Date Picker Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/date-picker</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { DatePicker } from '@learnway/ui'; // 사용할 icon 함수명 호출
  
// 적용방법(예시)
<DatePicker displayType={'day'} size={'lg'} />
<DatePicker displayType={'year'} size={'lg'} />
<DatePicker displayType={'month'} size={'lg'} />
<DatePicker displayType={'from-to'} numberOfMonths={2} size={'lg'} />
<DatePicker displayType={'time'} size={'lg'} />
<DatePicker displayType={'time-hm'} size={'lg'} />
<DatePicker displayType={'day-time'} size={'lg'} />
<DatePicker displayType={'day-time-hm'} size={'lg'} />
`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">day</h3>
        <DatePicker displayType={'day'} size={'lg'} />
        <h3 className="guide_tit3">year</h3>
        <DatePicker displayType={'year'} size={'lg'} />
        <h3 className="guide_tit3">month</h3>
        <DatePicker displayType={'month'} size={'lg'} />
        {/* <h3 className="guide_tit3">from-to</h3> */}
        {/* <DatePicker displayType={'from-to'} numberOfMonths={2} size={'lg'} /> */}
        <h3 className="guide_tit3">time</h3>
        <DatePicker displayType={'time'} size={'lg'} />
        <h3 className="guide_tit3">time-hm</h3>
        <DatePicker displayType={'time-hm'} size={'lg'} />
        <h3 className="guide_tit3">day-time</h3>
        <DatePicker displayType={'day-time'} size={'lg'} />
        <h3 className="guide_tit3">day-time-hm</h3>
        <DatePicker displayType={'day-time-hm'} size={'lg'} />
      </div>
    </div>
  );
}
