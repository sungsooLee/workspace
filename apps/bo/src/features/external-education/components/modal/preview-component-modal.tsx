import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui';
import FieldRenderer from '../field-renderer';
import { DEFAULT_FIELD_CONFIG } from '../../types/form-field.types';

const PreviewComponentModalComponent = ({ componentId }: any) => {
  const fieldConfig = DEFAULT_FIELD_CONFIG[componentId];
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
        <Button onClick={() => console.log('닫기')}>닫기</Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const PreviewComponentModal = PreviewComponentModalComponent;
