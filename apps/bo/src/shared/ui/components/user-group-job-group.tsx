import {
  SelectedChip,
  ShuttleGridToChips,
  ShuttleGridToChipsImperative,
  useShuttleGridToChips,
} from '@learnway/ui';
import { useEffect, useMemo, useRef } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useFetchUserGroups } from '@entities/user-group';
import { CombineUserGroup } from '@types';

type UserGroupJobGroupComponentProps = {
  tenantIds: number[];
  option: CombineUserGroup[];
  handleSetOption: (data: CombineUserGroup[]) => void;
};

const UserGroupJobGroupComponent = ({
  tenantIds,
  option,
  handleSetOption,
}: UserGroupJobGroupComponentProps) => {
  const ref = useRef<ShuttleGridToChipsImperative>(null);
  const { data = [] } = useFetchUserGroups(tenantIds, { userGroupType: 'JOB_GROUP' });
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('tenantName', {
      header: t('테넌트'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('companyName', {
      header: t('회사'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userGroupName', {
      header: t('직군'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userCount', {
      header: t('대상자'),
      cell: (info) => `${info.getValue()}명`,
    }),
  ] as ColumnDef<any, unknown>[];

  const initialSelectedItems = useMemo<SelectedChip[]>(() => {
    return option.map(({ combiners, pathKey, pathValue, groupId }) => {
      const [combiner] = combiners;
      return {
        key: pathKey,
        id: combiner.combineValue,
        title: combiner.combineName,
        fullPath: pathValue,
        groupId,
      };
    });
  }, [option]);

  const { selectedItems, handleSelectItem, cancelSelectItem, cancelAll } =
    useShuttleGridToChips(initialSelectedItems);

  useEffect(() => {
    if (selectedItems.length === 0) return;

    const updatedOption: CombineUserGroup[] = selectedItems.map(
      ({ key, id, title, fullPath, groupId }) => ({
        pathKey: key,
        groupId,
        pathValue: fullPath,
        combiners: [
          {
            combineType: 'USER_GROUP',
            combineValue: id,
            combineName: title,
          },
        ],
      }),
    );

    handleSetOption(updatedOption);
  }, [selectedItems, handleSetOption]);

  return (
    <ShuttleGridToChips
      ref={ref}
      selectedItems={selectedItems}
      handleSelectItem={handleSelectItem}
      cancelSelectItem={cancelSelectItem}
      cancelAll={cancelAll}
      columns={columns}
      gridData={data}
      sourceTitle={t('유저그룹 - 직군')}
      targetTitle={t('선택 유저그룹 목록')}
    />
  );
};

export const UserGroupJobGroup = UserGroupJobGroupComponent;
