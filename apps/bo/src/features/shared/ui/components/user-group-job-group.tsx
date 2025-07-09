import { ShuttleGridToChips, ShuttleGridToChipsImperative } from '@learnway/ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useFetchUserGroups } from '@entities/user-group';
import { Group } from '@types';

type UserGroupJobGroupComponentProps = {
  tenantIds: number[];
  option: Group[];
  handleSetOption: (data: Group[]) => void;
};

const UserGroupJobGroupComponent = ({
  tenantIds,
  option,
  handleSetOption,
}: UserGroupJobGroupComponentProps) => {
  const ref = useRef<ShuttleGridToChipsImperative>(null);
  const { data = [] } = useFetchUserGroups(tenantIds, { userGroupType: 'JOB_GROUP' });

  const initValue = useMemo<{ id: number; name: string }[]>(
    () =>
      option.map(({ id, ids, fullName }) => ({
        id: ids ? ids.reduce((acc, cur) => acc + cur, 0) : id,
        name: fullName,
      })),
    [option],
  );

  const [selectedItems, setSelectedItems] = useState<{ id: number; name: string }[]>([]);

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

  const handleSelecteItems = (newItems: { id: number; name: string }[]) => {
    // setSelectedItems(newItems);
  };

  return (
    <ShuttleGridToChips
      ref={ref}
      selectedItems={[...initValue, ...selectedItems]}
      onSelectedChange={handleSelecteItems}
      showNumberingColumn={false}
      gridData={data}
      columns={columns}
      rowKey={'userGroupId'}
      leftTitle={t('유저그룹 - 직군')}
      rightTitle={t('선택 유저그룹 목록')}
    />
  );
};

export const UserGroupJobGroup = UserGroupJobGroupComponent;
