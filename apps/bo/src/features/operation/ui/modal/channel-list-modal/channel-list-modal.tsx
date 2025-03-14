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
import styles from './channel-list-modal.module.css';
import { useTranslation } from 'react-i18next';

export interface ChannelListModalProps {
  dummy?: boolean;
  setModalData?: (data?: any) => void; // modal content 로 사용시 사용
}

/**
 * 채널 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ChannelListModalComponent = forwardRef<HTMLDivElement, ChannelListModalProps>(
  ({ setModalData, ...props }, ref) => {
    const { t } = useTranslation();
    const { data: gridData }: any = getMockData();
    const { close: closeModal } = useModal();
    const [selectedRow, setSelectedRow] = useState();
    const columns = [{ header: t('채널명'), accessorKey: 'name' }];

    const handleRowSelect = (row: any) => {
      setSelectedRow(row);
    };

    return (
      <ModalContainer>
        <ModalTitle>{t('채널 리스트')}</ModalTitle>
        <ModalBody>
          <div className={styles.wrap}>
            <Grid
              title={'목록'}
              data={gridData}
              columns={columns}
              hideColumnSettings
              onRowSelect={handleRowSelect}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button
            label={t('확인')}
            variant={'primary'}
            size={'lg'}
            onClick={() => closeModal(selectedRow)}
          />
        </ModalFooter>
      </ModalContainer>
    );

    return (
      <div className="p-4">
        <h2>Grid</h2>
        <Grid data={gridData} columns={columns} hideColumnSettings onRowSelect={handleRowSelect} />
      </div>
    );
  },
);
export const ChannelListModal = ChannelListModalComponent;

const getMockData = () => {
  return {
    data: Array(5)
      .fill(null)
      .map((d, i) => ({ id: `id${i}`, name: `channel${i}` })),
  };
};
