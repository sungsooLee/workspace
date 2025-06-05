import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@learnway/ui';
import { Camera, Settings } from 'lucide-react';

export default {
  title: 'Bo-Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Button의 중요도**

- Button의 정렬은 우측 정렬을 기본으로 하며 Primary Button을 최우측으로 배치한다.  
- 버튼은 중요도에 따라 최우측이 가능 중요도가 높고, 좌측으로 갈수록 중요도가 낮은 버튼으로 배치한다.  
- 유사한 기능을 가진 Button을 가까이 배치한다. 같은 기능을 가진 Button이 많은 화면에서 일관되게 적용되는 경우 동일한 곳에 위치하는 것을 권장한다.  
- 공통버튼 (CRUD)는 좌측에서 부터 신규/추가, 삭제, 저장 순으로 배치한다.  

        `,
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof Button>;

// Button
export const Template: any = (args: any) => {
  return <Button {...args}>Button</Button>;
};
Template.storyName = 'Button';
Template.args = {
  size: 'sm',
  variant: 'primary',
};

export const PrimaryMatrix: Story = {
  render: () => {
    const sizes = ['ts', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Primary Button Matrix</h2>

        <div className="mb-4 grid grid-cols-5 gap-4">
          <div className="text-center font-semibold">Size</div>
          <div className="text-center font-semibold">Default</div>
          <div className="text-center font-semibold">With Icon</div>
          <div className="text-center font-semibold">Disabled</div>
          <div className="text-center font-semibold">Loading</div>
        </div>

        {sizes.map((size) => (
          <div key={size} className="mb-3 grid grid-cols-5 items-center gap-4">
            <div className="text-center font-medium">{size}</div>
            <div className="flex justify-center">
              <Button variant="primary" size={size}>
                Enabled
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="primary" size={size} icon={<Camera />}>
                활성화
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="primary" size={size} disabled>
                Disabled
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="primary" size={size} isLoading>
                Loading
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const LineMatrix: Story = {
  render: () => {
    const sizes = ['ts', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Line Button Matrix</h2>

        <div className="mb-4 grid grid-cols-5 gap-4">
          <div className="text-center font-semibold">Size</div>
          <div className="text-center font-semibold">Default</div>
          <div className="text-center font-semibold">With Icon</div>
          <div className="text-center font-semibold">Disabled</div>
          <div className="text-center font-semibold">Loading</div>
        </div>

        {sizes.map((size) => (
          <div key={size} className="mb-3 grid grid-cols-5 items-center gap-4">
            <div className="text-center font-medium">{size}</div>
            <div className="flex justify-center">
              <Button variant="line" size={size}>
                Enabled
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="line" size={size} icon={<Camera />}>
                활성화
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="line" size={size} disabled>
                Disabled
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="line" size={size} isLoading>
                Loading
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
