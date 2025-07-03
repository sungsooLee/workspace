import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '@learnway/ui';

export default {
  title: 'Bo-Components/RadioButton',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
- 단수 선택하는 경우, 라디오 형태의 Button으로 구성할 수 있다.   
- 2개 이상의 상호 배타적인 항목 중 하나의 항목만 선택하는 컴포넌트이다.   
- 첫번째 항목은 가장 선택 빈도가 높거나 중요한 항목으로 한다.  
- 항목은 5개 이상 나열하는 것을 지양하며, 그 이 상의 경우 드랍다운/셀렉트박스를 사용하는 것을 권장한다.  
- 5개 이상 항목이 많지만 직관성을 위해 라디오 버튼을 꼭 써야 할 경우 예외적으로 사용을 허용한다.(비권장)  
        `,
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof RadioGroup>;

const Template: any = (args: any) => {
  return (
    <RadioGroup
      {...args}
      defaultValue="value0"
      options={Array(5)
        .fill(null)
        .map((d, i) => ({ value: `value${i}`, label: `label${i}` }))}
    />
  );
};

export const RadioButtonStory: Story = {
  name: 'RadioButton',
  args: {
    disabled: false,
    size: 'xs',
  },
  render: (args) => <Template {...args} />,
};
