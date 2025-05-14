import { useEffect } from 'react';
import { createFileRoute, useRouter, Link, useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import { Button, ContentsRow } from '@learnway/ui';
import { useFetchAuthUser } from '@learnway/auth';
import { cn } from '@learnway/shared';
import { DynamicFormField } from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import { useAuthSignin, getSavedUserid, pageRouteConfig } from '../../features/auth';
import { useSetLanguage } from '../../features/platform';

import { FormRow } from '../../shared/ui/form';
import { AUTH_CONTAINERS } from '../../widgets/layout';

import authStyles from './auth.module.css';
import styles from '@learnway/styles/bo/pages/_auth/login.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  ...pageRouteConfig({
    authorization: false,
    meta: {
      title: 'LABEL.common.loginWelcomeMessage',
      container: AUTH_CONTAINERS.LOGIN,
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = Route.useParams();
  const search = Route.useSearch();

  const { provider, onSubmit, onFormChange, control } = useDynamicForm(detailConfig);

  const { data: authData } = useFetchAuthUser();

  const { login } = useAuthSignin();
  const { set: setLanguage, inProgress } = useSetLanguage();

  useEffect(() => {
    onFormChange({
      username: getSavedUserid() ?? '@ict-companion.com',
      password: 'hae1234',
      saveId: !isEmpty(getSavedUserid()),
    });
  }, []);

  const handleOnSubmit = async (values: any) => {
    await login(values, {
      onSuccess: async (data) => {
        const locale = data?.locale;
        locale && (await setLanguage(locale));
        router.navigate({ to: search.redirect || '/' });
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.login}`}>
        <div className={authStyles.auth_box}>
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'username'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow className={formStyles.no_line}>
            <FormRow provider={provider}>
              <DynamicFormField name={'password'} />
            </FormRow>
          </ContentsRow>

          <ContentsRow className={cn(formStyles.no_line, styles.login_info)}>
            <FormRow provider={provider}>
              <DynamicFormField name={'saveId'} />
            </FormRow>
            <div className={styles.info}>
              <Link to="/search-account">아이디 찾기</Link>
              <Link to="/search-account">비밀번호 찾기</Link>
            </div>
          </ContentsRow>

          <div className={styles.btn_box}>
            <Button type="submit" size="xl" variant="primary" className={styles.btn}>
              로그인
            </Button>
          </div>
        </div>

        <div className={styles.login_guide}>
          <span>
            <Link to="/signup-progress">회원 가입 현황</Link>
            <Link to="/signup">관리자 회원가입</Link>
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
      format: 'email',
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
      checkConfig: {
        label: 'LABEL.common.saveAccount',
      },
      value: false,
    },
  ],
  validator: {
    username: {
      format: 'email',
      required: true,
    },
    password: {
      format: 'string',
      required: true,
    },
  },
};
