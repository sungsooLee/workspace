export interface NodeConstraints {
  maxDepth?: number;
  add?: boolean;
  delete?: boolean;
  edit?: boolean;
  drag?: boolean;
  drop?: boolean;
  allowedChildTypes?: string[];
}

export interface NodeStyle {
  className?: string;
  icon?: React.ReactNode;
  background?: string;
  textColor?: string;
  borderColor?: string;
  hoverStyle?: string;
  selectedStyle?: string;
}

export interface NodeIcon {
  name?: string;
  customIcon?: string;
  className?: string;
  color?: string;
  constraints?: NodeConstraints;
  style?: NodeStyle;
}

export interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
  parent?: TreeNode;
  isFolder?: boolean;
  icon?: NodeIcon;
  isExpanded?: boolean;
  constraints?: NodeConstraints;
}

export interface TreeViewProps {
  data: TreeNode[];
  selectedKey?: string;
  onNodeClick?: (node: TreeNode) => void;
  onDataChange?: (newData: TreeNode[]) => void;
  expandedKeys: string[];
  setExpandedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  maxDepth?: number;
}

export interface TreeNodeComponentProps {
  node: TreeNode;
  level?: number;
  selectedNodeKey?: string;
  expandedKeys: string[];
  setExpandedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  onDragStart: (node: TreeNode) => void;
  onDrop: (node: TreeNode | null) => void;
  onNodeClick?: (node: TreeNode) => void;
  maxDepth?: number;
  constraints?: NodeConstraints;
  defaultStyle?: NodeStyle;
  isDraggable?: boolean;
}
