import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { t } from 'i18next';

import { ContentsRow, DynamicFormField, Button, useModal, Input } from '@learnway/ui';
import { z, cn } from '@learnway/shared';
import { useDynamicForm } from '@learnway/hooks';

import { FormRow, NoticeBox } from '../../../shared/ui';

import {
  pageRouteConfig,
  GoogleOtpGuideButton,
  AUTH_TOOL_TYPE,
  password_validator,
} from '../../../features/auth';
import { useUpdatePasswordByPhoneNumber, useUpdatePasswordByEmail } from '../../../entities/user';

import styles from '@learnway/styles/fo/pages/_auth/search-account/change-password.module.css';

export const Route = createFileRoute('/_auth/search-account/change-password')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: () => {
      const partialSchema = z
        .object({
          phoneNumber: z.string(),
          email: z.string(),
        })
        .partial();

      return z
        .object({
          authToolType: z.enum([AUTH_TOOL_TYPE.PHONE, AUTH_TOOL_TYPE.EMAIL]),
          name: z.string().required(),
          birthday: z.string().required(),
        })
        .merge(partialSchema);
    },
    meta: {
      title: 'LABEL.PASSWORD_INPUT',
    },
  }),
});

function RouteComponent() {
  const router = useRouter();
  const { state } = Route.useRouteContext();

  const { provider, onSubmit, setFormError } = useDynamicForm(detailConfig);

  const { alert: openAlert } = useModal();
  const { update: updateByPhoneNumber } = useUpdatePasswordByPhoneNumber();
  const { update: updateByEmail } = useUpdatePasswordByEmail();

  const handleOnSubmit = async (data: any) => {
    const payload = {
      name: state.name,
      birthday: state.birthday,
      newPassword: data.password,
    };

    try {
      validator(data as any);
    } catch (e) {
      console.log(e);
      return;
    }

    if (state.authToolType === AUTH_TOOL_TYPE.PHONE) {
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
      title: '비밀번호가 변경되었습니다.',
      description: '변경된 비밀번호로 다시 로그인해 주세요.',
    });
    router.navigate({ to: '/login' });
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
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
      name: 'password',
      type: 'text',
      label: 'LABEL.NEW_PASSWORD',
      value: '',
      placeholder: '아이디/이메일을 입력하세요',
      description: '',
      required: true,
    },
    {
      name: 'confirm_password',
      type: 'text',
      label: 'LABEL.NEW_PASSWORD_CHECK',
      value: '',
      placeholder: '이름을 입력하세요',
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
