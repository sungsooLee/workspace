import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

export default function SaveContentPlugin({ onChange }: { onChange?: (json: string) => void }) {
  return (
    <OnChangePlugin
      onChange={(editorState) => {
        const json = editorState.toJSON();
        onChange?.(JSON.stringify(json));
      }}
    />
  );
}
