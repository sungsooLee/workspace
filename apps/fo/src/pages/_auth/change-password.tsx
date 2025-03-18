import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { t } from 'i18next';

import { ContentsRow, DynamicFormField, Button, useModal, Input } from '@learnway/ui';
import { z, cn } from '@learnway/shared';
import { useDynamicForm } from '@learnway/hooks';
import { useLogoutUser } from '@learnway/config';

import { FormRow, NoticeBox, HighlightMessageBox } from '../../shared/ui';

import {
  pageRouteConfig,
  GoogleOtpGuideButton,
  AUTH_TOOL_TYPE,
  password_validator,
} from '../../features/auth';
import { useUpdatePassword } from '../../entities/user';

import styles from '@learnway/styles/fo/pages/_auth/change-password.module.css';

export const Route = createFileRoute('/_auth/change-password')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.SIGNUP_PROGRESS_STATUS',
    },
  }),
});

function RouteComponent() {
  const router = useRouter();
  const { state } = Route.useRouteContext();

  const { provider, onSubmit, setFormError } = useDynamicForm(detailConfig);
  const { logout } = useLogoutUser();

  const { alert, confirm } = useModal();
  const { update } = useUpdatePassword();

  const handleOnSubmit = async (data: any) => {
    try {
      validator(data as any);
    } catch (e) {
      console.log(e);
      return;
    }

    update(
      {
        username: data.username,
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

  const validator = (data: any) => {
    const passwordSchema = z
      .object({
        password: password_validator,
        confirm_password: password_validator,
      })
      .refine((data) => data.password === data.confirm_password, {
        message: '새로운 비밀번호를 다시 확인해 주세요.',
        path: ['confirm_password'],
      });

    const r = passwordSchema.safeParse(data);
    if (!r.success) {
      r.error.issues.forEach((error: any) => {
        setFormError(error.path[0], error.message);
      });
    }
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.success_info}>
            <HighlightMessageBox className={styles.noti_box}>
              마지막 변경일 : <strong>2025-01-01(목) 12:50:52</strong>
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

const detailConfig = {
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
    password: password_validator,
    confirm_password: password_validator,
    /*channel: z.string().nonempty(t('채널을 선택해 주세요.')),
        category: z.string().nonempty(t('유효성 테스트')),
         language_code: z.string().nonempty(t('유효성 테스트')),
         subdivision: z.string().nonempty(t('유효성 테스트')),
         check: z.boolean(),
         tenant: z.array(z.string()).nonempty(t('유효성 테스트')),*/
  },
};
