import { FC, useEffect, useState } from 'react';
import { t } from 'i18next';
import {
  Button,
  ContentsRow,
  Switch,
  Tooltip,
  TreeView,
  TreeNode,
  DynamicFormField,
} from '@learnway/ui';

import { cn } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import titleStyles from '@learnway/styles/bo/assets/styles/modules/title.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { IcoFormRequired, IcoAlertCircle } from '@learnway/icons';
import { FormRow, ContentsHistoryInfoFormField } from '@shared/ui';

import { useFetchTenantCategory } from '@entities/tenant/service/tenant-category.hook';
import { transformApiDataToTreeData } from '@features/category/service/category.service';
import TenentCategoryView from '@features/tenant/ui/tenant-detail-category-view';
import { TenantCategoryTree } from './tenant-detail-category-tree';

type mode = 'init' | 'add' | 'view';

const TenantDetailCategoryComponent: FC<any> = ({ menuScope }) => {
  const [treeData, setTreeData] = useState();

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const [mode, setMode] = useState<mode>('init');
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const tenantId = 1;
  /*
  // switch : 사용 여부
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
  });
  // 상태 변경 함수 (Switch id에 따라 상태를 업데이트)
  const handleCheckedChange = (id: number) => (checked: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };*/
  const { data, refetch } = useFetchTenantCategory(tenantId);

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

  const handleExpandChange = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  return (
    <div className={cn(layoutStyles.start, layoutStyles.wrap)}>
      {treeData && (
        <TenantCategoryTree
          treeData={treeData}
          onNodeClick={handleNodeClick}
          expandedKeys={expandedKeys}
          onExpandChange={handleExpandChange}
          selectedKey={selectedNode?.key}
        />
      )}
      {selectedNode ? (
        <TenentCategoryView
          tenantId={tenantId}
          treeData={treeData}
          selectedNode={selectedNode}
          menu
          mode={mode}
          onReset={handleReset}
          onCancel={() => {
            setMode('view');
            if (!selectedNode) {
              setSelectedNode(null);
            }
          }}
        />
      ) : (
        <TenentCategoryView
          tenantId={tenantId}
          treeData={treeData}
          selectedNode={null}
          menu
          mode="init"
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

// tree
const sampleData: TreeNode[] = [
  {
    key: '1',
    title: '러닝웨이 1',
    isUsed: false,
    children: [
      {
        key: '1-1',
        title: 'Child 1',
        isUsed: true,
        children: [
          {
            key: '1-1-1',
            title: 'Grandchild 1',
            isUsed: true,
            children: [
              { key: '1-1-1-1', title: 'Grandchild 1', isUsed: true },
              { key: '1-1-1-2', title: 'Grandchild 2', isUsed: false },
              { key: '1-1-1-3', title: 'Grandchild 3', isUsed: false },
            ],
          },
          { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
        ],
      },
      { key: '1-2', title: 'Child 2', isUsed: true },
    ],
  },
  {
    key: '2',
    title: '러닝웨이 2',
    isUsed: false,
    children: [
      { key: '2-1', title: 'Child 3', isUsed: false },
      { key: '2-2', title: 'Child 4', isUsed: false },
    ],
  },
  {
    key: '3',
    title: '러닝웨이 3',
    isUsed: false,
    children: [
      { key: '3-1', title: 'Child 5', isUsed: false },
      { key: '3-2', title: 'Child 6', isUsed: false },
    ],
  },
  {
    key: '4',
    title: '러닝웨이 4',
    isUsed: false,
    children: [
      { key: '4-1', title: 'Child 7', isUsed: false },
      { key: '4-2', title: 'Child 8', isUsed: false },
    ],
  },
];
