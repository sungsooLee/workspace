import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CopyEventPayload,
  DropInfo,
  EnhancedTreeNode,
  MoveEventPayload,
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
import {
  IcoBoxMinus,
  IcoBoxPlus,
  IcoFile01,
  IcoFolder,
  IcoFolderOpen,
  IcoHome03,
  IcoMenu01,
} from '@learnway/icons';
import styles from './tree.module.css'; // Tree module CSS
import { cn } from '@learnway/shared';
import { dropStyles } from './tree.style';

/**
 * 검색어에 따라 노드의 가시성을 업데이트하는 함수
 * @param nodes 업데이트할 노드 배열
 * @param keyword 검색어
 * @returns 일치하는 노드가 하나라도 있으면 true
 */
const updateNodeVisibility = (nodes: EnhancedTreeNode[], keyword: string): boolean => {
  let hasVisibleNodes = false;

  // 검색어가 없으면 모든 노드 표시
  if (!keyword) {
    for (const node of nodes) {
      node._visible = true;
      if (node.children && node.children.length > 0) {
        updateNodeVisibility(node.children, keyword);
      }
    }
    return true;
  }

  // 검색어가 있으면 일치하는 노드와 그 부모 노드만 표시
  for (const node of nodes) {
    // 직접 매치 여부 확인
    const nodeMatch = node.title && node.title.toLowerCase().includes(keyword.toLowerCase());

    // 하위 노드의 매치 여부 확인 (재귀 호출)
    let childrenMatch = false;
    if (node.children && node.children.length > 0) {
      childrenMatch = updateNodeVisibility(node.children, keyword);
    }

    // 현재 노드 또는 하위 노드가 매치되면 표시
    node._visible = nodeMatch || childrenMatch;

    // 전체 결과에 반영
    hasVisibleNodes = hasVisibleNodes || node._visible;
  }

  return hasVisibleNodes;
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
  size = 'md',
  treeContext,
  treeId,
}: TreeNodeComponentProps) => {
  const enhanceNode = node as EnhancedTreeNode;
  const [dropPosition, setDropPosition] = useState<NodeMovePositionType | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
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
  // const getNodeStyle = () => {
  //   const styles = [
  //     `${dropPosition === 'INSIDE' ? 'bg-[var(--gray1)]' : ''}
  //       ${isDragging ? 'opacity-50 bg-[var(--gray1)]' : ''}`,
  //   ];
  //   // 선택 스타일
  //   if (selectedNode && selectedNode.key === enhanceNode.key) {
  //     styles.push('bg-[var(--gray1)]');
  //   }

  //   // 드롭 위치 스타일
  //   if (dropPosition === 'INSIDE') {
  //     styles.push(isValidDropPosition() ? 'bg-blue-50' : 'bg-red-50');
  //   }

  //   // 제약 조건 스타일
  //   if (enhanceNode.constraints?.drag === false) {
  //     styles.push('border-l-4 border-red-300');
  //   }
  //   if (enhanceNode.constraints?.drop === false) {
  //     styles.push('border-l-4 border-yellow-300');
  //   }
  //   if (enhanceNode.constraints?.drag === false && enhanceNode.constraints?.drop === false) {
  //     styles.push('bg-gray-50');
  //   }
  //   if (enhanceNode.constraints?.drag === false || enhanceNode.constraints?.drop === false) {
  //     styles.push('opacity-75');
  //   } else {
  //     styles.push('');
  //   }
  //   // 검색 하이라이트
  //   if (
  //     searchKeyword &&
  //     enhanceNode.title &&
  //     enhanceNode.title.toLowerCase().includes(searchKeyword.toLowerCase())
  //   ) {
  //     styles.push('bg-yellow-50');
  //   }

  //   return styles.join(' ');
  // };

  const nodeStyle = useMemo(() => {
    const styles = [];

    // 배경 스타일
    if (dropPosition === 'INSIDE') {
      styles.push('bg-[var(--gray1)]');
    }

    // 드래그 중 스타일
    if (isDragging) {
      styles.push('opacity-50 bg-[var(--gray1)]');
    }

    // 선택 스타일
    if (selectedNode && selectedNode.key === enhanceNode.key) {
      styles.push('bg-[var(--gray1)]');
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
    if (enhanceNode.constraints?.drag === false && enhanceNode.constraints?.drop === false) {
      styles.push('bg-gray-50');
    }
    if (enhanceNode.constraints?.drag === false || enhanceNode.constraints?.drop === false) {
      styles.push('opacity-75');
    }

    // 검색 하이라이트
    if (
      searchKeyword &&
      enhanceNode.title &&
      enhanceNode.title.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      styles.push('bg-yellow-50');
    }

    return styles.join(' ');
  }, [
    dropPosition,
    isDragging,
    selectedNode,
    enhanceNode.key,
    enhanceNode.constraints,
    searchKeyword,
    enhanceNode.title,
  ]);

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

      // dataTransfer에 데이터 저장
      e.dataTransfer.setData('text/plain', nodeData.key);
      e.dataTransfer.setData('application/json', JSON.stringify(nodeData));
      e.dataTransfer.setData('treeId', treeId);

      if (!isDragging) {
        setIsDragging(true);
      }

      if (onDragStart) {
        onDragStart(nodeData);
      }

      // TreeContext의 dragState 업데이트
      if (treeContext && treeContext.setDragState) {
        const newDragState = {
          node: JSON.parse(JSON.stringify(nodeData)), // 깊은 복사
          sourceTreeId: treeId,
        };
        treeContext.setDragState(newDragState);
      } else {
        console.warn('TreeContext or setDragState is not available!');
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
        console.log(droppedNode);
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

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className={styles.tree_item}>
      <div
        className={cn(nodeStyle, styles.tree_inner, level === 0 && styles.root_menu)}
        style={{
          boxShadow: isDragging ? '0px 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'all 0.2s ease',
        }}
        draggable={false}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
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
        {hasChildren && (
          <span
            className={cn(hasChildren ? styles.has_children : '', styles.tree_menu)}
            onClick={handleToggleExpand}
          >
            {level === 0 && hasChildren ? (
              <IcoHome03 stroke="#131C30" className={styles.icon_home} />
            ) : null}
            {level !== 0 && hasChildren ? (
              isExpanded ? (
                <IcoBoxMinus className={styles.icon_minus} width={20} height={21} />
              ) : (
                <IcoBoxPlus className={styles.icon_plus} />
              )
            ) : null}
          </span>
        )}
        {level !== 0 && (
          <span className={cn(styles.folder_wrap)}>
            {enhanceNode && enhanceNode?.apiNodeType === 'API' ? (
              <IcoFile01 width={'16'} height={'16'} stroke={'#131C30'} fill={'none'} />
            ) : isExpanded ? (
              <IcoFolderOpen stroke="#131C30" className={styles.icon_folder} />
            ) : (
              <IcoFolder stroke="#131C30" className={styles.icon_folder} />
            )}
          </span>
        )}
        <span
          className={cn(
            styles.node_title,
            `${onCustomNodeClick && level >= 1 ? 'cursor-pointer underline' : 'cursor-default'}`,
          )}
        >
          {highlightMatch(enhanceNode.title || '')}
        </span>

        {isDragAndDropMode && (
          <div className={styles.drag_wrap}>
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
                <IcoMenu01
                  width={24}
                  height={24}
                  fill="#A9AFB8"
                  stroke="#A9AFB8"
                  className={styles.icon_drag}
                />
              </span>
            )}
          </div>
        )}

        {treeType === 'SHUTTLE_LIST' && (
          <div className={styles.btn_area}>
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
        <div className={styles.tree_children}>
          {enhanceNode.children &&
            enhanceNode.children.map((child) => (
              <FilteredTreeNode
                treeId={treeId}
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
                size={size}
                treeContext={treeContext}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({
  treeId,
  data,
  onAction,
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
  clientTree,
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

  const selectedNode =
    externalSelectedNode !== undefined ? externalSelectedNode : internalSelectedNode;
  const expandedKeys = externalExpandedKeys || internalExpandedKeys;

  const treeContext = useTreeContext();

  // 외부 데이터 변경 감지
  useEffect(() => {
    setInitialData(JSON.parse(JSON.stringify(data)));
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

  // 검색 관련 참조 값 추가
  const lastSearchKeyword = useRef(searchKeyword);
  const isInitialSearch = useRef(true);

  // 검색어 변경에 대한 처리
  useEffect(() => {
    // 이전 검색어와 동일하면 중복 처리 방지
    if (lastSearchKeyword.current === searchKeyword && !isInitialSearch.current) {
      return;
    }

    isInitialSearch.current = false;
    lastSearchKeyword.current = searchKeyword;

    if (!searchKeyword) {
      if (isSearching) {
        const currentTreeData = JSON.parse(JSON.stringify(initialData));
        updateNodeVisibility(currentTreeData, '');
        setTreeData(currentTreeData);
        setIsSearching(false);
      }
      return;
    }

    // 검색 상태로 설정
    setIsSearching(true);

    // 노드 가시성 업데이트 - initialData 기반으로 검색
    const newTreeData = JSON.parse(JSON.stringify(initialData));
    const hasResults = updateNodeVisibility(newTreeData, searchKeyword);
    setTreeData(newTreeData);

    if (hasResults) {
      // 검색 결과가 있으면 매칭되는 노드의 모든 부모 노드 확장
      const newExpandedKeys = new Set<string>(expandedKeys); // 현재 확장 상태 유지

      // 모든 가시적 노드의 부모 경로를 수집하는 함수
      const collectVisibleNodePaths = (nodes: EnhancedTreeNode[], parentPath: string[] = []) => {
        for (const node of nodes) {
          const currentPath = [...parentPath, node.key];

          // 노드가 표시 가능한 경우 (본인이 검색 결과이거나 자식 중 검색 결과가 있는 경우)
          if (node._visible) {
            // 검색어와 직접 일치하는 경우 모든 부모 노드 확장
            if (node.title && node.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
              // 부모 노드들만 확장 키에 추가
              parentPath.forEach((key) => newExpandedKeys.add(key));
            }

            // 자식 노드가 있으면 재귀적으로 탐색
            if (node.children && node.children.length > 0) {
              collectVisibleNodePaths(node.children, currentPath);

              // 자식 중 가시적인 노드가 있으면 현재 노드 확장
              if (node.children.some((child) => child._visible)) {
                newExpandedKeys.add(node.key);
              }
            }
          }
        }
      };

      // 모든 가시적 노드의 경로 수집
      collectVisibleNodePaths(newTreeData);

      const expandedKeysArray = [...newExpandedKeys];
      console.log('Expanded keys for search:', expandedKeysArray);

      // 직접 내부 상태 변경 (의존성 사이클 끊기)
      setInternalExpandedKeys(expandedKeysArray);

      // 외부 핸들러가 있는 경우만 호출
      if (onExpandedKeysChange) {
        onExpandedKeysChange(expandedKeysArray);
      }
    }
  }, [searchKeyword, initialData, expandedKeys]);

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
  }, [initialData, isSearching, searchKeyword]);

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
    // 드롭 정보에서 타겟 노드와 드롭 포지션 확인
    const { targetNode, dropPosition } = dropInfo;

    // treeContext나 dragState가 없는 경우 처리
    if (!treeContext || !treeContext.dragState || !treeContext.dragState.node) {
      if (!dropInfo.sourceNode) {
        return;
      }
    }
    // 소스 노드 (treeContext에서 가져오거나 dropInfo에서 가져옴)
    const sourceNode = treeContext?.dragState?.node || dropInfo.sourceNode;
    const sourceTreeId = treeContext?.dragState?.sourceTreeId || null;

    if (!sourceNode) {
      console.error('No source node available, aborting drop');
      return;
    }

    // 같은 트리인지 다른 트리인지 확인
    const actionType = sourceTreeId === treeId ? 'NODE_MOVE' : 'NODE_COPY';

    // 디버깅을 위한 로그
    console.log('Drop operation details:', {
      actionType,
      sourceNode,
      targetNode,
      position: dropPosition,
      sourceTreeId,
      targetTreeId: treeId,
    });

    // 유효성 검증
    // 1. 같은 트리 내에서의 드롭이면 유효성 검사 수행
    if (
      actionType === 'NODE_MOVE' &&
      targetNode &&
      !isValidDrop(sourceNode.key, targetNode.key, treeData, dropPosition, type)
    ) {
      console.warn('Invalid drop position within the same tree');
      return;
    }

    // 2. 다른 트리에서 복사하는 경우, 이미 존재하는 키인지 확인
    if (actionType === 'NODE_COPY' && findNodePath(treeData, sourceNode.key)) {
      alert('이미 트리에 해당 노드가 존재합니다.');
      return;
    }

    // 3. 루트 레벨(레벨 0)로의 이동은 INSIDE가 아니면 방지
    if (targetNode && getNodeLevel(treeData, targetNode.key) === 0 && dropPosition !== 'INSIDE') {
      console.warn('Cannot drop next to root level node');
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

    if (clientTree) {
      let newTreeData = [...treeData];

      // NODE_MOVE인 경우 원본 노드를 제거
      if (actionType === 'NODE_MOVE') {
        newTreeData = removeNodeByKey(newTreeData, sourceNode.key);
      }

      // 타겟 위치에 노드 삽입
      if (targetNode) {
        newTreeData = insertNodeAtPosition(newTreeData, targetNode.key, sourceNode, dropPosition);
      } else {
        // 루트 레벨에 추가
        newTreeData = [
          ...newTreeData,
          {
            ...sourceNode,
            key:
              actionType === 'NODE_COPY' ? `${sourceNode.key}-copy-${Date.now()}` : sourceNode.key,
          },
        ];
      }

      // 검색 중이라면 가시성 업데이트
      if (isSearching && searchKeyword) {
        updateNodeVisibility(newTreeData, searchKeyword);
      }

      // 트리 데이터 업데이트
      setTreeData(newTreeData);

      // initialData도 업데이트해서 검색 취소 후에도 변경사항이 유지되게 함
      const updatedInitialData = JSON.parse(JSON.stringify(newTreeData));

      // 가시성 속성 초기화 (모든 노드 표시)
      const fullData = JSON.parse(JSON.stringify(updatedInitialData));
      updateNodeVisibility(fullData, '');

      // 초기 데이터 업데이트 (검색 취소 후 사용할 데이터)
      setInitialData(fullData);
    }

    // 액션 콜백 호출 - 타입에 따라 다른 페이로드 구조 사용
    if (onAction) {
      if (actionType === 'NODE_MOVE') {
        const movePayload: MoveEventPayload = {
          type: 'NODE_MOVE',
          sourceNode: sourceNode,
          targetNode: targetNode,
          position: dropPosition,
          treeId,
          targetIndex,
        };
        onAction(movePayload);
      } else {
        const copyPayload: CopyEventPayload = {
          type: 'NODE_COPY',
          sourceNode: sourceNode,
          targetNode: targetNode,
          position: dropPosition,
          treeId,
          targetIndex,
          sourceTreeId: sourceTreeId || null,
        };
        onAction(copyPayload);
      }
    }
    // 드래그 상태 초기화
    setDraggedNode(null);
    setDraggedNodeKey(null);

    // TreeContext 상태도 리셋 (드롭이 끝난 후에만 리셋)
    setTimeout(() => {
      if (treeContext && treeContext.resetDragState) {
        treeContext.resetDragState();
      }
    }, 100);
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
    // 로컬 상태 업데이트
    setDraggedNode(enhancedNode);
    setDraggedNodeKey(node.key);
    // TreeContext 상태 업데이트
    if (treeContext && treeContext.setDragState) {
      // 깊은 복사를 통해 새 객체 생성
      const dragStateData = {
        node: JSON.parse(JSON.stringify(enhancedNode)), // 깊은 복사로 참조 문제 방지
        sourceTreeId: treeId,
      };
      treeContext.setDragState(dragStateData);
    } else {
      console.warn('TreeContext not available in TreeView!');
    }

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
      className={cn(styles.tree_wrap, 'tree_wrap')}
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
      <div className={styles.tree}>
        {treeData.length > 0 && hasVisibleNodes ? (
          treeData.map((node) => (
            <FilteredTreeNode
              treeId={treeId}
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
              treeContext={treeContext}
            />
          ))
        ) : (
          <div className={styles.no_data}>
            {searchKeyword
              ? `검색 결과가 없습니다: "${searchKeyword}"`
              : '트리에 노드가 없습니다. 노드를 추가해주세요.'}
          </div>
        )}
      </div>
    </div>
  );
};

export { TreeView };
