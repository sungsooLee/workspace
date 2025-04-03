// BaseForm.stories.tsx
import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@learnway/ui';

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

type Story = StoryObj<typeof Tabs>;

// const Template: React.FC<any> = (args: any) => <Tabs {...args} />

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
  return <Tabs type={'fill'} size={'md'} items={items} />;
};
Template.storyName = 'Tabs';

// 앵커 탭
export const TemplateButton: any = (args: any) => {
  const sectionA = useRef<HTMLDivElement>(null);
  const sectionB = useRef<HTMLDivElement>(null);
  const handleActiveTab = (activeKey: string) => {
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
          {
            title: 'Tab C',
            key: 'c',
          },
        ]}
        onActiveTab={handleActiveTab}
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
