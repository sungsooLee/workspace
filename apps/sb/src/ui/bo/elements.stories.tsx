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
  const Left = () => <div className={'bg-lime-300'}>LEFT</div>;
  const Center = () => <div className={'bg-violet-300'}>Center</div>;
  const Right = () => <div className={'bg-orange-300'}>RIGHT</div>;
  return (
    <>
      <section className="mt-8 text-4xl italic">설정 값 없음 - 모든 영역 1/N</section>
      <SplitPanel>
        <Left />
        <Right />
      </SplitPanel>

      <section className="mt-8 text-4xl italic">50% 50%</section>
      <SplitPanel size={['50%', '50%']}>
        <Left />
        <Right />
      </SplitPanel>

      <section className="mt-8 text-4xl italic">Left: 300px, Right: auto</section>
      <SplitPanel size={[300, 'auto']}>
        <Left />
        <Right />
      </SplitPanel>

      <section className="mt-8 text-4xl italic">Left: auto, Right: 300px</section>
      <SplitPanel size={['auto', 300]}>
        <Left />
        <Right />
      </SplitPanel>

      <section className="mt-8 text-4xl italic">Left: 100px, Center: 200px, Right: auto</section>
      <SplitPanel size={['100px', '200px', 'auto']}>
        <Left />
        <Center />
        <Right />
      </SplitPanel>

      <section className="mt-8 text-4xl italic">divider=true 설정</section>
      <SplitPanel divider={true}>
        <Left />
        <Right />
      </SplitPanel>
    </>
  );
};
TemplateSplitPanel.storyName = 'SplitPanel';
