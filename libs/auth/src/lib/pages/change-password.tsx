import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ContentsRow, DynamicFormField, Button, useModal } from '@learnway/ui';
import { cn, formatDate, DATE_TIME_FORMAT } from '@learnway/shared';
import { useDynamicForm, DynamicFormConfig, useCurrentRoute } from '@learnway/hooks';

import { FormRow, NoticeBox, HighlightMessageBox } from '../shared/ui';
import { GoogleOtpGuideButton } from '../features/auth';
import { useUpdatePassword } from '../entities';
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

  const handleOnSubmit = async (data: any) => {
    update(
      {
        username: authUser?.email,
        oldPassword: data.oldPassword,
        newPassword: data.password,
      },
      {
        onSuccess: handleSuccess,
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
    router.navigate({ to: '/' });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.success_info}>
            <HighlightMessageBox className={styles.noti_box}>
              {t('LABEL.common.lastChangeDate')} :
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

          <div className={styles.noti_info_txt}>
            <Button className={styles.btn_txt} onClick={() => handleLater()}>
              1개월 후 변경
            </Button>
          </div>

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
