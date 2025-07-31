import { useFetchCustomGroupsTree } from '@entities/user-group';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { ShuttleTreeToChipsV2, useShuttleTreeToChips } from '@learnway/ui/shuttle-tree-to-chips-v2';
import { transformApiDataToTreeData } from '@learnway/ui/tree-view';
import { SelectedChip } from '@learnway/ui/type';
import { CombineUserGroup } from '@types';
import { useEffect, useMemo } from 'react';

type UserGroupCustomComponentProps = {
  option: CombineUserGroup[];
  handleSetOption: (data: CombineUserGroup[]) => void;
};

const UserGroupCustomComponent = ({ option, handleSetOption }: UserGroupCustomComponentProps) => {
  const { data: authUser } = useFetchAuthUser();
  const { data } = useFetchCustomGroupsTree(authUser?.activeRole?.roleId);

  const treeData = useMemo(() => {
    return data ? transformApiDataToTreeData(data) : [];
  }, [data]);

  const initialSelectedItems = useMemo<SelectedChip[]>(() => {
    return option.map(({ combiners, pathKey, pathValue, groupId }) => {
      const isCombined = combiners.length > 1;
      const [combiner] = combiners;
      return {
        key: pathKey,
        id: isCombined ? undefined : combiner.combineValue,
        ids: isCombined ? combiners.map(({ combineValue }) => combineValue) : undefined,
        fullPath: pathValue,
        groupId,
      };
    });
  }, [option]);

  const { selectedItems, handleSelectItem, cancelSelectItem, cancelAll } =
    useShuttleTreeToChips(initialSelectedItems);

  useEffect(() => {
    if (selectedItems.length === 0) return handleSetOption([]);

    const updatedOption: CombineUserGroup[] = selectedItems.map(
      ({ key, id, ids, fullPath, groupId }) => ({
        pathKey: key,
        groupId,
        pathValue: fullPath,
        combiners: ids
          ? ids.map((id) => ({ combineType: 'USER_GROUP', combineValue: id }))
          : [
              {
                combineType: 'USER_GROUP',
                combineValue: id!,
              },
            ],
      }),
    );

    handleSetOption(updatedOption);
  }, [selectedItems, handleSetOption]);

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
          isShowConditionSettingsMode
        />
      </div>
    </div>
  );
};

export const UserGroupCustom = UserGroupCustomComponent;
