import { createFileRoute } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, TreeNode } from '@learnway/ui';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import React, { useEffect, useState } from 'react';
import { MenuTree } from '../../../../features/platform/ui/menu/menu-tree';
import MenuView from '../../../../features/platform/ui/menu/menu-view';

export const Route = createFileRoute('/_layout/platform/menu/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [initData, setInitData] = useState<any>(initTreeData);
  const [treeData, setTreeData] = useState<any>();
  const [selectedTreeData, setSelectedTreeData] = useState<any>({});
  /**
   * 기초 GNB 메뉴 추가로 세팅
   */
  const initDefaultData = () => {
    const key = new Date().getTime().toString();
    setSelectedTreeData({
      type: 'ADD',
      node: {
        location: 'Root >',
        key: key,
        code: '',
        title: '',
        url: '',
        isPersonalInfo: false,
        description: '',
        isUsed: false,
      },
    });
  };
  /**
   * 트리 데이터를 변경하는 작업을 처리합니다.
   * 이 함수는 데이터를 매개변수로 받아 콘솔에 해당 데이터를 출력한 뒤,
   * 트리 데이터 상태를 새로운 데이터로 업데이트합니다.
   * @param {any} data - 처리 및 저장할 갱신된 트리 데이터.
   */
  const handleTreeDataChange = (data: any) => {
    setTreeData(data);
  };
  const handleReset = () => {
    setTreeData(initData);
  };
  const handleCurdTreeDataChange = (data: any) => {
    const { type, node } = data;

    initDefaultData();
    switch (type) {
      case 'ADD':
        if (!node.parentKey || node.parentKey === '') {
          setInitData([...treeData, { ...node }]);
          break;
        } else {
          const treeNodes = addNode(treeData, node.parentKey, node);
          setInitData(treeNodes);
          break;
        }
      case 'EDIT':
        if (!node.key) {
          return treeData;
        }
        setInitData(modifyNode(treeData, node.key, node));

        break;
      case 'DELETE':
        if (!node.key) {
          return treeData;
        }
        setInitData(deleteNode(treeData, node.key));
    }
  };

  /**
   * 부모 key에 해당하는 곳에 새 노드 추가
   */
  const addNode = (tree: TreeNode[], parentKey: string, newNode: TreeNode): TreeNode[] => {
    return tree.map((node) => {
      if (node.key === parentKey) {
        return {
          ...node,
          children: [...(node.children || []), newNode], // 자식 리스트에 추가
        };
      }
      return {
        ...node,
        children: node.children ? addNode(node.children, parentKey, newNode) : node.children,
      };
    });
  };

  /**
   * 특정 key를 가진 노드 수정
   */
  const modifyNode = (
    tree: TreeNode[],
    key: string,
    updatedNode: Partial<TreeNode>,
  ): TreeNode[] => {
    return tree.map((node) => {
      if (node.key === key) {
        return { ...node, ...updatedNode }; // 기존 값 + 수정된 값
      }
      return {
        ...node,
        children: node.children ? modifyNode(node.children, key, updatedNode) : node.children,
      };
    });
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

  const handleSaveTree = () => {
    setInitData(treeData);
  };

  useEffect(() => {
    setTreeData(initData);
  }, [initData]);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleReset}>
          GNB 메뉴 초기화
        </Button>
        <Button type="button" variant="point" size="sm" onClick={handleSaveTree}>
          GNB 메뉴 저장
        </Button>
      </ContentsButtons>
      <MainContents>
        <div className={'mt-2 flex gap-[20px]'}>
          {treeData && (
            <MenuTree
              treeData={treeData}
              selectedChange={setSelectedTreeData}
              onChange={handleTreeDataChange}
            />
          )}
          <MenuView treeData={selectedTreeData} onChange={handleCurdTreeDataChange} />
        </div>
      </MainContents>
    </PageContainer>
  );
}

const initTreeData: TreeNode[] = [
  {
    key: '1',
    title: 'Root Node 1',
    code: 'ROOT',
    isUsed: false,
    url: '/root',
    description: 'ROOT 메뉴 입니다.',
    isPersonalInfo: false,

    children: [
      {
        key: '1-1',
        parentKey: '1',
        title: 'Child 1',
        isUsed: false,
        code: '1-1',
        url: '/root/1-1',
        description: '1-1 메뉴 입니다.',
        isPersonalInfo: false,
        children: [
          {
            key: '1-1-1',
            parentKey: '1-1',
            title: 'Grandchild 1',
            isUsed: false,
            code: '1-1-1',
            url: '/root/1-1-1',
            description: '1-1-1 메뉴 입니다.',
            isPersonalInfo: false,
          },
          {
            key: '1-1-2',
            parentKey: '1-1',
            title: 'Grandchild 2',
            isUsed: false,
            code: '1-1-2',
            url: '/root/1-1-2',
            description: '1-1-2 메뉴 입니다.',
            isPersonalInfo: false,
          },
        ],
      },
      {
        key: '1-2',
        parentKey: '1',
        title: 'Child 2',
        isUsed: false,
        code: '1-2',
        url: '/root/1-2',
        description: '1-2 메뉴 입니다.',
        isPersonalInfo: false,
      },
    ],
  },
  {
    key: '2',
    title: 'Root Node 2',
    isUsed: false,
    code: 'ROOT2',
    url: '/root2',
    description: 'ROOT2 메뉴 입니다.',
    isPersonalInfo: false,
    children: [
      {
        key: '2-1',
        parentKey: '2',
        title: 'Child 3',
        isUsed: false,
        code: '2-1',
        url: '/root/2-1',
        description: '2-1 메뉴 입니다.',
        isPersonalInfo: false,
      },
      {
        key: '2-2',
        parentKey: '2',
        title: 'Child 4',
        isUsed: false,
        code: '2-2',
        url: '/root/2-2',
        description: '2-2 메뉴 입니다.',
        isPersonalInfo: false,
      },
    ],
  },
];
