import { createFileRoute, useRouter, useMatches } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { ContentsRow, DynamicFormField, Button, useModal } from '@learnway/ui';
import { z, cn } from '@learnway/shared';
import { useDynamicForm } from '@learnway/hooks';
import { IcoCaution } from '@learnway/icons';

import { pageRouteConfig, password_validator } from '../../../features/auth';
import { FormRow, NoticeBox, EmbededAlert } from '../../../shared/ui';
import { useAsyncFetchEmail } from '../../../entities/user';

import styles from '@learnway/styles/fo/pages/_auth/signup-progress/signup-progress.module.css';

export const Route = createFileRoute('/_auth/signup-progress/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.SIGNUP_PROGRESS_STATUS',
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { state } = Route.useRouteContext();
  const { alert } = useModal();

  const { provider, onSubmit, setFormError } = useDynamicForm(detailConfig);

  const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();

  const handleOnSubmit = async (data: any) => {
    router.navigate({
      to: '/identity-verification',
      state: {
        email: data.email,
        redirectUrl: '/signup-progress/result',
        meta: { title: 'LABEL.SIGNUP_PROGRESS_STATUS' },
      },
    });
    /*
    API 확인 필요
    update(
      {
        username: data.username,
        oldPassword: data.oldPassword,
        newPassword: data.password,
      },
      {
        onSuccess: (data: any) => {
          router.navigate({
            to: '/identity-verification',
            state: { email: data.email },
          });
        },
        onError: (error: any) => {
          alert({
            title: '진행현황이 없습니다.',
            content: '입력하신 아이디의 진행현황이 없습니다.\n정확한 정보를 다시 입력해 주세요.',
          });
        },
      },
    );*/
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <EmbededAlert className={styles.search_info}>
            {t('MESSAGE.SIGNUP_PROGRESS_GUIDE')}
          </EmbededAlert>

          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'email'} />
              </FormRow>
            </ContentsRow>
          </div>

          <NoticeBox title={t('LABEL.CAUTION')} className={styles.signup_noti}>
            <dd>{t('MESSAGE.CAUTION_SIGNUP_PROGRESS')}</dd>
          </NoticeBox>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" onClick={() => handleCancel()}>
              {t('LABEL.CANCEL')}
            </Button>
            <Button type="submit" variant="primary" size="xl">
              {t('LABEL.SIGNUP_PROGRESS_OK')}
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
      name: 'email',
      type: 'text',
      label: 'LABEL.EMAIL',
      value: '',
      placeholder: '${label}을 입력하세요',
      description: '',
      required: true,
    },
  ],
  validator: {
    email: z.string().email(),
  },
};
