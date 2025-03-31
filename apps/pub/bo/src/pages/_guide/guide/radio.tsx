import { createFileRoute } from '@tanstack/react-router';
import { RadioGroup } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/radio')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Checkbox Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/radio/radio.tsx</p>
      <p className="info">
        size(높이 기준) : xs(12), sm(16), md(18), lg(24-basic)
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
          <div className="desc">
            <RadioGroup
              options={[
                { value: 'type3-1', label: 'aaaaa' },
                { value: 'type3-2', label: 'bbbbb' },
                { value: 'type3-3', label: 'ccccc' },
              ]}
              size="sm"
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
/>

<RadioGroup
  options={[
    { value: 'type2-1', label: 'aaaaa' },
    { value: 'type2-2', label: 'bbbbb' },
    { value: 'type2-3', label: 'ccccc' },
  ]}
  size="md"
/>

<RadioGroup
  options={[
    { value: 'type3-1', label: 'aaaaa' },
    { value: 'type3-2', label: 'bbbbb' },
    { value: 'type3-3', label: 'ccccc' },
  ]}
  size="sm"
/>`}</code>
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
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
