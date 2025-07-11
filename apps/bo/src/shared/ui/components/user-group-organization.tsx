import { ShuttleTreeToChipsV2, TreeNode, useShuttleTreeToChips } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useEffect, useMemo } from 'react';
import { cn } from '@learnway/shared';
import { useFetchOrganizationTree } from '@entities/user-group';
import { CombineUserGroup } from '@types';

type UserGroupOrganizationComponentProps = {
  tenantIds: number[];
  option: CombineUserGroup[];
  handleSetOption: (data: CombineUserGroup[]) => void;
};

const UserGroupOrganizationComponent = ({
  tenantIds,
  option,
  handleSetOption,
}: UserGroupOrganizationComponentProps) => {
  const { data } = useFetchOrganizationTree(tenantIds);

  const treeData = useMemo<TreeData[]>(
    () => (data ? transformApiDataToTreeData(data) : []),
    [data],
  );

  // const initValue = useMemo<TreeNode[]>(
  //   () =>
  //     option.map(({ combiners }) => ({
  //       id: combiners.map(({ combineValue }) => combineValue),
  //       // ids: combiners.map(({ combineValue }) => combineValue),

  //       key: combiners.map(({ combineValue }) => combineValue).join('-'),
  //       // keys: combiners.map(({ combineValue }) => combineValue).join('-'),
  //       // isCombined: combiners?.length > 1,
  //     })),
  //   [option],
  // );

  const { selectedItems, handleSelectItem, cancelSelectItem, cancelAll } = useShuttleTreeToChips();

  useEffect(() => {
    if (selectedItems.length > 0) {
      const newOption: CombineUserGroup[] = selectedItems.map(({ key, id, ids, fullName }) => ({
        combiners:
          ids?.length > 0
            ? ids.map((combineValue: number) => ({
                combineType: 'USER_GROUP',
                combineValue,
                combineName: fullName,
              }))
            : [{ combineType: 'USER_GROUP', combineValue: id, combineName: fullName }],
        id,
        ids,
        key,
      }));

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
          renderText={(node) => {
            const label: string = node?.fullName ? node?.fullName : '';
            return (
              <span>
                {label.split('').map((char, index) =>
                  char === '&' ? (
                    <span key={index} className="text-[#00AFD5]">
                      {char}
                    </span>
                  ) : (
                    <span key={index}>{char}</span>
                  ),
                )}
              </span>
            );
          }}
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

type TreeData = {
  key: string;
  id: number;
  title: string;
  fullName: string;
  children?: TreeData[];
};

type ApiData = {
  [key: string]: any;
  children?: ApiData[];
};

const transformApiDataToTreeData = (apiData: ApiData): TreeData[] => {
  const transform = (nodes: ApiData[], parentNode?: TreeData) => {
    if (!nodes) return [];

    return nodes.map((node) => {
      const id = node?.id ? node.id : 0;
      const parentKey = parentNode?.key;
      const title = node?.name ? node.name : '';
      const key = `${parentKey ? `${parentKey}-` : ''}${id}`;
      const parentFullName = parentNode?.fullName;
      const fullName = `${parentFullName ? `${parentFullName} > ` : ''}${title}`;
      const transformedNode: TreeData = {
        key,
        id,
        title,
        fullName,
      };

      if (node.children && node.children.length > 0) {
        transformedNode.children = transform(node.children, transformedNode);
      }

      return transformedNode;
    });
  };

  return transform([apiData]);
};
