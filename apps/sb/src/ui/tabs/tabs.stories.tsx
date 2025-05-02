// BaseForm.stories.tsx
import React, { useRef } from 'react';
import type { Meta } from '@storybook/react';
import { ModalWrapper, StepperTabs, Tabs, useModal } from '@learnway/ui';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    variant: 'primary',
    type: 'fill',
    size: 'md',
  },
} as Meta;

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

// Tabs
export const Template: any = (args: any) => {
  return (
    <div className={'space-y-20'}>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>type : fill</h1>
        <Tabs type={'fill'} size={'md'} items={items} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>type : line</h1>
        <Tabs type={'line'} size={'md'} items={items} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>type : round</h1>
        <Tabs type={'round'} size={'md'} items={items} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>type : progress</h1>
        <Tabs type={'progress'} size={'md'} items={items} />
      </div>
      <div>
        <h1 className={'mb-3 text-3xl font-bold italic'}>type : sub-progress</h1>
        <Tabs type={'sub-progress'} size={'md'} items={items} />
      </div>
    </div>
  );
};
Template.storyName = 'Tabs';

// 체크 후 탭 이동
export const TemplateBeforeTabChange: any = (args: any) => {
  const { confirm: openConfirm } = useModal();

  const handleBeforeTabChange = async (currentTabKey: string, nextTabKey: string) => {
    const isDirty = true; // form 내용 변경 여부
    return isDirty ? await openConfirm('수정된 내용은 초기화 됩니다.') : false;
  };

  return (
    <>
      <Tabs type={'fill'} size={'md'} items={items} onBeforeTabChange={handleBeforeTabChange} />
      <ModalWrapper />
    </>
  );
};
TemplateBeforeTabChange.storyName = '체크 후 탭 이동';

// 앵커 탭
export const TemplateButton: any = (args: any) => {
  const sectionA = useRef<HTMLDivElement>(null);
  const sectionB = useRef<HTMLDivElement>(null);
  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    if (activeKey === 'a') {
      sectionA.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (activeKey === 'b') {
      sectionB.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Tabs
        type={'fill'}
        size={'md'}
        items={[
          {
            title: 'Tab A',
            key: 'a',
          },
          {
            title: 'Tab B',
            key: 'b',
          },
        ]}
        onTabChange={handleTabChange}
      />
      <div>
        <h1 ref={sectionA} className={'h-[500px] w-full bg-amber-100'}>
          Section A
        </h1>
        <h1 ref={sectionB} className={'h-[500px] w-full bg-amber-500'}>
          Section B
        </h1>
      </div>
    </div>
  );
};
TemplateButton.storyName = '앵커 탭';

// Stepper Tab
export const TemplateStepper: any = (args: any) => {
  return (
    <>
      <StepperTabs type={'sub-progress'} items={items} />
    </>
  );
};
TemplateStepper.storyName = 'Stepper Tab';

//
// export const TemplateSelectTab: any = (args: any) => {
//   const [selectedTabKey, setSelectedTabKey] = useState<string>('');
//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex flex-row gap-5">
//         <Button onClick={() => setSelectedTabKey('b')}>Tab B 선택</Button>
//       </div>
//       <Tabs {...args} selectedTabKey={selectedTabKey} />
//     </div>
//   );
// };
// TemplateSelectTab.storyName = 'Tab 수동으로 선택';
// TemplateSelectTab.args = {
//   items,
// };
