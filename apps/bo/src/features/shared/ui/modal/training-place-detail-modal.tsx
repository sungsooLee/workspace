import { useRef } from 'react';
import { t } from 'i18next';
import { Button, ModalBody, ModalContainer, ModalTitle, useModal, ModalFooter } from '@learnway/ui';
import { TrainingPlaceDetail } from '@features/learning/training-place/training-place-detail';
import { EnFormMode } from '@types';

const TrainingPlaceDetailModalComponent = ({ mode }: { mode: EnFormMode }) => {
  const { close: closeModal } = useModal();
  const formRef = useRef(1);

  const handleSaveClick = () => {
    console.log('formRef', formRef);
    const detail: any = formRef.current;
    detail.saveData();
  };

  const handleOnClose = () => {
    closeModal();
  };

  return (
    <ModalContainer>
      <ModalTitle>{mode === EnFormMode.VIEW ? t('교육공간 상세') : t('교육공간 등록')}</ModalTitle>
      <ModalBody>
        <TrainingPlaceDetail ref={formRef} mode={mode} />
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
        <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleSaveClick} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const TrainingPlaceDetailModal = TrainingPlaceDetailModalComponent;
