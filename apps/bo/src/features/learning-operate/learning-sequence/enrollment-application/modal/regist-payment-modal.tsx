import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { SplitPanel } from '@learnway/ui/elements';
import { GridBox } from '@learnway/ui/grid';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui/modal';

export interface RegistPaymentModalComponentProps {
  selectedItem: object;
}

const RegistPaymentModalComponent = ({ selectedItem }: RegistPaymentModalComponentProps) => {
  const [columns, setColumns] = useState() as any;
  useEffect(() => {
    console.log('##selectedItems=>', selectedItem);
    const columns = [
      columnHelper.accessor('1', {
        header: t('단계'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 148 }),
      columnHelper.accessor('2', {
        header: t('결재자'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 148 }),
      columnHelper.accessor('3', {
        header: t('직책'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 148 }),
      columnHelper.accessor('4', {
        header: t('상태'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 148 }),
      columnHelper.accessor('5', {
        header: t('처리일'),
        cell: (info) => {
          const date = info.getValue() as Date;
          return getDateToString(date, DATE_TIME_FORMAT.DATETIME_SEC);
        },
        enableGrouping: false,
        size: 148 }),
    ] as ColumnDef<any, unknown>[];

    setColumns(columns);
    // handleOnSearch();
  }, []);

  const columnHelper = createColumnHelper<any>();
  return (
    <ModalContainer>
      <ModalTitle>{t('결재 이력')}</ModalTitle>
      <ModalBody>
        <GridBox
          //   ref={listGridRef}
          //   data={gridData}
          columns={columns}
          // hideRowSelectionCheckBox
          showNumberingColumn={false}
          clientSideSorting={true}
          title={t('이력정보 목록')}
          //   onRowsSelect={(values: any) => {
          //     setSelectedRowsKey(values.map((v: any) => v.key));
          //     console.log('##selected:', selectedRowsKey);
          //   }}
          //   showTotalCount={false}
        />
      </ModalBody>
    </ModalContainer>
  );
};

export const RegistPaymentModal = RegistPaymentModalComponent;
