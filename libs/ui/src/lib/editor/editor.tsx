import React, { FC } from 'react';
import { cn } from '@learnway/shared';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { initialConfig } from './config/editor.config';
import RichTextEditor from './components/rich-text-editor';
import { ToolbarContext } from './context/toolbar.context';
import TreeViewPlugin from './plugins/tree-view.plugin';
import LoadContentPlugin from './plugins/load-content.plugin';
import SaveOnBlurPlugin from './plugins/save-content-on-blur.plugin';
import styles from './editor.module.css';

export interface EditorProps {
  value: any;
  onChange?: (value: any) => void;
  onBlur?: (json: string) => void;
  debug?: boolean;
}

const EditorComponent: FC<EditorProps> = ({ value, onBlur, onChange, debug }) => {
  return (
    <div className={cn(styles.start, styles.editor, 'nlp--editor')}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarContext>
          <RichTextEditor />
          <LoadContentPlugin value={value} />
          <SaveOnBlurPlugin onBlur={onBlur} />
          {debug && <TreeViewPlugin />}
        </ToolbarContext>
      </LexicalComposer>
    </div>
  );
};

export const Editor = EditorComponent;
