import { useFetchUserGroups } from '@entities/user-group';
import { useFetchAuthUser } from '@learnway/auth/entities';
import {
  ShuttleGridToChips,
  ShuttleGridToChipsImperative,
  useShuttleGridToChips,
} from '@learnway/ui/shuttle-grid-to-chips';
import { SelectedChip } from '@learnway/ui/type';
import { CombineUserGroup } from '@shared/types/user-group';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useMemo, useRef } from 'react';

type UserGroupJobComponentProps = {
  tenantIds: number[];
  option: CombineUserGroup[];
  handleSetOption: (data: CombineUserGroup[]) => void;
};

const UserGroupJobComponent = ({
  tenantIds,
  option,
  handleSetOption,
}: UserGroupJobComponentProps) => {
  const ref = useRef<ShuttleGridToChipsImperative>(null);
  const { data: authUser } = useFetchAuthUser();
  const { data = [] } = useFetchUserGroups(tenantIds, authUser?.activeRole?.roleId, {
    userGroupType: 'JOB',
  });
  const gridData = useMemo<any[]>(
    () =>
      data.map(({ fullName, companyId, tenantId, userGroupId, userGroupName, ...others }) => ({
        key: `${tenantId}-${companyId}-${userGroupId}`,
        id: userGroupId,
        fullPath: fullName,
        title: userGroupName,
        userGroupName,
        ...others,
      })),
    [data],
  );
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
    columnHelper.accessor('userGroupSubName', {
      header: t('직군'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userGroupName', {
      header: t('직무'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userCount', {
      header: t('대상자'),
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];

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
      gridData={gridData}
      sourceTitle={t('유저그룹 - 직무')}
      targetTitle={t('선택 유저그룹 목록')}
      isShowConditionSettingsMode
    />
  );
};

export const UserGroupJob = UserGroupJobComponent;
