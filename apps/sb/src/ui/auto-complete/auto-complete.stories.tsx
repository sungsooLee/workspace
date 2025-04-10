import { Meta, StoryObj } from '@storybook/react/*';
import { AutoCompleteDropdown, DropdownOption } from '@learnway/ui';

export default {
  title: 'Components/AutoCompleteDropdown',
  component: AutoCompleteDropdown,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof AutoCompleteDropdown>;

const sampleOptions: DropdownOption[] = [
  { value: '서울', label: '서울특별시' },
  { value: '부산', label: '부산광역시' },
  { value: '대구', label: '대구광역시' },
  { value: '인천', label: '인천광역시' },
  { value: '광주', label: '광주광역시' },
  { value: '대전', label: '대전광역시' },
  { value: '울산', label: '울산광역시' },
  { value: '세종', label: '세종특별자치시' },
  { value: '경기', label: '경기도' },
  { value: '강원', label: '강원도' },
];

const loadOptions = (inputValue: string): Promise<DropdownOption[]> => {
  return new Promise<DropdownOption[]>((resolve) => {
    console.log('API 호출 해야함' + inputValue);
    setTimeout(() => {
      const filteredOptions = sampleOptions.filter(
        (option: DropdownOption) =>
          option?.label && option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      resolve(filteredOptions);
    }, 500); // 0.5초 지연
  });
};

const Template: React.FC<any> = (args) => {
  return <AutoCompleteDropdown {...args} />;
};

export const AutoCompleteStory: Story = {
  name: 'AutoComplete',
  args: {},
  render: (args) => <Template {...args} loadOptions={loadOptions} />,
};
