import { useState, forwardRef } from 'react';
import { t } from 'i18next';
import { UserChoice } from '../components/user-choice';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

type UserChoiceModalComponentProps = {
  title?: string;
};

/**
 * 화면 번호 NLP_BO_TMS_1100_02 : 유저 조회(공통)
 */
const UserModalComponent = forwardRef(({ title = '유저' }: UserChoiceModalComponentProps, ref) => {
  const { closeModal } = useModal();

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
      <ModalTitle>{t(`${title} 조회`)}</ModalTitle>
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
