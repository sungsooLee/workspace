import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Editor } from '@learnway/editor';

export default {
  title: 'Components/Editor',
  component: Editor,
  tags: ['autodocs'],
  argTypes: {},
  includeStories: [''],
} as Meta;
type Story = StoryObj<typeof Editor>;

const BaseEditorWrapper: React.FC<any> = (args) => {
  return (
    <div>
      <h1>Lexical Editor</h1>
      <Editor />
    </div>
  );
};

export const Base: Story = {
  args: {},
  render: (args) => <BaseEditorWrapper />,
};
