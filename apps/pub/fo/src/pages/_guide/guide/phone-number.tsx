import { createFileRoute } from '@tanstack/react-router';
import { PhoneNumber } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/phone-number')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="content">
      <h2 className="guide_tit2">PhoneNumber Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/phone-number/phone-number.tsx (공통)</p>
      <p className="info">핸드폰 번호 입력시 사용</p>

      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
      import { PhoneNumber } from '@learnway/ui';`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">PhoneNumber</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <PhoneNumber
              options={[
                { value: 'type1', label: '010' },
                { value: 'type2', label: '016' },
                { value: 'type3', label: '017' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
