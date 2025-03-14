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
import styles from './teacher-list-modal.module.css';
import { useTranslation } from 'react-i18next';

export interface TeacherListModalProps {
  dummy?: boolean;
  channelId?: string;
  provider?: any;
}

/**
 * 강사 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const TeacherListModalComponent = forwardRef<HTMLDivElement, TeacherListModalProps>(
  ({ provider, channelId, ...props }, ref) => {
    console.log('provider', provider);
    console.log('channelId', channelId);
    const { t } = useTranslation();
    const { close: closeModal } = useModal();
    const { data: gridData }: any = getMockData();
    const [selectedRow, setSelectedRow] = useState();
    const columns = [{ header: t('강사명'), accessorKey: 'name' }];

    const handleRowSelect = (row: any) => {
      setSelectedRow(row);
    };

    return (
      <ModalContainer>
        <ModalTitle>{t('강사 리스트')}</ModalTitle>
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
  },
);
export const TeacherListModal = TeacherListModalComponent;

const getMockData = () => {
  return {
    data: Array(5)
      .fill(null)
      .map((d, i) => ({ id: `id${i}`, name: `manager${i}` })),
  };
};
