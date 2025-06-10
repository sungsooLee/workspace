import { ShuttleGridToChips, ShuttleGridToChipsImperative, useModal } from '@learnway/ui';
import { useRef, useState } from 'react';
import { t } from 'i18next';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const UserGroupPositionComponent = () => {
  const ref = useRef<ShuttleGridToChipsImperative>(null);
  const [option, setOption] = useState<any>();
  const [gridData, setGrideData] = useState<any[]>([]);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const handleSelectedItemsChange = (items: { key: string; fullPath: string }[]) => {
    setSelectedItems(items);
  };

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
    columnHelper.accessor('position', {
      header: t('보직'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('memberCount', {
      header: t('대상자'),
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <ShuttleGridToChips
      ref={ref}
      onSelectedChange={(data: any) => {
        setOption(data);
      }}
      showNumberingColumn={false}
      gridData={gridData}
      columns={columns}
      rowKey={'userId'}
      leftTitle={t('유저그룹 - 보직')}
      rightTitle={t('선택 유저그룹 목록')}
    />
  );
};

export const UserGroupPosition = UserGroupPositionComponent;
