import { useState, forwardRef } from 'react';
import { t } from 'i18next';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { ExternalUserChoice } from '../components/external-user-choice';

const ExternalUserModalComponent = forwardRef((props, ref) => {
  const { close: closeModal } = useModal();

  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
  };

  const handleOnClose = () => {
    closeModal();
  };
  const handleOnConfirm = () => {
    if (!selectedRow) closeModal();
    closeModal(selectedRow);
  };

  /**
   * @param data
   */

  return (
    <ModalContainer>
      <ModalTitle>{t('사외이용자 조회')}</ModalTitle>
      <ModalBody>
        <ExternalUserChoice handleRowSelect={handleRowSelect} />
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const ExternalUserChoiceModal = ExternalUserModalComponent;
