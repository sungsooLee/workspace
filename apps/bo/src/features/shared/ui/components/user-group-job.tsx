import { ShuttleGridToChips, ShuttleGridToChipsImperative } from '@learnway/ui';
import { useEffect, useRef, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { UserGroupsResponse } from '@types';
import { queryOptions } from '@entities/user-group';
import { useQueryClient } from '@tanstack/react-query';

type UserGroupJobComponentProps = {
  tenantIds: number[];
  handleSetOption: (data: any) => void;
};

const UserGroupJobComponent = ({ tenantIds, handleSetOption }: UserGroupJobComponentProps) => {
  const ref = useRef<ShuttleGridToChipsImperative>(null);
  const queryClient = useQueryClient();

  const [option, setOption] = useState<{ id: string; name: string }[]>([]);
  const [gridData, setGrideData] = useState<UserGroupsResponse[]>([]);

  const handleOnSearch = async () => {
    const response = await queryClient.fetchQuery(
      queryOptions.usergroups(tenantIds, { userGroupType: 'JOB' }),
    );
    setGrideData(response);
  };

  useEffect(() => {
    handleOnSearch();
  }, []);

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

  return (
    <ShuttleGridToChips
      ref={ref}
      selectedItems={option}
      onSelectedChange={setOption}
      showNumberingColumn={false}
      gridData={gridData}
      columns={columns}
      rowKey={'userGroupId'}
      leftTitle={t('유저그룹 - 직무')}
      rightTitle={t('선택 유저그룹 목록')}
    />
  );
};

export const UserGroupJob = UserGroupJobComponent;
