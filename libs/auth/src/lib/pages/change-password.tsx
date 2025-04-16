import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { ContentsRow, DynamicFormField, Button, useModal } from '@learnway/ui';
import { cn, formatDate, DATE_TIME_FORMAT } from '@learnway/shared';
import { useDynamicForm, DynamicFormConfig, useCurrentRoute } from '@learnway/hooks';

import { FormRow, NoticeBox, HighlightMessageBox } from '../shared/ui';
import { GoogleOtpGuideButton } from '../features/auth';
import { useUpdatePassword } from '../entities/user';
import { useLogoutUser, useFetchAuthUser } from '../entities/authorization';

import styles from '@learnway/styles/fo/pages/_auth/change-password.module.css';

export function ChangePasswordPage({ route }: any) {
  const router = useRouter();
  const { state } = useCurrentRoute(route);

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
      title: '비밀번호가 변경되었습니다.',
      content: '변경된 비밀번호로 다시 로그인해 주세요.',
    });
    logout();
  };

  const handleCancel = async () => {
    const callback = await confirm({
      title: '취소하시겠습니까?',
      content:
        '비밀번호를 변경하지 않으면 로그아웃됩니다.\n서비스를 이용하려면 비밀번호를 변경해 주세요.',
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
              마지막 변경일 :
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
          </div>

          <NoticeBox title={t('LABEL.CAUTION')} className={styles.signup_noti}>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_01')}</dd>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_02')}</dd>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_03')}</dd>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_04')}</dd>
            <dd>{t('MESSAGE.CAUTION_PASSWORD_INPUT_05')}</dd>
            <dd>
              {t('MESSAGE.CAUTION_PASSWORD_INPUT_06')} <GoogleOtpGuideButton />
            </dd>
          </NoticeBox>

          <div className={styles.noti_info_txt}>
            <Button className={styles.btn_txt} onClick={() => handleLater()}>
              1개월 후 변경
            </Button>
          </div>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" onClick={() => handleCancel()}>
              {t('LABEL.CANCEL')}
            </Button>
            <Button type="submit" variant="primary" size="xl">
              {t('LABEL.OK')}
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
