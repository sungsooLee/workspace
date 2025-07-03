/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementNode, RangeSelection } from 'lexical';

import { $getListDepth, $isListItemNode, $isListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  INDENT_CONTENT_COMMAND,
} from 'lexical';
import { useEffect } from 'react';

/**
 * 현재 **선택된 영역의 모든 ElementNode** 집합을 반환.
 * - 이는 `RangeSelection`이 커버하는 노드들을 추적하여 각 노드의 부모를 가져온다..
 * - 선택된 상태가 없더라도 `anchor` 및 `focus`로 선택 영역 정보를 추적 한다..
 * @param {RangeSelection} selection - 현재 선택된 영역
 * @returns {Set<ElementNode>} 선택 영역에 포함된 엘리먼트 노드 집합
 */
function getElementNodesInSelection(selection: RangeSelection): Set<ElementNode> {
  const nodesInSelection = selection.getNodes();

  if (nodesInSelection.length === 0) {
    return new Set([
      selection.anchor.getNode().getParentOrThrow(),
      selection.focus.getNode().getParentOrThrow(),
    ]);
  }

  return new Set(nodesInSelection.map((n) => ($isElementNode(n) ? n : n.getParentOrThrow())));
}

/**
 * 들여쓰기를 방지해야 하는지 여부를 판단
 * - `maxDepth`를 기준으로 선택된 리스트의 들여쓰기 깊이가 제한을 초과했는지 확인
 * - 선택된 영역이 리스트 노드 혹은 리스트 항목(ListItemNode)일 경우,
 *   해당 깊이와 최대 깊이를 비교
 * @param {number} maxDepth - 허용된 최대 리스트 들여쓰기 깊이
 * @returns {boolean} true면 들여쓰기 방지
 */
function $shouldPreventIndent(maxDepth: number): boolean {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) {
    return false;
  }

  const elementNodesInSelection: Set<ElementNode> = getElementNodesInSelection(selection);

  let totalDepth = 0;

  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth);
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent();

      if (!$isListNode(parent)) {
        throw new Error(
          'ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.',
        );
      }

      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth);
    }
  }

  return totalDepth > maxDepth;
}

/**
 * **ListMaxIndentLevelPlugin**
 * - Lexical 에디터에서 리스트의 최대 들여쓰기 깊이를 제한하는 플러그인.
 * - 설정된 `maxDepth`를 기준으로 들여쓰기를 제어하며,
 *   `INDENT_CONTENT_COMMAND` (들여쓰기 명령어)가 호출될 때 이를 제한.
 * @param {{ maxDepth?: number }} props - 플러그인 설정
 *   - maxDepth: 최대 허용 들여쓰기 깊이 (기본값: 7)
 * @returns {null} React 컴포넌트로서는 null을 반환하며 DOM에 렌더링하지 않습니다.
 */
export default function ListMaxIndentLevelPlugin({ maxDepth = 7 }: { maxDepth?: number }): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => $shouldPreventIndent(maxDepth),
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, maxDepth]);
  return null;
}
