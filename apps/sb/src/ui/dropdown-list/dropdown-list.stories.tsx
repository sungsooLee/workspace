import { DropdownList, DropdownOption } from '@learnway/ui';
import { Meta, StoryObj } from '@storybook/react/*';
import { useState } from 'react';

export default {
  title: 'Components/DropdownList',
  component: DropdownList,
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
} as Meta;
type Story = StoryObj<typeof DropdownList>;

export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
    label: '기본 드롭다운',
    placeholder: '선택하세요',
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
  },
};

const MultiDropdown: React.FC<any> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);

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
    <DropdownList
      options={options}
      value={selectedOptions}
      onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
      placeholder="여러 항목 선택"
      label="다중 선택 (체크박스)"
      variant="text"
      isMulti={true}
    />
  );
};

export const MultiDropdownStory: Story = {
  name: 'MultiDropdownList',
  args: {},
  render: (args) => <MultiDropdown {...args} />,
};
