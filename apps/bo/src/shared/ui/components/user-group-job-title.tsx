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

type UserGroupJobTitleComponentProps = {
  tenantIds: number[];
  option: CombineUserGroup[];
  handleSetOption: (data: CombineUserGroup[]) => void;
};

const UserGroupJobTitleComponent = ({
  tenantIds,
  option,
  handleSetOption,
}: UserGroupJobTitleComponentProps) => {
  const ref = useRef<ShuttleGridToChipsImperative>(null);
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
      header: t('호칭'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userCount', {
      header: t('대상자'),
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];
  const { data = [] } = useFetchUserGroups(tenantIds, { userGroupType: 'JOB_TITLE' });

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
    useShuttleGridToChips(initialSelectedItems);

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
    <ShuttleGridToChips
      ref={ref}
      selectedItems={selectedItems}
      handleSelectItem={handleSelectItem}
      cancelSelectItem={cancelSelectItem}
      cancelAll={cancelAll}
      columns={columns}
      gridData={data}
      sourceTitle={t('유저그룹 - 호칭')}
      targetTitle={t('선택 유저그룹 목록')}
    />
  );
};

export const UserGroupJobTitle = UserGroupJobTitleComponent;
