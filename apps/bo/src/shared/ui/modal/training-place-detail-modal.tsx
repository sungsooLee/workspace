import { useRef } from 'react';
import { t } from 'i18next';
import { TrainingPlaceDetail } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-detail';
import { EnFormMode, EnPageMode } from '@types';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal, ModalFooter } from '@learnway/ui/modal';

const TrainingPlaceDetailModalComponent = ({
  mode,
  spaceId }: {
  mode: EnFormMode;
  spaceId?: number;
}) => {
  const { closeModal } = useModal();
  const formRef = useRef<HTMLFormElement>(null);

  const handleOnSave = () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  const handleOnComplete = (data: any) => {
    closeModal(data);
  };

  const handleOnClose = () => {
    closeModal();
  };

  return (
    <ModalContainer>
      <ModalTitle>{mode === EnFormMode.VIEW ? t('교육공간 상세') : t('교육공간 등록')}</ModalTitle>
      <ModalBody>
        <TrainingPlaceDetail
          ref={formRef}
          pageMode={EnPageMode.MODAL}
          mode={mode}
          spaceId={spaceId}
          onComplete={handleOnComplete}
        />
      </ModalBody>
      <ModalFooter>
        {mode === EnFormMode.ADD && (
          <>
            <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
            <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnSave} />
          </>
        )}
        {mode === EnFormMode.VIEW && (
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnClose} />
        )}
      </ModalFooter>
    </ModalContainer>
  );
};

export const TrainingPlaceDetailModal = TrainingPlaceDetailModalComponent;
