import { useEffect } from 'react';
import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { Button } from '@learnway/ui';
import { IcoAlertCircleGray } from '@learnway/icons';
import { useFetchAuthUser } from '@learnway/config';

import { useAuthSignin } from '../../features/auth';
import { useSetLanguage } from '../../features/platform';

import styles from './login.module.css';
import authStyles from './auth.module.css';
import { DynamicFormField } from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormRow } from '../../shared/ui/form';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  const { provider, onSubmit, onFormChange, control } = useDynamicForm(detailConfig);

  const { data: authData } = useFetchAuthUser();

  const { login } = useAuthSignin();
  const { set: setLanguage, inProgress } = useSetLanguage();

  useEffect(() => {
    if ((authData as any)?.username && !inProgress) {
      router.navigate({ to: '/' });
    }
  }, [authData, inProgress]);

  useEffect(() => {
    onFormChange({
      username: '@ict-companion.com',
      password: 'hae1234',
    });
  }, []);

  const handleOnSubmit = async (data: any) => {
    const user = await login(data);
    const locale = user?.locale;
    locale && (await setLanguage(locale));
    router.navigate({ to: '/' });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <div className={`${styles.start} ${styles.auth_wrap}`}>
        <div className={authStyles.auth_box}>
          <FormRow provider={provider}>
            <DynamicFormField name={'username'} />
          </FormRow>

          <FormRow provider={provider}>
            <DynamicFormField name={'password'} />
          </FormRow>

          <FormRow provider={provider}>
            <DynamicFormField name={'saveId'} />

            <div className={styles.info}>
              <Link to="/progress-status">진행 현황</Link>
              <Link to="/search-account">아이디/비밀번호찾기</Link>
            </div>
          </FormRow>

          <div className={styles.btn_box}>
            <Button type="submit" size="xl" variant="primary" className={styles.btn}>
              로그인
            </Button>
          </div>
        </div>

        <div className={styles.login_guide}>
          <IcoAlertCircleGray width={24} height={24} />
          <span>
            아직 회원이 아니시라면{' '}
            <Link to="/signup" className={styles.btn_join}>
              회원가입
            </Link>
            하세요.
          </span>
        </div>
      </div>
    </form>
  );
}

/**
 * 필수값 : name, type
 */
const detailConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'username',
      type: 'text',
      label: '아이디/이메일',
      value: '',
      placeholder: '아아디/이메일을 입력하세요',
      description: '기본 메세지',
    },
    {
      name: 'password',
      type: 'text',
      label: '비밀번호',
      maxLength: 10,
      value: '',
      placeholder: '비밀번호를 입력하세요',
    },
    {
      name: 'saveId',
      type: 'checkbox',
      checkLabel: '아이디 저장',
      label: '',
      format: 'boolean',
      value: false,
    },
  ],
  validator: {
    username: true,
    password: true,
  },
};
