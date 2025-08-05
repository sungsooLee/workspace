import RoleManagerService from '@entities/role/api/role-manager';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { GridBox } from '@learnway/ui/grid';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';
import { EnGlobalConst } from '@shared/types/enums';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

const RoleApplicationHistoryModalComponent = ({ applicationId }: { applicationId: number }) => {
  const [gridData, setGridData] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const data: any[] = await RoleManagerService.fetchRoleApplicationHistories(applicationId);
      setGridData(data);
    };
    init();
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('이력')}</ModalTitle>
      <ModalBody>
        <GridBox
          data={gridData}
          columns={columns()}
          title={t('이력 목록')}
          visibleRowCount={4}
          height={200}
        />
      </ModalBody>
    </ModalContainer>
  );
};

export const RoleApplicationHistoryModal = RoleApplicationHistoryModalComponent;

const columnHelper = createColumnHelper<any>();

const columns = (): ColumnDef<any, unknown>[] => [
  columnHelper.accessor('createdDate', {
    header: t('일시'), //approvedDate
    cell: (info) => {
      console.log('row', info.row.original);
      if (info.row.original.status === 'APPROVED' || info.row.original.status === 'REJECTED')
        return getDateToString(
          new Date(info.row.original.approvedDate),
          DATE_TIME_FORMAT.DATETIME_SEC,
        );
      return getDateToString(
        new Date(info.row.original.createdDate),
        DATE_TIME_FORMAT.DATETIME_SEC,
      );
    },
    enableGrouping: false,
    enableSorting: false,
    size: 180,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('createdBy', {
    header: t('이력 생성자 정보'),
    cell: (info) => {
      console.log('row', info.row.original);
      if (info.row.original.status === 'APPROVED' || info.row.original.status === 'REJECTED')
        return `${info.row.original.approver.name} / ${info.row.original.approver.employeeNumber}`;
      return `${info.row.original.applicant.name} / ${info.row.original.applicant.employeeNumber}`;
    },
    enableGrouping: false,
    enableSorting: false,
    size: 180,
  }),
  columnHelper.accessor('status', {
    header: t('내용'),
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.role.RoleApplicationStatus.${info.getValue()}`),
    enableGrouping: false,
    enableSorting: false,
    size: 180,
  }),
  columnHelper.accessor('reason', {
    header: t('세부 내용'),
    cell: (info) => {
      switch (info.row.original.status) {
        case 'NEW':
        case 'EXTEND':
          return info.row.original.reason;
        case 'REJECTED':
          return info.row.original.rejectReason;
        default:
          return '';
      }
    },
    enableGrouping: false,
    enableSorting: false,
    meta: {
      size: 'auto',
    },
  }),
];
