import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ContentsRow, DynamicFormField, Button, useModal, Input } from '@learnway/ui';
import { z, cn } from '@learnway/shared';
import { useDynamicForm, DynamicFormConfig, useCurrentRoute } from '@learnway/hooks';

import { FormRow, NoticeBox } from '../../shared/ui';

import { GoogleOtpGuideButton } from '../../features/auth';
import {
  useUpdatePasswordByPhoneNumber,
  useUpdatePasswordByEmail,
} from '../../entities/authorization';

import styles from '@learnway/styles/fo/pages/_auth/search-account/change-password.module.css';

export function ChangePasswordBySearchAccountPage({ route }: any) {
  const router = useRouter();
  const { t } = useTranslation();
  const { state } = useCurrentRoute(route);

  const { provider, onSubmit, setFormError } = useDynamicForm(passwordFormConfig);

  const { alert: openAlert } = useModal();
  const { update: updateByPhoneNumber } = useUpdatePasswordByPhoneNumber();
  const { update: updateByEmail } = useUpdatePasswordByEmail();

  const handleOnSubmit = async (data: any) => {
    const payload = {
      name: state.name,
      birthday: state.birthday,
      newPassword: data.password,
    };

    if (state.authToolType === 'PHONE') {
      updateByPhoneNumber(
        { ...payload, phoneNumber: state.phoneNumber },
        {
          onSuccess: handleSuccess,
        },
      );
    } else {
      updateByEmail(
        { ...payload, email: state.email },
        {
          onSuccess: handleSuccess,
        },
      );
    }
  };

  const handleSuccess = () => {
    openAlert({
      title: t('LABEL.message.changePasswordSuccess'),
      content: t('LABEL.message.changePasswordSuccessGuide'),
    });
    router.navigate({ to: '/login' });
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
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
          </div>

          <NoticeBox title={t('LABEL.common.caution')} className={styles.signup_noti}>
            <dd>{t('LABEL.message.cautionPasswordInput01')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput02')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput03')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput04')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput05')}</dd>
            <dd>
              {t('LABEL.message.cautionPasswordInput06')} <GoogleOtpGuideButton />
            </dd>
          </NoticeBox>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" onClick={() => handleCancel()}>
              {t('LABEL.common.cancel')}
            </Button>
            <Button type="submit" variant="primary" size="xl">
              {t('LABEL.common.ok')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

const passwordFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.common.newPassword',
      value: '',
      placeholder: '아이디/이메일을 입력하세요',
      description: '',
      required: true,
    },
    {
      name: 'confirm_password',
      type: 'text',
      label: 'LABEL.common.newPasswordCheck',
      value: '',
      placeholder: '이름을 입력하세요',
      description: '',
    },
  ],
  validator: {
    password: {
      format: 'password',
      required: true,
    },
    confirm_password: {
      format: 'password',
      required: true,
      conditions: [
        {
          fn: (values: Record<string, any>) => values.password === values.confirm_password,
          message: 'LABEL.message.validationConfirmPassword',
          path: 'confirm_password',
        },
      ],
    },
  },
};
