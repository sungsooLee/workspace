import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button, findNodePath, Tabs, TreeNode, useModal } from '@learnway/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import {
  useCreateMenu,
  useDeleteMenu,
  useMenuManageFetchTree,
  useMoveMenu,
  useUpdateMenu,
} from '../../../../entities/menu/service/menu-manage.hook';
import { pageRouteConfig } from '../../../../features/auth';
import {
  findNodeByMenuId,
  transformApiDataToTreeData,
} from '../../../../features/platform/menu/service/menu.service';
import { MenuTree } from '../../../../features/platform/menu/ui/menu-tree';
import MenuViewComponent from '../../../../features/platform/menu/ui/menu-view';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { SectionLayout } from '../../../../widgets/layout/ui/container/section-layout/section-layout';

export const Route = createFileRoute('/_layout/platform/menu/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.page.title.menuManage',
    },
  }),
});

function RouteComponent() {
  const [treeData, setTreeData] = useState();
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // Mode: view, add , init
  const [mode, setMode] = useState('init');
  const [parentNode, setParentNode] = useState<TreeNode | null>(null);
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');
  const { confirm: openConfirm } = useModal();

  const router = useRouter();
  const { data } = useMenuManageFetchTree(selectedTabKey, 'ko');
  const { create } = useCreateMenu({});
  const { updateMenu } = useUpdateMenu({});
  const { deleteMenu } = useDeleteMenu({});
  const { moveMenu } = useMoveMenu({});

  // 데이터가 변경될 때 처리
  const prevDataRef = React.useRef(null);

  useEffect(() => {
    if (data) {
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
        // 새로 생성된 메뉴 노드 찾기
        const newNode = findNodeByMenuId(transformedData, lastCreatedMenuId);
        if (newNode) {
          // 노드 경로 찾기 (부모 노드들의 키)
          const nodePath = findNodePath(transformedData, lastCreatedMenuId);
          if (nodePath) {
            // 부모 노드들을 펼치기 위해 expandedKeys 업데이트
            // 마지막 노드(새로 생성된 노드)는 제외하지 않고 모두 포함
            setExpandedKeys((prev) => {
              const combined = [...new Set([...prev, ...nodePath])];
              return combined;
            });
            // 새 노드 선택
            setSelectedNode(newNode);
            setMode('view');
            // 처리 완료 후 ID 초기화
            setLastCreatedMenuId(null);
          }
        }
      }
    }
  }, [data, lastCreatedMenuId]);

  // 노드 클릭
  const handleNodeClick = (node: TreeNode) => {
    setMode('view');
    setSelectedNode(node);
  };

  // 노드 순서 변경
  const handleNodeMove = (
    menuId: number,
    destinationParentId: number,
    sortOrder: number,
    menuScopeCode: string,
  ) => {
    const payload = {
      menuId,
      destinationParentId,
      sortOrder,
      menuScopeCode,
    };
    moveMenu(payload);
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
      title: t('LABEL.confirm.save.title'),
      content: t('LABEL.confirm.save.message'),
      onClose: (value: boolean) => {
        if (value) {
          create(payload, {
            onSuccess: async (data: any) => {
              // 생성된 메뉴의 ID 저장
              if (data && data.menuId) {
                setLastCreatedMenuId(data.menuId.toString());
              }
            },
          });
        }
      },
    });
  };

  const handleUpdate = (payload: any) => {
    openConfirm({
      title: t('LABEL.confirm.modify.title'),
      content: t('LABEL.confirm.modify.message'),
      onClose: (value: boolean) => {
        if (value) {
          updateMenu(payload, {
            onSuccess: async (data: any) => {
              if (data && data.menuId) {
                setSelectedNode(null);
                setLastCreatedMenuId(data.menuId.toString());
              }
            },
          });
        }
      },
    });
  };

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  const handleDelete = (payload: any) => {
    //TODO: 삭제 이전에 해당 메뉴 테넌트 사용 여부 체크.
    openConfirm({
      title: t('LABEL.confirm.delete.title'),
      content: t('LABEL.confirm.delete.message', { type: '메뉴' }),
      onClose: (value: boolean) => {
        if (value) {
          deleteMenu(payload);
          setMode('init');
        }
      },
    });
  };

  const renderTabContent = (tabKey: string) => {
    return (
      <SectionLayout contentsRatio={'half'}>
        {treeData && (
          <MenuTree
            treeData={treeData}
            onNodeClick={handleNodeClick}
            onNodeMove={handleNodeMove} // 메뉴 움직일때
            onAddSubMenu={handleAddSubMenu}
            menuScope={tabKey}
            expandedKeys={expandedKeys} // 확장 상태 전달
            onExpandChange={handleExpandChange} // 확장 상태 변경 핸들러
            selectedKey={selectedNode?.key} // selectedKey 추가
          />
        )}
        {selectedNode || mode === 'add' ? (
          <MenuViewComponent
            treeData={treeData}
            selectedNode={selectedNode}
            menuScope={tabKey}
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
          <MenuViewComponent
            treeData={treeData}
            selectedNode={null}
            menuScope={tabKey}
            mode="init"
            parentNode={null}
            onSave={handleSave}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onCancel={() => {
              setMode('view');
              setParentNode(null);
            }}
          />
        )}
      </SectionLayout>
    );
  };

  // 새로 추가한 탭 변경 핸들러
  const handleTabChange = (tabKey: string) => {
    // 탭이 변경되었을 때만 처리
    if (tabKey !== selectedTabKey) {
      // 1. 선택된 탭 업데이트
      setSelectedTabKey(tabKey);

      // 2. 선택된 노드 초기화
      setSelectedNode(null);

      // 3. 모드를 init으로 설정
      setMode('init');

      // 4. 부모 노드 초기화
      setParentNode(null);

      // 5. expandedKeys 초기화
      setExpandedKeys([]);
    }
  };

  const items = [
    {
      title: t('LABEL.common.learnerMenu'),
      key: 'FO',
      content: renderTabContent('FO'),
    },
    {
      title: t('LABEL.common.hrdCenterMenu'),
      key: 'BO',
      content: renderTabContent('BO'),
    },
  ];

  return (
    <PageContainer scrollHidden={false}>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => {
            router.navigate({
              to: '/platform/system/multilingual',
              state: {
                keyType: selectedTabKey === 'FO' ? 'LEARNER_MENU' : 'HRD_CENTER_MENU',
              },
            });
          }}
        >
          {t('LABEL.button.multilingualManage')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          selectedTabKey={selectedTabKey}
          items={items}
          type="line"
          onTabChange={handleTabChange}
          className={styles.tab_wrap}
        />
      </MainContents>
    </PageContainer>
  );
}
