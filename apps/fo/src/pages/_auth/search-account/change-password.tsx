import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { t } from 'i18next';
import { isEmpty } from 'lodash';

import { ContentsRow, DynamicFormField, Button, useModal, Input } from '@learnway/ui';
import { z, cn } from '@learnway/shared';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';

import { FormRow, NoticeBox } from '../../../shared/ui';

import { pageRouteConfig, GoogleOtpGuideButton } from '../../../features/auth';
import { useUpdatePasswordByPhoneNumber, useUpdatePasswordByEmail } from '../../../entities/user';

import styles from '@learnway/styles/fo/pages/_auth/search-account/change-password.module.css';

export const Route = createFileRoute('/_auth/search-account/change-password')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      authToolType: {
        format: 'string',
        default: 'PHONE',
        conditions: [
          {
            fn: (values: any) => !['PHONE', 'EMAIL'].includes(values.authToolType),
          },
        ],
      },
      phoneNumber: {
        format: 'object',
        required: {
          fn: (data) => {
            return isEmpty(data.phoneNumber) && data.authToolType === 'PHONE';
          },
        },
      },
      email: {
        format: 'email',
        required: {
          fn: (data) => data.authToolType === 'EMAIL',
        },
      },
    },
    meta: {
      title: 'LABEL.PASSWORD_INPUT',
    },
  }),
});

function RouteComponent() {
  const router = useRouter();
  const { state } = Route.useRouteContext();

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
      title: '비밀번호가 변경되었습니다.',
      description: '변경된 비밀번호로 다시 로그인해 주세요.',
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

const passwordFormConfig: DynamicFormConfig = {
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
          message: '새로운 비밀번호를 다시 확인해 주세요.',
          path: 'confirm_password',
        },
      ],
    },
  },
};
