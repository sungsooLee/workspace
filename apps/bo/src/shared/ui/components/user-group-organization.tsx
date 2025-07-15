import {
  transformApiDataToTreeData,
  ShuttleTreeToChipsV2,
  useShuttleTreeToChips,
  TreeData,
} from '@learnway/ui';
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

  const treeData = useMemo(() => {
    return data ? transformApiDataToTreeData(data) : [];
  }, [data]);

  const initialSelectedItems = useMemo<TreeData[]>(() => {
    return option.map(({ combiners, pathKey, pathValue }) => {
      const [combiner] = combiners;
      return {
        key: pathKey,
        id: combiner.combineValue,
        title: combiner.combineName,
        fullPath: pathValue,
      };
    });
  }, [option]);

  const { selectedItems, handleSelectItem, cancelSelectItem, cancelAll } =
    useShuttleTreeToChips(initialSelectedItems);

  useEffect(() => {
    if (selectedItems.length === 0) return;

    const updatedOption: CombineUserGroup[] = selectedItems.map(({ key, id, title, fullPath }) => ({
      groupId: id,
      pathKey: key,
      pathValue: fullPath,
      combiners: [
        {
          combineType: 'USER_GROUP',
          combineValue: id,
          combineName: title,
        },
      ],
    }));

    handleSetOption(updatedOption);
  }, [selectedItems, handleSetOption]);

  return (
    <div className={styles.wrap}>
      <div className={cn(styles.pop_contents, 'h-full')}>
        <ShuttleTreeToChipsV2
          sourceTitle="유저그룹 - 조직"
          targetTitle="선택 유저그룹 목록"
          treeData={treeData}
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
