import { useCallback } from 'react';
import { t } from 'i18next';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { useDynamicForm2 } from '@learnway/hooks';

const LearningResourceQuestionShuttleComponent = () => {
  const { close } = useModal();

  const { provider, getValues, onSubmit } = useDynamicForm2({
    builders: [],
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const handleClickCloseButton = useCallback(() => {
    close();
  }, []);

  return (
    <ModalContainer>
      <ModalTitle>{t('문항 선택')}</ModalTitle>
      <ModalBody>문항 가져오기</ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant="gray" size="lg" onClick={handleClickCloseButton} />
        <Button type="button" label={t('확인')} variant="primary" size="lg" />
      </ModalFooter>
    </ModalContainer>
  );
};

LearningResourceQuestionShuttleComponent.displayName = 'LearningResourceQuestionShuttleModal';

export const LearningResourceQuestionShuttleModal = LearningResourceQuestionShuttleComponent;
