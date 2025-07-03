import { ShuttleGridToChips, ShuttleGridToChipsImperative } from '@learnway/ui';
import { useRef, useState } from 'react';
import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useFetchUserGroups } from '@entities/user-group';

type UserGroupJobPositionComponentProps = {
  tenantIds: number[];
  handleSetOption: (data: any) => void;
};

const UserGroupJobPositionComponent = ({
  tenantIds,
  handleSetOption,
}: UserGroupJobPositionComponentProps) => {
  const ref = useRef<ShuttleGridToChipsImperative>(null);
  const { data = [] } = useFetchUserGroups(tenantIds, { userGroupType: 'JOB_POSITION' });

  const [option, setOption] = useState<{ id: string; name: string }[]>([]);

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
      header: t('보직'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userCount', {
      header: t('대상자'),
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <ShuttleGridToChips
      ref={ref}
      selectedItems={option}
      onSelectedChange={setOption}
      showNumberingColumn={false}
      gridData={data}
      columns={columns}
      rowKey={'userGroupId'}
      leftTitle={t('유저그룹 - 보직')}
      rightTitle={t('선택 유저그룹 목록')}
    />
  );
};

export const UserGroupJobPosition = UserGroupJobPositionComponent;
