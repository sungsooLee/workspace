import { GridBox, ModalBody, ModalContainer, ModalTitle } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

export interface StudentsEnrollmentTypeHistoryModalComponentProps {
  selectedItem: object;
}

const StudentsEnrollmentTypeHistoryModalComponent = ({
  selectedItem,
}: StudentsEnrollmentTypeHistoryModalComponentProps) => {
  const [columns, setColumns] = useState() as any;
  useEffect(() => {
    console.log('##selectedItems=>', selectedItem);
    const columns = [
      columnHelper.accessor('1', {
        header: t('신청일'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 152,
      }),
      columnHelper.accessor('2', {
        header: t('입과방식'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 132,
      }),
      columnHelper.accessor('3', {
        header: t('상태'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 167,
      }),
      columnHelper.accessor('4', {
        header: t('사유'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 289,
      }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    // handleOnSearch();
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <ModalContainer>
      <ModalTitle>{t('이력(입과방식) 정보')}</ModalTitle>
      <ModalBody>
        <GridBox
          columns={columns}
          showNumberingColumn={false}
          clientSideSorting={true}
          title={t('이력정보 목록')}
        />
      </ModalBody>
    </ModalContainer>
  );
};

export const StudentsEnrollmentTypeHistoryModal = StudentsEnrollmentTypeHistoryModalComponent;
