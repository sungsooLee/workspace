import './index.css'; // CSS 파일 가져오기

import { DraggableBlockPlugin_EXPERIMENTAL } from '@lexical/react/LexicalDraggableBlockPlugin'; // Lexical의 드래그 가능한 블록 플러그인 가져오기
import { useRef } from 'react'; // React의 useRef 훅 가져오기

// 드래그 가능한 블록 메뉴의 클래스 이름
const DRAGGABLE_BLOCK_MENU_CLASSNAME = 'draggable-block-menu';

/**
 * isOnMenu 함수
 *
 * 특정 HTML 요소가 드래그 가능한 블록 메뉴 내부에 포함되어 있는지 확인
 *
 * @param {HTMLElement} element - 확인하려는 HTML 요소
 * @returns {boolean} 요소가 드래그 블록 메뉴 안에 있는지 여부
 */
function isOnMenu(element: HTMLElement): boolean {
  // `element.closest`를 사용하여 지정된 클래스 이름을 가진 조상 요소를 찾음
  return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
}

/**
 * DraggableBlockPlugin 컴포넌트
 *
 * Lexical 에디터에서 블록을 드래그하여 이동할 수 있는 기능을 제공
 * 드래그 메뉴와 드래그 대상 라인을 포함한 UI를 렌더링하며, 사용자 정의 요소를 지원
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {HTMLElement} [props.anchorElem=document.body] - 드래그 메뉴가 기준으로 삼을 앵커 요소
 * @returns {JSX.Element} 드래그 가능한 블록 플러그인 UI
 */
export default function DraggableBlockPlugin({
  anchorElem = document.body, // 기본값으로 document.body를 앵커로 설정
}: {
  anchorElem?: HTMLElement;
}): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null); // 드래그 메뉴의 참조를 저장하는 Ref
  const targetLineRef = useRef<HTMLDivElement>(null); // 드래그 대상 라인의 참조를 저장하는 Ref

  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElem} // 드래그 앵커 요소 설정
      menuRef={menuRef} // 드래그 메뉴 참조 전달
      targetLineRef={targetLineRef} // 드래그 대상 라인 참조 전달
      menuComponent={
        // 드래그 메뉴 컴포넌트 정의
        <div ref={menuRef} className="icon draggable-block-menu">
          <div className="icon" /> {/* 내부 아이콘 */}
        </div>
      }
      targetLineComponent={
        // 드래그 대상 라인 컴포넌트 정의
        <div ref={targetLineRef} className="draggable-block-target-line" />
      }
      isOnMenu={isOnMenu} // 메뉴 내부 여부를 확인하는 함수 전달
    />
  );
}
