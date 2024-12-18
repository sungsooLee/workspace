/** 트리 액션 **/
export type TreeActionType = 'MOVE' | 'COPY' | 'DROP' | 'ADD' | 'DELETE' | 'UPDATE' | 'CLICK';
export type NodeMovePositionType = 'BEFORE' | 'AFTER' | 'INSIDE';
interface BasePayload {
  treeId: string;
}

export interface MovePayload extends BasePayload {
  type: 'MOVE';
  sourceNode: TreeNode;
  targetNode: TreeNode | null;
  position: NodeMovePositionType;
  targetIndex: number;
}

export interface CopyPayload extends BasePayload {
  type: 'COPY';
  sourceNode: TreeNode;
  targetNode: TreeNode | null;
  position: NodeMovePositionType;
}

export interface AddPayload extends BasePayload {
  type: 'ADD';
  parentNode: TreeNode | null;
  newNode: Partial<TreeNode>;
}

export interface DeletePayload extends BasePayload {
  type: 'DELETE';
  nodeToDelete: TreeNode;
}

export interface UpdatePayload extends BasePayload {
  type: 'UPDATE';
  node: TreeNode;
  updates: Partial<TreeNode>;
}

export interface ClickPayload extends BasePayload {
  type: 'CLICK';
  node: TreeNode;
}

export type TreeActionPayload =
  | MovePayload
  | CopyPayload
  | AddPayload
  | DeletePayload
  | UpdatePayload
  | ClickPayload;

export interface TreeAction {
  type: TreeActionType;
  payload: TreeActionPayload;
}
///////////////////////////////

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

export interface BaseNodeData {
  id: string | number;
  title: string;
}

/**
 * 트리 노드 데이터 구조
 */
export interface TreeNode<T extends BaseNodeData = BaseNodeData> {
  key: string;
  title?: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  constraints?: NodeConstraints;
  dropPosition?: string;
  treeId?: string;
}

/**
 * 트리 Prop
 */
export interface TreeProps {
  treeId: string;
  data: TreeNode[];
  selectedKey?: string;
  expandedKeys: string[];
  setExpandedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  draggedNode: TreeNode | null;
  setDraggedNode: React.Dispatch<React.SetStateAction<TreeNode | null>>;
  onAction: (action: TreeAction) => void | Promise<void>;
}

/**
 *
 */
export interface TreeNodeComponentProps {
  node: TreeNode;
  treeId: string;
  level?: number;
  selectedNodeKey?: string;
  expandedKeys: string[];
  setExpandedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  onDragStart: (node: TreeNode) => void;
  onDrop: (dropInfo: DropInfo) => void;
  constraints?: NodeConstraints;
  isDraggable?: boolean;
  onAction: (action: TreeAction) => void | Promise<void>;
}

/**
 * dnd 정보, 위치 찾기
 */
export interface DropInfo {
  targetNode: TreeNode | null;
  dropPosition: NodeMovePositionType;
}

/**
 * 트리 커스텀 훅
 */
export interface UseTreeProps {
  initialData: TreeNode[];
  treeId?: string;
  onMove?: (
    sourceNode: TreeNode,
    targetNode: TreeNode | null,
    position: NodeMovePositionType,
    targetIndex: number,
  ) => Promise<void>;
  onCopy?: (
    sourceNode: TreeNode,
    targetNode: TreeNode | null,
    position: NodeMovePositionType,
  ) => Promise<void>;
  onAdd?: (parentNode: TreeNode | null, newNode: TreeNode) => Promise<void>;
  onDelete?: (node: TreeNode) => Promise<void>;
  onUpdate?: (node: TreeNode, updates: Partial<TreeNode>) => Promise<void>;
  onClick?: (node: TreeNode) => Promise<void>;
  onError?: (error: Error, actionType: TreeActionType) => void;
}
