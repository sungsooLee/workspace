import { createFileRoute } from '@tanstack/react-router';
import { RadioGroup } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/radio')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Radio Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/radio/radio.tsx</p>
      <p className="info">
        size(높이 기준) : md(20), lg(24-basic)
        <br />
        orientation : vertical, horizontal
      </p>
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
/>

// 세로 orientation="vertical"
<RadioGroup
  options={[
    { value: 'type1', label: 'aaaaa' },
    { value: 'type1-2', label: 'bbbbb' },
    { value: 'type1-3', label: 'ccccc' },
  ]}
  orientation="vertical"
/>
`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">Basic</h3>
        <div className="flex_box col">
          <div className="desc">
            <RadioGroup
              options={[
                { value: 'type1', label: 'aaaaa' },
                { value: 'type1-2', label: 'bbbbb' },
                { value: 'type1-3', label: 'ccccc' },
              ]}
              orientation="vertical"
              size="lg"
            />
          </div>
          <div className="desc">
            <RadioGroup
              options={[
                { value: 'type2-1', label: 'aaaaa' },
                { value: 'type2-2', label: 'bbbbb' },
                { value: 'type2-3', label: 'ccccc' },
              ]}
              size="md"
            />
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>{`<RadioGroup
  options={[
    { value: 'type1', label: 'aaaaa' },
    { value: 'type1-2', label: 'bbbbb' },
    { value: 'type1-3', label: 'ccccc' },
  ]}
  size="lg"
/>

<RadioGroup
  options={[
    { value: 'type2-1', label: 'aaaaa' },
    { value: 'type2-2', label: 'bbbbb' },
    { value: 'type2-3', label: 'ccccc' },
  ]}
  size="md"
/>
`}</code>
          </pre>
        </div>
      </div>

      <div className="group">
        <h3 className="guide_tit3">disabled</h3>
        <div className="flex_box col">
          <div className="desc">
            <RadioGroup
              options={[
                { value: 'type4-1', label: 'ddd' },
                { value: 'type4-2', label: 'eeee' },
                { value: 'type4-3', label: 'ffff' },
              ]}
              disabled
              defaultValue="type4-1"
              size="lg"
            />
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>{`<RadioGroup
  options={[
    { value: 'type4-1', label: 'ddd' },
    { value: 'type4-2', label: 'eeee' },
    { value: 'type4-3', label: 'ffff' },
  ]}
  disabled
  size="lg"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
