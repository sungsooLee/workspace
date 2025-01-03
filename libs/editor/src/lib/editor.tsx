import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { FC, useEffect, useState } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { initialConfig } from './config';
import Placeholder from './components/placeholder';
import ErrorBoundary from './plugins/error-boundary';

const Editor:FC = () => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={'nlp--editor-container w-full min-w-[550px]'}>
        <div className="nlp--tool-bar p-[10px] bg-gray-1 border-[1px] border-gray-3">
          hello
        </div>
        <div className="nlp--editor-content">
          <div className="nlp--editor-scroller">
            <div className="nlp--editor border-[1px] border-gray-4">
              <RichTextPlugin
                contentEditable={<ContentEditable className="" />}
                placeholder={<Placeholder placeholder={'Start typing...'} />}
                ErrorBoundary={ErrorBoundary}
              />
            </div>
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}

export default Editor;

/*
% Stmts:

Statement Coverage (구문 커버리지): 실행된 **코드 구문(Statements)**의 비율.
예: if, const, 함수 호출 등의 모든 실행 가능한 코드 구문이 테스트되었는지를 나타냅니다.
% Branch:

Branch Coverage (분기 커버리지): 조건문이나 분기문(if, switch, ?: 등)의 모든 경우가 테스트되었는지를 나타냅니다.
예: if (condition)의 true와 false 두 가지 경우가 모두 테스트되었는지 확인.
% Funcs:

Function Coverage (함수 커버리지): 정의된 함수가 테스트된 비율.
예: 함수가 선언되었을 뿐 실행되지 않았다면 커버리지에 포함되지 않습니다.
% Lines:

Line Coverage (라인 커버리지): 실제로 실행된 **코드 줄(Line)**의 비율.
예: 블록 내 코드가 실행되지 않았으면 라인 커버리지가 부족하게 됩니다.
Uncovered Line #s:

테스트되지 않은 코드 줄 번호를 표시.
예: editor.tsx 파일에서 15-16번째 줄이 테스트되지 않은 것으로 표시됨

* */
