// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, HtmlContent } from '@learnway/ui';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Components/HtmlContent',
  component: HtmlContent,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof HtmlContent>;

export const Template: any = (args: any) => {
  const htmlContent = `<div>
        API로 부터 전달 받은 <h6>HTML 컨텐츠</h6>화면 <span style="color: red">Render</span>시
        <br />
        <b>사용하는 컴포넌트</b>
      </div>`;
  return <HtmlContent>{htmlContent}</HtmlContent>;
};
Template.storyName = 'Basic';
