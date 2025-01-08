import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { FC } from 'react';
import { initialConfig } from './config/editor.config';
import RichTextEditor from './components/rich-text-editor';
import { ToolbarContext } from './context/toolbar.context';
import TreeViewPlugin from './plugins/tree-view.plugin';

const Editor: FC = () => {
  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarContext>
          <RichTextEditor />
          <TreeViewPlugin />
        </ToolbarContext>
      </LexicalComposer>
    </>
  );
};

export default Editor;
