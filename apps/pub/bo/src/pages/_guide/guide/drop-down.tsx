import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Dropdown, DropdownOption } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/drop-down')({
  component: RouteComponent,
});

function RouteComponent() {
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
  return (
    <div>
      <Dropdown
        options={options}
        value={selectedValues}
        onChange={(selected) => setSelectedValues(selected)}
        placeholder="여러 항목 선택"
        label="다중 선택 (체크박스)"
        variant="default"
        isMulti={false}
        size={'sm'}
      />
    </div>
  );
}
