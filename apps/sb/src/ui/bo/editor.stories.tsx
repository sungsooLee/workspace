import { Editor } from '@learnway/ui/editor';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Bo-Components/Editor',
  component: Editor,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Editor>;

export const TemplateEditor: any = (args: any) => {
  return <Editor value={{}} />;
};
TemplateEditor.storyName = 'Editor';
