import { createFileRoute } from '@tanstack/react-router';
import { Panel } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/panel')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Panel Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/panel/panel.tsx</p>
      <p className="info">필요 시에 컨텐츠 내에 wrap 영역에 사용</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Panel } from '@learnway/ui';

// 적용방법(예시) 
<Panel type="line" hideHeaderUnderline>
  <p>content</p>
</Panel>`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">박스형태 활용 예시</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Panel type="line" hideHeaderUnderline>
              <p>content</p>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
