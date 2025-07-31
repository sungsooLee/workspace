import { t } from 'i18next';
import { InstructorList } from '../ui/instructor-list';
import { EnPageMode } from '@types';
import { useState } from 'react';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';

/**
 * 화면 번호 NLP_BO_LMS0014 : 강사/튜터 선택(팝업)
 */
const InstructorListModal = () => {
  const { closeModal, alert: openAlert } = useModal();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleOnSubmit = async () => {
    if (selectedItem == null) {
      await openAlert({
        title: t('강사/튜터를 선택해주세요.') });
      return;
    }
    closeModal(selectedItem);
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('강사/튜터 선택')}</ModalTitle>
      <ModalBody>
        <InstructorList viewMode={EnPageMode.MODAL} setSelectedItem={setSelectedItem} />
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
        <Button label={t('적용')} variant={'primary'} size={'lg'} onClick={handleOnSubmit} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const InstructorListPopup = InstructorListModal;
