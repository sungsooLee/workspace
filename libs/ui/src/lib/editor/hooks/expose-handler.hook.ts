import { ExposeEditorHandle } from './types';
import { Ref, useImperativeHandle } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot } from 'lexical';

const useExposeHandler = (ref: Ref<ExposeEditorHandle>) => {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(ref, () => ({
    getHTML: (): string => {
      let html = '';
      editor.getEditorState().read(() => {
        html = $generateHtmlFromNodes(editor);
      });
      return html;
    },
    setHTML: (html: string): void => {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        root.append(...nodes);
      });
    },
    clearEditor: (): void => {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
      });
    },
  }));
};

export default useExposeHandler;
