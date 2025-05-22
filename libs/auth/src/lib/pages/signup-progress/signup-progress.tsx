import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ContentsRow, Button, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useDynamicForm, DynamicFormConfig, useCurrentRoute } from '@learnway/hooks';

import { FormRow, NoticeBox, EmbededAlert } from '../../shared';
import { useExistsEmail } from '../../entities/authorization';

import styles from '@learnway/styles/fo/pages/_auth/signup-progress/signup-progress.module.css';

export function SignupProgressPage({ route }: any) {
  const { t } = useTranslation();
  const router = useRouter();
  const { state } = useCurrentRoute(route);
  const { alert } = useModal();

  const { provider, onSubmit, setFormError } = useDynamicForm(emailFormConfig);

  // const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();

  // email 확인
  const { existsEmail } = useExistsEmail();
  const handleOnSubmit = async (data: any) => {
    console.log('email :: ', data);
    if (!data.email) return;

    existsEmail(data.email, {
      onSuccess: (data) => {
        // TODO 관리자인지 CP사인지 API정보 필요
        if (data.isEmailExists) {
          router.navigate({
            to: '/identity-verification',
            state: {
              email: data.email,
              redirectUrl: '/signup-progress/result',
              meta: { title: 'LABEL.common.signupProgressStatus' },
            } as any,
          });
        } else {
          alert({
            title: '진행현황이 없습니다.',
            content: (
              <div className="whitespace-pre-wrap">
                {'입력하신 아이디의 진행현황이 없습니다.\n정확한 정보를 다시 입력해 주세요.'}
              </div>
            ),
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <EmbededAlert className={styles.search_info}>
            {t('LABEL.message.signupProgressGuide')}
          </EmbededAlert>

          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <FormRow provider={provider} name={'email'} />
            </ContentsRow>
          </div>

          <NoticeBox title={t('LABEL.common.caution')} className={styles.signup_noti}>
            <dd>{t('LABEL.message.cautionSignupProgress')}</dd>
          </NoticeBox>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" onClick={() => handleCancel()}>
              {t('LABEL.common.cancel')}
            </Button>
            <Button type="submit" variant="primary" size="xl">
              {t('LABEL.common.signupProgressOk')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

const emailFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'email',
      type: 'text',
      label: 'LABEL.common.email',
      value: '',
      description: '',
      required: true,
    },
  ],
  validator: {
    email: {
      format: 'email',
      required: true,
    },
  },
};
