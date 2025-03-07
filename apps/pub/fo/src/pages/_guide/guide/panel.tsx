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
  import { RadioGroup } from '@learnway/ui';
  
  // 적용방법(예시)
  <RadioGroup
    options={[
      { value: 'type1', label: 'aaaaa' },
      { value: 'type1-2', label: 'bbbbb' },
      { value: 'type1-3', label: 'ccccc' },
    ]}
  />`}
          </code>
        </pre>
      </div>
      <div className="flex_box">
        <div className="desc">
          <Panel type="line" hideHeaderUnderline>
            <p>content</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
