import { useEffect } from 'react';
import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { Button, ContentsRow } from '@learnway/ui';
import { IcoAlertCircleGray } from '@learnway/icons';
import { useFetchAuthUser } from '@learnway/config';
import { cn, cookieService } from '@learnway/shared';

import { useAuthSignin, getSavedUserid } from '../../features/auth';
import { useSetLanguage } from '../../features/platform';
import { DynamicFormField } from '../../shared/ui/dynamic-form-field';
import useCustomForm from '../../shared/ui/dynamic-form-field/use-dynamic-fom';

import snsNaverImage from '../../assets/images/common/logo_sns_naver.png';
import snskakaoImage from '../../assets/images/common/logo_sns_kakao.png';
import snsGoogleImage from '../../assets/images/common/logo_sns_google.png';

import { useExtendRouter } from '../../entities/platform';

import signupStyles from './signup.module.css';
import styles from './login.module.css';
import authStyles from './auth.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';
import './siginup.css';

import { FormRow } from '../../shared/ui/form-row';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { state } = Route.useRouteContext();

  console.log('state', state);

  const { provider, onSubmit, onFormChange, control } = useCustomForm(detailConfig);

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
      <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.login}`}>
        <div className={signupStyles.auth_box}>
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

          <ContentsRow className={signupStyles.login_info}>
            <FormRow provider={provider}>
              <DynamicFormField name={'saveId'} />
            </FormRow>
            {/*<Link to="/progress-status">진행 현황</Link>*/}
            <div className={signupStyles.info}>
              <Link to="/search-account">아이디/비밀번호찾기</Link>
            </div>
          </ContentsRow>

          <div className={signupStyles.btn_box}>
            <Button type="submit" size="xl" variant="primary" className={signupStyles.btn}>
              로그인
            </Button>
          </div>

          <div className={signupStyles.sns_login}>
            <h3 className={signupStyles.tit_sns}>소셜 로그인</h3>
            <ul className={signupStyles.list}>
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
            <div className={signupStyles.noti}>
              회사 메일로 회원가입 이후 SNS 간편회원으로 로그인 할 수 있습니다.
            </div>
          </div>
        </div>

        <div className={signupStyles.login_guide}>
          <span>
            <Link to="/progress-status">회원 가입 현황</Link>
            <Link to="/signup">회원가입</Link>
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
