import React, { forwardRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { ParagraphNode, TextNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ReactPlayerNode } from './nodes/react-player.node';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ImageNode } from './nodes/image.node';

import RichEditor from './richeditor';
import theme from './theme';
import { ExposeEditorHandle } from './hooks/types';

// Props 타입 정의ㅁ
export interface RichTextEditorProps {
  namespace?: string; // 사용자 지정 namespace
  onError?: (error: Error) => void; // 사용자 지정 오류 핸들러
  placeholder?: string; // Placeholder 텍스트
}

const Editor = forwardRef<ExposeEditorHandle, RichTextEditorProps>(({ placeholder }, ref) => {
  // 초기 설정
  const initialConfig = {
    namespace: 'MyEditor',
    onError: (error: Error) => {
      console.error('Lexical Editor Error:', error);
    },
    nodes: [
      ParagraphNode,
      HeadingNode,
      TextNode,
      AutoLinkNode,
      LinkNode,
      ReactPlayerNode,
      TableNode,
      TableRowNode,
      TableCellNode,
      ImageNode,
    ], // HeadingNode 등록
    theme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichEditor ref={ref} placeholder={placeholder} />
    </LexicalComposer>
  );
});

export default Editor;
