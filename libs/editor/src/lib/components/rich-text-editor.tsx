import React, { useState } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import Placeholder from './placeholder';
import ErrorBoundary from '../plugins/error-boundary';
import ToolbarPlugin from '../plugins/toolbar.plugin';
import DragDropPastePlugin from '../plugins/drag-drop-paste.plugin';
import { ModalContext } from '../context/modal.context';
import { FloatingModalContext } from '../context/floating-modal.context';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import DraggableBlockPlugin from '../plugins/draggable-block.plugin';
import TableCellActionMenuPlugin from '../plugins/table-cell-action-menu.plugin';
import TableHoverActionsPlugin from '../plugins/table-hover-actions.plugin';

/**
 * full spec Editor
 * @constructor
 */
const RichTextEditor = () => {
  const [scrollTarget, setScrollTarget] = useState<HTMLDivElement | null>(null);
  const placeholder = '내용을 입력해주세요...';

  const onRef = (_scrollTarget: HTMLDivElement) => {
    if (_scrollTarget !== null) {
      setScrollTarget(_scrollTarget);
    }
  };
  return (
    <div className={'nlp--editor-container relative w-[780px] w-full'}>
      <ModalContext>
        <FloatingModalContext scrollTarget={scrollTarget}>
          <ToolbarPlugin />
          <div className="nlp--editor-content relative">
            <RichTextPlugin
              contentEditable={
                <div className="nlp--ediztor-scroller relative">
                  <div className="nlp--editor border-gray-4 relative border-[1px]" ref={onRef}>
                    <ContentEditable className="nlp--content-editable" />
                  </div>
                </div>
              }
              aire-placeholder={placeholder}
              placeholder={<Placeholder placeholder={placeholder} />}
              ErrorBoundary={ErrorBoundary}
            />
          </div>

          <DragDropPastePlugin />

          <AutoFocusPlugin />
          {scrollTarget && (
            <>
              <DraggableBlockPlugin anchorElem={scrollTarget} />
              <TableCellActionMenuPlugin anchorElem={scrollTarget} cellMerge={true} />
              <TableHoverActionsPlugin anchorElem={scrollTarget} />
            </>
          )}
        </FloatingModalContext>
      </ModalContext>
    </div>
  );
};

export default RichTextEditor;
