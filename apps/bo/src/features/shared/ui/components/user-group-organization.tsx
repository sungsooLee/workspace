import { ShuttleTreeToChipsV2, TreeNode } from '@learnway/ui';
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

  const handleSelectedItemsChange = (value: TreeNode) => {
    setSelectedItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
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
          handleSelectItem={handleSelectedItemsChange}
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
