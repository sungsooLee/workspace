import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ApiCallbackPayload,
  DropInfo,
  EnhancedTreeNode,
  SelectEventPayload,
  TreeNode,
  TreeProps,
  TreeType,
} from './type';
import {
  findNodeByKey,
  findNodePath,
  getNodeLevel,
  insertNodeAtPosition,
  isValidDrop,
  removeNodeByKey,
} from './tree.service';
import { useTreeContext } from './tree.context';
import { FilteredTreeNode } from './tree-node';

const TreeView3 = ({
  treeId,
  data,
  onAction,
  onApiCallback,
  expandTrigger,
  type = 'DEFAULT',
  nodeButtons,
  searchKeyword,
  selectedNode: externalSelectedNode,
  initExpandedKeys = [],
  expandedKeys: externalExpandedKeys,
  onExpandedKeysChange,
  onSelectedNodeChange,
}: TreeProps) => {
  // Initialize states
  const [initialData, setInitialData] = useState<EnhancedTreeNode[]>(
    JSON.parse(JSON.stringify(data)),
  );
  const [treeData, setTreeData] = useState<EnhancedTreeNode[]>(JSON.parse(JSON.stringify(data)));
  const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);
  const [internalSelectedNode, setInternalSelectedNode] = useState<TreeNode | null>(null);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(initExpandedKeys);
  const [originalExpandedKeys, setOriginalExpandedKeys] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [draggedNodeKey, setDraggedNodeKey] = useState<string | null>(null);

  // Use external selected node if provided
  useEffect(() => {
    if (externalSelectedNode !== undefined) {
      setInternalSelectedNode(externalSelectedNode);
    }
  }, [externalSelectedNode]);

  const selectedNode =
    externalSelectedNode !== undefined ? externalSelectedNode : internalSelectedNode;

  // Handle expanded keys (internal or external)
  const expandedKeys = externalExpandedKeys || internalExpandedKeys;
  const setExpandedKeys = useCallback(
    (keys: string[] | ((prev: string[]) => string[])) => {
      const newKeys = typeof keys === 'function' ? keys(expandedKeys) : keys;
      setInternalExpandedKeys(newKeys);
      if (onExpandedKeysChange) {
        onExpandedKeysChange(newKeys);
      }
    },
    [expandedKeys, onExpandedKeysChange],
  );

  // Tree context for drag state
  const treeContext = useTreeContext();
  const [internalDragState, setInternalDragState] = useState<{
    node: TreeNode | null;
    sourceTreeId: string | null;
  }>({
    node: null,
    sourceTreeId: null,
  });

  const dragState = treeContext ? treeContext.dragState : internalDragState;
  const setDragState = treeContext ? treeContext.setDragState : setInternalDragState;

  // Update node visibility for search
  const updateNodeVisibility = useCallback(
    (nodes: EnhancedTreeNode[], keyword: string): boolean => {
      let hasVisibleNodes = false;

      for (const node of nodes) {
        // Check direct match
        const nodeMatch = keyword
          ? node.title && node.title.toLowerCase().includes(keyword.toLowerCase())
          : true;

        // Check children matches
        let childrenMatch = false;
        if (node.children && node.children.length > 0) {
          childrenMatch = updateNodeVisibility(node.children, keyword);
        }

        // Show if this node or children match
        node._visible = nodeMatch || childrenMatch || !keyword;
        hasVisibleNodes = hasVisibleNodes || node._visible;
      }

      return hasVisibleNodes;
    },
    [],
  );

  // Update initial data when external data changes
  useEffect(() => {
    setInitialData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  // Handle search keyword changes
  useEffect(() => {
    const handleSearchChange = () => {
      // If no search keyword, show all nodes
      if (!searchKeyword) {
        if (isSearching) {
          const currentTreeData = JSON.parse(JSON.stringify(initialData));
          updateNodeVisibility(currentTreeData, '');
          setTreeData(currentTreeData);

          // Restore original expanded state
          setTimeout(() => {
            setExpandedKeys([...originalExpandedKeys]);
          }, 10);
          setIsSearching(false);
        }
        return;
      }

      // Save expanded state when starting search
      if (!isSearching) {
        setOriginalExpandedKeys([...expandedKeys]);
        setIsSearching(true);
      }

      // Update node visibility based on search
      const newTreeData = JSON.parse(JSON.stringify(initialData));
      const hasResults = updateNodeVisibility(newTreeData, searchKeyword);
      setTreeData(newTreeData);

      if (hasResults) {
        // Expand all parent nodes of matching nodes
        const newExpandedKeys = new Set<string>();

        const collectParentKeys = (nodes: EnhancedTreeNode[], parentKeys: string[] = []): void => {
          for (const node of nodes) {
            const currentPath = [...parentKeys, node.key];

            // If node matches search, add all parent keys
            if (
              node._visible &&
              node.title &&
              node.title.toLowerCase().includes(searchKeyword.toLowerCase())
            ) {
              parentKeys.forEach((key) => newExpandedKeys.add(key));
            }

            // If children are visible, expand this node
            if (node.children && node.children.some((child) => child._visible)) {
              newExpandedKeys.add(node.key);
              collectParentKeys(node.children, currentPath);
            }
          }
        };

        collectParentKeys(newTreeData);
        setExpandedKeys([...newExpandedKeys]);
      }
    };

    handleSearchChange();
  }, [
    searchKeyword,
    initialData,
    isSearching,
    originalExpandedKeys,
    updateNodeVisibility,
    expandedKeys,
  ]);

  // Sync tree data when initial data changes
  useEffect(() => {
    const refreshedData = JSON.parse(JSON.stringify(initialData));

    if (isSearching && searchKeyword) {
      updateNodeVisibility(refreshedData, searchKeyword);
    } else {
      updateNodeVisibility(refreshedData, '');
    }

    setTreeData(refreshedData);
  }, [initialData, isSearching, searchKeyword, updateNodeVisibility]);

  // Helper function to get all node keys
  // Get all node keys for expand/collapse functionality
  const getAllNodeKeysFromTree = useCallback((nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllNodeKeysFromTree(node.children));
      }
      return keys;
    }, []);
  }, []);

  // Handle expand trigger
  useEffect(() => {
    if (expandTrigger !== undefined && !isSearching) {
      const newExpandedKeys = expandTrigger ? getAllNodeKeysFromTree(treeData) : [];
      setExpandedKeys(newExpandedKeys);
      setOriginalExpandedKeys(newExpandedKeys);
    }
  }, [expandTrigger, getAllNodeKeysFromTree, treeData, isSearching, setExpandedKeys]);

  // Handle drop events
  const handleDrop = async (dropInfo: DropInfo) => {
    console.log('TreeView handleDrop:', dropInfo);

    const sourceNode = dropInfo.sourceNode;

    if (!sourceNode) {
      console.warn('No source node information in drop event');
      return;
    }

    // Use the dragged node from the drop info if available, or from drag state as backup
    const nodeToMove = sourceNode || dragState.node;

    if (!nodeToMove) {
      console.warn('No node to move available');
      return;
    }

    const { targetNode, dropPosition } = dropInfo;

    // Determine if we're moving within the same tree or copying between trees
    const actionType = dragState.sourceTreeId === treeId ? 'NODE_MOVE' : 'NODE_COPY';

    console.log(
      'Action type:',
      actionType,
      'Source tree:',
      dragState.sourceTreeId,
      'Current tree:',
      treeId,
    );

    // Validate drop based on tree type
    if (targetNode && !isValidDrop(nodeToMove.key, targetNode.key, treeData, dropPosition, type)) {
      console.log('Drop validation failed');
      return;
    }

    // Prevent duplicates when copying
    if (actionType === 'NODE_COPY' && findNodePath(treeData, nodeToMove.key)) {
      alert('This node already exists in the tree.');
      return;
    }

    // Prevent drops to root level except INSIDE
    if (targetNode && getNodeLevel(treeData, targetNode.key) === 0 && dropPosition !== 'INSIDE') {
      return;
    }

    // Call API if provided
    if (onApiCallback) {
      try {
        const apiPayload: ApiCallbackPayload = {
          type: actionType,
          sourceNode: nodeToMove,
          targetNode: targetNode,
          position: dropPosition,
          treeId,
        };

        // Wait for API result
        const success = await onApiCallback(apiPayload);

        // Stop if API failed
        if (!success) {
          return;
        }
      } catch (error) {
        console.error('API call error:', error);
        return;
      }
    }

    // Update UI
    let newTreeData = [...treeData];

    // Remove node from source if moving
    if (actionType === 'NODE_MOVE') {
      newTreeData = removeNodeByKey(newTreeData, nodeToMove.key);
    }

    // Insert at new position
    if (targetNode) {
      newTreeData = insertNodeAtPosition(newTreeData, targetNode.key, nodeToMove, dropPosition);
    } else {
      newTreeData = [...newTreeData, { ...nodeToMove }];
    }

    // Update visibility for search
    if (isSearching && searchKeyword) {
      updateNodeVisibility(newTreeData, searchKeyword);
    }

    // Update tree data
    setTreeData(newTreeData);

    // Update initial data to preserve changes when search is cleared
    const updatedInitialData = JSON.parse(JSON.stringify(newTreeData));
    updateNodeVisibility(updatedInitialData, '');
    setInitialData(updatedInitialData);

    // Call action callback
    onAction?.({
      type: actionType,
      sourceNode: nodeToMove,
      targetNode: targetNode,
      position: dropPosition,
      treeId,
    });

    // Reset drag state after successful drop
    setDraggedNode(null);
    setDraggedNodeKey(null);
    if (treeContext) {
      treeContext.setDragState({
        node: null,
        sourceTreeId: null,
      });
    }
  };

  // Determine if a node can be dragged
  const canDragNode = (node: TreeNode): boolean => {
    if (type === 'SHUTTLE_LIST') return false;
    if (node.constraints?.drag === false) return false;

    // Level 0 nodes cannot be dragged
    if (getNodeLevel(treeData, node.key) === 0) return false;

    return true;
  };

  // Handle drag start
  const handleDragStart = (node: TreeNode) => {
    console.log('TreeView handleDragStart:', node);

    // Make sure the node has level information
    const enhancedNode = {
      ...node,
      level: node.level !== undefined ? node.level : getNodeLevel(treeData, node.key),
    };

    console.log('Enhanced node with level:', enhancedNode);

    // Save dragged node state
    setDraggedNode(enhancedNode);

    // Update context if using context
    setDragState({
      node: enhancedNode,
      sourceTreeId: treeId,
    });

    // Save dragged key
    setDraggedNodeKey(node.key);

    // Add dragging class to body
    document.body.classList.add('tree-dragging');
  };

  // Handle node click
  const handleNodeClick = (node: TreeNode | null) => {
    // Update internal state
    setInternalSelectedNode(node);

    // Update external state via callback
    if (onSelectedNodeChange && node) {
      onSelectedNodeChange(node);
    }

    // Call action handler
    if (onAction && node) {
      onAction({ type: 'NODE_SELECT', node: node } as SelectEventPayload);
    }
  };

  // Check if there are visible nodes for search
  const hasVisibleNodes = useMemo(() => {
    if (!searchKeyword) return true;
    return treeData.some((node) => node._visible);
  }, [treeData, searchKeyword]);

  // Clean up drag state when drag ends
  useEffect(() => {
    const handleGlobalDragEnd = () => {
      if (draggedNodeKey) {
        setDraggedNodeKey(null);
        document.body.classList.remove('tree-dragging');
      }
    };

    if (draggedNodeKey) {
      document.addEventListener('dragend', handleGlobalDragEnd);
      return () => {
        document.removeEventListener('dragend', handleGlobalDragEnd);
      };
    }
  }, [draggedNodeKey]);

  return (
    <div
      className="rounded-lg border bg-white p-4 shadow-sm"
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-blue-100');
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-100');
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-100');

        // Only allow dropping at root level for free drag-drop mode
        if (type === 'SAME_LEVEL_ONLY' || type === 'SAME_PARENT_ONLY') {
          return;
        }

        handleDrop({ targetNode: null, dropPosition: 'INSIDE' });
      }}
    >
      <div className="tree">
        {treeData.length > 0 && hasVisibleNodes ? (
          treeData.map((node) => (
            <FilteredTreeNode
              key={node.key}
              node={node}
              selectedNode={selectedNode}
              expandedKeys={expandedKeys}
              setExpandedKeys={setExpandedKeys}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              isDraggable={canDragNode(node)}
              onNodeClick={handleNodeClick}
              nodeButtons={nodeButtons}
              treeType={type}
              searchKeyword={searchKeyword}
              draggedNodeKey={draggedNodeKey}
              draggedNode={draggedNode}
            />
          ))
        ) : (
          <div className="py-4 text-center text-gray-500">
            {searchKeyword
              ? `No search results for: "${searchKeyword}"`
              : 'No nodes in the tree. Please add nodes.'}
          </div>
        )}
      </div>
    </div>
  );
};

export { TreeView3 };
