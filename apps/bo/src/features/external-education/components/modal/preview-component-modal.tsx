import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import FieldRenderer from '../field-renderer';
import { DEFAULT_FIELD_CONFIG } from '../../types/form-field.types';

const PreviewComponentModalComponent = ({ componentId }: any) => {
  const fieldConfig = DEFAULT_FIELD_CONFIG[componentId];
  const { closeModal } = useModal();

  if (!fieldConfig) return null;

  return (
    <ModalContainer>
      <ModalTitle>미리보기</ModalTitle>
      <ModalBody>
        <FieldRenderer
          config={fieldConfig}
          fieldKey={componentId}
          value={
            fieldConfig.type === 'radio'
              ? fieldConfig.options?.[0]?.value
              : fieldConfig.type === 'checkbox'
                ? []
                : fieldConfig.type === 'select'
                  ? fieldConfig.options?.[0]?.value
                  : ''
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button variant={'primary'} size={'lg'} onClick={closeModal}>
          확인
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const PreviewComponentModal = PreviewComponentModalComponent;
