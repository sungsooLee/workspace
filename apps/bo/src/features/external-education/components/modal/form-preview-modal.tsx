import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import FieldRenderer, { FormFieldsRenderer } from '../field-renderer';
import { DEFAULT_FIELD_CONFIG, FieldType } from '../../types/form-field.types';
import { useState } from 'react';
import { ApplicationItem } from './add-component-modal';

interface FormPreviewModalProps {
  applicationItems: ApplicationItem[];
}

const FormPreviewModalComponent = ({ applicationItems }: FormPreviewModalProps) => {
  // 순서대로 정렬된 아이템들
  const sortedItems = [...applicationItems].sort((a, b) => a.order - b.order);
  const { close: onClose } = useModal();

  const [formValues, setFormValues] = useState<Record<string, unknown>>({});

  const availableItems = sortedItems.filter((item) => DEFAULT_FIELD_CONFIG[item.fieldKey]);

  // 폼 값 변경 핸들러
  const handleFormChange = (fieldKey: string, value: unknown) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  // 기본값 설정
  const getInitialValues = () => {
    const initialValues: Record<string, unknown> = {};

    availableItems.forEach((item) => {
      const config = DEFAULT_FIELD_CONFIG[item.fieldKey];
      if (config) {
        switch (config.type) {
          case 'radio':
            initialValues[item.fieldKey] = config.options?.[0]?.value || '';
            break;
          case 'checkbox':
            initialValues[item.fieldKey] = [];
            break;
          case 'select':
            initialValues[item.fieldKey] = config.options?.[0]?.value || '';
            break;
          case 'date':
            initialValues[item.fieldKey] = new Date().toISOString().split('T')[0];
            break;
          case 'dateRange':
            initialValues[item.fieldKey] = { from: '', to: '' };
            break;
          case 'custom':
            // 커스텀 필드별 기본값
            if (config.componentName === 'AddressField') {
              initialValues[item.fieldKey] = { zipCode: '', address: '', detailAddress: '' };
            } else if (config.componentName === 'ExperienceField') {
              initialValues[item.fieldKey] = [];
            } else if (config.componentName === 'SkillRatingField') {
              initialValues[item.fieldKey] = [];
            }
            break;
          default:
            initialValues[item.fieldKey] = '';
        }
      }
    });

    return initialValues;
  };

  // 초기값이 없으면 설정
  const currentValues = Object.keys(formValues).length === 0 ? getInitialValues() : formValues;

  return (
    <ModalContainer>
      <ModalTitle>전체 신청서 미리보기</ModalTitle>
      <ModalBody>
        {availableItems.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>미리보기할 항목이 없습니다.</p>
            <p className="mt-1 text-sm">먼저 신청 항목을 추가해주세요.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {availableItems.map((item) => {
              const config = DEFAULT_FIELD_CONFIG[item.fieldKey];
              if (!config) return null;

              return (
                <FieldRenderer
                  key={item.id}
                  config={config}
                  fieldKey={item.fieldKey}
                  value={currentValues[item.fieldKey]}
                  onChange={(value) => handleFormChange(item.fieldKey, value)}
                />
              );
            })}
          </div>
        )}
      </ModalBody>
      {/* <ModalFooter>
        <Button onClick={onClose}>닫기</Button>
      </ModalFooter> */}
    </ModalContainer>
  );
};

export const FormPreviewModal = FormPreviewModalComponent;
