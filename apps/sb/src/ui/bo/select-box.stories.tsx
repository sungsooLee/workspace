import { Dropdown, DropdownOption } from '@learnway/ui';
import { Meta, StoryObj } from '@storybook/react/*';
import { useEffect, useState } from 'react';

export default {
  title: 'Bo-Components/SelectBox&DropdownList',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '드롭다운 크기 (소, 중, 대)',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['default', 'chip'],
      description: '드롭다운 스타일 변형',
      defaultValue: 'default',
    },
    isMulti: {
      control: 'boolean',
      description: '다중 선택 여부',
      defaultValue: false,
    },
    isSearchable: {
      control: 'boolean',
      description: '검색 가능 여부',
      defaultValue: false,
    },
    isClearable: {
      control: 'boolean',
      description: '선택 항목 초기화 버튼 표시 여부',
      defaultValue: false,
    },
    isDisabled: {
      control: 'boolean',
      description: '비활성화 여부',
      defaultValue: false,
    },
    isReadonly: {
      control: 'boolean',
      description: '비활성화 여부',
      defaultValue: false,
    },
    label: {
      control: 'text',
      description: '드롭다운 라벨',
    },
    hideLabel: {
      control: 'boolean',
      description: '라벨 숨김 여부',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      defaultValue: '선택하세요',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
- 주어진 목록 값 중 특정 항목을 선택할 수 있도록 제공되는 형태로, 클릭 시 선택 가능한 항목이 DropdownList 형태로 노출된다.
        `,
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof Dropdown>;

const Template = (args: any) => {
  const [selectedValues, setSelectedValues] = useState<string[] | null>();

  return (
    <div className="w-full">
      <Dropdown
        {...args}
        value={selectedValues}
        defaultValue={['option1']}
        onChange={(selected) => setSelectedValues(selected)}
      />
    </div>
  );
};

export const SelectBox: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
    label: '기본 드롭다운',
    placeholder: '선택하세요',
    variant: 'default',
    size: 'lg',
  },
  render: (args) => <Template {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
<div>
  <ul>
    <li>Select Box의 표현은 데이터 입력 상태(선택 전, 선택 중, 선택 완료)에 따라 변화한다.</li>
    <li>3개 이상의 항목 중 단일 또는 다중 선택 시 사용하며, 그 이하는 라디오 버튼을 사용하는 것을 권장한다.</li>
  </ul>
</div>
        `,
      },
    },
  },
};

// 검색 가능한 드롭다운 스토리
export const Searchable: Story = {
  args: {
    options: [
      { value: 'apple', label: '사과' },
      { value: 'banana', label: '바나나' },
      { value: 'cherry', label: '체리' },
      { value: 'grape', label: '포도' },
    ],
    label: '검색 가능 드롭다운',
    placeholder: '과일 검색',
    isSearchable: true,
    isClearable: true,
    size: 'lg',
  },
  render: (args) => <Template {...args} />,
};

const DropdownComponent: React.FC<any> = (args) => {
  const [selectedValue, setSelectedValue] = useState<string>('option1');
  const [selectedValue2, setSelectedValue2] = useState<string>('option1');
  const [selectedValue3, setSelectedValue3] = useState<string>('');

  const options1 = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];
  const options2 = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4' },
    { value: 'option5', label: '옵션 5' },
    { value: 'option6', label: '옵션 6' },
    { value: 'option7', label: '옵션 7' },
  ];
  const options3 = [
    { value: '', label: '전체' },
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
    { value: 'option11', label: '옵션 11' },
    { value: 'option12', label: '옵션 12' },
    { value: 'option13', label: '옵션 13' },
  ];
  return (
    <div className="w-full">
      <div className="flex flex-row space-x-2">
        <Dropdown
          options={options1}
          value={selectedValue}
          onChange={(value: string) => setSelectedValue(value)}
          label="항목이 5개 미만"
        />
        <Dropdown
          options={options2}
          value={selectedValue2}
          onChange={(value: string) => setSelectedValue2(value)}
          label="항목이 5개 이상 스크롤 생성"
        />
        <Dropdown
          options={options3}
          value={selectedValue3}
          onChange={(value: string) => setSelectedValue3(value)}
          label="Dropdown 컴포넌트"
        />
      </div>
    </div>
  );
};

export const DropdownStory: Story = {
  name: 'Dropdown List - 단일 선택형',
  args: {},
  render: (args) => <DropdownComponent {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
<div>
  <ul>
    <li>셀렉트 박스를 클릭 후 드랍다운 리스트가 노출된 데이터를 선택하는 타입</li>
    <li>드랍다운 리스트 높이는 항목의 개수에 따라 가변되고, 기본 5개, 예외적으로 최대 10개가 초과할 경우 스크롤 생성된다.</li>
  </ul>
</div>
        `,
      },
    },
  },
};

const MultiDropdown: React.FC<any> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
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
    <Dropdown
      options={options}
      value={selectedOptions}
      onChange={(selected) => setSelectedOptions(selected as any[])}
      placeholder="여러 항목 선택"
      label="다중 선택 (체크박스)"
      variant="text"
      isMulti={true}
    />
  );
};

export const MultiDropdownStory: Story = {
  name: 'MultiDropdown',
  args: {},
  render: (args) => <MultiDropdown {...args} />,
};
