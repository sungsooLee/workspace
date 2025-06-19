import { t } from 'i18next';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui';
import { EnPageMode } from '@types';
import { TrainingPlaceList } from '@features/learning/training-place/training-place-list';

const TrainingPlaceChoiceModalComponent = ({ onAddClick }: { onAddClick?: any }) => {
  const { close: closeModal } = useModal();

  const handleOnSelect = (data: any) => {
    closeModal(data);
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('교육공간 선택')}</ModalTitle>
      <ModalBody>
        <TrainingPlaceList
          mode={EnPageMode.MODAL}
          onAddClick={onAddClick}
          onSelect={handleOnSelect}
        />
      </ModalBody>
    </ModalContainer>
  );
};

export const TrainingPlaceChoiceModal = TrainingPlaceChoiceModalComponent;
