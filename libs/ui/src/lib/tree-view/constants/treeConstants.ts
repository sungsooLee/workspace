/**
 * 트리 컴포넌트에서 사용하는 상수들
 */

// 레벨별 들여쓰기 상수
export const LEVEL_INDENT = 28;

// 트리 노드 최소 높이
export const MIN_NODE_HEIGHT = 40;

// 드롭존 높이 설정
export const DROP_ZONE_HEIGHTS = {
  default: 20,
  hovered: 24,
  hidden: 0,
  globalBottom: {
    default: 40,
    hovered: 72,
  },
} as const;

// 애니메이션 지속 시간
export const ANIMATION_DURATIONS = {
  dragLift: 300,
  successDrop: 800,
  transition: 300,
  guideHint: 300,
  dropLinePulse: 1000,
  successWave: 2000,
  floatAnimation: 2000,
} as const;

// 색상 상수
export const COLORS = {
  primary: '#2196f3',
  primaryRgb: '33, 150, 243',
  error: '#ef4444',
  errorRgb: '239, 68, 68',
  success: '#4caf50',
  successRgb: '76, 175, 80',
  warning: '#ff9800',
  warningRgb: '255, 152, 0',
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
} as const;

// Z-index 레이어
export const Z_INDEX = {
  dropZone: 20,
  dropZoneActive: 15,
  nodeContent: 10,
  dragOverlay: 10000,
  guideHint: 1000,
  accessibilityContent: 100,
} as const;

// 트랜지션 이징
export const EASING = {
  default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
} as const;

// 키보드 키 코드
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  ESCAPE: 'Escape',
} as const;

// 드래그 센서 설정
export const DRAG_SENSOR_CONFIG = {
  mouse: {
    activationConstraint: {
      distance: 8,
    },
  },
  touch: {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  },
} as const;

// 스켈레톤 기본 설정
export const SKELETON_CONFIG = {
  defaultNodeCount: 5,
  animationDuration: '1.5s',
} as const;

// 검색 관련 설정
export const SEARCH_CONFIG = {
  highlightColor: 'yellow',
  noResultsMessage: '검색 결과가 없습니다',
} as const;

// 접근성 관련 설정
export const ACCESSIBILITY = {
  roles: {
    tree: 'tree',
    treeItem: 'treeitem',
  },
  ariaAttributes: {
    multiselectable: false,
    expanded: 'aria-expanded',
    level: 'aria-level',
    selected: 'aria-selected',
    describedBy: 'aria-describedby',
    label: 'aria-label',
  },
  instructions: '방향키로 노드를 탐색하고, Enter나 스페이스바로 선택하며, 좌우 방향키로 확장/축소할 수 있습니다. Home과 End 키로 처음과 끝으로 이동합니다.',
} as const;

// CSS 클래스 이름
export const CSS_CLASSES = {
  treeWrap: 'tree_wrap',
  tree: 'tree',
  treeItem: 'tree_item',
  treeInner: 'tree_inner',
  treeChildren: 'tree_children',
  treeMenu: 'tree_menu',
  folderWrap: 'folder_wrap',
  dragWrap: 'drag_wrap',
  btnArea: 'btn_area',
  nodeTitle: 'node_title',
  hasChildren: 'has_children',
  draggableHint: 'draggable-hint',
  enhancedHover: 'enhanced-hover',
  dragNodeImage: 'drag-node-image',
  invalidDropZone: 'invalid-drop-zone',
  enhancedSuccessDrop: 'enhanced-success-drop',
  dragLiftStart: 'drag-lift-start',
  dropZoneActive: 'drop-zone-active',
} as const;