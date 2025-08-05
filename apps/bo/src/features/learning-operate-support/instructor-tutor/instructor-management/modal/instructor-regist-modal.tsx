import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { EnPageMode } from '@shared/types/enums';
import { t } from 'i18next';
import { useRef } from 'react';
import { InstructorRegist } from '../ui/instructor-regist';

/**
 * 화면 번호 NLP_BO_LMS0013, NLP_BO_LMS0015 : 강사/튜터 등록(팝업)
 */

type InstructorRegistModalProps = {
  instructorId?: number; // 수정 및 단건조회인 경우
  readOnly?: boolean; // 단건조회인 경우
  refreshOnSearch?: () => void;
};

const InstructorRegistModal = ({
  instructorId,
  readOnly = false,
  refreshOnSearch,
}: InstructorRegistModalProps) => {
  const { closeModal } = useModal();
  const formRef = useRef<HTMLFormElement>(null);

  const handleOnClose = () => {
    closeModal();
  };

  const handleOnSubmit = () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  const handleSubmitSuccess = () => {
    closeModal();
    if (refreshOnSearch && typeof refreshOnSearch === 'function') refreshOnSearch();
  };

  return (
    <ModalContainer>
      <ModalTitle>{!instructorId ? t('강사/튜터 등록') : t('강사/튜터 수정')}</ModalTitle>
      <ModalBody>
        <InstructorRegist
          viewMode={EnPageMode.MODAL}
          ref={formRef}
          instructorId={instructorId}
          readOnly={readOnly}
          handleSubmitSuccess={handleSubmitSuccess}
        />
      </ModalBody>
      <ModalFooter>
        {!readOnly ? (
          <>
            <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
            <Button
              label={!instructorId ? t('등록') : t('수정')}
              variant={'primary'}
              size={'lg'}
              onClick={handleOnSubmit}
            />
          </>
        ) : (
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnClose} />
        )}
      </ModalFooter>
    </ModalContainer>
  );
};

export const InstructorRegistPopup = InstructorRegistModal;
