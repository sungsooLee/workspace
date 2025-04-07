import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Folder, File } from 'lucide-react';
import {
  DropInfo,
  EnhancedTreeNode,
  NodeMovePositionType,
  SelectEventPayload,
  TreeNode,
  TreeNodeComponentProps,
  TreeProps,
} from './type';
import { findNodePath, insertNodeAtPosition, isValidDrop, removeNodeByKey } from './tree.service';
import { useTreeContext } from './tree.context';
import { IcoFolder, IcoFolderOpen, IcoHome03, IcoBoxMinus, IcoBoxPlus } from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from './tree.module.css'; // Tree module CSS

const FilteredTreeNode = ({ node, draggedNodeKey, ...props }: TreeNodeComponentProps) => {
  const enhancedNode = node as EnhancedTreeNode;

  // 노드가 숨김 상태면 아무것도 렌더링하지 않음
  if (enhancedNode._visible === false) {
    return null;
  }

  // 보여져야 하는 노드는 실제 TreeNodeComponent로 렌더링
  return <TreeNodeComponent node={node} draggedNodeKey={draggedNodeKey} {...props} />;
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
  size = 'md',
  className,
}: TreeNodeComponentProps) => {
  const enhanceNode = node as EnhancedTreeNode;
  // 드랍 위치(before, inside, after)
  const [dropPosition, setDropPosition] = useState<NodeMovePositionType | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  const hasChildren = enhanceNode.children && enhanceNode.children.length > 0;
  const isExpanded = expandedKeys.includes(enhanceNode.key);
  const isDragAndDropMode = treeType === 'DRAG_DROP';

  // 드랍 위치에 따른 스타일링
  const dropIndicatorStyle = {
    BEFORE: 'absolute w-full h-0.5 bg-blue-400 -top-[1px] z-10 pointer-events-none',
    AFTER: 'absolute w-full h-0.5 bg-blue-400 bottom-[-1px] z-10 pointer-events-none',
    INSIDE: 'absolute inset-0 bg-blue-100 opacity-50 pointer-events-none rounded',
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

  const getNodeStyle = useMemo(() => {
    const styles = [
      `${dropPosition === 'INSIDE' ? 'bg-blue-200' : ''}
        ${isDragging ? 'opacity-50 scale-[0.98] border border-blue-300 bg-blue-50' : ''}`,
    ];

    if (selectedNode && selectedNode.key === enhanceNode.key) {
      styles.push('bg-[var(--gray4)]');
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
    } else {
      styles.push('');
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
    enhanceNode.title,
    searchKeyword,
  ]);
  // 드래그 가능하면 현재 노드 상위 컴포넌트로 콜백
  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    if (!isDraggable || enhanceNode.constraints?.drag === false) return;

    // try {
    //   // 드래그 이미지 생성
    //   const dragImage = document.createElement('div');
    //   dragImage.classList.add('drag-node-image');
    //   dragImage.innerHTML = `
    //   <div class="px-2 py-1 bg-blue-100 rounded border border-blue-300 shadow-md flex items-center">
    //     ${level === 0 ? '<span>🏠</span>' : '<span>📁</span>'}
    //     <span class="ml-2 font-medium">${enhanceNode.title || ''}</span>
    //   </div>
    // `;

    //   // 위치 조정 - 화면에 보이지 않게
    //   dragImage.style.position = 'absolute';
    //   dragImage.style.top = '-1000px';
    //   dragImage.style.left = '-1000px';
    //   dragImage.style.pointerEvents = 'none';

    //   // 문서에 추가
    //   document.body.appendChild(dragImage);

    //   // 드래그 이미지 설정
    //   e.dataTransfer.setDragImage(dragImage, 10, 10);
    //   e.dataTransfer.effectAllowed = 'move';

    //   // 상태 업데이트 - 한 번만 실행되도록
    //   if (!isDragging) {
    //     setIsDragging(true);
    //   }

    //   // 부모 컴포넌트 콜백 호출 - 한 번만
    //   onDragStart?.(enhanceNode);

    //   // 불필요한 DOM 요소 정리
    //   setTimeout(() => {
    //     if (document.body.contains(dragImage)) {
    //       document.body.removeChild(dragImage);
    //     }
    //   }, 0);
    // } catch (error) {
    //   console.error('Drag start error:', error);
    // }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  // 노드 위에 드래그 된 노드가 겹칠 때 계산.
  const handleDragOver = (e: React.DragEvent) => {
    if (enhanceNode.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 3;

    // 새 위치 계산
    const newPosition = y < threshold ? 'BEFORE' : y > rect.height - threshold ? 'AFTER' : 'INSIDE';

    // 이전과 다를 때만 상태 업데이트
    if (dropPosition !== newPosition) {
      setDropPosition(newPosition);
    }
  };

  // 노드 위에 드래그 된 노드가 벗어날 때
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPosition(null);
  };

  // 드랍되었을때 상위 컴포넌트로 콜백
  const handleDrop = (e: React.DragEvent) => {
    if (enhanceNode.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('bg-blue-100');

    onDrop({
      targetNode: enhanceNode,
      dropPosition: dropPosition || 'INSIDE',
    });
    setDropPosition(null);
  };

  // 접기, 펴기 토글.
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys((prev) =>
      isExpanded ? prev.filter((k) => k !== enhanceNode.key) : [...prev, enhanceNode.key],
    );
  };

  const handleClick = () => {
    if (enhanceNode && onNodeClick) onNodeClick(enhanceNode);
    if (enhanceNode === selectedNode && onNodeClick) onNodeClick(null);
  };

  // 햄버거 버튼으로 드래그 시작 (advanced 모드)
  const handleHamburgerDragStart = (e: React.DragEvent) => {
    handleDragStart(e);
  };

  return (
    <div className={styles.tree_item}>
      <div
        className={cn(getNodeStyle, styles.tree_inner)}
        style={{
          // paddingLeft: `${level * 20}px`,
          cursor: enhanceNode.constraints?.drag === false ? 'not-allowed' : 'grab',
          boxShadow: isDragging ? '0px 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'all 0.2s ease',
        }}
        draggable={isDragAndDropMode ? false : isActuallyDraggable}
        onDragStart={isDragAndDropMode ? undefined : handleDragStart}
        onDragEnd={handleDragEnd}
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
        {dropPosition && <div className={dropIndicatorStyle[dropPosition]} />}
        {hasChildren && (
          <span
            className={cn(hasChildren ? styles.has_children : '', styles.tree_menu)}
            onClick={handleToggleExpand}
          >
            {hasChildren ? (
              isExpanded ? (
                <IcoBoxMinus className={styles.icon_minus} width={20} height={21} />
              ) : (
                <IcoBoxPlus className={styles.icon_plus} />
              )
            ) : null}
          </span>
        )}
        <span className={cn(styles.folder_wrap)}>
          {isExpanded ? (
            <IcoFolderOpen stroke="#131C30" className={styles.icon_folder} />
          ) : (
            <IcoFolder stroke="#131C30" className={styles.icon_folder} />
          )}
        </span>
        <span className={styles.node_title}>{highlightMatch(enhanceNode.title || '')}</span>

        {treeType === 'DRAG_DROP' && (
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
                draggable={isDragAndDropMode && isActuallyDraggable}
                onDragStart={isDragAndDropMode ? handleHamburgerDragStart : undefined}
                onDragEnd={handleDragEnd}
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
        <div className={styles.tree_children}>
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
                size={size}
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
  initExpandedKeys = [], // 기본값 추가
  expandedKeys: externalExpandedKeys, // 외부에서 제어할 확장된 키
  onExpandedKeysChange, // 확장된 키 변경 콜백
  onSelectedNodeChange,
}: TreeProps) => {
  // 내부 상태 관리를 위한 초기 데이터 저장
  const [initialData, setInitialData] = useState<EnhancedTreeNode[]>(
    JSON.parse(JSON.stringify(data)),
  );
  // 현재 동작 중인 데이터
  const [treeData, setTreeData] = useState<EnhancedTreeNode[]>(JSON.parse(JSON.stringify(data)));

  const [internalSelectedNode, setInternalSelectedNode] = useState<TreeNode | null>(null);

  useEffect(() => {
    // 외부 selectedNode가 제공되었고 현재 내부 상태와 다르면 업데이트
    if (externalSelectedNode !== undefined) {
      setInternalSelectedNode(externalSelectedNode);
    }
  }, [externalSelectedNode]);

  const selectedNode =
    externalSelectedNode !== undefined ? externalSelectedNode : internalSelectedNode;

  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(initExpandedKeys);
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

  const [originalExpandedKeys, setOriginalExpandedKeys] = useState<string[]>([]); // 검색 전 확장 상태 저장
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색 중인지 상태 추가

  const [internalDragState, setInternalDragState] = useState<{
    node: TreeNode | null;
    sourceTreeId: string | null;
  }>({
    node: null,
    sourceTreeId: null,
  });
  const [draggedNodeKey, setDraggedNodeKey] = useState<string | null>(null);

  const treeContext = useTreeContext();

  const dragState = treeContext ? treeContext.dragState : internalDragState;
  const setDragState = treeContext ? treeContext.setDragState : setInternalDragState;

  // 검색 결과에 맞게 노드의 가시성 업데이트
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

  // 외부에서 데이터가 업데이트되면 initialData 업데이트
  useEffect(() => {
    setInitialData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  // 검색어 변경 시 노드 가시성 업데이트
  useEffect(() => {
    // 검색 상태 및 키워드 변경 처리를 위한 함수
    const handleSearchChange = () => {
      // 검색어가 없으면 모든 노드 표시 (initialData 기반)
      if (!searchKeyword) {
        // 검색 중이었다가 검색어를 지운 경우 원래 펼쳐진 상태로 복원
        if (isSearching) {
          // 전체 데이터에서 가시성만 업데이트
          const currentTreeData = JSON.parse(JSON.stringify(initialData));
          updateNodeVisibility(currentTreeData, '');
          setTreeData(currentTreeData);
          // 원래 확장 상태 복원
          // 직접 타이머를 사용하여 약간의 지연 후 확장 상태 복원
          setTimeout(() => {
            setExpandedKeys([...originalExpandedKeys]);
          }, 10);
          setIsSearching(false);
        }
        return;
      }

      // 처음 검색을 시작할 때만 현재 펼쳐진 상태 저장
      if (!isSearching) {
        setOriginalExpandedKeys([...expandedKeys]);
        setIsSearching(true);
      }

      // 노드 가시성 업데이트 - initialData 기반으로 검색
      const newTreeData = JSON.parse(JSON.stringify(initialData));
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
        setExpandedKeys([...newExpandedKeys]);
      }
    };

    // 검색 키워드나 검색 상태가 변경될 때만 처리
    handleSearchChange();
  }, [searchKeyword, initialData, isSearching, originalExpandedKeys, updateNodeVisibility]);

  // initialData가 변경되면 treeData 동기화 (외부에서 데이터가 바뀔 때)
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

  const getAllNodeKeys = useCallback((nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllNodeKeys(node.children));
      }
      return keys;
    }, []);
  }, []);

  useEffect(() => {
    if (expandTrigger !== undefined && !isSearching) {
      const newExpandedKeys = expandTrigger ? getAllNodeKeys(treeData) : [];
      setExpandedKeys(newExpandedKeys);
      setOriginalExpandedKeys(newExpandedKeys);
    }
  }, [expandTrigger, getAllNodeKeys, treeData, isSearching]);

  // 드래그&드랍 노드를 드랍하였을때
  const handleDrop = (dropInfo: DropInfo) => {
    if (!dragState.node) return;

    const { targetNode, dropPosition } = dropInfo;
    // 같은 트리면 이동, 다른 트리면 복사
    const actionType = dragState.sourceTreeId === treeId ? 'NODE_MOVE' : 'NODE_COPY';

    // if (targetNode && !isValidDrop(dragState.node.key, targetNode.key, treeData)) return;
    if (actionType === 'NODE_COPY' && findNodePath(treeData, dragState.node.key)) {
      alert('이미 트리에 해당 노드가 존재합니다.');
      return;
    }

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

    // 상태 업데이트 - 현재 트리 데이터 업데이트
    setTreeData(newTreeData);

    // initialData도 업데이트해서 검색 취소 후에도 변경사항이 유지되게 함
    // 참고: 여기서 treeData 대신 newTreeData를 사용해야 함
    const updatedInitialData = JSON.parse(JSON.stringify(newTreeData));

    // 가시성 속성 초기화 (모든 노드 표시)
    const fullData = JSON.parse(JSON.stringify(updatedInitialData));
    updateNodeVisibility(fullData, '');

    // 초기 데이터 업데이트 (검색 취소 후 사용할 데이터)
    setInitialData(fullData);

    // 액션 콜백 호출 (부모 컴포넌트에서 받은 treeData를 업데이트할 수 있도록)
    onAction?.({
      type: actionType,
      sourceNode: dragState.node,
      targetNode: targetNode,
      position: dropPosition,
      treeId,
    });
  };

  const canDragNode = (node: TreeNode): boolean => {
    if (type === 'SHUTTLE_LIST') return false;
    if (node.constraints?.drag === false) return false;
    return true;
  };

  const handleDragStart = (node: TreeNode) => {
    setDragState({ node: node, sourceTreeId: treeId });
    setDraggedNodeKey(node.key); // 드래그 중인 노드 키 저장

    // 드래그 애니메이션을 위한 CSS 클래스 설정
    document.body.classList.add('tree-dragging');
  };

  const handleNodeClick = (node: TreeNode | null) => {
    // 내부 상태 업데이트
    setInternalSelectedNode(node);

    // 외부 콜백을 통한 외부 상태 업데이트
    if (onSelectedNodeChange && node) {
      onSelectedNodeChange(node);
    }

    // 액션 핸들러 호출
    if (onAction && node) {
      onAction({ type: 'NODE_SELECT', node: node } as SelectEventPayload);
    }
  };

  // 검색 결과가 있는지 체크
  const hasVisibleNodes = useMemo(() => {
    if (!searchKeyword) return true;
    return treeData.some((node) => node._visible);
  }, [treeData, searchKeyword]);

  useEffect(() => {
    const handleGlobalDragEnd = () => {
      if (draggedNodeKey) {
        setDraggedNodeKey(null);
        document.body.classList.remove('tree-dragging');
      }
    };

    // draggedNodeKey가 있을 때만 이벤트 리스너 추가
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
        handleDrop({ targetNode: null, dropPosition: 'INSIDE' });
      }}
    >
      <div className={styles.tree}>
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
              draggedNodeKey={draggedNodeKey} // 드래그 중인 노드 키 전달
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
