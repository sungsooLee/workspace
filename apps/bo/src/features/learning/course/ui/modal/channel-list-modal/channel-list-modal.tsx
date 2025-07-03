import React, { forwardRef, useState } from 'react';
import {
  Button,
  GridBox,
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
  channelId?: string;
}

/**
 * 채널 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ChannelListModalComponent = forwardRef<HTMLDivElement, ChannelListModalProps>(
  ({ channelId, ...props }, ref) => {
    console.log('channelId', channelId);
    const { t } = useTranslation();
    const { data: gridData }: any = getMockData();
    const { close: closeModal } = useModal();
    const [selectedRow, setSelectedRow] = useState();
    const columns = [{ header: t('채널명'), accessorKey: 'channelName' }];

    const handleRowSelect = (row: any) => {
      setSelectedRow(row);
    };

    return (
      <ModalContainer>
        <ModalTitle>{t('채널 리스트')}</ModalTitle>
        <ModalBody>
          <div className={styles.wrap}>
            <GridBox
              title={'목록'}
              data={gridData}
              columns={columns}
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
  },
);
export const ChannelListModal = ChannelListModalComponent;

const getMockData = () => {
  return {
    data: Array(5)
      .fill(null)
      .map((d, i) => ({
        channelId: `channel_id${i}`,
        channelName: `channel_name${i}`,
        etc: 'etc',
      })),
  };
};
