// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from '@learnway/ui';

export default {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Panel>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Panel {...args} />;
};

const SubWrapper: React.FC<any> = (args) => {
  return <Panel.Sub {...args} />;
};

// Panel
export const Template: any = (args: any) => {
  return (
    <div className="flex flex-col gap-5">
      <Panel {...args} title={'Title'}>
        <>content</>
      </Panel>
    </div>
  )
}
Template.storyName = 'Panel';
Template.args = {};


// Panel
export const TemplateCollapse: any = (args: any) => {
  return (
    <div className="flex flex-col gap-5">
      <Panel {...args} title={'Title'} collapse={{opened: true}}>
        <>content</>
      </Panel>
    </div>
  )
}
TemplateCollapse.storyName = 'Collapse';
TemplateCollapse.args = {};


// Panel
export const TemplateCustomTitle: any = (args: any) => {
  return (
    <div className="flex flex-col gap-5">
      <BaseWrapper {...args} title={<div>Custom Title</div>}>
        <div key="1">Content1</div>
        <div key="2">Content2</div>
        <SubWrapper title={<div>소제목1</div>}>
          {' '}
          <div key="3">Sub Content1-1</div>
          <div key="4">Sub Content1-2</div>
        </SubWrapper>
        <SubWrapper title={<div>소제목2</div>}>
          {' '}
          <div key="5">Sub Content2-1</div>
          <div key="6">Sub Content2-2</div>
        </SubWrapper>
      </BaseWrapper>
    </div>
  )
}
TemplateCustomTitle.storyName = 'Custom Title';
TemplateCustomTitle.args = {};
