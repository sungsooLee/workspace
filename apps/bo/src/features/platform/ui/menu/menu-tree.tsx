import { Button, Switch, TreeNode, TreeView } from '@learnway/ui';
import React, { FC, useEffect, useState } from 'react';

const defaultNode = {
  location: 'Root >',
  key: '',
  code: '',
  title: '',
  url: '',
  isPersonalInfo: false,
  description: '',
  isUsed: false,
};

// MenuTreeComponent 컴포넌트 정의
const MenuTreeComponent: FC<any> = ({ treeData, selectedChange, onChange }) => {
  // 확장/축소 상태를 관리하는 상태값
  const [expandSource, setExpandSource] = useState<boolean>(false);

  /**
   * 주어진 트리 구조(treeData)에서 특정 노드(key)의 위치(location)와 부모 키(parentKey)를 반환하는 함수
   * @param {string} targetKey - 찾고자 하는 노드의 key
   * @returns {{ location: string; parentKey: string | null } | null} - 노드 위치와 부모 키 정보를 반환
   */
  function getNodeInfo(targetKey: string): { location: string; parentKey: string | null } | null {
    function traverse(
      nodes: TreeNode[],
      path: string[],
      parentKey: string | null,
    ): { location: string; parentKey: string | null } | null {
      for (const node of nodes) {
        // 현재 경로를 업데이트
        const currentPath = [...path, node.title] as string[];
        if (node.key === targetKey) {
          return { location: currentPath.join(' > '), parentKey };
        }
        // 자식 노드 재귀적으로 탐색
        if (node.children) {
          const result = traverse(node.children, currentPath, node.key);
          if (result) return result;
        }
      }
      return null;
    }
    return traverse(treeData, ['Root'], null); // 초기 경로 설정 및 탐색 시작
  }

  /**
   * 특정 노드의 `isUsed` 값을 토글(반대 값으로 변경)하고, 부모/자식 관계를 반영하여 트리 데이터를 업데이트
   * @param {TreeNode[]} nodes - 업데이트할 트리 데이터
   * @param {string} targetKey - 토글할 노드의 key값
   * @returns {TreeNode[]} - 업데이트된 트리 데이터
   */
  const toggleNodeUsage = (nodes: TreeNode[], targetKey: string): TreeNode[] => {
    const updatedNodes = nodes.map((node) => {
      if (node.key === targetKey) {
        // 현재 노드를 토글
        const newIsUsed = !node.isUsed;
        return {
          ...node,
          isUsed: newIsUsed,
          children: node.children ? updateChildrenUsage(node.children, newIsUsed) : node.children,
        };
      }

      // 자식 노드를 재귀적으로 탐색
      return {
        ...node,
        children: node.children ? toggleNodeUsage(node.children, targetKey) : node.children,
      };
    });

    // 부모 노드의 상태를 자식 노드로부터 갱신
    return updateParentUsage(updatedNodes);
  };

  /**
   * 자식 중 하나라도 `isUsed`가 true라면 부모 노드의 `isUsed` 값을 true로 업데이트
   * @param {TreeNode[]} nodes - 자식 노드들을 포함하는 배열
   * @returns {TreeNode[]} - 부모 노드의 상태를 업데이트한 배열
   */
  const updateParentUsage = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map((node) => {
      if (node.children && node.children.some((child) => child.isUsed)) {
        return {
          ...node,
          isUsed: true,
          children: updateParentUsage(node.children), // 하위 노드에 대해 재귀 적용
        };
      }
      return node;
    });
  };

  /**
   * 부모 노드의 `isUsed` 값을 자식들에게 반영
   * @param {TreeNode[]} children - 자식 노드 배열
   * @param {boolean} newIsUsed - 부모 노드의 새로운 `isUsed` 상태
   * @returns {TreeNode[]} - 업데이트된 자식 노드 배열
   */
  const updateChildrenUsage = (children: TreeNode[], newIsUsed: boolean): TreeNode[] => {
    return children.map((child) => ({
      ...child,
      isUsed: newIsUsed,
      children: child.children ? updateChildrenUsage(child.children, newIsUsed) : child.children,
    }));
  };

  /**
   * 특정 노드를 토글하여 변경된 트리 데이터를 상위 컴포넌트에 전달하는 함수
   * @param {TreeNode} node - 토글할 대상 노드
   */
  const handleToggleUsed = (node: TreeNode) => {
    onChange(toggleNodeUsage(treeData, node.key));
  };

  /**
   * 경로 문자열에서 마지막 경로를 제거
   * @param {string} path - 경로 문자열
   * @returns {string} - 마지막 경로가 제거된 문자열
   */
  const removeLastPath = (path: string): string => {
    const lastIndex = path.lastIndexOf(' > ');
    return lastIndex !== -1 ? path.slice(0, lastIndex) : path;
  };

  /**
   * 노드를 수정하기 위한 데이터를 생성 및 상위로 전달
   * @param {TreeNode} node - 수정할 노드
   */
  const handleModify = (node: TreeNode) => {
    const { location } = getNodeInfo(node.key) || {};
    selectedChange({
      type: 'EDIT',
      node: {
        location: removeLastPath(location + ' >' || ''),
        parentKey: node.parentKey,
        code: node.code,
        description: node.description,
        isUsed: node.isUsed,
        isPersonalInfo: node.isPersonalInfo,
        key: node.key,
        title: node.title,
        url: node.url,
      },
    });
  };

  /**
   * 새 메뉴를 추가하거나, 부모 노드의 정보를 참조하여 새 노드를 추가
   * @param {any} node - 부모 노드 정보 (선택적)
   */
  const handleAddMenu = (node?: any) => {
    const key = new Date().getTime().toString();
    if (node) {
      const { location } = getNodeInfo(node.parentKey) || {};
      selectedChange({
        type: 'ADD',
        node: {
          location,
          parentKey: node.parentKey,
          code: '',
          description: '',
          isUsed: false,
          isPersonalInfo: false,
          key,
          title: '',
          url: '',
        },
      });
    } else {
      const newVar = {
        type: 'ADD',
        node: { ...defaultNode, key },
      };
      selectedChange(newVar);
    }
  };

  const handleOnDelete = (node: any) => {
    onChange(deleteNode(treeData, node.key));
  };

  /**
   * 특정 key를 가진 노드를 삭제
   */
  const deleteNode = (tree: TreeNode[], key: string): TreeNode[] => {
    return tree
      .filter((node) => node.key !== key) // 현재 노드가 삭제 대상이면 제거
      .map((node) => ({
        ...node,
        children: node.children ? deleteNode(node.children, key) : node.children,
      }));
  };

  /**
   * 각 노드의 작업 버튼을 렌더링
   * @param {TreeNode} node - 렌더링할 노드
   * @param {number} level - 노드의 계층 레벨
   * @returns {JSX.Element} - 노드의 작업 버튼 UI
   */
  const renderNodeButtons = (node: TreeNode, level: number) => (
    <div className={'gap-10px flex'}>
      <div className={'hidden items-center group-hover:flex'}>
        <Button
          onClick={() => handleOnDelete(node)}
          variant="line"
          className={'text-red-600'}
          size={'sm'}
          type={'button'}>
          삭제
        </Button>
        {level <= 1 && ( // 상위 1레벨까지만 하위 메뉴 추가 버튼 표시
          <Button
            onClick={() =>
              handleAddMenu({
                parentKey: node.key,
              })
            }
            variant="line"
            size={'sm'}
            type={'button'}>
            + 하위 메뉴 추가
          </Button>
        )}
        <Button onClick={() => handleModify(node)} variant="line" size={'sm'} type={'button'}>
          수정
        </Button>
      </div>
      <div className={'flex items-center justify-center'}>
        <Switch
          onClick={(e) => e.preventDefault()} // preventDefault로 클릭 이벤트 전파 방지
          checked={node.isUsed}
          onCheckedChange={() => handleToggleUsed(node)}
        />
      </div>
    </div>
  );

  /**
   * 컴포넌트 마운트 시 기본 노드 추가 작업 실행
   */
  useEffect(() => {
    selectedChange({
      type: 'ADD',
      node: defaultNode,
    });
  }, []);

  return (
    <div className={'flex-1 rounded-2xl bg-white p-5'}>
      {/* 상단 제목 및 버튼 */}
      <Title title={'GNB 메뉴'}>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => setExpandSource(!expandSource)}>
          {expandSource ? '축소' : '확장'}
        </Button>
        <Button type="button" variant="point" size="sm" onClick={() => handleAddMenu()}>
          메뉴추가
        </Button>
      </Title>

      {/* 트리 뷰 렌더링 */}
      <TreeView
        data={treeData}
        treeId={'1'}
        expandTrigger={expandSource}
        nodeButtons={renderNodeButtons}
        type={'advanced'}
      />
    </div>
  );
};

export const MenuTree = MenuTreeComponent;

const Title: FC<any> = ({ title, children }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        <div className="flex items-center space-x-2">{children}</div>
      </div>
      <hr className="mt-2 w-full border-t-2 border-gray-900" />
    </div>
  );
};
