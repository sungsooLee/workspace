import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Dropdown } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/drop-down')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<null>(null);
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4' },
    { value: 'option5', label: '옵션 5' },
    { value: 'option6', label: '옵션 6' },
    { value: 'option7', label: '옵션 7' },
    { value: 'option8', label: '옵션 8' },
    { value: 'option9', label: '옵션 9' },
    { value: 'option10', label: '옵션 10' },
  ];

  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const otherOptions = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4' },
  ];
  return (
    <div>
      <div>
        <h2 className="guide_tit2">Dropdown Component Guide</h2>
        <p className="loc react">/libs/ui/src/lib/dropdown/dropdown.tsx</p>
        <p className="info">size(높이 기준) : sm(32), md(36), lg(40)</p>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 초기 import
      import { useState } from 'react';
      import { Dropdown } from '@learnway/ui';

      const [selectedValues, setSelectedValues] = useState<string[]>([]);
      const options = [
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' },
        { value: 'option4', label: '옵션 4' },
        { value: 'option5', label: '옵션 5' },
        { value: 'option6', label: '옵션 6' },
        { value: 'option7', label: '옵션 7' },
        { value: 'option8', label: '옵션 8' },
        { value: 'option9', label: '옵션 9' },
        { value: 'option10', label: '옵션 10' },
      ];
      
      // 적용방법(예시)
      <Dropdown
        options={options}
        value={selectedValues}
        onChange={(selected) => setSelectedValues(selected)}
        placeholder="선택"
        variant="default"
        isMulti={false}
        size={'sm'}
      />`}
            </code>
          </pre>
        </div>
        <div className="group">
          <h3 className="guide_tit3">default</h3>
          <div className="flex_box">
            <div className="desc w-full">
              <Dropdown
                options={options}
                value={selectedValues}
                onChange={(selected) => setSelectedValues(selected)}
                placeholder="선택"
                variant="default"
                isMulti={false}
                size={'sm'}
              />
            </div>
          </div>
        </div>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 적용방법(예시)
      const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
      const otherOptions = [
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' },
        { value: 'option4', label: '옵션 4' },
      ];
      <Dropdown
        options={otherOptions}
        value={selectedValues2}
        onChange={(selected) => setSelectedValues2(selected)}
        placeholder="선택"
        variant="default"
        isMulti={false}
        size={'lg'}
      />`}
            </code>
          </pre>
        </div>
        <div className="group">
          <h3 className="guide_tit3">다중 선택시</h3>
          <div className="flex_box">
            <div className="desc w-full">
              <Dropdown
                options={otherOptions}
                value={selectedValues2}
                onChange={(selected) => setSelectedValues2(selected)}
                placeholder="선택"
                label="다중 선택 (체크박스)"
                variant="default"
                isMulti={true}
                size={'lg'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
