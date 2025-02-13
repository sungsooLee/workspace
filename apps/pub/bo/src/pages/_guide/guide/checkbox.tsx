import { createFileRoute } from '@tanstack/react-router';
import { Checkbox } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/checkbox')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Checkbox Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/checkbox/checkbox.tsx</p>
      <p className="info">size(높이 기준) : xs(12), sm(16), md(18), lg(24-basic)</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Checkbox } from '@learnway/ui';

// 적용방법(예시)
<Checkbox size="lg" label="default" />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">default</h3>
        <div className="flex_box">
          <div className="desc">
            <Checkbox label="default" />
            <Checkbox label="default" size="md" />
            <Checkbox label="default" size="sm" />
            <Checkbox label="default" size="xs" />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Checkbox label="default" />
<Checkbox label="default" size="md" />
<Checkbox label="default" size="sm" />
<Checkbox label="default" size="xs" />`}</code>
          </pre>
        </div>
        <h3 className="guide_tit3">disabled</h3>
        <div className="flex_box">
          <div className="desc">
            <Checkbox label="disabled" disabled />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Checkbox label="disabled" disabled />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
