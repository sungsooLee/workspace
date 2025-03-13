import React, { forwardRef, useState } from 'react';
import {
  Button,
  Grid,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
} from '@learnway/ui';
import styles from './manager-list-modal.module.css';
import { useTranslation } from 'react-i18next';

export interface ManagerListModalProps {
  dummy?: boolean;
  setModalData?: (data?: any) => void; // modal content 로 사용시 사용
}

/**
 * 강사 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ManagerListModalComponent = forwardRef<HTMLDivElement, ManagerListModalProps>(
  ({ setModalData, ...props }, ref) => {
    const { t } = useTranslation();
    const { close: closeModal } = useModal();
    const { data: gridData }: any = getMockData();
    const [selectedRow, setSelectedRow] = useState();
    const columns = [{ header: t('운영자'), accessorKey: 'name' }];

    const handleRowSelect = (row: any) => {
      setSelectedRow(row);
    };

    return (
      <ModalContainer>
        <ModalTitle>{t('운영자 리스트')}</ModalTitle>
        <ModalBody>
          <div className={styles.wrap}>
            <h2>Grid</h2>
            <Grid
              data={gridData}
              columns={columns}
              hideColumnSettings
              onRowSelect={handleRowSelect}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'point'} size={'sm'} onClick={() => closeModal()} />
          <Button
            label={t('확인')}
            variant={'primary'}
            size={'sm'}
            onClick={() => closeModal(selectedRow)}
          />
        </ModalFooter>
      </ModalContainer>
    );
  },
);
export const ManagerListModal = ManagerListModalComponent;

const getMockData = () => {
  return {
    data: Array(5)
      .fill(null)
      .map((d, i) => ({ id: `id${i}`, name: `manager${i}` })),
  };
};
