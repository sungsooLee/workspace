// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Panel } from '@learnway/ui';

export default {
  title: 'Bo-Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ minWidth: '900px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

// Panel
export const Template: any = (args: any) => {
  return <Panel {...args}>{args.content}</Panel>;
};
Template.storyName = 'Panel';
Template.args = {
  title: 'Custom Title',
  content: 'Custom Content',
};

// Panel
export const TemplateGroupCollapse: any = (args: any) => {
  const [openedGroupPanel, setOpenedGroupPanel] = React.useState(true);
  const handleClick = () => {
    setOpenedGroupPanel(!openedGroupPanel);
  };
  return (
    <div className="p-4">
      <Button onClick={handleClick}>{openedGroupPanel ? '모두 닫기' : '모두 펼치기'}</Button>
      <Panel
        className="bg-gray-2 p-4"
        title={'Group Panel A'}
        collapsible
        collapsed={openedGroupPanel}
      >
        Group Panel A Content
      </Panel>
      <Panel
        className="bg-gray-2 p-4"
        title={'Group Panel B'}
        collapsible
        collapsed={openedGroupPanel}
      >
        Group Panel B Content
      </Panel>
      <Panel
        className="bg-gray-2 p-4"
        title={'Group Panel C'}
        collapsible
        collapsed={openedGroupPanel}
      >
        Group Panel A Content
      </Panel>
    </div>
  );
};
TemplateGroupCollapse.storyName = 'Group Collapse';
TemplateGroupCollapse.args = {};
