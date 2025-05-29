import { useState, forwardRef } from 'react';
import { t } from 'i18next';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { UserChoice } from '../components/user-choice';

const UserModalComponent = forwardRef((_, ref) => {
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

  return (
    <ModalContainer>
      <ModalTitle>{t('유저 조회')}</ModalTitle>
      <ModalBody>
        <UserChoice handleRowSelect={handleRowSelect} />
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

export const UserChoiceModal = UserModalComponent;
