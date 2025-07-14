import {
  ShuttleTreeToChipsV2,
  transformApiDataToTreeData,
  TreeData,
  useShuttleTreeToChips,
} from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { useEffect, useMemo } from 'react';
import { cn } from '@learnway/shared';
import { CombineUserGroup } from '@types';
import { useFetchCustomGroupsTree } from '@entities/user-group';

type UserGroupCustomComponentProps = {
  option: CombineUserGroup[];
  handleSetOption: (data: CombineUserGroup[]) => void;
};

const UserGroupCustomComponent = ({ option, handleSetOption }: UserGroupCustomComponentProps) => {
  const { data } = useFetchCustomGroupsTree();

  const treeData = useMemo(() => (data ? transformApiDataToTreeData(data) : []), [data]);
  const initValue = useMemo<TreeData[]>(
    () =>
      option.map(({ combiners, key, fullPath }) => ({
        key,
        id: combiners[0].combineValue,
        title: combiners[0].combineName,
        fullPath,
      })),
    [option],
  );

  const { selectedItems, handleSelectItem, cancelSelectItem, cancelAll } =
    useShuttleTreeToChips(initValue);

  useEffect(() => {
    if (selectedItems.length > 0) {
      const newOption: CombineUserGroup[] = selectedItems.map(({ key, id, title, fullPath }) => ({
        combiners: [{ combineType: 'USER_GROUP', combineValue: id, combineName: title }],
        fullPath,
        key,
      }));

      handleSetOption(newOption);
    }
  }, [selectedItems]);

  return (
    <div className={styles.wrap}>
      <div className={cn(styles.pop_contents, 'h-full')}>
        <ShuttleTreeToChipsV2
          sourceTitle="유저그룹 - 사용자 정의"
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

export const UserGroupCustom = UserGroupCustomComponent;
