import type { TableCellNode, TableDOMCell, TableMapType } from '@lexical/table'; // Lexical 테이블 관련 타입 정의
import type { LexicalEditor } from 'lexical'; // Lexical 에디터 타입 정의

import './index.css'; // 관련 CSS 파일 가져오기

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'; // Lexical 에디터 컨텍스트 훅
import { useLexicalEditable } from '@lexical/react/useLexicalEditable'; // 에디터가 편집 가능한지 확인하는 훅
import {
  $computeTableMapSkipCellCheck,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $isTableCellNode,
  $isTableRowNode,
  getDOMCellFromTarget,
  getTableElement,
  TableNode,
} from '@lexical/table'; // 테이블 관련 Lexical 유틸리티 함수 및 클래스
import { calculateZoomLevel } from '@lexical/utils'; // 줌 레벨 계산 유틸리티
import { $getNearestNodeFromDOMNode, isHTMLElement } from 'lexical'; // Lexical 노드 관련 유틸리티
import * as React from 'react';
import {
  MouseEventHandler,
  ReactPortal,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom'; // React 포털 생성

// 마우스 위치 타입 정의
type MousePosition = {
  x: number; // 마우스 X 좌표
  y: number; // 마우스 Y 좌표
};

// 마우스 드래그 방향 타입 정의
type MouseDraggingDirection = 'right' | 'bottom';

// 최소 행 높이와 열 너비
const MIN_ROW_HEIGHT = 33;
const MIN_COLUMN_WIDTH = 92;

/**
 * TableCellResizer 컴포넌트
 *
 * 테이블 셀 크기 조정 기능을 제공합니다. 마우스 드래그를 통해 행 높이와 열 너비를 변경.
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {LexicalEditor} props.editor - Lexical 에디터 인스턴스
 * @returns {JSX.Element} 셀 크기 조정 UI
 */
function TableCellResizer({ editor }: { editor: LexicalEditor }): JSX.Element {
  // 여러 상태와 참조값 정의
  const targetRef = useRef<HTMLElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);
  const tableRectRef = useRef<ClientRect | null>(null);
  const mouseStartPosRef = useRef<MousePosition | null>(null);

  const [mouseCurrentPos, updateMouseCurrentPos] = useState<MousePosition | null>(null);
  const [activeCell, updateActiveCell] = useState<TableDOMCell | null>(null);
  const [isMouseDown, updateIsMouseDown] = useState<boolean>(false);
  const [draggingDirection, updateDraggingDirection] = useState<MouseDraggingDirection | null>(
    null,
  );

  // 상태를 초기화하는 함수
  const resetState = useCallback(() => {
    updateActiveCell(null);
    targetRef.current = null;
    updateDraggingDirection(null);
    mouseStartPosRef.current = null;
    tableRectRef.current = null;
  }, []);

  // 마우스가 눌렸는지 확인하는 함수
  const isMouseDownOnEvent = (event: MouseEvent) => {
    return (event.buttons & 1) === 1;
  };

  // 테이블 노드에 열 너비 초기값 설정
  useEffect(() => {
    return editor.registerNodeTransform(TableNode, (tableNode) => {
      if (tableNode.getColWidths()) {
        return tableNode; // 열 너비가 이미 설정된 경우
      }

      const numColumns = tableNode.getColumnCount(); // 열 개수 가져오기
      const columnWidth = MIN_COLUMN_WIDTH;

      tableNode.setColWidths(Array(numColumns).fill(columnWidth)); // 열 너비 설정
      return tableNode;
    });
  }, [editor]);

  // 마우스 이벤트 핸들러 등록
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const target = event.target;
      if (!isHTMLElement(target)) {
        return;
      }

      if (draggingDirection) {
        // 드래그 방향이 설정된 경우, 현재 마우스 위치 업데이트
        updateMouseCurrentPos({
          x: event.clientX,
          y: event.clientY,
        });
        return;
      }
      updateIsMouseDown(isMouseDownOnEvent(event));
      if (resizerRef.current && resizerRef.current.contains(target)) {
        return;
      }

      if (targetRef.current !== target) {
        targetRef.current = target;
        const cell = getDOMCellFromTarget(target);

        if (cell && activeCell !== cell) {
          editor.getEditorState().read(() => {
            const tableCellNode = $getNearestNodeFromDOMNode(cell.elem);
            if (!tableCellNode) {
              throw new Error('TableCellResizer: Table cell node not found.');
            }

            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableElement = getTableElement(
              tableNode,
              editor.getElementByKey(tableNode.getKey()),
            );

            if (!tableElement) {
              throw new Error('TableCellResizer: Table element not found.');
            }

            targetRef.current = target as HTMLElement;
            tableRectRef.current = tableElement.getBoundingClientRect();
            updateActiveCell(cell);
          });
        } else if (cell == null) {
          resetState();
        }
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      updateIsMouseDown(true);
    };

    const onMouseUp = (event: MouseEvent) => {
      updateIsMouseDown(false);
    };

    const removeRootListener = editor.registerRootListener((rootElement, prevRootElement) => {
      prevRootElement?.removeEventListener('mousemove', onMouseMove);
      prevRootElement?.removeEventListener('mousedown', onMouseDown);
      prevRootElement?.removeEventListener('mouseup', onMouseUp);
      rootElement?.addEventListener('mousemove', onMouseMove);
      rootElement?.addEventListener('mousedown', onMouseDown);
      rootElement?.addEventListener('mouseup', onMouseUp);
    });

    return () => {
      removeRootListener();
    };
  }, [activeCell, draggingDirection, editor, resetState]);

  const getCellNodeHeight = (
    cell: TableCellNode,
    activeEditor: LexicalEditor,
  ): number | undefined => {
    const domCellNode = activeEditor.getElementByKey(cell.getKey());
    return domCellNode?.clientHeight;
  };

  const isHeightChanging = (direction: MouseDraggingDirection) => {
    if (direction === 'bottom') {
      return true;
    }
    return false;
  };

  // 행 높이를 업데이트하는 함수
  const updateRowHeight = useCallback(
    (heightChange: number) => {
      if (!activeCell) {
        throw new Error('TableCellResizer: Expected active cell.');
      }

      editor.update(
        () => {
          const tableCellNode = $getNearestNodeFromDOMNode(activeCell.elem);
          if (!$isTableCellNode(tableCellNode)) {
            throw new Error('TableCellResizer: Table cell node not found.');
          }

          const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
          const tableRowIndex =
            $getTableRowIndexFromTableCellNode(tableCellNode) + tableCellNode.getRowSpan() - 1;

          const tableRows = tableNode.getChildren();

          if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
            throw new Error('Expected table cell to be inside of table row.');
          }

          const tableRow = tableRows[tableRowIndex];

          if (!$isTableRowNode(tableRow)) {
            throw new Error('Expected table row');
          }

          let height = tableRow.getHeight();
          if (height === undefined) {
            const rowCells = tableRow.getChildren<TableCellNode>();
            height = Math.min(
              ...rowCells.map((cell) => getCellNodeHeight(cell, editor) ?? Infinity),
            );
          }

          const newHeight = Math.max(height + heightChange, MIN_ROW_HEIGHT);
          tableRow.setHeight(newHeight);
        },
        { tag: 'skip-scroll-into-view' },
      );
    },
    [activeCell, editor],
  );

  const getCellColumnIndex = (tableCellNode: TableCellNode, tableMap: TableMapType) => {
    for (let row = 0; row < tableMap.length; row++) {
      for (let column = 0; column < tableMap[row].length; column++) {
        if (tableMap[row][column].cell === tableCellNode) {
          return column;
        }
      }
    }
  };

  const updateColumnWidth = useCallback(
    (widthChange: number) => {
      if (!activeCell) {
        throw new Error('TableCellResizer: Expected active cell.');
      }
      editor.update(
        () => {
          const tableCellNode = $getNearestNodeFromDOMNode(activeCell.elem);
          if (!$isTableCellNode(tableCellNode)) {
            throw new Error('TableCellResizer: Table cell node not found.');
          }

          const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
          const [tableMap] = $computeTableMapSkipCellCheck(tableNode, null, null);
          const columnIndex = getCellColumnIndex(tableCellNode, tableMap);
          if (columnIndex === undefined) {
            throw new Error('TableCellResizer: Table column not found.');
          }

          const colWidths = tableNode.getColWidths();
          if (!colWidths) {
            return;
          }
          const width = colWidths[columnIndex];
          if (width === undefined) {
            return;
          }
          const newColWidths = [...colWidths];
          const newWidth = Math.max(width + widthChange, MIN_COLUMN_WIDTH);
          newColWidths[columnIndex] = newWidth;
          tableNode.setColWidths(newColWidths);
        },
        { tag: 'skip-scroll-into-view' },
      );
    },
    [activeCell, editor],
  );

  const mouseUpHandler = useCallback(
    (direction: MouseDraggingDirection) => {
      const handler = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!activeCell) {
          throw new Error('TableCellResizer: Expected active cell.');
        }

        if (mouseStartPosRef.current) {
          const { x, y } = mouseStartPosRef.current;

          if (activeCell === null) {
            return;
          }
          const zoom = calculateZoomLevel(event.target as Element);

          if (isHeightChanging(direction)) {
            const heightChange = (event.clientY - y) / zoom;
            updateRowHeight(heightChange);
          } else {
            const widthChange = (event.clientX - x) / zoom;
            updateColumnWidth(widthChange);
          }

          resetState();
          document.removeEventListener('mouseup', handler);
        }
      };
      return handler;
    },
    [activeCell, resetState, updateColumnWidth, updateRowHeight],
  );

  const toggleResize = useCallback(
    (direction: MouseDraggingDirection): MouseEventHandler<HTMLDivElement> =>
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!activeCell) {
          throw new Error('TableCellResizer: Expected active cell.');
        }

        mouseStartPosRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
        updateMouseCurrentPos(mouseStartPosRef.current);
        updateDraggingDirection(direction);

        document.addEventListener('mouseup', mouseUpHandler(direction));
      },
    [activeCell, mouseUpHandler],
  );

  const getResizers = useCallback(() => {
    if (activeCell) {
      const { height, width, top, left } = activeCell.elem.getBoundingClientRect();
      const zoom = calculateZoomLevel(activeCell.elem);
      const zoneWidth = 10; // Pixel width of the zone where you can drag the edge
      const styles = {
        bottom: {
          backgroundColor: 'none',
          cursor: 'row-resize',
          height: `${zoneWidth}px`,
          left: `${window.pageXOffset + left}px`,
          top: `${window.pageYOffset + top + height - zoneWidth / 2}px`,
          width: `${width}px`,
        },
        right: {
          backgroundColor: 'none',
          cursor: 'col-resize',
          height: `${height}px`,
          left: `${window.pageXOffset + left + width - zoneWidth / 2}px`,
          top: `${window.pageYOffset + top}px`,
          width: `${zoneWidth}px`,
        },
      };

      const tableRect = tableRectRef.current;

      if (draggingDirection && mouseCurrentPos && tableRect) {
        if (isHeightChanging(draggingDirection)) {
          styles[draggingDirection].left = `${window.pageXOffset + tableRect.left}px`;
          styles[draggingDirection].top = `${window.pageYOffset + mouseCurrentPos.y / zoom}px`;
          styles[draggingDirection].height = '3px';
          styles[draggingDirection].width = `${tableRect.width}px`;
        } else {
          styles[draggingDirection].top = `${window.pageYOffset + tableRect.top}px`;
          styles[draggingDirection].left = `${window.pageXOffset + mouseCurrentPos.x / zoom}px`;
          styles[draggingDirection].width = '3px';
          styles[draggingDirection].height = `${tableRect.height}px`;
        }

        styles[draggingDirection].backgroundColor = '#adf';
      }

      return styles;
    }

    return {
      bottom: null,
      left: null,
      right: null,
      top: null,
    };
  }, [activeCell, draggingDirection, mouseCurrentPos]);

  const resizerStyles = getResizers();

  return (
    <div ref={resizerRef}>
      {activeCell != null && !isMouseDown && (
        <>
          <div
            className="TableCellResizer__resizer TableCellResizer__ui"
            style={resizerStyles.right || undefined}
            onMouseDown={toggleResize('right')}
          />
          <div
            className="TableCellResizer__resizer TableCellResizer__ui"
            style={resizerStyles.bottom || undefined}
            onMouseDown={toggleResize('bottom')}
          />
        </>
      )}
    </div>
  );
}

/**
 * TableCellResizerPlugin 컴포넌트
 *
 * 테이블 셀 크기 조정 기능을 Lexical 에디터에 추가하는 플러그인
 *
 * @returns {null | ReactPortal} 테이블 셀 크기 조정 포털 UI 또는 null
 */
export default function TableCellResizerPlugin(): null | ReactPortal {
  const [editor] = useLexicalComposerContext();
  const isEditable = useLexicalEditable();

  return useMemo(
    () => (isEditable ? createPortal(<TableCellResizer editor={editor} />, document.body) : null),
    [editor, isEditable],
  );
}
