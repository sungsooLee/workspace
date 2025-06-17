import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ContentsRow, DynamicFormField, Button, useModal } from '@learnway/ui';
import { cn, formatDate, DATE_TIME_FORMAT } from '@learnway/shared';
import { useDynamicForm, DynamicFormConfig, useCurrentRoute } from '@learnway/hooks';

import { FormRow, NoticeBox, HighlightMessageBox } from '../shared/ui';
import { GoogleOtpGuideButton } from '../features/auth';
import { useReissue, useUpdatePassword, useUpdatePasswordExpireDate } from '../entities';
import { useLogoutUser, useFetchAuthUser } from '../entities';

import styles from '@learnway/styles/fo/pages/_auth/change-password.module.css';

export function ChangePasswordPage({ route }: any) {
  const router = useRouter();
  const { t } = useTranslation();

  const { provider, onSubmit, setFormError } = useDynamicForm(passwordFormConfig);
  const { logout } = useLogoutUser();
  const { data: authUser } = useFetchAuthUser();

  const { alert, confirm } = useModal();
  const { update } = useUpdatePassword();
  const { reissue } = useReissue();
  const { update: updateExpireDate } = useUpdatePasswordExpireDate();

  const handleOnSubmit = async (data: any) => {
    update(
      {
        username: authUser?.email,
        oldPassword: data.oldPassword,
        newPassword: data.password,
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    );
  };

  const handleSuccess = async () => {
    await alert({
      title: t('LABEL.message.changePasswordSuccess'),
      content: t('LABEL.message.changePasswordSuccessGuide'),
    });
    logout();
  };

  const handleError = async (error: any) => {
    if (error && error.code === 'B004') {
      setFormError('oldPassword', t('LABEL.form.validation.password.00'));
    }
  };

  const handleCancel = async () => {
    const callback = await confirm({
      title: t('LABEL.message.cancelConfirm'),
      content: t('LABEL.message.passwordNotChangedGuide'),
    });
    if (callback) {
      logout();
    }
  };

  const handleLater = () => {
    updateExpireDate(
      { days: 30 },
      {
        onSuccess: async () => {
          await reissue();
          router.navigate({ to: '/' });
        },
        onError: (error) => {
          // error
          console.log('### error', error);
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.success_info}>
            <HighlightMessageBox className={styles.noti_box}>
              {`${t('LABEL.common.lastChangeDate')} : `}
              <strong>
                {formatDate(
                  authUser?.passwordChangeDate ?? new Date(),
                  DATE_TIME_FORMAT.DATETIME_WEEK_SEC,
                )}
              </strong>
            </HighlightMessageBox>
          </div>

          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <FormRow provider={provider} name={'oldPassword'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'password'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'confirm_password'} />
            </ContentsRow>
          </div>

          {/* 1개월후 변경 */}
          <div className={styles.noti_info_txt}>
            <Button className={styles.btn_txt} onClick={() => handleLater()}>
              {t('LABEL.common.monthLater')}
            </Button>
          </div>
          <NoticeBox title={t('LABEL.common.caution')} className={styles.signup_noti}>
            <dd>{t('LABEL.message.cautionPasswordInput01')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput02')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput03')}</dd>
            <dd>{t('LABEL.message.cautionPasswordInput04')}</dd>
            {/* <dd>{t('LABEL.message.cautionPasswordInput05')}</dd> */}
            {/* <dd>
              {t('LABEL.message.cautionPasswordInput06')} <GoogleOtpGuideButton />
            </dd> */}
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
      name: 'oldPassword',
      type: 'text',
      label: 'LABEL.common.oldPassword',
      value: '',
      description: '',
      required: true,
    },
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.common.newPassword',
      value: '',
      description: '',
      required: true,
    },
    {
      name: 'confirm_password',
      type: 'text',
      label: 'LABEL.common.newPasswordCheck',
      value: '',
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
