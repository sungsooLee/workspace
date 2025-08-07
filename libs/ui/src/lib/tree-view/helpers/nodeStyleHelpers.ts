import { TreeNode } from '../type';

/**
 * 노드 스타일 클래스들을 계산하는 헬퍼 함수들
 */

export interface NodeStyleParams {
  isThisNodeBeingDragged: boolean;
  isSelectedNode: boolean;
  treeType: string;
  isNodeSelected: boolean;
  shouldShowSelection: boolean;
  dropPosition: string | null;
  isValidDropPosition: () => boolean;
  node: TreeNode;
  isInvalidDropTarget: boolean;
  isMaxDepthExceeded: boolean;
  isCustomValidatorBlocked: boolean;
  isCustomValidatorGrayedOut: boolean;
  shouldCollapseForSameLevel: boolean;
  hasSearchMatch: boolean;
}

export const calculateNodeStyle = (params: NodeStyleParams): string => {
  const {
    isThisNodeBeingDragged,
    isSelectedNode,
    treeType,
    isNodeSelected,
    shouldShowSelection,
    dropPosition,
    isValidDropPosition,
    node,
    isInvalidDropTarget,
    isMaxDepthExceeded,
    isCustomValidatorBlocked,
    isCustomValidatorGrayedOut,
    shouldCollapseForSameLevel,
    hasSearchMatch,
  } = params;

  const styles: string[] = [];

  // 드래그 중인 노드 스타일
  if (isThisNodeBeingDragged) {
    styles.push('opacity-80 bg-blue-100 border-2 border-blue-400 shadow-md');
  }

  // 선택된 노드 스타일
  if (isSelectedNode) {
    styles.push('bg-[var(--secondary5)]');
  }

  // 셔틀 리스트 선택 스타일
  if (treeType === 'SHUTTLE_LIST' && isNodeSelected) {
    styles.push('bg-[var(--secondary5)]');
  }

  // 표시할 선택 스타일
  if (shouldShowSelection) {
    styles.push('bg-[var(--secondary5)]');
  }

  // 드롭 인사이드 스타일
  if (dropPosition === 'INSIDE') {
    styles.push(isValidDropPosition() ? 'bg-blue-50' : 'bg-red-50');
  }

  // 제약 조건 스타일
  if (node.constraints?.drag === false) {
    styles.push('border-l-4 border-red-300');
  }
  if (node.constraints?.drop === false) {
    styles.push('border-l-4 border-yellow-300');
  }
  if (node.constraints?.drag === false && node.constraints?.drop === false) {
    styles.push('bg-gray-50');
  }
  if (node.constraints?.drag === false || node.constraints?.drop === false) {
    styles.push('opacity-75');
  }

  // 유효하지 않은 드롭 대상 스타일
  if (isInvalidDropTarget) {
    styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
  }

  // 최대 깊이 초과 스타일
  if (isMaxDepthExceeded) {
    styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
  }

  // 커스텀 검증 차단 스타일
  if (isCustomValidatorBlocked) {
    styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
  }

  // 커스텀 검증 회색 처리 스타일
  if (isCustomValidatorGrayedOut) {
    styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
  }

  // 같은 레벨 축소 스타일
  if (shouldCollapseForSameLevel) {
    styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
  }

  // 검색 매치 스타일
  if (hasSearchMatch) {
    styles.push('bg-yellow-50');
  }

  return styles.join(' ');
};

/**
 * 키보드 네비게이션을 위한 헬퍼 함수들
 */

export const focusTreeItem = (selector: string): void => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) element.focus();
};

export const focusNextTreeItem = (currentNodeKey: string): void => {
  const allTreeItems = document.querySelectorAll('[role="treeitem"]');
  const currentIndex = Array.from(allTreeItems).findIndex(
    (item) => item.getAttribute('data-node-key') === currentNodeKey,
  );

  if (currentIndex < allTreeItems.length - 1) {
    (allTreeItems[currentIndex + 1] as HTMLElement).focus();
  }
};

export const focusPreviousTreeItem = (currentNodeKey: string): void => {
  const allTreeItems = document.querySelectorAll('[role="treeitem"]');
  const currentIndex = Array.from(allTreeItems).findIndex(
    (item) => item.getAttribute('data-node-key') === currentNodeKey,
  );

  if (currentIndex > 0) {
    (allTreeItems[currentIndex - 1] as HTMLElement).focus();
  }
};

export const focusFirstTreeItem = (): void => {
  focusTreeItem('[role="treeitem"]');
};

export const focusLastTreeItem = (): void => {
  const allTreeItems = document.querySelectorAll('[role="treeitem"]');
  const lastTreeItem = allTreeItems[allTreeItems.length - 1] as HTMLElement;
  if (lastTreeItem) lastTreeItem.focus();
};

/**
 * 접근성 관련 헬퍼 함수들
 */

export const getAriaLabel = (node: TreeNode, hasChildren: boolean): string => {
  const baseLabel = node.title || '';
  const childrenInfo = hasChildren ? `, ${node.children!.length}개의 자식 항목` : '';
  return `${baseLabel}${childrenInfo}`;
};

export const getAriaDescription = (
  level: number,
  hasChildren: boolean,
  isExpanded: boolean,
  isDraggable: boolean,
  node: TreeNode,
): string => {
  const levelInfo = `레벨 ${level + 1}`;
  const expandInfo = hasChildren
    ? `확장 가능, ${isExpanded ? '확장됨' : '축소됨'}, ${node.children!.length}개의 자식 항목`
    : '리프 노드';
  const dragInfo = isDraggable ? ', 드래그 가능' : '';
  const constraintInfo =
    (node.constraints?.drag === false ? ', 드래그 제한됨' : '') +
    (node.constraints?.drop === false ? ', 드롭 제한됨' : '');

  return `${levelInfo}, ${expandInfo}${dragInfo}${constraintInfo}`;
};
