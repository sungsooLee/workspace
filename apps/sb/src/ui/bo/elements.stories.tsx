import type { Meta, StoryObj } from '@storybook/react';
import { Button, Divider, SplitPanel } from '@learnway/ui';

export default {
  title: 'Bo-Components/Elements',
  component: Divider,
  tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**화면 구성을 위한 공통 시각 컴포넌트 모음입니다.**
- 주로 레이아웃 구성이나 반복적인 UI 요소 재사용을 위한 비기능적 시각 컴포넌트를 포함하고 있습니다.
        `,
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof Button>;

// Divider
export const TemplateDivider: any = (args: any) => {
  return (
    <div className={'border border-gray-400 p-10'}>
      <section>Search Box</section>
      <Divider />
      <section>Grid Box</section>
    </div>
  );
};
TemplateDivider.storyName = 'Divider';

// SplitPanel
export const TemplateSplitPanel: any = (args: any) => {
  return (
    <div className={'border border-gray-400 p-10'}>
      <section>Search Box</section>
      <SplitPanel size={[100, 200]}>
        <div>LEFT</div>
        <div>RIGHT</div>
      </SplitPanel>
    </div>
  );
};
TemplateSplitPanel.storyName = 'SplitPanel';
