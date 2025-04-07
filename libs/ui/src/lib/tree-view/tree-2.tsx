import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import {
  ApiCallbackPayload,
  DropInfo,
  EnhancedTreeNode,
  NodeMovePositionType,
  SelectEventPayload,
  TreeNode,
  TreeNodeComponentProps,
  TreeProps,
} from './type';
import {
  calculateTargetIndex,
  findNodePath,
  getNodeLevel,
  insertNodeAtPosition,
  isValidDrop,
  removeNodeByKey,
} from './tree.service';
import { useTreeContext } from './tree.context';
import { IcoFolder, IcoHome03 } from '@learnway/icons';

// 기본 스타일 정의
const dropStyles = {
  valid: {
    before: {
      position: 'absolute' as const,
      width: '100%',
      height: '2px',
      backgroundColor: '#3b82f6',
      top: '-1px',
      zIndex: 10,
      pointerEvents: 'none' as const,
    },
    after: {
      position: 'absolute' as const,
      width: '100%',
      height: '2px',
      backgroundColor: '#3b82f6',
      bottom: '-1px',
      zIndex: 10,
      pointerEvents: 'none' as const,
    },
    inside: {
      position: 'absolute' as const,
      inset: 0,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '0.25rem',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      zIndex: 10,
      pointerEvents: 'none' as const,
    },
  },
  invalid: {
    before: {
      position: 'absolute' as const,
      width: '100%',
      height: '2px',
      backgroundColor: '#ef4444',
      top: '-1px',
      zIndex: 20,
      pointerEvents: 'none' as const,
    },
    after: {
      position: 'absolute' as const,
      width: '100%',
      height: '2px',
      backgroundColor: '#ef4444',
      bottom: '-1px',
      zIndex: 20,
      pointerEvents: 'none' as const,
    },
    inside: {
      position: 'absolute' as const,
      inset: 0,
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderRadius: '0.25rem',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      zIndex: 20,
      pointerEvents: 'none' as const,
    },
  },
};

const FilteredTreeNode = ({
  node,
  draggedNodeKey,
  draggedNode,
  ...props
}: TreeNodeComponentProps) => {
  const enhancedNode = node as EnhancedTreeNode;

  // 노드가 숨김 상태면 아무것도 렌더링하지 않음
  if (enhancedNode._visible === false) {
    return null;
  }

  // 보여져야 하는 노드는 실제 TreeNodeComponent로 렌더링
  return (
    <TreeNodeComponent
      node={node}
      draggedNodeKey={draggedNodeKey}
      draggedNode={draggedNode}
      {...props}
    />
  );
};

const TreeNodeComponent = ({
  node,
  level = 0,
  expandedKeys,
  setExpandedKeys,
  selectedNode,
  onDragStart,
  onDrop,
  isDraggable,
  onNodeClick,
  treeType,
  nodeButtons,
  searchKeyword,
  draggedNodeKey,
  draggedNode,
  onCustomNodeClick,
}: TreeNodeComponentProps) => {
  const enhanceNode = node as EnhancedTreeNode;
  const [dropPosition, setDropPosition] = useState<NodeMovePositionType | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const hasChildren = enhanceNode.children && enhanceNode.children.length > 0;
  const isExpanded = expandedKeys.includes(enhanceNode.key);
  const isDragAndDropMode =
    treeType === 'DRAG_DROP' || treeType === 'SAME_LEVEL_ONLY' || treeType === 'SAME_PARENT_ONLY';

  // 드롭 위치가 유효한지 확인
  const isValidDropPosition = useCallback(() => {
    if (!draggedNode || !dropPosition) return true;

    // 레벨 0 노드는 INSIDE만 허용
    if (level === 0 && dropPosition !== 'INSIDE') {
      return false;
    }

    // 트리 타입에 따른 유효성 검사
    if (treeType === 'SAME_LEVEL_ONLY') {
      const draggedLevel = draggedNode.level || 0;

      // BEFORE/AFTER는 같은 레벨이어야 함
      if ((dropPosition === 'BEFORE' || dropPosition === 'AFTER') && draggedLevel !== level) {
        return false;
      }
      // INSIDE는 부모-자식 관계가 맞아야 함
      if (dropPosition === 'INSIDE' && draggedLevel !== level + 1) {
        return false;
      }
    }

    if (treeType === 'SAME_PARENT_ONLY') {
      const sourceParentKey = draggedNode._parentKey;

      // INSIDE는 현재 노드가 원본 부모여야 함
      if (dropPosition === 'INSIDE' && enhanceNode.key !== sourceParentKey) {
        return false;
      }
      // BEFORE/AFTER는 타겟과 같은 부모를 가져야 함
      if (
        (dropPosition === 'BEFORE' || dropPosition === 'AFTER') &&
        sourceParentKey !== enhanceNode._parentKey
      ) {
        return false;
      }
    }

    return true;
  }, [dropPosition, draggedNode, level, treeType, enhanceNode]);

  // 드롭 위치 표시기 렌더링
  const renderDropIndicator = () => {
    if (!dropPosition) return null;

    const isValid = isValidDropPosition();
    const styleType = isValid ? 'valid' : 'invalid';
    const positionType = dropPosition.toLowerCase() as 'before' | 'after' | 'inside';

    return <div style={dropStyles[styleType][positionType]} />;
  };

  const isActuallyDraggable = isDraggable && enhanceNode.constraints?.drag !== false;

  // 검색어 하이라이팅 함수
  const highlightMatch = (text: string) => {
    if (!searchKeyword) return text;

    const regex = new RegExp(`(${searchKeyword})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) => {
          const isMatch = part.toLowerCase() === searchKeyword.toLowerCase();
          return isMatch ? (
            <span key={i} className="bg-yellow-200">
              {part}
            </span>
          ) : (
            part
          );
        })}
      </>
    );
  };

  // 노드 스타일 계산
  const getNodeStyle = useCallback(() => {
    const styles = [`flex items-center py-1 rounded min-h-[40px] relative`];

    // 선택 스타일
    if (selectedNode && selectedNode.key === enhanceNode.key) {
      styles.push('bg-blue-50');
    }

    // 드롭 위치 스타일
    if (dropPosition === 'INSIDE') {
      styles.push(isValidDropPosition() ? 'bg-blue-50' : 'bg-red-50');
    }

    // 제약 조건 스타일
    if (enhanceNode.constraints?.drag === false) {
      styles.push('border-l-4 border-red-300');
    }
    if (enhanceNode.constraints?.drop === false) {
      styles.push('border-l-4 border-yellow-300');
    }

    // 기본 호버 스타일
    styles.push('hover:bg-gray-100');

    // 검색 하이라이트
    if (
      searchKeyword &&
      enhanceNode.title &&
      enhanceNode.title.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      styles.push('bg-yellow-50');
    }

    return styles.join(' ');
  }, [dropPosition, selectedNode, enhanceNode, searchKeyword, isValidDropPosition]);

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable || enhanceNode.constraints?.drag === false) return;

    try {
      // 드래그 이미지 생성
      const dragImage = document.createElement('div');
      dragImage.classList.add('drag-node-image');
      dragImage.innerHTML = `
      <div class="px-2 py-1 bg-blue-100 rounded border border-blue-300 shadow-md flex items-center">
        ${level === 0 ? '<span>🏠</span>' : '<span>📁</span>'}
        <span class="ml-2 font-medium">${enhanceNode.title || ''}</span>
      </div>
    `;

      // 위치 조정 - 화면에 보이지 않게
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      dragImage.style.left = '-1000px';
      dragImage.style.pointerEvents = 'none';

      // 문서에 추가
      document.body.appendChild(dragImage);

      // 드래그 이미지 설정
      e.dataTransfer.setDragImage(dragImage, 10, 10);
      e.dataTransfer.effectAllowed = 'move';

      // 노드 데이터 준비
      const nodeData = {
        ...enhanceNode,
        level: level,
      };

      e.dataTransfer.setData('text/plain', nodeData.key);
      e.dataTransfer.setData('application/json', JSON.stringify(nodeData));

      if (onDragStart) {
        onDragStart(nodeData);
      }

      setTimeout(() => {
        if (document.body.contains(dragImage)) {
          document.body.removeChild(dragImage);
        }
      }, 0);
    } catch (error) {
      console.error('Drag start error:', error);
    }
  };

  // 드래그 오버
  const handleDragOver = (e: React.DragEvent) => {
    if (enhanceNode.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();

    // 데이터 형식 확인
    const hasJsonData = e.dataTransfer.types.includes('application/json');
    if (!hasJsonData) return;

    // 레벨 0으로의 드롭은 INSIDE만 허용
    if (level === 0) {
      setDropPosition('INSIDE');
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 3;

    // 기본 위치 계산
    const newPosition: NodeMovePositionType =
      y < threshold ? 'BEFORE' : y > rect.height - threshold ? 'AFTER' : 'INSIDE';

    // 항상 드롭 위치 표시 (유효성 여부는 스타일로 표시)
    if (dropPosition !== newPosition) {
      setDropPosition(newPosition);
    }
  };

  // 드래그 리브
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPosition(null);
  };

  // 드롭
  const handleDrop = (e: React.DragEvent) => {
    if (enhanceNode.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();

    // 드래그된 노드 데이터 추출
    let droppedNode;
    try {
      const jsonData = e.dataTransfer.getData('application/json');
      if (jsonData) {
        droppedNode = JSON.parse(jsonData);
      }
    } catch (error) {
      console.error('Failed to parse drag data:', error);
      return;
    }

    if (!droppedNode || !dropPosition) return;

    // 유효성 검사
    const isValid = isValidDropPosition();

    // 유효한 경우에만 콜백 호출
    if (isValid) {
      onDrop?.({
        targetNode: { ...enhanceNode, level },
        dropPosition: dropPosition,
        sourceNode: droppedNode,
      });
    }

    // 상태 초기화
    setDropPosition(null);
  };

  // 접기, 펴기 토글
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys((prev) =>
      isExpanded ? prev.filter((k) => k !== enhanceNode.key) : [...prev, enhanceNode.key],
    );
  };

  // 노드 클릭
  const handleClick = () => {
    if (enhanceNode && onNodeClick) onNodeClick(enhanceNode);
    if (enhanceNode === selectedNode && onNodeClick) onNodeClick(null);
    if (onCustomNodeClick) {
      onCustomNodeClick({ ...enhanceNode, level });
    }
  };

  return (
    <div className="relative select-none">
      <div
        className={getNodeStyle()}
        style={{
          paddingLeft: `${level * 20}px`,
          // cursor: enhanceNode.constraints?.drag === false ? 'not-allowed' : 'grab',
          transition: 'all 0.2s ease',
          //api팝업..
        }}
        draggable={false}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 드롭 위치 표시 */}
        {renderDropIndicator()}

        <span
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleToggleExpand}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            )
          ) : null}
        </span>
        <span className="mr-1 flex h-6 w-6 items-center justify-center">
          {level === 0 ? <IcoHome03 stroke="#131C30" /> : <IcoFolder stroke="#131C30" />}
        </span>
        <span
          className={`flex-grow text-sm ${onCustomNodeClick && level >= 1 ? 'underline' : 'none'}`}
        >
          {highlightMatch(enhanceNode.title || '')}
        </span>

        {isDragAndDropMode && (
          <div className="relative flex items-center">
            {nodeButtons && (
              <div
                className={`mr-2 flex space-x-1 transition-opacity duration-150 ${isHovered || level === 0 ? 'opacity-100' : 'invisible opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {nodeButtons(enhanceNode, level)}
              </div>
            )}
            {level >= 1 && (
              <span
                className={`ml-2 flex items-center justify-center text-5xl transition-opacity ${isDragAndDropMode && isActuallyDraggable ? 'cursor-grab' : 'cursor-pointer'}`}
                draggable={true}
                onDragStart={handleDragStart}
              >
                ☰
              </span>
            )}
          </div>
        )}

        {treeType === 'SHUTTLE_LIST' && (
          <div className="relative flex items-center">
            {nodeButtons && (
              <div
                className={`duration-150} mr-2 flex space-x-1 transition-opacity`}
                onClick={(e) => e.stopPropagation()}
              >
                {nodeButtons(enhanceNode, level)}
              </div>
            )}
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="tree-children">
          {enhanceNode.children &&
            enhanceNode.children.map((child) => (
              <FilteredTreeNode
                key={child.key}
                node={child}
                level={level + 1}
                expandedKeys={expandedKeys}
                setExpandedKeys={setExpandedKeys}
                selectedNode={selectedNode}
                onDragStart={onDragStart}
                onDrop={onDrop}
                isDraggable={isDraggable}
                onNodeClick={onNodeClick}
                treeType={treeType}
                nodeButtons={nodeButtons}
                searchKeyword={searchKeyword}
                draggedNodeKey={draggedNodeKey}
                draggedNode={draggedNode}
                onCustomNodeClick={onCustomNodeClick}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const TreeView2 = ({
  treeId,
  data,
  onAction,
  onApiCallback,
  expandTrigger,
  type,
  nodeButtons,
  searchKeyword,
  selectedNode: externalSelectedNode,
  initExpandedKeys = [],
  expandedKeys: externalExpandedKeys,
  onExpandedKeysChange,
  onSelectedNodeChange,
  onCustomNodeClick,
}: TreeProps) => {
  // 내부 상태 관리
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

  // 중요: 업데이트 사이클을 끊기 위한 ref 추가
  const shouldUpdateExpandedKeys = useRef(false);
  const pendingExpandedKeys = useRef<string[]>([]);

  const selectedNode =
    externalSelectedNode !== undefined ? externalSelectedNode : internalSelectedNode;
  const expandedKeys = externalExpandedKeys || internalExpandedKeys;

  const treeContext = useTreeContext();
  const dragState = treeContext ? treeContext.dragState : { node: null, sourceTreeId: null };
  const setDragState = treeContext
    ? treeContext.setDragState
    : () => {
        /* 빈 함수 */
      };

  // 노드 가시성 업데이트 함수
  const updateNodeVisibility = useCallback(
    (nodes: EnhancedTreeNode[], keyword: string): boolean => {
      let hasVisibleNodes = false;

      for (const node of nodes) {
        // 직접 매치 여부 확인
        const nodeMatch = keyword
          ? node.title && node.title.toLowerCase().includes(keyword.toLowerCase())
          : true;

        // 하위 노드의 매치 여부 확인
        let childrenMatch = false;
        if (node.children && node.children.length > 0) {
          childrenMatch = updateNodeVisibility(node.children, keyword);
        }

        // 현재 노드 또는 하위 노드가 매치되면 표시
        node._visible = nodeMatch || childrenMatch || !keyword;

        // 전체 결과에 반영
        hasVisibleNodes = hasVisibleNodes || node._visible;
      }

      return hasVisibleNodes;
    },
    [],
  );

  // 외부 데이터 변경 감지
  useEffect(() => {
    setInitialData(JSON.parse(JSON.stringify(data)));
    console.log(JSON.parse(JSON.stringify(data)));
  }, [data]);

  // 확장된 키를 안전하게 업데이트하는 함수
  const updateExpandedKeys = useCallback(
    (newKeys: string[]) => {
      setInternalExpandedKeys(newKeys);
      if (onExpandedKeysChange) {
        onExpandedKeysChange(newKeys);
      }
    },
    [onExpandedKeysChange],
  );

  // 검색어 변경에 대한 처리 - 의존성 사이클 제거
  useEffect(() => {
    if (!searchKeyword) {
      if (isSearching) {
        const currentTreeData = JSON.parse(JSON.stringify(initialData));
        updateNodeVisibility(currentTreeData, '');
        setTreeData(currentTreeData);
        setIsSearching(false);

        // 즉시 확장 키를 설정하는 대신 대기 중인 키를 표시
        if (originalExpandedKeys.length > 0) {
          pendingExpandedKeys.current = [...originalExpandedKeys];
          shouldUpdateExpandedKeys.current = true;
        }
      }
      return;
    }

    // 처음 검색을 시작할 때만 현재 펼쳐진 상태 저장
    if (!isSearching) {
      setOriginalExpandedKeys([...internalExpandedKeys]);
      setIsSearching(true);
    }

    // 노드 가시성 업데이트 - initialData 기반으로 검색
    const newTreeData = JSON.parse(JSON.stringify(initialData));
    console.log(newTreeData);
    const hasResults = updateNodeVisibility(newTreeData, searchKeyword);
    setTreeData(newTreeData);

    if (hasResults) {
      // 검색 결과가 있으면 매칭되는 노드의 모든 부모 노드 확장
      const newExpandedKeys = new Set<string>();

      // 모든 매칭 노드의 부모 경로 수집
      const collectParentKeys = (nodes: EnhancedTreeNode[], parentKeys: string[] = []): void => {
        for (const node of nodes) {
          const currentPath = [...parentKeys, node.key];

          // 노드가 표시되고 검색어와 일치하면 모든 부모 키를 확장 키에 추가
          if (
            node._visible &&
            node.title &&
            node.title.toLowerCase().includes(searchKeyword.toLowerCase())
          ) {
            parentKeys.forEach((key) => newExpandedKeys.add(key));
          }

          // 자식 노드가 표시되면 현재 노드는 확장해야 함
          if (node.children && node.children.some((child) => child._visible)) {
            newExpandedKeys.add(node.key);
            collectParentKeys(node.children, currentPath);
          }
        }
      };
      collectParentKeys(newTreeData);

      // 직접 업데이트하지 않고 대기 상태로 표시
      pendingExpandedKeys.current = [...newExpandedKeys];
      shouldUpdateExpandedKeys.current = true;
    }
  }, [searchKeyword, initialData, isSearching, internalExpandedKeys, updateNodeVisibility]);

  useEffect(() => {
    // 외부에서 전달받은 데이터로 트리 데이터 초기화
    const refreshedData = JSON.parse(JSON.stringify(initialData));

    // 검색 중이라면 가시성 필터 적용
    if (isSearching && searchKeyword) {
      updateNodeVisibility(refreshedData, searchKeyword);
    } else {
      // 검색 중이 아니면 모든 노드 표시
      updateNodeVisibility(refreshedData, '');
    }

    setTreeData(refreshedData);
  }, [initialData, isSearching, searchKeyword, updateNodeVisibility]);

  // 대기 중인 확장 키 업데이트를 처리하는 별도의 효과
  useEffect(() => {
    if (shouldUpdateExpandedKeys.current) {
      shouldUpdateExpandedKeys.current = false;
      updateExpandedKeys(pendingExpandedKeys.current);
    }
  }, [updateExpandedKeys]);

  // 모든 노드 키 가져오기
  const getAllNodeKeys = useCallback((nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllNodeKeys(node.children));
      }
      return keys;
    }, []);
  }, []);

  // 확장 트리거 처리 - 의존성 사이클 제거
  useEffect(() => {
    if (expandTrigger !== undefined && !isSearching) {
      const newExpandedKeys = expandTrigger ? getAllNodeKeys(treeData) : [];
      // 직접 상태 업데이트 사용
      updateExpandedKeys(newExpandedKeys);
      setOriginalExpandedKeys(newExpandedKeys);
    }
  }, [expandTrigger, getAllNodeKeys, treeData, isSearching, updateExpandedKeys]);

  const handleDrop = async (dropInfo: DropInfo) => {
    const sourceNode = dropInfo.sourceNode;

    if (!sourceNode) {
      console.warn('No source node information in drop event');
      return;
    }

    if (!dragState.node) return;

    const { targetNode, dropPosition } = dropInfo;

    // 같은 트리면 이동, 다른 트리면 복사
    const actionType = dragState.sourceTreeId === treeId ? 'NODE_MOVE' : 'NODE_COPY';

    // 유효성 검증
    if (
      targetNode &&
      !isValidDrop(dragState.node.key, targetNode.key, treeData, dropPosition, type)
    ) {
      return;
    }

    if (actionType === 'NODE_COPY' && findNodePath(treeData, dragState.node.key)) {
      alert('이미 트리에 해당 노드가 존재합니다.');
      return;
    }

    // 루트 레벨(레벨 0)로의 이동은 INSIDE가 아니면 방지
    if (targetNode && getNodeLevel(treeData, targetNode.key) === 0 && dropPosition !== 'INSIDE') {
      return;
    }

    // 목표 인덱스 계산
    let targetIndex = 0;
    let targetParentKey = null;

    if (targetNode) {
      const positionInfo = calculateTargetIndex(treeData, targetNode, dropPosition);
      targetIndex = positionInfo.index;
      targetParentKey = positionInfo.parentKey;
    } else {
      // 트리의 루트 레벨에 추가하는 경우 (마지막 위치)
      targetIndex = treeData.length;
    }

    // API 호출 처리
    if (onApiCallback) {
      try {
        const apiPayload: ApiCallbackPayload = {
          type: actionType,
          sourceNode: dragState.node,
          targetNode: targetNode,
          position: dropPosition,
          treeId,
          targetIndex, // 인덱스 정보 추가
          targetParentKey, // 부모 키 정보 추가
        };

        const success = await onApiCallback(apiPayload);
        if (!success) {
          return;
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        return;
      }
    }

    // UI 업데이트 (이후 코드는 동일)
    let newTreeData = [...treeData];
    if (actionType === 'NODE_MOVE') {
      newTreeData = removeNodeByKey(newTreeData, dragState.node.key);
    }

    if (targetNode) {
      newTreeData = insertNodeAtPosition(newTreeData, targetNode.key, dragState.node, dropPosition);
    } else {
      newTreeData = [...newTreeData, { ...dragState.node }];
    }

    // 검색 중이라면 가시성 업데이트
    if (isSearching && searchKeyword) {
      updateNodeVisibility(newTreeData, searchKeyword);
    }

    // 상태 업데이트
    setTreeData(newTreeData);

    // initialData 업데이트
    const updatedInitialData = JSON.parse(JSON.stringify(newTreeData));
    const fullData = JSON.parse(JSON.stringify(updatedInitialData));
    updateNodeVisibility(fullData, '');
    setInitialData(fullData);

    // 액션 콜백 호출 (선택적으로 인덱스 정보 추가)
    onAction?.({
      type: actionType,
      sourceNode: dragState.node,
      targetNode: targetNode,
      position: dropPosition,
      treeId,
      targetIndex,
      // targetParentKey,
    });
  };

  // 노드 드래그 가능 여부 확인
  const canDragNode = (node: TreeNode): boolean => {
    if (type === 'SHUTTLE_LIST') return false;
    if (node.constraints?.drag === false) return false;
    if (node.level === 0) return false;
    return true;
  };

  // 드래그 시작 처리
  const handleDragStart = (node: TreeNode) => {
    const enhancedNode = {
      ...node,
      level: node.level !== undefined ? node.level : getNodeLevel(treeData, node.key),
    };

    setDraggedNode(enhancedNode);
    setDragState({
      node: enhancedNode,
      sourceTreeId: treeId,
    });
    setDraggedNodeKey(node.key);
    document.body.classList.add('tree-dragging');
  };

  // 노드 클릭 처리
  const handleNodeClick = (node: TreeNode | null) => {
    setInternalSelectedNode(node);
    if (onSelectedNodeChange && node) {
      onSelectedNodeChange(node);
    }
    if (onAction && node) {
      onAction({ type: 'NODE_SELECT', node: node } as SelectEventPayload);
    }
  };

  // 확장된 키를 설정하기 위한 함수 - FilteredTreeNode에 전달할 setExpandedKeys
  const setExpandedKeys = useCallback(
    (keys: string[] | ((prevKeys: string[]) => string[])) => {
      const newKeys = typeof keys === 'function' ? keys(expandedKeys) : keys;
      updateExpandedKeys(newKeys);
    },
    [expandedKeys, updateExpandedKeys],
  );

  // 검색 결과 존재 여부
  const hasVisibleNodes = useMemo(() => {
    if (!searchKeyword) return true;
    return treeData.some((node) => node._visible);
  }, [treeData, searchKeyword]);

  // 글로벌 드래그 종료 이벤트 처리
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
              onCustomNodeClick={onCustomNodeClick}
            />
          ))
        ) : (
          <div className="py-4 text-center text-gray-500">
            {searchKeyword
              ? `검색 결과가 없습니다: "${searchKeyword}"`
              : '트리에 노드가 없습니다. 노드를 추가해주세요.'}
          </div>
        )}
      </div>
    </div>
  );
};

export { TreeView2 };
