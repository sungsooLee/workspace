import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'; // Lexical 에디터의 컨텍스트를 가져오기 위한 훅
import { TreeView } from '@lexical/react/LexicalTreeView'; // Lexical 에디터의 트리 뷰 디버깅 UI를 제공하는 컴포넌트
import * as React from 'react'; // React 모듈 가져오기

/**
 * TreeViewPlugin 컴포넌트
 *
 * Lexical 에디터의 구조를 시각적으로 표시하기 위한 트리 뷰 디버깅 UI를 렌더링
 * 디버깅 목적으로만 사용되며, 트리 구조를 확인하고 타임 트래블 기능을 지원
 *
 * @returns {JSX.Element} 트리 뷰 디버깅 UI를 포함하는 JSX 엘리먼트
 */
export default function TreeViewPlugin(): JSX.Element {
  // Lexical 에디터 컨텍스트를 가져옵니다.
  const [editor] = useLexicalComposerContext();

  return (
    <TreeView
      // 트리 뷰의 외부 CSS 클래스 이름을 지정
      viewClassName="tree-view-output"
      // 트리 타입 변경 버튼의 CSS 클래스 이름을 지정
      treeTypeButtonClassName="debug-treetype-button"
      // 타임 트래블 패널의 CSS 클래스 이름을 지정
      timeTravelPanelClassName="debug-timetravel-panel"
      // 타임 트래블 버튼의 CSS 클래스 이름을 지정
      timeTravelButtonClassName="debug-timetravel-button"
      // 타임 트래블 패널의 슬라이더 CSS 클래스 이름을 지정
      timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
      // 타임 트래블 패널 내 버튼의 CSS 클래스 이름을 지정
      timeTravelPanelButtonClassName="debug-timetravel-panel-button"
      // Lexical 에디터 인스턴스를 전달
      editor={editor}
    />
  );
}
