import { insertNodeAtPosition, removeNodeByKey } from './tree.service';
import { updateNodeVisibility } from './dnd-tree-utils';

export interface OptimisticUpdateOptions {
  actionType: 'NODE_MOVE' | 'NODE_COPY';
  sourceNode: any;
  targetNode: any;
  dropPosition: 'BEFORE' | 'AFTER' | 'INSIDE';
  isSearching?: boolean;
  searchKeyword?: string;
}

export interface OptimisticUpdateResult {
  newTreeData: any[];
  newInitialData: any[];
}

export function optimisticallyUpdateTree(
  treeData: any[],
  options: OptimisticUpdateOptions,
): OptimisticUpdateResult {
  const { actionType, sourceNode, targetNode, dropPosition, isSearching, searchKeyword } = options;

  if (!treeData || !sourceNode || !targetNode) {
    return {
      newTreeData: treeData,
      newInitialData: treeData,
    };
  }

  let newTreeData = [...treeData];

  if (actionType === 'NODE_MOVE') {
    newTreeData = removeNodeByKey(newTreeData, sourceNode.key);
  }

  newTreeData = insertNodeAtPosition(newTreeData, targetNode.key, sourceNode, dropPosition);

  if (isSearching && searchKeyword) {
    updateNodeVisibility(newTreeData, searchKeyword);
  }

  const updatedInitialData = JSON.parse(JSON.stringify(newTreeData));
  const fullData = JSON.parse(JSON.stringify(updatedInitialData));
  updateNodeVisibility(fullData, '');

  return {
    newTreeData,
    newInitialData: fullData,
  };
}
