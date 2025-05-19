import { useEffect } from 'react';
import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import { Button, ContentsRow, DynamicFormField, useModal } from '@learnway/ui';
import { useFetchAuthUser, useSessionTimeoutAlertState } from '@learnway/auth';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import { cn } from '@learnway/shared';

import { useAuthSignin, getSavedUserid, pageRouteConfig } from '../../features/auth';
import { useSetLanguage } from '../../features/platform';
import { AUTH_CONTAINERS } from '../../widgets/layout';

import snsNaverImage from '../../assets/images/common/logo_sns_naver.png';
import snskakaoImage from '../../assets/images/common/logo_sns_kakao.png';
import snsGoogleImage from '../../assets/images/common/logo_sns_google.png';

import styles from '@learnway/styles/fo/pages/_auth/login.module.css';

import { FormRow } from '../../shared/ui';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      mobile: {
        showHeader: true,
      },
      title: 'LABEL.common.loginWelcomeMessage',
      container: AUTH_CONTAINERS.LOGIN,
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { alert } = useModal();

  const { provider, onSubmit, onFormChange, control } = useDynamicForm(loginFormConfig);

  const [sessionTimeoutAlert, setSessionTimeoutAlert] = useSessionTimeoutAlertState();
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
      username: getSavedUserid() ?? '@ict-companion.com',
      password: 'hae1234',
      saveId: !isEmpty(getSavedUserid()),
    });
  }, []);

  useEffect(() => {
    if (sessionTimeoutAlert) {
      alert({
        title: '자동 로그아웃 되었습니다.',
        content: '로그인 후 2시간이 경과되어 로그아웃 되었습니다.\n다시 로그인 후 이용해 주십시오',
      });
      setSessionTimeoutAlert(false);
    }
  }, [sessionTimeoutAlert]);

  const handleOnSubmit = async (data: any) => {
    const user = await login(data, {
      onSuccess: async (data, variables, context) => {
        const locale = user?.locale;
        locale && (await setLanguage(locale));
        router.navigate({ to: '/' });
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className={'form_row'}>
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.login}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className="no_line col">
            <ContentsRow>
              <FormRow provider={provider} name={'username'} />
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider} name={'password'} />
            </ContentsRow>
          </div>

          <ContentsRow className={styles.login_info}>
            <FormRow provider={provider} name={'saveId'} />
            {/*<Link to="/progress-status">진행 현황</Link>*/}
            <div className={styles.info}>
              <Link to="/search-account">{t('LABEL.common.accountPasswordSearch')}</Link>
            </div>
          </ContentsRow>

          <div className={styles.btn_box}>
            <Button type="submit" size="xl" variant="primary" className={styles.btn}>
              {t('LABEL.common.login')}
            </Button>
          </div>

          <div className={styles.sns_login}>
            <h3 className={styles.tit_sns}>{t('LABEL.common.socialLogin')}</h3>
            <ul className={styles.list}>
              <li>
                <Button>
                  <img src={snsNaverImage} alt="naver" />
                </Button>
              </li>
              <li>
                <Button>
                  <img src={snskakaoImage} alt="kakao" />
                </Button>
              </li>
              <li>
                <Button>
                  <img src={snsGoogleImage} alt="google" />
                </Button>
              </li>
            </ul>
            <div className={styles.noti}>{t('LABEL.message.loginGuide')}</div>
          </div>
        </div>

        <div className={styles.login_guide}>
          <span>
            <Link to="/signup-progress">{t('LABEL.common.membershipStatus')}</Link>
            {/*<Link to="/signup">{t('LABEL.common.joinTheMembership')}</Link>*/}
            <Link to="/login">{t('LABEL.common.joinTheMembership')}</Link>
          </span>
        </div>
      </div>
    </form>
  );
}

const loginFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'username',
      type: 'text',
      label: 'LABEL.common.account(email)',
      value: '',
      placeholder: '아아디/이메일을 입력하세요',
      description: '기본 메세지',
      format: 'email',
    },
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.common.password',
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
