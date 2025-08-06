import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { TextareaFormField } from '@learnway/ui/form-field';
import { t } from 'i18next';
import { FC } from 'react';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { FormRow } from '@shared/ui/form';

const RejectModalComponent: FC<any> = () => {
  const { closeModal } = useModal();
  const { provider, onSubmit } = useDynamicForm(formConfig);

  const handleOnSubmit = (node: any) => {
    closeModal(node);
  };
  return (
    <form className="form_row" onSubmit={onSubmit(handleOnSubmit)}>
      <ModalContainer>
        <ModalTitle>{t('반려 사유')}</ModalTitle>
        <ModalBody>
          <div className={popupStyles.wrap}>
            <div className={popupStyles.pop_contents}>
              <ContentsRow>
                <FormRow
                  provider={provider}
                  name={'rejectReason'}
                  element={<TextareaFormField resize={'none'} />}
                />
              </ContentsRow>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button type="submit" label={t('확인')} variant={'primary'} size={'lg'} />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const RejectModal = RejectModalComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'rejectReason',
      type: 'textarea',
      label: t('반려 사유'),
      value: '',
      placeholder: t('반려 시 반려 사유를 반드시 입력해 주세요.'),
      maxLength: 150,
    },
  ],
  validator: {
    rejectReason: true,
  },
};
