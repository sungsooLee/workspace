import { useEffect } from 'react';
import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import useCustomForm from '../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { Button } from '@learnway/ui';
import { IcoAlertCircleGray } from '@learnway/icons';

import { useFetchAuthUser, useLoginUser } from '../../entities/user';
import { DynamicFormField } from '../../shared/ui/dynamic-form-field';
import { useSetLanguage } from '../../features/platform';

import styles from './login.module.css';
import authStyles from './auth.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  const { provider, onSubmit, reset, control } = useCustomForm(detailConfig);

  const { data } = useFetchAuthUser();

  const { login } = useLoginUser();
  const { set: setLanguage, inProgress } = useSetLanguage();

  useEffect(() => {
    if ((data as any)?.username && !inProgress) {
      //router.navigate({ to: '/' });
    }
  }, [data, inProgress]);

  useEffect(() => {
    reset({
      username: 'test2@email.com',
      password: 'hae1234',
    });
  }, []);

  const handleOnSubmit = (data: any) => {
    //(data: z.infer<typeof schema>) => {
    //alert(JSON.stringify(data, null, 2));

    login(data, {
      onSuccess: async (data, variables, context) => {
        const userLang = data.data.data.userLanguageSetCode;
        await setLanguage(userLang);
        router.navigate({ to: '/' });
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <div className={`${styles.start} ${styles.auth_wrap}`}>
        <div className={authStyles.auth_box}>
          <div className={formStyles.form_row}>
            <DynamicFormField provider={provider} name={'username'} />
          </div>

          <div className={formStyles.form_row}>
            <DynamicFormField provider={provider} name={'password'} />
          </div>

          <div className={styles.login_info}>
            <DynamicFormField provider={provider} name={'saveId'} />

            <div className={styles.info}>
              <Link to="/progress-status">진행 현황</Link>
              <Link to="/search-account">아이디/비밀번호찾기</Link>
            </div>
          </div>

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
const detailConfig = {
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
      value: false,
    },
  ],
  validator: {
    /*channel: z.string().nonempty(t('채널을 선택해 주세요.')),
    category: z.string().nonempty(t('유효성 테스트')),
     language_code: z.string().nonempty(t('유효성 테스트')),
     subdivision: z.string().nonempty(t('유효성 테스트')),
     check: z.boolean(),
     tenant: z.array(z.string()).nonempty(t('유효성 테스트')),*/
  },
};
