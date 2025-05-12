import { FC, useEffect, useState } from 'react';
import { TreeNode, useModal } from '@learnway/ui';
import { useRouterState } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css

import {
  useDeleteTenantCategory,
  useFetchTenantCategory,
  useUpdateTenantCategory,
  useMoveTenantCategory,
  useCreateTenantCategory,
} from '@entities/tenant/service/tenant-category.hook';
//import { transformApiDataToTreeData } from '@features/category/service/category.service';
import { transformApiDataToTreeData } from '@features/platform/category';
import TenantCategoryView from '@features/tenant/management/ui/tenant-detail-category-view';
import { TenantCategoryTree } from './tenant-detail-category-tree';

type mode = 'init' | 'add' | 'view';

const TenantDetailCategoryComponent: FC<any> = ({ menuScope }) => {
  const [treeData, setTreeData] = useState();

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const [mode, setMode] = useState<mode>('init');
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const { confirm: openConfirm } = useModal();

  const routerState = useRouterState();
  const tenantId = routerState.location.state?.tenantId || '1';

  const { data, refetch } = useFetchTenantCategory(tenantId);

  // TODO. 테넌트 상세 조회 후, 공통 카테고리 사용 여부
  const useCommonMapping = true;
  // TODO. 테넌트 상세 조회 후, 테넌트 카테고리 사용 여부
  const useTenantMapping = true;
  // TODO. 사용자가 테넌트 관리자인 경우
  const isTenantManager = true;

  // delete
  const { delete: deleteTenantCategory } = useDeleteTenantCategory(tenantId, {
    onSuccess: async (data: any) => {
      await refetch();
      setMode('init');
    },
  });

  const { update: updateTenantCategory } = useUpdateTenantCategory(tenantId, {});
  const { create: createTenantCategory } = useCreateTenantCategory(tenantId, {});

  const { move: moveTenantCategory } = useMoveTenantCategory(tenantId, {
    onSuccess: async (data: any) => {
      await refetch();
    },
    onError: async (data: any) => {
      //
    },
  });

  useEffect(() => {
    if (data !== null && data !== undefined) {
      const transformedData = transformApiDataToTreeData(data);
      console.log('## transformedData :: ', transformedData);

      setTreeData(transformedData);

      if (transformedData && transformedData.length > 0 && expandedKeys.length === 0) {
        const firstLevelKeys = transformedData.map((node: any) => node.key);
        setExpandedKeys(firstLevelKeys);
      }
    }
  }, [data]);

  const handleReset = () => {
    setMode('init');
  };

  const handleNodeClick = (node: TreeNode) => {
    console.log('## click');
    setMode('view');
    setSelectedNode(node);
  };

  const handleNodeMove = (id: number, destinationParentId: number, sortSeq: number) => {
    const payload = {
      id,
      destinationParentId,
      sortSeq: sortSeq + 1,
    };
    console.log('## payload', payload);
    moveTenantCategory({
      tenantId: tenantId,
      categoryId: id,
      data: payload,
    });
  };

  const handleNodeAdd = (node: TreeNode) => {
    setSelectedNode(node);
    setMode('add');
    setExpandedKeys([...expandedKeys, node.key]);
  };

  const handleSave = (payload: any) => {
    openConfirm({
      title: '저장 하시겠습니까?',
      content: <p>입력한 정보로 저장됩니다.</p>,
      onClose: (value: boolean) => {
        if (value) {
          createTenantCategory(payload, {
            onSuccess: (data: any) => {
              console.log('#### success', data);
              refetch();
            },
          });
        }
      },
    });
  };

  const handleUpdate = (payload: any) => {
    console.log('>> payload', payload);
    openConfirm({
      title: '저장 하시겠습니까?',
      content: <p>입력한 정보로 저장됩니다.</p>,
      onClose: (value: boolean) => {
        if (value) {
          updateTenantCategory(payload, {
            onSuccess: (data: any) => {
              console.log('#### success', data);
              refetch();
            },
          });
        }
      },
    });
  };

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  const handleNodeChange = () => {
    refetch();
    setMode('init');
  };

  const handleDelete = (payload: any) => {
    openConfirm({
      title: '삭제 하시겠습니까?',
      content: <p>삭제 후 복구할 수 없습니다.</p>,
      onClose: (value: boolean) => {
        if (value) {
          console.log('date!', payload);
          deleteTenantCategory(payload);
          setMode('init');
        }
      },
    });
  };

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      {treeData && (
        <TenantCategoryTree
          treeData={treeData}
          isTenantManager={isTenantManager}
          onNodeClick={handleNodeClick}
          onNodeMove={handleNodeMove}
          onNodeAdd={handleNodeAdd}
          expandedKeys={expandedKeys}
          onExpandChange={handleExpandChange}
          selectedKey={selectedNode?.key}
          onNodeChange={handleNodeChange}
          useCommonMapping={useCommonMapping}
          useTenantMapping={useTenantMapping}
        />
      )}
      {selectedNode ? (
        <TenantCategoryView
          tenantId={tenantId}
          treeData={treeData}
          selectedNode={selectedNode}
          menu
          mode={mode}
          isTenantManager={isTenantManager}
          useCommonMapping={useCommonMapping}
          useTenantMapping={useTenantMapping}
          onSave={handleSave}
          onReset={handleReset}
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
        <TenantCategoryView
          tenantId={tenantId}
          treeData={treeData}
          selectedNode={null}
          menu
          mode="init"
          isTenantManager={isTenantManager}
          useCommonMapping={useCommonMapping}
          useTenantMapping={useTenantMapping}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={() => {
            setMode('view');
            setSelectedNode(null);
          }}
        />
      )}
    </div>
  );
};

export const TenantDetailCategory = TenantDetailCategoryComponent;
