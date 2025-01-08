import React, { useRef } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import Placeholder from './placeholder';
import ErrorBoundary from '../plugins/error-boundary';
import ToolbarPlugin from '../plugins/toolbar.plugin';
import { ModalContext } from '../context/modal.context';
import { FloatingModalContext } from '../context/floating-modal.context';

/**
 * full spec Editor
 * @constructor
 */
const RichTextEditor = () => {
  const scrollTarget = useRef<HTMLDivElement>(null);
  const placeholder = '내용을 입력해주세요...';
  return (
    <div className={'nlp--editor-container relative w-full min-w-[550px] '}>
      <ModalContext>
        <FloatingModalContext scrollTarget={scrollTarget}>
          <ToolbarPlugin />
          <div className="nlp--editor-content relative ">
            <RichTextPlugin
              contentEditable={
                <div className="nlp--ediztor-scroller relative ">
                  <div
                    className="nlp--editor relative border-[1px] border-gray-4"
                    ref={scrollTarget}>
                    <ContentEditable className="nlp--content-editable" />
                  </div>
                </div>
              }
              aire-placeholder={placeholder}
              placeholder={<Placeholder placeholder={placeholder} />}
              ErrorBoundary={ErrorBoundary}
            />
          </div>
        </FloatingModalContext>
      </ModalContext>
    </div>
  );
};

export default RichTextEditor;
