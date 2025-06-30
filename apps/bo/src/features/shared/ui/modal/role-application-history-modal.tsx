import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { GridBox } from '@learnway/ui';
import RoleManagerService from '@entities/role/api/role-manager';

const RoleApplicationHistoryModalComponent = ({
  roleApplicationId,
}: {
  roleApplicationId: number;
}) => {
  const [gridData, setGridData] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const data: any[] = await RoleManagerService.fetchRoleApplicationHistories(roleApplicationId);
      setGridData(data);
    };
    init();
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('이력')}</ModalTitle>
      <ModalBody>
        <GridBox data={gridData} columns={columns} title={t('이력 목록')} />
      </ModalBody>
    </ModalContainer>
  );
};

export const RoleApplicationHistoryModal = RoleApplicationHistoryModalComponent;

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('test', {
    header: t('일시'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('test', {
    header: t('이력 생성자 정보'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('test', {
    header: t('내용'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
    size: 180,
  }),
  columnHelper.accessor('test', {
    header: t('세부 내용'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
    meta: {
      size: 'auto',
    },
  }),
] as ColumnDef<any, unknown>[];
