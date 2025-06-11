import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { FC } from 'react';
import { initialConfig } from './config/editor.config';
import RichTextEditor from './components/rich-text-editor';
import { ToolbarContext } from './context/toolbar.context';
import TreeViewPlugin from './plugins/tree-view.plugin';

const EditorComponent: FC = () => {
  return (
    <div className={'nlp--editor min-h-[550px] w-full max-w-[980px]'}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarContext>
          <RichTextEditor />
          <TreeViewPlugin />
        </ToolbarContext>
      </LexicalComposer>
    </div>
  );
};

export const Editor = EditorComponent;
