import React, { FC, useEffect } from 'react';
import { t } from 'i18next';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  ContentsRow,
  TextareaFormField,
} from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import { FormRow } from '@shared/ui';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

export interface EnrollmentCancelReasonModalComponent {
  reason: string;
}

const EnrollmentCancelReasonModalComponent: FC<any> = ({
  reason: reasonProps,
}: EnrollmentCancelReasonModalComponent) => {
  const { close } = useModal();
  const { provider, onSubmit, updateFormData } = useDynamicForm(formConfig);

  useEffect(() => {
    updateFormData({ reason: reasonProps });
  }, []);
  const handleOnSubmit = (node: any) => {
    close(node);
  };
  return (
    <form className="form_row" onSubmit={onSubmit(handleOnSubmit)}>
      <ModalContainer>
        <ModalTitle>{t('사유보기')}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={popupStyles.pop_contents}>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'reason'}
                  element={<TextareaFormField resize={'none'} disabled={true} />}
                />
              </ContentsRow>
            </div>
          </div>
        </ModalBody>
      </ModalContainer>
    </form>
  );
};

export const EnrollmentCancelReasonModal = EnrollmentCancelReasonModalComponent;

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
