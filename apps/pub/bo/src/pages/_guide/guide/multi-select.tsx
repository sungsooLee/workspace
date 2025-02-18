import { createFileRoute } from '@tanstack/react-router';
import { MultiSelect } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/multi-select')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="content">
      <h2 className="guide_tit2">Multi-select Component Guide(작업중)</h2>
      <p className="loc react">/libs/ui/src/lib/select/multi-select.tsx</p>

      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { MultiSelect } from '@learnway/ui';
  
  // 적용방법(예시)
<MultiSelect 
  options={[
    {
        value: '01',
        label: '사내',
    },
    {
        value: '02',
        label: '사외',
    },
    ]}
/>
`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Modal</h3>
        <div className="flex_box">
          <div className="desc">
            <MultiSelect
              options={[
                {
                  value: '01',
                  label: '사내',
                },
                {
                  value: '02',
                  label: '사외',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
