import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export default function LoadContentPlugin({ value }: { value?: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (value) {
      try {
        const json = JSON.parse(value);
        const editorState = editor.parseEditorState(json);
        editor.setEditorState(editorState);
      } catch (e) {
        console.error('Invalid editor JSON:', e);
      }
    }
  }, [editor, value]);

  return null;
}
