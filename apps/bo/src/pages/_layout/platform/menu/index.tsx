import { createFileRoute } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, findNodeByKey, findNodePath, Tabs, TreeNode, useModal } from '@learnway/ui';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import React, { useEffect, useState } from 'react';
import { MenuTree } from '../../../../features/menu/ui/menu-tree';
import MenuView from '../../../../features/menu/ui/menu-view';
import { IcoAnnouncement03 } from '../../../../../../../libs/icons/src';
import { cn } from '@learnway/shared';
import {
  useCreateMenu,
  useDeleteMenu,
  useMenuManagerFetchTree,
  useMenuMangerFetchMenus,
  useUpdateMenu,
} from '../../../../entities/menu/service/menu-manager.hook';
import {
  findNodeByMenuId,
  transformApiDataToTreeData,
} from '../../../../features/menu/service/menu.service';

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
  const { confirm: openConfirm } = useModal();

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
      refetch().then(() => {});
    },
  });
  // 메뉴 수정 mutation
  const { updateMenu, data: updatedMenuData } = useUpdateMenu({
    onSuccess: (data: any) => {
      console.log(data);

      if (data && data.menuId) {
        setLastCreatedMenuId(data.menuId.toString());
      }

      refetch().then(() => {});
    },
  });
  // 메뉴 삭제 mutation
  const { deleteMenu, data: deletedMenuData } = useDeleteMenu({
    onSuccess: (data: any) => {
      console.log(data);

      refetch().then(() => {});
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     const transformedData = transformApiDataToTreeData(data);
  //     setTreeData(transformedData);
  //     if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
  //       // 첫 번째 레벨만 확장
  //       const firstLevelKeys = transformedData.map((node: any) => node.key);
  //       setExpandedKeys(firstLevelKeys);
  //     }
  //     // 새로 추가된 메뉴가 있으면 관련 경로 확장
  //     // if (lastCreatedMenuId) {
  //     //   expandNodePath(transformedData, lastCreatedMenuId);
  //     // }
  //   }
  // }, [data]);
  // 데이터가 변경될 때 처리
  const prevDataRef = React.useRef(null);

  useEffect(() => {
    // 이전 데이터와 현재 데이터가 다른 경우에만 처리 (데이터 로드 감지)
    if (data && data !== prevDataRef.current) {
      prevDataRef.current = data;

      const transformedData = transformApiDataToTreeData(data);
      setTreeData(transformedData);

      // 초기 로딩 시 첫 번째 레벨 확장
      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }

      // 새로 추가된 메뉴가 있는 경우 - lastCreatedMenuId로 체크
      if (lastCreatedMenuId) {
        console.log('새 메뉴 ID 발견, 노드 찾기 시도:', lastCreatedMenuId);

        // 새로 생성된 메뉴 노드 찾기
        const newNode = findNodeByMenuId(transformedData, lastCreatedMenuId);

        if (newNode) {
          console.log('새 노드 찾음:', newNode);

          // 노드 경로 찾기 (부모 노드들의 키)
          const nodePath = findNodePath(transformedData, lastCreatedMenuId);

          if (nodePath) {
            // 부모 노드들을 펼치기 위해 expandedKeys 업데이트
            // 마지막 노드(새로 생성된 노드)는 제외하지 않고 모두 포함
            setExpandedKeys((prev) => {
              // 기존 확장된 키들과 새 경로를 합쳐서 중복 제거
              const combined = [...new Set([...prev, ...nodePath])];
              return combined;
            });

            // 새 노드 선택
            setSelectedNode(newNode);
            setMode('view');

            // 처리 완료 후 ID 초기화
            setLastCreatedMenuId(null);
          }
        } else {
          console.log('새 노드를 찾을 수 없음:', lastCreatedMenuId);
        }
      }
    }
  }, [data, lastCreatedMenuId]);

  // 노드 클릭
  const handleNodeClick = (node: TreeNode) => {
    setMode('view');
    setSelectedNode(node);
  };

  //하위 메뉴 추가 버튼
  const handleAddSubMenu = (parentNode: TreeNode) => {
    //접혀있으면 확장
    setExpandedKeys([...expandedKeys, parentNode.key]);
    setParentNode(parentNode);
    // 현재 노드 클릭이벤트.
    setSelectedNode(parentNode);
    setMode('add');
  };

  // 메뉴 저장 핸들러
  const handleSave = (payload: any) => {
    openConfirm({
      title: '저장 하시겠습니까?',
      content: (
        <>
          <p>입력한 정보로 저장됩니다.</p>
        </>
      ),
      onClose: (value: boolean) => {
        if (value) {
          create(payload);
          setMode('view');
        }
      },
    });
  };

  const handleUpdate = (payload: any) => {
    console.log(payload);
    updateMenu(payload);
    // setMode('view');
  };

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  const handleDelete = (payload: any) => {
    //TODO: 삭제 이전에 해당 메뉴 테넌트 사용 여부 체크.

    openConfirm({
      title: '삭제 하시겠습니까?',
      content: (
        <>
          <p>하위 카테고리 존재 시 모두 삭제되며,</p>
          <p>삭제 후 복구할 수 없습니다.</p>
        </>
      ),
      onClose: (value: boolean) => {
        if (value) {
          deleteMenu(payload);
        }
      },
    });
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
                  selectedKey={selectedNode?.key} // selectedKey 추가
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
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
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
