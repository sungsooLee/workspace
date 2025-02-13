import { createFileRoute } from '@tanstack/react-router';
import { Select } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/select')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Select Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/select/select.tsx</p>
      <p className="info">size(세로 기준) : md(32-BO), lg(40-FO)</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import { Select } from '@learnway/ui';`}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Select BO 기본(32px)</h3>
        <div className="flex_box">
          <div className="desc">
            <Select
              options={[
                { value: 'type1', label: 'aaaaa' },
                { value: 'type2', label: 'bbbbb' },
                { value: 'type3', label: 'ccccc' },
                { value: 'type4', label: 'ddd' },
                { value: 'type5', label: 'eeee' },
                { value: 'type6', label: 'fffff' },
                { value: 'type7', label: 'ggggg' },
                { value: 'type8', label: 'hhhhh' },
                { value: 'type9', label: 'iiii' },
                { value: 'type0', label: 'jjjj' },
                { value: 'type11', label: 'kkkk' },
                { value: 'type12', label: 'lll' },
              ]}
            />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Select
options={[
  { value: 'type1', label: 'aaaaa' },
  { value: 'type2', label: 'bbbbb' },
  { value: 'type3', label: 'ccccc' },
  { value: 'type4', label: 'ddd' },
  { value: 'type5', label: 'eeee' },
  { value: 'type6', label: 'fffff' },
  { value: 'type7', label: 'ggggg' },
  { value: 'type8', label: 'hhhhh' },
  { value: 'type9', label: 'iiii' },
  { value: 'type0', label: 'jjjj' },
  { value: 'type11', label: 'kkkk' },
  { value: 'type12', label: 'lll' },
]}
/>`}</code>
          </pre>
        </div>

        <h3 className="guide_tit3">Select FO 기본(40px)</h3>

        <div className="flex_box">
          <div className="desc">
            <Select
              size="lg"
              options={[
                { value: 'type1', label: 'aaaaa' },
                { value: 'type2', label: 'bbbbb' },
                { value: 'type3', label: 'ccccc' },
                { value: 'type4', label: 'ddd' },
                { value: 'type5', label: 'eeee' },
                { value: 'type6', label: 'fffff' },
                { value: 'type7', label: 'ggggg' },
                { value: 'type8', label: 'hhhhh' },
                { value: 'type9', label: 'iiii' },
                { value: 'type0', label: 'jjjj' },
                { value: 'type11', label: 'kkkk' },
                { value: 'type12', label: 'lll' },
              ]}
            />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Select
        size="lg"
        options={[
          { value: 'type1', label: 'aaaaa' },
          { value: 'type2', label: 'bbbbb' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type4', label: 'ddd' },
          { value: 'type5', label: 'eeee' },
          { value: 'type6', label: 'fffff' },
          { value: 'type7', label: 'ggggg' },
          { value: 'type8', label: 'hhhhh' },
          { value: 'type9', label: 'iiii' },
          { value: 'type0', label: 'jjjj' },
          { value: 'type11', label: 'kkkk' },
          { value: 'type12', label: 'lll' },
        ]}
      />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
