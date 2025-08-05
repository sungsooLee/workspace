import { TrainingPlaceDetail } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-detail';
import { TrainingPlaceList } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-list';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { EnFormMode, EnPageMode } from '@shared/types/enums';
import { t } from 'i18next';
import { useRef, useState } from 'react';

const TrainingPlaceChoiceModalComponent = () => {
  const { closeModal } = useModal();
  const childRef = useRef<HTMLFormElement>(null);

  const [formMode, setFormMode] = useState(EnFormMode.NONE);

  const handleOnSelect = (data: any) => {
    closeModal(data);
  };

  const handleOnAdd = () => {
    setFormMode(EnFormMode.ADD);
  };

  const handleOnSave = () => {
    if (childRef.current?.saveData) childRef.current.saveData();
  };

  const changeToList = () => {
    setFormMode(EnFormMode.NONE);
  };

  return (
    <ModalContainer>
      <ModalTitle>
        {formMode === EnFormMode.ADD ? t('교육공간 등록') : t('교육공간 선택')}
      </ModalTitle>
      <ModalBody>
        {formMode === EnFormMode.NONE && (
          <TrainingPlaceList
            pageMode={EnPageMode.MODAL}
            onAdd={handleOnAdd}
            onSelect={handleOnSelect}
          />
        )}
        {formMode === EnFormMode.ADD && (
          <TrainingPlaceDetail
            ref={childRef}
            pageMode={EnPageMode.MODAL}
            mode={EnFormMode.ADD}
            onComplete={changeToList}
          />
        )}
      </ModalBody>
      {formMode === EnFormMode.ADD && (
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={changeToList} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnSave} />
        </ModalFooter>
      )}
    </ModalContainer>
  );
};

export const TrainingPlaceChoiceModal = TrainingPlaceChoiceModalComponent;
