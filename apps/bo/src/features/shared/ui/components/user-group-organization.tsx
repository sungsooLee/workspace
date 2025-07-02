import { flattenNodeWithChildren, ShuttleTreeToChipsV2, TreeNode } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import { useFetchOrganizationTree } from '@entities/user-group';
import { OrganizationTreeResponse } from '@types';

type UserGroupOrganizationComponentProps = {
  tenantIds: number[];
  handleSetOption: (data: any) => void;
};

const UserGroupOrganizationComponent = ({
  tenantIds,
  handleSetOption,
}: UserGroupOrganizationComponentProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { data } = useFetchOrganizationTree(tenantIds);

  useEffect(() => {
    if (data && data.length > 0) {
      const transformedData = transformApiDataToTreeData(data);
      setTreeData(transformedData);
    }
  }, [data]);

  // 단일 선택
  const handleSelectItem = (value: TreeNode) => {
    setSelectedItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // 하위 노드 전체 선택
  const handleSelectItemWithChildren = (value: TreeNode) => {
    let nodesToAdd = [value];
    if (value.children && value.children.length > 0) {
      nodesToAdd = flattenNodeWithChildren(value);
    }

    // const selectableNodes = nodesToAdd.filter((node) => node.apiNodeType === 'API');

    const filteredNodesToAdd = nodesToAdd.filter(
      (n) => !selectedItems.some((item) => item.key === n.key),
    );

    setSelectedItems([...selectedItems, ...filteredNodesToAdd]);
  };

  const cancelSelectItem = (value: TreeNode) => {
    setSelectedItems((prev) => prev.filter((v) => v !== value));
  };

  return (
    <div className={styles.wrap}>
      <div className={cn(styles.pop_contents, 'h-full')}>
        <ShuttleTreeToChipsV2
          sourceTitle="유저그룹 - 조직"
          targetTitle="선택 유저그룹 목록"
          treeData={treeData}
          selectedKey="fullName"
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItemWithChildren}
          cancelSelectItem={cancelSelectItem}
        />
      </div>
    </div>
  );
};

export const UserGroupOrganization = UserGroupOrganizationComponent;

const transformApiDataToTreeData = (apiData: OrganizationTreeResponse[]): TreeNode[] => {
  const transform = (nodes: OrganizationTreeResponse[], parentId?: number) => {
    if (!nodes) return [];

    return nodes.map((node) => {
      const transformedNode = {
        ...node,
        key: node.id.toString(),
        title: node.name,
        parentId,
      } as unknown as TreeNode;

      if (node.children && node.children.length > 0) {
        transformedNode.children = transform(node.children, transformedNode.id);
      }

      return transformedNode;
    });
  };

  return transform(apiData);
};
