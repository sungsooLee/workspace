import { t } from 'i18next';
import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui';
import { InstructorList } from '@features/platform/instructor';
import { EnPageMode } from '@types';

/**
 * 화면 번호 NLP_BO_LMS0014 : 강사/튜터 선택(팝업)
 */
const InstructorListModal = () => {
  return (
    <ModalContainer>
      <ModalTitle>{t('강사/튜터 선택')}</ModalTitle>
      <ModalBody>
        <InstructorList viewMode={EnPageMode.MODAL} />
      </ModalBody>
    </ModalContainer>
  );
};

export const InstructorListPopup = InstructorListModal;
