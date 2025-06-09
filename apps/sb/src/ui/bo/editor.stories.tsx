import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Editor } from '@learnway/ui';

export default {
  title: 'Bo-Components/Editor',
  component: Editor,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Editor>;

export const TemplateEditor: any = (args: any) => {
  return <Editor />;
};
TemplateEditor.storyName = 'Editor';
