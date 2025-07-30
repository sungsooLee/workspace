import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import {
  Button,
  ContentsRow,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  TextareaFormField,
  useModal,
} from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { t } from 'i18next';
import { FC, useEffect, useRef, useState } from 'react';

import { useUpdateStudentsReason } from '@entities/learning-sequence/service/learning-sequence.hook';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

export interface StudentsReasonModalComponent {
  selectedItem: any;
}

const StudentsReasonModalComponent: FC<any> = ({
  selectedItem: selectedItemProps,
}: StudentsReasonModalComponent) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { closeModal, showSaveComplete } = useModal();
  const { provider, onSubmit, updateFormData } = useDynamicForm(formConfig);
  const { updateStudentsReason } = useUpdateStudentsReason({});
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if (selectedItemProps?.reason !== null && selectedItemProps?.reason !== '') {
      setIsInit(false);
      updateFormData({ reason: selectedItemProps?.reason });
    }
  }, []);
  const handleOnSubmit = async (formData: any) => {
    console.log('### handleOnSubmit');
    console.log('formData=>', formData);
    if (formData.reason === null || formData.reason === '') return;
    const payload = {
      studentId: selectedItemProps.studentId,
      reason: formData.reason,
    };

    await updateStudentsReason(payload, {
      onSuccess: async (data: any, variables: any, context: any) => {
        console.log('onSuccess:', data);
        await showSaveComplete();
        closeModal(true);
      },
      onError: (data: any, variables: any, context: any) => {
        console.log('onError:', data);
      },
    });
  };
  const handleOnSave = async () => {
    const form = formRef.current;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };
  return (
    <form className="form_row" ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <ModalContainer>
        <ModalTitle>{isInit ? t('사유입력') : t('사유보기')}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={popupStyles.pop_contents}>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'reason'}
                  element={<TextareaFormField resize={'none'} disabled={!isInit} />}
                />
              </ContentsRow>
            </div>
          </div>
        </ModalBody>
        {isInit && (
          <ModalFooter>
            <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
            <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnSave} />
          </ModalFooter>
        )}
      </ModalContainer>
    </form>
  );
};

export const StudentsReasonModal = StudentsReasonModalComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'reason',
      type: 'textarea',
      label: t('사유'),
      value: '',
      maxLength: 150,
    },
  ],
};
