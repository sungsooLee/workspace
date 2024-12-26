import React, { forwardRef } from 'react';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import useExposeHandler from './hooks/expose-handler.hook';

import { ExposeEditorHandle } from './hooks/types';
import Placeholder from './components/placeholder';
import ErrorBoundary from './plugins/error-boundary';
import FeaturePlugin from './plugins/feature.plugin';
import AutoLinkPlugin from './plugins/auto-link.plugin';
import DraggableBlockPlugin from './plugins/draggable-block-plugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import TreeViewPlugin from './plugins/tree-view.plugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import TableCellResizer from './plugins/table-cell-resizer';
import ImagesPlugin from './plugins/images.plugin';

const RichEditor = forwardRef<ExposeEditorHandle, { placeholder?: string }>(
  ({ placeholder }, ref) => {
    useExposeHandler(ref); // 커스텀 훅 사용
    return (
      <div className={'flex w-full h-full'}>
        <div className={'relative'}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="bg-gray-100 w-[600px] h-[400px] p-[8px]" />
            }
            placeholder={<Placeholder placeholder={placeholder} />}
            ErrorBoundary={ErrorBoundary}
          />
        </div>
        <DraggableBlockPlugin />
        <AutoLinkPlugin />
        <HistoryPlugin />
        <LinkPlugin />
        <TreeViewPlugin />
        <TablePlugin />
        <TableCellResizer />
        <ImagesPlugin />
        <FeaturePlugin />
      </div>
    );
  },
);

export default RichEditor;
