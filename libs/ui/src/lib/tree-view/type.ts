export type NodeMovePositionType = 'BEFORE' | 'AFTER' | 'INSIDE';

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
}

/**
 * 이벤트별 페이로드 타입 정의
 */
export interface SelectEventPayload extends BaseEventPayload {
  type: 'NODE_SELECT';
  node: TreeNode | null;
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
  // menuId: string;
  title?: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  constraints?: NodeConstraints;
  dropPosition?: string;
  treeId?: string;
  //추후 Seq 속성 추가 될 것 같음. 해당 속성으로 무브에 대한 이벤트 targetIndex 로직 추가하면 될 것 같음.
  isUsed?: boolean;
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
  expandTrigger?: boolean;
  type?: 'default' | 'advanced';
  nodeButtons?: (node: TreeNode, level: number) => React.ReactNode;
  searchKeyword?: string;
  initExpandedKeys?: string[]; // 초기 확장된 키 (내부 상태로만 사용)
  expandedKeys?: string[]; // 외부에서 제어하는 확장된 키
  onExpandedKeysChange?: (keys: string[]) => void; // 확장된 키 변경 콜백
  onSelectedNodeChange?: (node: TreeNode) => void;
  selectedNode?: TreeNode | null;
  // 추후 제약사항 추가 될 수 있음.
}
// 드랍 위치 감지를 위한 타입
export interface IndicatorPosition {
  targetId: string | null;
  position: NodeMovePositionType;
}

export interface TreeNodeComponentProps {
  node: TreeNode;
  // treeId: string;
  level?: number;
  selectedNode?: TreeNode | null;
  expandedKeys: string[];
  setExpandedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  onDragStart: (node: TreeNode) => void;
  onDrop: (dropInfo: DropInfo) => void;
  onNodeClick?: (node: TreeNode | null) => void | Promise<void>;
  constraints?: NodeConstraints;
  isDraggable?: boolean;
  treeType?: 'default' | 'advanced';
  nodeButtons?: (node: TreeNode, level: number) => React.ReactNode;
  onToggleUsed?: (node: TreeNode, isUsed: boolean) => void;
  searchKeyword?: string;
}

/**
 * dnd 정보, 위치 찾기
 */
export interface DropInfo {
  targetNode: TreeNode | null;
  dropPosition: NodeMovePositionType;
}
