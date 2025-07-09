import { ShuttleTreeToChipsV2, TreeNode, useShuttleTreeToChips } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@learnway/shared';
import { useFetchOrganizationTree } from '@entities/user-group';
import { Group, OrganizationTreeResponse } from '@types';

type UserGroupOrganizationComponentProps = {
  tenantIds: number[];
  option: Group[];
  handleSetOption: (data: Group[]) => void;
};

const UserGroupOrganizationComponent = ({
  tenantIds,
  option,
  handleSetOption,
}: UserGroupOrganizationComponentProps) => {
  const { data } = useFetchOrganizationTree(tenantIds);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  useEffect(() => {
    if (data && data.length > 0) {
      const transformedData = transformApiDataToTreeData(data);
      setTreeData(transformedData);
    }
  }, [data]);

  const initValue = useMemo<TreeNode[]>(
    () =>
      option.map(({ key, keys, id, ids, fullName, combiners }) => ({
        id,
        ids,
        key,
        keys,
        fullName,
        isCombined: combiners?.length > 1,
      })),
    [option],
  );

  const { selectedItems, handleSelectItem, cancelSelectItem, cancelAll } =
    useShuttleTreeToChips(initValue);

  useEffect(() => {
    if (selectedItems.length > 0) {
      const newOption: Group[] = selectedItems.map(({ key, keys, id, ids, fullName }) => {
        return {
          combiners: ids?.map((id: number) => ({ combineType: 'USER_GROUP', combineValue: id })),
          fullName,
          id,
          ids,
          key,
          keys,
        };
      });
      handleSetOption(newOption);
    }
  }, [selectedItems]);

  return (
    <div className={styles.wrap}>
      <div className={cn(styles.pop_contents, 'h-full')}>
        <ShuttleTreeToChipsV2
          sourceTitle="유저그룹 - 조직"
          targetTitle="선택 유저그룹 목록"
          treeData={treeData}
          selectedKey="fullName"
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItem}
          cancelSelectItem={cancelSelectItem}
          cancelAll={cancelAll}
        />
      </div>
    </div>
  );
};

export const UserGroupOrganization = UserGroupOrganizationComponent;

const transformApiDataToTreeData = (apiData: OrganizationTreeResponse[]): TreeNode[] => {
  const transform = (nodes: OrganizationTreeResponse[], parentId?: string) => {
    if (!nodes) return [];

    return nodes.map((node) => {
      const transformedNode = {
        ...node,
        key: `${parentId ? `${parentId}-` : ''}${node.id.toString()}`,
        title: node.name,
        parentId,
      } as unknown as TreeNode;

      if (node.children && node.children.length > 0) {
        transformedNode.children = transform(
          node.children,
          `${parentId ? `${parentId}-` : ''}${transformedNode.id}`,
        );
      }

      return transformedNode;
    });
  };

  return transform(apiData);
};
