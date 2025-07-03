import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalWrapper, StepperTabs, Tabs, useModal } from '@learnway/ui';

const meta: Meta<typeof Tabs> = {
  title: 'Bo-Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
기본적으로 상위 레벨 Tab과 하위 레벨 Tab으로 구성되며, 화면 기능에 따라 Tab의 구성을 다르게 적용할 수 있다.

탭의 경우 메인 타이틀 하단, 컨텐츠 영역 상단에 위치한다.

**주요 기능**:
- 다양한 스타일 타입 지원 (fill, line, round, progress, sub-progress, segment)
- 색상 변형 옵션 (primary, secondary, gray)
- 크기 옵션 (sm, md)
- 탭 변경 전 확인 기능
- 앵커 탭 기능
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['fill', 'line', 'round', 'progress', 'sub-progress', 'segment'],
      description: '탭의 스타일 타입',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'gray'],
      description: '탭의 색상 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: '탭의 크기',
    },
    selectedTabKey: {
      control: { type: 'text' },
      description: '현재 선택된 탭의 키',
    },
    onTabChange: {
      action: 'tab-changed',
      description: '탭 변경 시 호출되는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  {
    title: 'Tab A',
    key: 'a',
    content: <h2>Tab A content</h2>,
  },
  {
    title: 'Tab B',
    key: 'b',
    content: <h2>Tab B content</h2>,
  },
  {
    title: 'Tab C',
    key: 'c',
    content: <h2>Tab C content</h2>,
  },
];
// prev & next 용 더미데이터
const items2 = Array.from({ length: 40 }, (_, index) => {
  const num = index + 1;
  return {
    title: `${num}`,
    key: `${num}`,
    content: `${num}`,
  };
});

// 기본 Interactive 스토리 - Controls에서 실시간 변경 가능
export const Interactive: Story = {
  args: {
    type: 'fill',
    size: 'md',
    variant: 'primary',
    selectedTabKey: 'a',
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story: 'Controls 패널에서 실시간으로 속성을 변경하여 다양한 스타일을 확인할 수 있습니다.',
      },
    },
  },
};

export const AllTypes: Story = {
  render: (args) => (
    <div className={'space-y-20'}>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>최상위 탭 (type : fill)</h1>
        <h3>
          - 페이지 타이틀 하단에 배치되는 탭으로 화면 전체 데이터 분기가 필요할 경우 사용한다.
        </h3>
        <Tabs {...args} type={'fill'} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>컨텐츠 탭 - 하위 레벨 1(type : line)</h1>
        <h3>
          - 탭이 한 화면에 배치되지 않을 경우,Pagination 버튼을 노출하며 다음 페이지로 넘길 시
          다음에 위치한 3개 탭이 노출된다.
        </h3>
        <Tabs {...args} type={'line'} />
        <Tabs {...args} type={'line'} items={items2} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>컨텐츠 탭 - 하위 레벨 2(type : round)</h1>
        <h3>
          - 탭이 한 화면에 배치되지 않을 경우,Pagination 버튼을 노출하며 다음 페이지로 넘길 시
          다음에 위치한 3개 탭이 노출된다.
        </h3>
        <Tabs {...args} type={'round'} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>상위 Progress 탭 (type : progress)</h1>
        <h3> - 업무를 단계별 페이지로 구성해야 할 경우, 프로그레스 탭을 사용한다.</h3>
        <Tabs {...args} type={'progress'} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>하위 Progress 탭 (type : sub-progress)</h1>
        <h3> - 상위 프로그레스 탭 사용이 어려울 경우, 하위 프로그레스 탭을 사용한다.</h3>

        <Tabs {...args} type={'sub-progress'} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>type : segment</h1>
        <Tabs {...args} type={'segment'} />
      </div>
    </div>
  ),
  args: {
    size: 'md',
    variant: 'primary',
    selectedTabKey: 'a',
    items: items,
  },
};

// 체크 후 탭 이동
export const BeforeTabChange: Story = {
  render: (args) => {
    const ConfirmTabChange = () => {
      const { confirm: openConfirm } = useModal();

      const handleBeforeTabChange = async (currentTabKey: string, nextTabKey: string) => {
        const isDirty = true;
        return isDirty ? await openConfirm('수정된 내용은 초기화 됩니다.') : false;
      };

      return (
        <>
          <Tabs {...args} onBeforeTabChange={handleBeforeTabChange} />
          <ModalWrapper />
        </>
      );
    };

    return <ConfirmTabChange />;
  },
  args: {
    type: 'fill',
    size: 'md',
    variant: 'primary',
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story: '탭 변경 전에 확인 모달을 표시하는 기능',
      },
    },
  },
};

// 앵커 탭
export const AnchorTabs: Story = {
  render: (args) => {
    const AnchorTabsComponent = () => {
      const sectionA = useRef<HTMLDivElement>(null);
      const sectionB = useRef<HTMLDivElement>(null);
      const sectionC = useRef<HTMLDivElement>(null);

      const handleTabChange = (activeKey: string) => {
        console.log('activeKey', activeKey);
        if (activeKey === 'a') {
          sectionA.current?.scrollIntoView({ behavior: 'smooth' });
        }
        if (activeKey === 'b') {
          sectionB.current?.scrollIntoView({ behavior: 'smooth' });
        }
        if (activeKey === 'c') {
          sectionC.current?.scrollIntoView({ behavior: 'smooth' });
        }
      };

      return (
        <div>
          <div className="sticky top-0 z-10 bg-white p-4">
            <Tabs
              {...args}
              items={[
                {
                  title: 'Section A',
                  key: 'a',
                },
                {
                  title: 'Section B',
                  key: 'b',
                },
                {
                  title: 'Section C',
                  key: 'c',
                },
              ]}
              onTabChange={handleTabChange}
            />
          </div>
          <div>
            <h1
              ref={sectionA}
              className={
                'flex h-[500px] w-full items-center justify-center bg-blue-100 text-4xl font-bold'
              }
            >
              Section A
            </h1>
            <h1
              ref={sectionB}
              className={
                'flex h-[500px] w-full items-center justify-center bg-green-100 text-4xl font-bold'
              }
            >
              Section B
            </h1>
            <h1
              ref={sectionC}
              className={
                'flex h-[500px] w-full items-center justify-center bg-yellow-100 text-4xl font-bold'
              }
            >
              Section C
            </h1>
          </div>
        </div>
      );
    };

    return <AnchorTabsComponent />;
  },
  args: {
    type: 'fill',
    size: 'md',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: '탭 클릭 시 해당 섹션으로 스크롤하는 앵커 탭 기능.',
      },
    },
  },
};

export const StepperTab: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-xl font-semibold">StepperTabs 컴포넌트</h2>
        <StepperTabs type={'sub-progress'} items={items} />
      </div>
    </div>
  ),
  args: {
    items: items,
    size: 'md',
    variant: 'primary',
  },
};

export const VariantComparison: Story = {
  render: (args) => (
    <div className={'space-y-8'}>
      <div>
        <h2 className={'mb-3 text-xl font-semibold'}>Primary Variant</h2>
        <Tabs {...args} variant={'primary'} />
      </div>
      <div>
        <h2 className={'mb-3 text-xl font-semibold'}>Secondary Variant</h2>
        <Tabs {...args} variant={'secondary'} />
      </div>
      <div>
        <h2 className={'mb-3 text-xl font-semibold'}>Gray Variant</h2>
        <Tabs {...args} variant={'gray'} />
      </div>
    </div>
  ),
  args: {
    type: 'fill',
    size: 'md',
    selectedTabKey: 'a',
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story:
          '다양한 variant 옵션을 비교해볼 수 있습니다. Controls에서 type을 변경하여 각 variant가 다른 타입에서 어떻게 보이는지 확인할 수 있습니다.',
      },
    },
  },
};

export const SizeComparison: Story = {
  render: (args) => (
    <div className={'space-y-8'}>
      <div>
        <h2 className={'mb-3 text-xl font-semibold'}>Small Size</h2>
        <Tabs {...args} size={'sm'} />
      </div>
      <div>
        <h2 className={'mb-3 text-xl font-semibold'}>Medium Size</h2>
        <Tabs {...args} size={'md'} />
      </div>
    </div>
  ),
  args: {
    type: 'fill',
    variant: 'primary',
    selectedTabKey: 'a',
    items: items,
  },
  parameters: {
    docs: {
      description: {
        story:
          '크기 옵션을 비교해볼 수 있습니다. Controls에서 type과 variant를 변경하여 다양한 조합을 확인할 수 있습니다.',
      },
    },
  },
};
