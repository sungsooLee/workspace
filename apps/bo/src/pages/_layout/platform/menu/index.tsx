import { createFileRoute } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, findNodeByKey, Tabs, TreeNode } from '@learnway/ui';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import React, { useEffect, useState } from 'react';
import { MenuTree } from '../../../../features/menu/ui/menu-tree';
import MenuView from '../../../../features/menu/ui/menu-view';
import { IcoAnnouncement03 } from '../../../../../../../libs/icons/src';
import { cn } from '@learnway/shared';
import {
  useCreateMenu,
  useMenuManagerFetchTree,
  useMenuMangerFetchMenus,
} from '../../../../entities/menu/service/menu-manager.hook';
import { transformApiDataToTreeData } from '../../../../features/menu/service/menu.service';

export const Route = createFileRoute('/_layout/platform/menu/')({
  component: RouteComponent,
});

function RouteComponent() {
  // const [initData, setInitData] = useState<any>();
  const [treeData, setTreeData] = useState();
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // Mode: view, add
  const [mode, setMode] = useState('view');
  const [parentNode, setParentNode] = useState<TreeNode | null>(null);
  const [selectedTabKey] = useState<string>('FO');

  // 추후 현재 locale 정보 값 파라미터로 넘겨주기.
  const { data, isLoading, refetch } = useMenuManagerFetchTree(selectedTabKey, 'ko');
  // 메뉴 생성 mutation
  const { create, data: createdMenuData } = useCreateMenu({
    onSuccess: (data: any) => {
      console.log(data);
      // 생성된 메뉴의 ID 저장
      if (data && data.menuId) {
        setLastCreatedMenuId(data.menuId.toString());
      }
      // 트리 데이터 재조회
      refetch();
    },
  });
  useEffect(() => {
    if (data) {
      const transformedData = transformApiDataToTreeData(data);
      setTreeData(transformedData);
      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        // 첫 번째 레벨만 확장
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
      // 새로 추가된 메뉴가 있으면 관련 경로 확장
      // if (lastCreatedMenuId) {
      //   expandNodePath(transformedData, lastCreatedMenuId);
      // }
    }
  }, [data]);

  const handleNodeClick = (node: TreeNode) => {
    setMode('view');
    setSelectedNode(node);
  };

  const handleAddSubMenu = (parentNode: TreeNode) => {
    setParentNode(parentNode);
    setSelectedNode(null);
    setMode('add');
  };

  // 메뉴 저장 핸들러
  const handleSave = (payload: any) => {
    create(payload);

    setMode('view');
  };

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  const items = [
    {
      title: '학습자 메뉴',
      key: 'FO',
      content: (
        <div className="mt-2 flex gap-[20px]">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {treeData && (
                <MenuTree
                  treeData={treeData}
                  onNodeClick={handleNodeClick}
                  onAddSubMenu={handleAddSubMenu}
                  // onDeleteNode={handleDeleteNode}
                  expandedKeys={expandedKeys} // 확장 상태 전달
                  onExpandChange={handleExpandChange} // 확장 상태 변경 핸들러
                />
              )}
              {selectedNode || mode === 'add' ? (
                <MenuView
                  treeData={treeData}
                  selectedNode={selectedNode}
                  menuScope={selectedTabKey}
                  menu
                  mode={mode}
                  parentNode={parentNode}
                  onSave={handleSave}
                  onCancel={() => {
                    setMode('view');
                    if (!selectedNode) {
                      setParentNode(null);
                    }
                  }}
                />
              ) : (
                <div className={'flex-1 rounded-2xl bg-white p-5'}>
                  <div className="flex w-full flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">러닝웨이</span>
                      </div>
                    </div>
                    <hr className="mt-2 w-full border-t-2 border-gray-900" />
                  </div>
                  <div>
                    좌측 메뉴 목록에서 메뉴를 추가할 상위메뉴를 마우스 오버한 후 ‘하위메뉴추가’로
                    메뉴를 추가하세요.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      title: 'HRD센터 메뉴',
      key: 'BO',
      content: <>BO</>,
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="primary" size="sm">
          저장
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs selectedTabKey={selectedTabKey} items={items} type="line" />
      </MainContents>
    </PageContainer>
  );
}
