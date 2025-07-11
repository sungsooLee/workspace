export type NodeMovePositionType = 'BEFORE' | 'AFTER' | 'INSIDE';
export type TreeType =
  | 'DEFAULT'
  | 'DRAG_DROP'
  | 'SHUTTLE_LIST'
  | 'SAME_LEVEL_ONLY' // 같은 레벨 내에서만 이동 가능
  | 'SAME_PARENT_ONLY' // 같은 부모 내에서만 순서 변경 가능
  | 'TREE_TO_TREE'; // 트리 - 트리 타입

/**
 * 노드 제약 사항
 */
export interface NodeConstraints {
  add?: boolean;
  delete?: boolean;
  edit?: boolean;
  drag?: boolean;
  drop?: boolean;
}

export type TreeEventType =
  | 'NODE_SELECT' // 노드 선택
  | 'NODE_MOVE' // 같은 트리 내 이동
  | 'NODE_COPY' // 다른 트리로 복사
  | 'NODE_ADD' // 노드 추가
  | 'NODE_DELETE' // 노드 삭제
  | 'NODE_EDIT' // 노드 수정
  | 'NODE_EXPAND' // 노드 펼치기
  | 'NODE_COLLAPSE'; // 노드 접기

/**
 * 트리 이벤트 페이로드의 기본 구조
 */
interface BaseEventPayload {
  treeId: string;
  sourceTreeId?: string | null;
}

export interface MoveEventPayload extends BaseEventPayload {
  type: 'NODE_MOVE';
  sourceNode: TreeNode;
  targetNode: TreeNode | null;
  position: NodeMovePositionType;
  // updateNodes: TreeNode[];
  targetIndex?: number;
}

export interface CopyEventPayload extends BaseEventPayload {
  type: 'NODE_COPY';
  sourceNode: TreeNode;
  targetNode: TreeNode | null;
  position: NodeMovePositionType;
  targetIndex?: number;
}

export interface AddEventPayload extends BaseEventPayload {
  type: 'NODE_ADD';
  parentNode: TreeNode | null;
  newNode: TreeNode;
}

export interface DeleteEventPayload extends BaseEventPayload {
  type: 'NODE_DELETE';
  node: TreeNode;
}

export interface EditEventPayload extends BaseEventPayload {
  type: 'NODE_EDIT';
  node: TreeNode;
  newTitle: string;
}

export interface ExpandEventPayload extends BaseEventPayload {
  type: 'NODE_EXPAND';
  node: TreeNode;
}

export interface CollapseEventPayload extends BaseEventPayload {
  type: 'NODE_COLLAPSE';
  node: TreeNode;
}

/**
 * 모든 이벤트 페이로드 타입 통합
 */
export type TreeEventPayload =
  | SelectEventPayload
  | MoveEventPayload
  | CopyEventPayload
  | AddEventPayload
  | DeleteEventPayload
  | EditEventPayload
  | ExpandEventPayload
  | CollapseEventPayload;

/**
 * 트리 노드 데이터 구조
 */
export interface TreeNode {
  key: string;
  menuId?: string;
  title?: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  constraints?: NodeConstraints;
  dropPosition?: string;
  treeId?: string;
  isUsed?: boolean;
  level?: number;
  apiNodeType?: string;
  maxDepth?: number;
  [key: string]: any;
}

// 검색을 추가하면서 검색 결과에 따라 표시 결정 여부 속성 추가
export interface EnhancedTreeNode extends TreeNode {
  _visible?: boolean;
  children?: EnhancedTreeNode[];
}

/**
 * 트리 Prop
 */
export interface TreeProps {
  treeId: string;
  data: TreeNode[];
  onAction?: (payload: TreeEventPayload) => void;
  onApiCallback?: (payload: ApiCallbackPayload) => Promise<boolean>; // API 호출을 위한 콜백 추가
  expandTrigger?: boolean;
  type?: TreeType;
  nodeButtons?: (node: TreeNode, level: number) => React.ReactNode;
  searchKeyword?: string;
  initExpandedKeys?: string[]; // 초기 확장된 키 (내부 상태로만 사용)
  expandedKeys?: string[]; // 외부에서 제어하는 확장된 키
  onExpandedKeysChange?: (keys: string[]) => void; // 확장된 키 변경 콜백
  onSelectedNodeChange?: (node: TreeNode) => void;
  selectedNode?: TreeNode | null;
  onCustomNodeClick?: (node: TreeNode) => void;
  clientTree?: boolean;
  shouldDisableClick?: (node: TreeNode, level: number) => boolean;
  selectedItems?: string[]; // 선택된 아이템들의 키 배열
  sourceTreeId?: string;
  maxDepth?: number; // 최대 Depth
  isSelectableNode?: (node: TreeNode) => boolean;
  customDropValidator?: CustomDropValidator; // 커스텀 드랍 유효성 체크 - 사용하는 쪽에서 제약 추가를 위해 추가함.
  minDraggableLevel?: number; // 드래그 가능한 최소 레벨 정의
  moveIcon?: boolean; // 셔틀트리에서 사용하는 무브 아이콘 사용 여부
  isLoading?: boolean; // 로딩 상태 표시
  skeletonNodeCount?: number; // 스켈레톤 노드 개수 (기본값: 5)
  emptyMessage?: string; // 데이터가 없을 때 표시할 메시지
  disableOptimisticUpdate?: boolean; // 낙관적 업데이트 플래그
}
// 드랍 위치 감지를 위한 타입
export interface IndicatorPosition {
  targetId: string | null;
  position: NodeMovePositionType;
}

export interface NodeMoveEventPayload extends BaseEventPayload {
  type: 'NODE_MOVE' | 'NODE_COPY';
  sourceNode: TreeNode;
  targetNode: TreeNode | null;
  position: NodeMovePositionType;
  treeId: string;
}

export interface SelectEventPayload extends BaseEventPayload {
  type: 'NODE_SELECT';
  node: TreeNode;
}

export interface ApiCallbackPayload extends BaseEventPayload {
  type: string;
  sourceNode: TreeNode;
  targetNode: TreeNode | null;
  position: NodeMovePositionType;
  treeId: string;
  targetIndex?: number;
  targetParentKey?: string | null;
  sourceTreeId?: string;
}

export type TreeActionPayload = NodeMoveEventPayload | SelectEventPayload | ApiCallbackPayload;

export interface TreeNodeComponentProps {
  node: TreeNode;
  treeId: string;
  level?: number;
  selectedNode?: TreeNode | null;
  expandedKeys: string[];
  setExpandedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  onDragStart?: (node: TreeNode) => void;
  onDrop: (dropInfo: DropInfo) => void;
  onNodeClick?: (node: TreeNode | null) => void | Promise<void>;
  constraints?: NodeConstraints;
  isDraggable?: boolean;
  treeType?: TreeType;
  nodeButtons?: (node: TreeNode, level: number) => React.ReactNode;
  onToggleUsed?: (node: TreeNode, isUsed: boolean) => void;
  searchKeyword?: string;
  draggedNodeKey?: string | null;
  activeId?: string | null;
  isDropTarget?: boolean;
  dropPosition?: any;
  draggedNode?: TreeNode | null; // 드래그 중인 노드 객체 전달
  onCustomNodeClick?: (node: TreeNode) => void;
  size?: string;
  className?: string;
  treeContext?: any;
  shouldDisableClick?: (node: TreeNode, level: number) => boolean;
  selectedItems?: string[]; // 선택된 아이템들의 키 배열
  sourceTreeId?: string;
  maxDepth?: number; // 최대 뎁스
  customDropValidator?: CustomDropValidator;
}

/**
 * dnd 정보, 위치 찾기
 */
export interface DropInfo {
  targetNode: TreeNode | null;
  dropPosition: NodeMovePositionType;
  sourceNode?: TreeNode | null;
}

/**
 * TreeBox 컴포넌트 Props
 */
export interface TreeBoxProps extends Omit<TreeProps, 'expandedKeys' | 'onExpandedKeysChange'> {
  showSearchKeyword?: boolean;
  showSearchLabel?: string;
  initLevel?: number;
  closeLevel?: number;
  title?: string;
  renderNodeButtons?: (node: TreeNode, level: number) => React.ReactNode;
  handleSelectedNodeChange?: (node: TreeNode) => void;
  customButtonNode?: React.ReactNode;
  showTotalCount?: boolean;

  // 확장된 키 관리 (외부에서 제어할 때만 사용)
  expandedKeys?: string[];
  onExpandedKeysChange?: (keys: string[]) => void;
}

export type CustomDropValidator = (params: {
  sourceNode: TreeNode;
  targetNode: TreeNode;
  dropPosition: NodeMovePositionType;
  level: number;
  treeData?: TreeNode[];
}) => boolean;

/**
 * 드래그 데이터 인터페이스
 */
export interface DragData {
  id: string;
  node: TreeNode;
  level: number;
}

/**
 * 드롭존 데이터 인터페이스
 */
export interface DropZoneData {
  id: string;
  node: TreeNode;
  level: number;
  position: NodeMovePositionType;
  treeId: string;
}

/**
 * DndTreeNode 컴포넌트 Props
 */
export interface DndTreeNodeProps {
  node: EnhancedTreeNode;
  level: number;
  expandedKeys: string[];
  setExpandedKeys: (keys: string[] | ((prev: string[]) => string[])) => void;
  selectedNode?: TreeNode | null;
  onNodeClick?: (node: TreeNode | null) => void;
  nodeButtons?: (node: TreeNode, level: number) => React.ReactNode;
  searchKeyword?: string;
  onCustomNodeClick?: (node: TreeNode) => void;
  shouldDisableClick?: (node: TreeNode, level: number) => boolean;
  selectedItems?: string[];
  sourceTreeId?: string;
  treeId: string;
  treeType?: string;
  isDraggable: boolean;
  maxDepth?: number;
  customDropValidator?: (params: any) => boolean;
  draggedNode?: TreeNode | null;
  draggedNodeKey?: string | null;
  minDraggableLevel?: number;
  moveIcon?: boolean;
  isFirstSibling?: boolean;
}
