import { useTranslation } from 'react-i18next';

import { Button, ModalBody, ModalContainer, ModalFooter, useModal, ModalTitle } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { DynamicFormField, ContentsRow } from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';

import { FormRow, NoticeBox } from '../../../../shared/ui';

import { useFetchAuthUser, useUpdatePassword } from '../../../../entities/authorization';

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
            title: '비밀번호가 변경되었습니다.',
            content: '변경된 비밀번호로 다시 로그인해 주세요.',
          });
          closeModal();
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ModalContainer>
        <ModalTitle>{t('LABEL.UPDATE_PASSWORD')}</ModalTitle>
        <ModalBody>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'oldPassword'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'password'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'confirm_password'} />
            </FormRow>
          </ContentsRow>

          <NoticeBox title={t('LABEL.CAUTION')} className={styles.signup_noti}>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_01')}</dd>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_02')}</dd>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_03')}</dd>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_04')}</dd>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_05')}</dd>
          </NoticeBox>
        </ModalBody>
        <ModalFooter>
          <Button
            label={t('LABEL.CANCEL')}
            variant={'gray'}
            size={'lg'}
            onClick={() => closeModal()}
          />
          <Button label={t('LABEL.UPDATE')} variant={'primary'} size={'lg'} type="submit" />
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
      label: 'LABEL.OLD_PASSWORD',
      value: '',
      placeholder: '${label}을 입력하세요',
      description: '',
      required: true,
    },
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.NEW_PASSWORD',
      value: '',
      placeholder: '${label}을 입력하세요',
      description: '',
      required: true,
    },
    {
      name: 'confirm_password',
      type: 'text',
      label: 'LABEL.NEW_PASSWORD_CHECK',
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
          message: '새로운 비밀번호를 다시 확인해 주세요.',
          path: 'confirm_password',
        },
      ],
    },
  },
};
