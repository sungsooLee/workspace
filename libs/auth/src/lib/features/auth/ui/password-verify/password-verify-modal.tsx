import { memo } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { DynamicFormField, ContentsRow } from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';

import { FormRow, EmbededAlert } from '../../../../shared/ui';
import { useVerifyPassword } from '../../../../entities/authorization';

import styles from '@learnway/styles/bo/assets/styles/modules/widget-management.module.css'; // 화면 css

const PasswordVerifyModalComponent = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { provider, onFormChange, control, getValues, onFormValid, onSubmit, setFormError } =
    useDynamicForm(passwordVerifyFormConfig);

  const { verify } = useVerifyPassword();

  const handleOnSubmit = async (data: any) => {
    verify(data.password, {
      onSuccess: async (d, variables, context) => {
        router.navigate({ to: '/my-page/privacy', state: { confirmPassword: 'true' } as any });
      },
      onError: handleVerifyError,
    });
  };

  const handleVerifyError = () => {
    //setFormError('verificationCode', t('MESSAGE.INVALID_AUTH_NUMBER'));
    //router.navigate({ to: '/my-page/privacy', state: { confirmPassword: 'true' } as any });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ModalContainer>
        <ModalTitle>{t('LABEL.PASSWORD_VERIFY')}</ModalTitle>

        <ModalBody>
          <EmbededAlert className={styles.search_info} hiddenIcon>
            {t(`LABEL.PASSWORD_VERIFY_FOR_CHANGE_PASSWORD`)}
          </EmbededAlert>

          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'password'} />
            </FormRow>
          </ContentsRow>
        </ModalBody>
        <ModalFooter>
          <Button label={t('LABEL.OK')} variant={'primary'} size={'lg'} type="submit" />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const PasswordVerifyModal = memo(PasswordVerifyModalComponent);

const passwordVerifyFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.PASSWORD',
      value: '',
      required: true,
    },
  ],
  validator: {
    password: {
      format: 'password',
      required: true,
    },
  },
};
