export type TreeActionType = 'MOVE' | 'COPY' | 'DROP' | 'ADD' | 'DELETE' | 'UPDATE' | 'CLICK';

export interface NodeConstraints {
  add?: boolean;
  delete?: boolean;
  edit?: boolean;
  drag?: boolean;
  drop?: boolean;
}

export interface TreeAction {
  type: 'MOVE' | 'COPY' | 'DROP' | 'ADD' | 'DELETE' | 'UPDATE' | 'CLICK';
  payload: {
    treeId: string;
    sourceNode?: TreeNode;
    targetNode?: TreeNode | null;
    position?: 'before' | 'after' | 'inside';
    sourceTreeId?: string;

    parentNode?: TreeNode;
    newNode?: Partial<TreeNode>;

    node?: TreeNode;
    updates?: Partial<TreeNode>;

    targetIndex?: number;
    nodeToDelete?: TreeNode;
  };
}

export interface TreeNode {
  key: string;
  title?: string;
  children?: TreeNode[];
  parent?: TreeNode;
  isFolder?: boolean;
  isExpanded?: boolean;
  constraints?: NodeConstraints;
  dropPosition?: string;
  sequence?: number;
  sourceTreeId?: string;
}

export interface TreeProps {
  treeId: string;
  data: TreeNode[];
  selectedKey?: string;
  onDataChange?: (newData: TreeNode[]) => void;
  expandedKeys: string[];
  setExpandedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  onNodeCopy?: (
    sourceNode: TreeNode,
    targetKey: string,
    index: number,
    position?: string,
  ) => Promise<boolean>;
  draggedNode: { node: TreeNode; sourceTreeId: string } | null;
  setDraggedNode: React.Dispatch<
    React.SetStateAction<{ node: TreeNode; sourceTreeId: string } | null>
  >;
  onAction?: any; //TODO: 타입 지정 필요
}

export interface TreeNodeComponentProps {
  node: TreeNode;
  treeId?: string;
  level?: number;
  selectedNodeKey?: string;
  expandedKeys: string[];
  setExpandedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  onDragStart: (node: TreeNode) => void;
  onDrop: (dropInfo: DropInfo) => void;
  constraints?: NodeConstraints;
  isDraggable?: boolean;
  onAction: any; //TODO: 타입 지정 필요
}

export interface DropInfo {
  targetNode: TreeNode | null;
  dropPosition: 'before' | 'after' | 'inside';
}

export interface MoveNodePayload {
  nodeKey: string; // 이동하는 노드의 키
  targetKey: string; // 위치하려는 노드의 키
  sequence: number; // 순서
}
