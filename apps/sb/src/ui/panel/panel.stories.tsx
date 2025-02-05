// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Panel } from '@learnway/ui';

export default {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

// Panel
export const Template: any = (args: any) => {
  return (
    <Panel {...args} title={'Title'}>
      <>content</>
    </Panel>
  )
}
Template.storyName = 'Panel';
Template.args = {};


// Custom Title
export const TemplateCustomTitle: any = (args: any) => {
  return (
    <Panel {...args} title={<div>Custom Title</div>}>
      <>content</>
    </Panel>
  )
}
TemplateCustomTitle.storyName = 'Custom Title';
TemplateCustomTitle.args = {};


// Collapse
export const TemplateCollapse: any = (args: any) => {
  return (
    <Panel {...args} title={'Title'} collapsible>
      <>content</>
    </Panel>
  )
}
TemplateCollapse.storyName = 'Collapse';
TemplateCollapse.args = {};


// Panel
export const TemplateGroupCollapse: any = (args: any) => {
  const [openedGroupPanel, setOpenedGroupPanel] = React.useState(true);
  const handleClick = () => {
    setOpenedGroupPanel(!openedGroupPanel);
  }
  return (
    <div className="bg-gray-2 p-4">
      <Panel className="p-4" title={'싱글 패널'}>
        싱글패널 Content
      </Panel>
      <Button onClick={handleClick}>{openedGroupPanel ? '모두 닫기' : '모두 펼치기'}</Button>
      <Panel className="bg-gray-2 p-4" title={'Group Panel A'} collapsible collapsed={openedGroupPanel}>
        Group Panel A Content
      </Panel>
      <Panel className="bg-gray-2 p-4" title={'Group Panel B'} collapsible collapsed={openedGroupPanel}>
        Group Panel B Content
      </Panel>
      <Panel className="bg-gray-2 p-4" title={'Group Panel C'} collapsible collapsed={openedGroupPanel}>
        Group Panel A Content
      </Panel>
    </div>
  )
}
TemplateGroupCollapse.storyName = 'Group Collapse';
TemplateGroupCollapse.args = {};
