import { useEffect } from 'react';
import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import { Button, ContentsRow, DynamicFormField } from '@learnway/ui';
import { useFetchAuthUser } from '@learnway/config';
import { useDynamicForm } from '@learnway/hooks';
import { cn } from '@learnway/shared';

import { useAuthSignin, getSavedUserid, pageRouteConfig } from '../../features/auth';
import { useSetLanguage } from '../../features/platform';

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
      title: 'LABEL.LOGIN_WELCOME_MESSAGE',
    },
  }),
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
      username: getSavedUserid() ?? '@ict-companion.com',
      password: 'hae1234',
      saveId: !isEmpty(getSavedUserid()),
    });
  }, []);

  const handleOnSubmit = async (data: any) => {
    const user = await login(data);
    const locale = user?.locale;
    locale && (await setLanguage(locale));
    router.navigate({ to: '/' });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className={'form_row'}>
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.login}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className="no_line col">
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'username'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'password'} />
              </FormRow>
            </ContentsRow>
          </div>

          <ContentsRow className={styles.login_info}>
            <FormRow provider={provider}>
              <DynamicFormField name={'saveId'} />
            </FormRow>
            {/*<Link to="/progress-status">진행 현황</Link>*/}
            <div className={styles.info}>
              <Link to="/search-account">{t('LABEL.ACCOUNT_PASSWORD_SEARCH')}</Link>
            </div>
          </ContentsRow>

          <div className={styles.btn_box}>
            <Button type="submit" size="xl" variant="primary" className={styles.btn}>
              {t('LABEL.LOGIN')}
            </Button>
          </div>

          <div className={styles.sns_login}>
            <h3 className={styles.tit_sns}>{t('LABEL.소셜 로그인')}</h3>
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
            <div className={styles.noti}>{t('MESSAGE.LOGIN_GUIDE')}</div>
          </div>
        </div>

        <div className={styles.login_guide}>
          <span>
            <Link to="/signup-progress">{t('LABEL.회원 가입 현황')}</Link>
            {/*<Link to="/signup">{t('LABEL.회원가입')}</Link>*/}
            <Link to="/login">{t('LABEL.회원가입')}</Link>
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
      label: 'LABEL.아이디(이메일)',
      value: '',
      placeholder: '아아디/이메일을 입력하세요',
      description: '기본 메세지',
    },
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.비밀번호',
      maxLength: 10,
      value: '',
      placeholder: '비밀번호를 입력하세요',
    },
    {
      name: 'saveId',
      type: 'checkbox',
      checkConfig: {
        label: 'LABEL.아이디 저장',
      },
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
