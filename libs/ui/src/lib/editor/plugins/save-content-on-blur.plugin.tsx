import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export default function SaveOnBlurPlugin({ onBlur }: { onBlur?: (json: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (!rootElement) return;

    const handleBlur = () => {
      editor.update(() => {
        const editorState = editor.getEditorState();
        const json = editorState.toJSON();
        onBlur?.(JSON.stringify(json));
      });
    };

    rootElement.addEventListener('blur', handleBlur, true);

    return () => {
      rootElement.removeEventListener('blur', handleBlur, true);
    };
  }, [editor, onBlur]);

  return null;
}
