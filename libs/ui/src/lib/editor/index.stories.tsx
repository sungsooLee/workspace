import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Editor from './index';
import useEditor from './hooks/editor.hook';

export default {
  title: 'Components/Editor',
  component: Editor,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Editor>;

const BaseEditorWrapper: React.FC<any> = (args) => {
  const { editor, getHTML, setHTML, clear } = useEditor();

  const handleGetHTML = () => {
    console.log(getHTML());
  };

  const handleSetHTML = () => {
    setHTML(`<h1>안녕하세요</>`);
  };

  const handleClearEditor = () => {
    clear();
  };

  return (
    <div>
      <h1>Lexical Editor</h1>
      <button onClick={handleGetHTML}>Get HTML</button>
      <button onClick={handleSetHTML}>Set HTML</button>
      <button onClick={handleClearEditor}>Clear Editor</button>
      <Editor ref={editor} placeholder={'컨텐츠를 입력하세요'} />
    </div>
  );
};

export const Base: Story = {
  args: {},
  render: (args) => <BaseEditorWrapper {...args} />,
};
