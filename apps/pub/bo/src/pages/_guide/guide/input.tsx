import { createFileRoute, Link } from '@tanstack/react-router';
import { Input } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/input')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Input Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/input/input.tsx</p>
      <p className="info">
        여러 케이스는 <Link to="/guide/form">Form</Link>에서 확인
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Input } from '@learnway/ui';

// 적용방법(예시) 
 <Input
    id="name"
    type="text"
    placeholder="입력하세요."
    value=""
    size="lg"
/>`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Size(40px)</h3>
        <div className="flex_box">
          <div className="desc w-[200px]">
            <Input
              id="name"
              type="text"
              placeholder="입력하세요."
              value={'dsadshdbhdbhbhbh'}
              maxLength={20}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
