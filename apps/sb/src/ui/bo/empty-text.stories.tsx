// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, EmptyText } from '@learnway/ui';
import { useTranslation } from 'react-i18next';

export default {
  title: 'Bo-Components/EmptyText',
  component: EmptyText,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof EmptyText>;

export const Template: any = (args: any) => {
  return <EmptyText {...args} />;
};
Template.storyName = 'Basic';
Template.args = {
  size: 'md',
  description: 'Default Description',
};

export const TemplateButton: any = (args: any) => {
  const { t } = useTranslation();
  return (
    <EmptyText
      {...args}
      footer={
        <>
          <Button variant={'gray'} size={'md'} label={t('action 1')} />
          <Button variant={'primary'} size={'md'} label={t('action 2')} />
        </>
      }
    />
  );
};
TemplateButton.storyName = 'Footer';
TemplateButton.args = {
  size: 'md',
  description: 'Default Description',
};
