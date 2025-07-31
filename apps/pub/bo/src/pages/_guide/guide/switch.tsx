import { Switch } from '@learnway/ui/switch';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/switch')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Switch Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/switch/switch.tsx</p>
      <p className="info">Side : 'left' | 'right'</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Switch } from '@learnway/ui/switch';

// 적용방법(예시)
<Switch id="id-1" label="Label" />
`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">Switch 기본</h3>
        <div className="flex_box">
          <div className="desc">
            <Switch id="id-1" label="Label" />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Switch id="id-1" label="Label" />`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Switch Checked</h3>
        <div className="flex_box">
          <div className="desc">
            <Switch id="id-2" label="Label" checked />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Switch id="id-2" label="Label" checked />`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Switch Disabled</h3>
        <div className="flex_box">
          <div className="desc">
            <Switch id="id-3" label="Label" disabled />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Switch id="id-3" label="Label" disabled />`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Switch Label이 앞에 있는 경우</h3>
        <div className="flex_box">
          <div className="desc">
            <Switch id="id-4" label="Label" />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Switch id="id-4" label="Label" />`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Switch Checked(label : 오른쪽)</h3>
        <div className="flex_box">
          <div className="desc">
            <Switch id="id-5" label="Label" checked labelAlign={'right'} />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Switch id="id-5" label="Label" checked labelAlign={'right'} />`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Switch Disabled(label : 오른쪽)</h3>
        <div className="flex_box">
          <div className="desc">
            <Switch id="id-6" label="Label" disabled labelAlign={'right'} />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Switch id="id-6" label="Label" disabled labelAlign={'right'} />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
