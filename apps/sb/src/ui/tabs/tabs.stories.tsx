// BaseForm.stories.tsx
import React from 'react';
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

// Switch
export const Template: any = (args: any) => {
  return <Tabs {...args} items={items} className={'XXX'} />;
};
Template.storyName = 'Line Tabs';

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
