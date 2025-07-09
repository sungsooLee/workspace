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
  const { data = [] } = useFetchOrganizationTree(tenantIds);

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
      const newOption: CombineUserGroup[] = selectedItems.map(
        ({ key, keys, id, ids, fullName }) => ({
          combiners:
            ids?.length > 0
              ? ids.map((combineValue: number) => ({ combineType: 'USER_GROUP', combineValue }))
              : [{ combineType: 'USER_GROUP', combineValue: id }],
          fullName,
          id,
          ids,
          key,
          keys,
        }),
      );
      handleSetOption(newOption);
    }
  }, [selectedItems]);

  return (
    <div className={styles.wrap}>
      <div className={cn(styles.pop_contents, 'h-full')}>
        <ShuttleTreeToChipsV2
          sourceTitle="유저그룹 - 조직"
          targetTitle="선택 유저그룹 목록"
          apiData={data}
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
