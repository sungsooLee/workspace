import { EnhancedTreeNode } from './type';
import { COLORS, EASING, CSS_CLASSES, ANIMATION_DURATIONS } from './constants/treeConstants';

/**
 * 검색어에 따라 노드의 가시성을 업데이트합니다.
 */
export const updateNodeVisibility = (nodes: EnhancedTreeNode[], searchKeyword: string): void => {
  nodes.forEach((node) => {
    if (!searchKeyword) {
      node._visible = true;
    } else {
      const hasMatch = node.title
        ? node.title.toLowerCase().includes(searchKeyword.toLowerCase())
        : false;
      const hasVisibleChildren = node.children
        ? node.children.some((child) => checkNodeVisibility(child, searchKeyword))
        : false;
      node._visible = hasMatch || hasVisibleChildren;
    }

    if (node.children) {
      updateNodeVisibility(node.children, searchKeyword);
    }
  });
};

/**
 * 노드가 검색 조건에 맞는지 확인합니다.
 */
const checkNodeVisibility = (node: EnhancedTreeNode, searchKeyword: string): boolean => {
  const hasMatch = node.title
    ? node.title.toLowerCase().includes(searchKeyword.toLowerCase())
    : false;
  const hasVisibleChildren = node.children
    ? node.children.some((child) => checkNodeVisibility(child, searchKeyword))
    : false;
  return hasMatch || hasVisibleChildren;
};

/**
 * 드롭존 스타일을 위한 유틸리티 함수들
 */

export const getDropZoneBackground = (isHovered: boolean, isValid: boolean): string => {
  if (isHovered && isValid) {
    return `linear-gradient(135deg, rgba(${COLORS.primaryRgb}, 0.08), rgba(${COLORS.primaryRgb}, 0.15), rgba(${COLORS.primaryRgb}, 0.08))`;
  }
  if (isHovered && !isValid) {
    return `linear-gradient(135deg, rgba(${COLORS.errorRgb}, 0.08), rgba(${COLORS.errorRgb}, 0.15), rgba(${COLORS.errorRgb}, 0.08))`;
  }
  return 'transparent';
};

export const getDropZoneBorder = (isHovered: boolean, isValid: boolean): string => {
  if (isHovered && isValid) return `2px dashed ${COLORS.primary}`;
  if (isHovered && !isValid) return `2px dashed ${COLORS.error}`;
  return '1px dashed transparent';
};

export const getDropZoneTransform = (isHovered: boolean, isValid: boolean): string => {
  if (!isValid) return 'scaleY(0)';
  if (isHovered && isValid) return 'scaleY(1.15) translateY(-1px)';
  if (isHovered && !isValid) return 'scaleY(1.05)';
  return 'scaleY(1)';
};

export const getDropZoneBoxShadow = (isHovered: boolean, isValid: boolean): string => {
  if (isHovered && isValid) return `0 4px 15px rgba(${COLORS.primaryRgb}, 0.2)`;
  if (isHovered && !isValid) return `0 2px 8px rgba(${COLORS.errorRgb}, 0.2)`;
  return 'none';
};

export const getDropZoneGuideTextColor = (isValid: boolean): string => {
  return isValid ? COLORS.primary : COLORS.error;
};

export const getDropZoneGuideText = (
  position: 'BEFORE' | 'AFTER' | 'INSIDE',
  isValid: boolean,
): string => {
  if (!isValid) return '드롭 불가능';

  switch (position) {
    case 'BEFORE':
    case 'AFTER':
      return '여기에 드롭';
    case 'INSIDE':
      return '자식으로 추가';
    default:
      return '';
  }
};

/**
 * 노드 스타일 관련 유틸리티
 */

export const getInsideDropBackground = (isHovered: boolean, isValid: boolean): string => {
  if (isHovered && isValid) {
    return `linear-gradient(135deg, rgba(${COLORS.primaryRgb}, 0.08), rgba(${COLORS.primaryRgb}, 0.15), rgba(${COLORS.primaryRgb}, 0.08))`;
  }
  if (isHovered && !isValid) {
    return `linear-gradient(135deg, rgba(${COLORS.errorRgb}, 0.08), rgba(${COLORS.errorRgb}, 0.12), rgba(${COLORS.errorRgb}, 0.08))`;
  }
  return '';
};

export const getInsideDropBorder = (isHovered: boolean, isValid: boolean): string => {
  if (isHovered && isValid) return `3px dashed ${COLORS.primary}`;
  if (isHovered && !isValid) return `3px dashed ${COLORS.error}`;
  return '2px solid transparent';
};

export const getInsideDropTransform = (isHovered: boolean, isValid: boolean): string => {
  if (isHovered && isValid) return 'translateY(-2px) scale(1.01)';
  if (isHovered && !isValid) return 'translateY(0) scale(0.99)';
  return 'translateY(0) scale(1)';
};

export const getInsideDropBoxShadow = (isHovered: boolean, isValid: boolean): string => {
  if (isHovered && isValid) {
    return `0 8px 25px rgba(${COLORS.primaryRgb}, 0.3), 0 4px 15px rgba(${COLORS.primaryRgb}, 0.2)`;
  }
  if (isHovered && !isValid) {
    return `0 4px 15px rgba(${COLORS.errorRgb}, 0.2)`;
  }
  return 'none';
};

/**
 * 애니메이션 클래스 이름들
 */
export const ANIMATION_CLASSES = {
  dragLiftStart: CSS_CLASSES.dragLiftStart,
  enhancedSuccessDrop: CSS_CLASSES.enhancedSuccessDrop,
  invalidDropZone: CSS_CLASSES.invalidDropZone,
  guideHintFloat: 'guideHintFloat',
  dropLinePulse: 'dropLinePulse',
} as const;

/**
 * 트랜지션 설정
 */
export const TRANSITIONS = {
  dropZone: `all ${ANIMATION_DURATIONS.transition}ms ${EASING.default}`,
  node: `all ${ANIMATION_DURATIONS.transition}ms ${EASING.default}`,
} as const;

/**
 * 드롭존 높이 설정
 */
export const DROP_ZONE_HEIGHTS = {
  default: '20px',
  hovered: '24px',
  hidden: '0px',
} as const;
