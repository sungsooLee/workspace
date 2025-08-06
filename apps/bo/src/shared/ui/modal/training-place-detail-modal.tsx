import { TrainingPlaceDetail } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-detail';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { EnFormMode, EnPageMode } from '@shared/types/enums';
import { t } from 'i18next';
import { useRef } from 'react';

const TrainingPlaceDetailModalComponent = ({
  mode,
  spaceId,
}: {
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
