import React, { FC } from 'react';
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

const ChannelRejectModalComponent: FC<any> = () => {
  const { close } = useModal();
  const { provider, onSubmit } = useDynamicForm(formConfig);

  const handleOnSubmit = (node: any) => {
    close(node);
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
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => close()} />
          <Button type="submit" label={t('확인')} variant={'primary'} size={'lg'} />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const ChannelRejectModal = ChannelRejectModalComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'rejectReason',
      type: 'textarea',
      label: t('반려 사유'),
      value: '',
      placeholder: '반려 시 반려 사유를 반드시 입력해 주세요.',
      maxLength: 150,
    },
  ],
  validator: {
    rejectReason: true,
  },
};
