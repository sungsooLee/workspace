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

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const PanelStory: Story = {
  name: 'Panel',
  args: {},
  render: (args) => (
    <div className="flex flex-col gap-5">
      <BaseWrapper {...args} title={<div>제목</div>}>
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
  ),
};
