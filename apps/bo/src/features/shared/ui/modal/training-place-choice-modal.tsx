import { t } from 'i18next';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui';
import { EnFormMode, EnPageMode } from '@types';
import { TrainingPlaceList } from '@features/learning/training-place/training-place-list';
import { TrainingPlaceDetailModal } from './training-place-detail-modal';

const TrainingPlaceChoiceModalComponent = () => {
  const { close: closeModal, open: openModal } = useModal();

  const handleOnSelect = (data: any) => {
    closeModal(data);
  };

  const handleOnAdd = () => {
    openModal({
      width: 'xl',
      content: <TrainingPlaceDetailModal mode={EnFormMode.ADD} />,
      onClose(data: any) {
        console.log('교육공간 등록 결과', data);
      },
    });
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('교육공간 선택')}</ModalTitle>
      <ModalBody>
        <TrainingPlaceList
          pageMode={EnPageMode.MODAL}
          onAddClick={handleOnAdd}
          onSelect={handleOnSelect}
        />
      </ModalBody>
    </ModalContainer>
  );
};

export const TrainingPlaceChoiceModal = TrainingPlaceChoiceModalComponent;
