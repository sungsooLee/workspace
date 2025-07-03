import { useTranslation } from 'react-i18next';

import { Button, ModalBody, ModalContainer, ModalFooter, useModal, ModalTitle } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { DynamicFormField, ContentsRow } from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';

import { FormRow, NoticeBox } from '../../../../shared/ui';

import { useFetchAuthUser, useUpdatePassword } from '../../../../entities';

import styles from '@learnway/styles/bo/assets/styles/modules/widget-management.module.css'; // 화면 css

const ChangePasswordModalComponent = () => {
  const { t } = useTranslation();
  const { close: closeModal, alert } = useModal();

  const { provider, onFormChange, control, getValues, onFormValid, onSubmit, setFormError } =
    useDynamicForm(passwordFormConfig);

  const { data: authUser } = useFetchAuthUser();
  const { update } = useUpdatePassword();

  const handleOnSubmit = async (data: any) => {
    update(
      {
        username: authUser?.email,
        oldPassword: data.oldPassword,
        newPassword: data.password,
      },
      {
        onSuccess: async () => {
          await alert({
            title: t('LABEL.message.changePasswordSuccess'),
            content: t('LABEL.message.changePasswordSuccessGuide'),
          });
          closeModal();
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ModalContainer>
        <ModalTitle>{t('LABEL.common.passwordChange')}</ModalTitle>
        <ModalBody>
          <ContentsRow>
            <FormRow provider={provider} name={'oldPassword'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'password'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'confirm_password'} />
          </ContentsRow>

          <NoticeBox title={t('LABEL.common.caution')} className={styles.signup_noti}>
            <dd>{t('LABEL.message.cautionPasswordInput01')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput02')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput03')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput04')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput05')}</dd>
          </NoticeBox>
        </ModalBody>
        <ModalFooter>
          <Button
            label={t('LABEL.common.cancel')}
            variant={'gray'}
            size={'lg'}
            onClick={() => closeModal()}
          />
          <Button label={t('LABEL.common.update')} variant={'primary'} size={'lg'} type="submit" />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const ChangePasswordModal = ChangePasswordModalComponent;

const passwordFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'oldPassword',
      type: 'text',
      label: 'LABEL.common.oldPassword',
      value: '',
      placeholder: '${label}을 입력하세요',
      description: '',
      required: true,
    },
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.common.newPassword',
      value: '',
      placeholder: '${label}을 입력하세요',
      description: '',
      required: true,
    },
    {
      name: 'confirm_password',
      type: 'text',
      label: 'LABEL.common.newPasswordCheck',
      value: '',
      placeholder: '${label}을 입력하세요',
      description: '',
    },
  ],
  validator: {
    oldPassword: {
      format: 'string',
      required: true,
    },
    password: {
      format: 'password',
      required: true,
    },
    confirm_password: {
      format: 'password',
      required: true,
      conditions: [
        {
          fn: (values: Record<string, any>) => values.password !== values.confirm_password,
          message: 'LABEL.message.validationConfirmPassword',
          path: 'confirm_password',
        },
      ],
    },
  },
};
