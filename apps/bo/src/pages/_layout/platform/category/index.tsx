import { useEffect, useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { Button, findNodePath, TreeNode, useModal } from '@learnway/ui';

import {
  useCreateCategory,
  useDeleteCategory,
  useFetchCategory,
  useMoveCategory,
  useUpdateCategory,
} from '@entities/category/service/category.hook';
import {
  findNodeByMenuId,
  transformApiDataToTreeData,
} from '@features/category/service/category.service';
import { CategoryTree } from '@features/category/ui/category-tree';
import CategoryView from '@features/category/ui/category-view';
import { pageRouteConfig } from '@features/auth/index';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { useCurrentRoute } from '@learnway/hooks';

// TODO
// 삭제시 에러코드 확인하여 팝업 처리
// 다국어 처리
export const Route = createFileRoute('/_layout/platform/category/')({
  component: RouteComponent,
  ...pageRouteConfig({}),
});

type mode = 'init' | 'add' | 'view';

function RouteComponent() {
  const { t } = useTranslation<'translation'>();
  // const { state } = useCurrentRoute(Route);
  const router = useRouter();

  const [treeData, setTreeData] = useState();

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // Mode: view, add , init
  const [mode, setMode] = useState<mode>('init');
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [lastCreatedMenuId, setLastCreatedMenuId] = useState<string | null>(null);

  const { confirm: openConfirm } = useModal();

  // 추후 현재 locale 정보 값 파라미터로 넘겨주기.
  const { data, refetch } = useFetchCategory();
  const { create } = useCreateCategory({});

  // 삭제
  const { delete: deleteCategory } = useDeleteCategory({});

  // 수정 mutation
  const { update: updateCategory } = useUpdateCategory({});

  // 이동
  const { move: moveCategory } = useMoveCategory({});

  useEffect(() => {
    // 이전 데이터와 현재 데이터가 다른 경우에만 처리 (데이터 로드 감지)
    // if (data && data !== prevDataRef.current) {
    if (data !== null && data !== undefined) {
      const transformedData = transformApiDataToTreeData(data);
      console.log('## transformedData :: ', transformedData);

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

  const handleReset = () => {
    setMode('init');
  };

  // 노드 클릭
  const handleNodeClick = (node: TreeNode) => {
    console.log('## click');
    setMode('view');
    setSelectedNode(node);
  };

  // 노드 순서 변경
  const handleNodeMove = (id: number, destinationParentId: number, sortSeq: number) => {
    const payload = {
      id,
      destinationParentId,
      sortSeq: sortSeq + 1,
    };
    moveCategory(payload, {
      onSuccess: async (data: any) => {
        await refetch();
      },
    });
  };

  //하위 메뉴 추가 버튼
  const handleAddSubMenu = (node: TreeNode) => {
    // 현재 노드 클릭이벤트.
    setSelectedNode(node);
    setMode('add');
    //접혀있으면 확장
    setExpandedKeys([...expandedKeys, node.key]);
  };

  // 메뉴 저장 핸들러
  const handleSave = (payload: any) => {
    openConfirm({
      title: t('LABEL.confirm.save.title'),
      content: <p>{t('LABEL.confirm.save.message')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          create(payload, {
            onSuccess: async (data: any) => {
              if (data) {
                setLastCreatedMenuId(data.toString());
              }
              await refetch();
            },
          });
        }
      },
    });
  };

  const handleUpdate = (payload: any) => {
    openConfirm({
      title: t('LABEL.confirm.modify.title'),
      content: <p>{t('LABEL.confirm.modify.message')}</p>,
      onClose: (value: boolean) => {
        if (value) {
          updateCategory(payload, {
            onSuccess: (data: any) => {
              console.log('#### success', data);
              refetch();
            },
            onError: (error: unknown) => {
              console.log('#### error', error);
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
      content: (
        <p>{t('LABEL.confirm.delete.message', { type: t('LABEL.common.code.category') })}</p>
      ),
      onClose: (value: boolean) => {
        if (value) {
          deleteCategory(payload, {
            onSuccess: async (data: any) => {
              await refetch();
              setMode('init');
            },
          });
        }
      },
    });
  };

  return (
    <PageContainer scrollHidden={true}>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => {
            router.navigate({
              to: '/platform/system/multilingual',
              state: {
                keyType: 'CATEGORY', // 다국어 분류 - 공통코드
              },
            });
          }}
        >
          {t('LABEL.link.multilingual')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
          {treeData && (
            <CategoryTree
              treeData={treeData}
              onNodeClick={handleNodeClick}
              onNodeMove={handleNodeMove} // 메뉴 움직일때
              onAddSubMenu={handleAddSubMenu}
              expandedKeys={expandedKeys} // 확장 상태 전달
              onExpandChange={handleExpandChange} // 확장 상태 변경 핸들러
              selectedKey={selectedNode?.key} // selectedKey 추가
            />
          )}
          {selectedNode ? (
            <CategoryView
              treeData={treeData}
              selectedNode={selectedNode}
              mode={mode}
              onReset={handleReset}
              onSave={handleSave}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onCancel={() => {
                setMode('view');
                if (!selectedNode) {
                  setSelectedNode(null);
                }
              }}
            />
          ) : (
            <CategoryView
              treeData={treeData}
              selectedNode={null}
              mode="init"
              onSave={handleSave}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onCancel={() => {
                setMode('view');
                setSelectedNode(null);
              }}
            />
          )}
        </div>
      </MainContents>
    </PageContainer>
  );
}
