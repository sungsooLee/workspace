import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useLogoutUser, useSessionTimeoutAlertState } from '@learnway/auth/entities';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { cn, dateDiff } from '@learnway/shared';
import { Button, ContentsRow, Input, useModal } from '@learnway/ui';

import { getSavedUserid, pageRouteConfig, useAuthSignin } from '@features/auth';
import { useSetLanguage } from '@features/platform';
import { AUTH_CONTAINERS } from '@widgets/layout';

import { AUTH_ERROR_CODE } from '@learnway/auth/features';
import { CheckBoxFormField } from '@learnway/auth/shared';
import { FormRow } from '@shared/ui';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import authTitleStyle from '@learnway/styles/fo/pages/_auth/auth-title.module.css';
import styles from '@learnway/styles/fo/pages/_auth/login.module.css';
import { TFunction } from 'i18next';

import snsGoogleImage from '@assets/images/common/logo_sns_google.png';
import snskakaoImage from '@assets/images/common/logo_sns_kakao.png';
import snsNaverImage from '@assets/images/common/logo_sns_naver.png';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      mobile: {
        showHeader: true,
      },
      title: '',
      container: AUTH_CONTAINERS.LOGIN,
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const search = Route.useSearch();
  const { alert } = useModal();

  const formConfig = FormConfig(t);
  const { provider, onSubmit, onFormChange, getValues, onFormValid, onFormFocus } =
    useDynamicForm(formConfig);
  const [sessionTimeoutAlert, setSessionTimeoutAlert] = useSessionTimeoutAlertState();

  const { login } = useAuthSignin();
  const { logout } = useLogoutUser();
  const { set: setLanguage, inProgress } = useSetLanguage();
  const { openModal, alert: openAlert } = useModal();

  // const { data: authData } = useFetchAuthUser();
  // useEffect(() => {
  //   if ((authData as any)?.username && !inProgress) {
  //     router.navigate({ to: '/' });
  //   }
  // }, [authData, inProgress]);

  useEffect(() => {
    onFormFocus('password');
    onFormChange({
      username: getSavedUserid() ?? '@ict-companion.com',
      password: 'hae1234',
      saveId: !isEmpty(getSavedUserid()),
    });
  }, []);

  useEffect(() => {
    if (sessionTimeoutAlert) {
      openAlert({
        title: t('자동 로그아웃 되었습니다.'),
        content: t(
          '로그인 후 2시간이 경과되어 로그아웃 되었습니다.\n다시 로그인 후 이용해 주십시오',
        ),
      });
      setSessionTimeoutAlert(false);
    }
  }, [sessionTimeoutAlert]);

  const handleExpireCheck = async (data: any) => {
    // if (dayjs(authData?.passwordExpireDate).diff(dayjs()) < 0) {
    const diff = dateDiff(data!.passwordExpireDate, new Date(), 'd');
    // console.log('### login date check', diff);
    if (diff !== undefined && 0 >= diff) {
      if (data?.authType === 'PLATFORM') {
        // 패스워드 사용자
        await openAlert({
          title: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_USE.title'),
          content: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_USE.message'),
          onClose: () => {
            router.navigate({ to: '/change-password' });
          },
        });
        return false;
      } else {
        // 패스워드 미사용자
        await openAlert({
          title: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_NOT_USE.title'),
          content: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_NOT_USE.message'),
          onClose: () => {
            logout();
          },
        });
        return false;
      }
    }
    return true;
  };

  const handleTenantCheck = async (data: any) => {
    console.log(' ### handleTenantSelectCheck', data);

    // TODO 테넌트/역할 구성 후 제외 필요
    // return true;

    // TODO 테넌트/역할 없을때 처리
    // if (!data?.tenents?.length || !data?.roles?.length) {
    //   loginErrorAlert({ code: AUTH_ERROR_CODE.TENANT_PENDING });
    //   return false;
    // }

    // TODO 역할체크도 필요
    //  테넌트/역할 선택 - 최초 로그인 사용자
    if (!data?.lastVisitedFoTenantId) {
      alert('테넌트를 선택해 주세요.');
    }
    return true;
  };

  const loginErrorAlert = (error: any) => {
    console.log('loginErrorAlert :: ', error);

    // TODO 에러코드 정의시 처리 필요
    switch (error.code) {
      case AUTH_ERROR_CODE.FAIL_ID_PASSWORD: // 아이디 없음 // 패스워드 실패
        openAlert({
          title: 'LABEL.alert.FAIL_ID_PASSWORD.title',
          content: 'LABEL.alert.FAIL_ID_PASSWORD.message',
        });
        break;
      case AUTH_ERROR_CODE.LOGIN_LOCK_PASSWORD_USE: // 잠김 - 패스워드 사용자
        openAlert({
          title: t('LABEL.alert.LOGIN_LOCK_PASSWORD_USE.title'),
          content: t('LABEL.alert.LOGIN_LOCK_PASSWORD_USE.message'),
        });
        break;
      case AUTH_ERROR_CODE.LOGIN_LOCK_PASSWORD_NOT_USE: // 잠김 - 패스워드 미사용자
        // openAlert({
        //   title: t('LABEL.alert.LOGIN_LOCK_PASSWORD_NOT_USE.title'),
        //   content: (
        //     <LoginErrorAlert
        //       message={t('LABEL.alert.LOGIN_LOCK_PASSWORD_USE.message')}
        //       subMessage={t('LABEL.alert.LOGIN_LOCK_PASSWORD_USE.etc', {
        //         data: error?.lockDate,
        //       })}
        //     />
        //   ),
        // });
        break;
      case AUTH_ERROR_CODE.APPROVAL_ADMIN_PENDING: // 어드민 승인 대기
        // openAlert({
        //   title: t('LABEL.alert.APPROVAL_ADMIN_PENDING.title'),
        //   content: (
        //     <LoginErrorAlert
        //       message={t('LABEL.alert.APPROVAL_ADMIN_PENDING.message')}
        //       subMessage={t('LABEL.alert.APPROVAL_ADMIN_PENDING.etc', {
        //         data: error.loginFailCount,
        //       })}
        //     />
        //   ),
        // });
        break;
      case AUTH_ERROR_CODE.APPROVAL_ADMIN_REJECT: // 어드민 승인 반려
        // openAlert({
        //   title: t('LABEL.alert.APPROVAL_ADMIN_REJECT.title'),
        //   content: (
        //     <LoginErrorAlert
        //       message={t('LABEL.alert.APPROVAL_ADMIN_REJECT.message')}
        //       subMessage={t('LABEL.alert.APPROVAL_ADMIN_REJECT.etc', {
        //         data: error.loginFailCount,
        //       })}
        //     />
        //   ),
        // });
        break;
      case AUTH_ERROR_CODE.APPROVAL_CP_PENDING: // CP 승인 대기
        // openAlert({
        //   title: t('LABEL.alert.APPROVAL_CP_PENDING.title'),
        //   content: (
        //     <LoginErrorAlert
        //       message={t('LABEL.alert.APPROVAL_CP_PENDING.message')}
        //       subMessage={t('LABEL.alert.APPROVAL_CP_PENDING.etc', {
        //         data: error.loginFailCount,
        //       })}
        //     />
        //   ),
        // });
        break;
      case AUTH_ERROR_CODE.APPROVAL_CP_REJECT: // CP 승인 반려
        // openAlert({
        //   title: t('LABEL.alert.APPROVAL_CP_REJECT.title'),
        //   content: (
        //     <LoginErrorAlert
        //       message={t('LABEL.alert.APPROVAL_CP_REJECT.message')}
        //       subMessage={t('LABEL.alert.APPROVAL_CP_REJECT.etc', {
        //         data: error.loginFailCount,
        //       })}
        //     />
        //   ),
        // });
        break;
      case AUTH_ERROR_CODE.PASSWORD_CHANGE_PASSWORD_USE: // 패스워드 변경 안내 - 패스워드 사용자
        openAlert({
          title: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_USE.title'),
          content: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_USE.message'),
          onClose: () => {
            router.navigate({ to: '/change-password' });
          },
        });
        break;
      case AUTH_ERROR_CODE.PASSWORD_CHANGE_PASSWORD_NOT_USE: // 패스워드 변경 안내 - 패스워드 미사용자
        openAlert({
          title: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_NOT_USE.title'),
          content: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_NOT_USE.message'),
        });
        break;
      case AUTH_ERROR_CODE.TENANT_PENDING: //테넌트 개설 대기중
        openAlert({
          title: t('LABEL.alert.TENANT_PENDING.title'),
          content: t('LABEL.alert.TENANT_PENDING.message'),
          onClose: () => {
            logout();
          },
        });
        break;
      case AUTH_ERROR_CODE.IN_WORKING_TIME: //테넌트 개설 대기중
        openAlert({
          title: t('LABEL.alert.IN_WORKING_TIME.title'),
          content: t('LABEL.alert.IN_WORKING_TIME.message'),
          onClose: () => {
            logout();
          },
        });
        break;
      case AUTH_ERROR_CODE.OUT_WORKING_TIME: //테넌트 개설 대기중
        openAlert({
          title: t('LABEL.alert.OUT_WORKING_TIME.title'),
          content: t('LABEL.alert.OUT_WORKING_TIME.message'),
          onClose: () => {
            logout();
          },
        });
        break;
      default:
        openAlert({ title: t('LABEL.messages.invalidInputInformation'), content: error?.message });
        break;
    }
  };

  const handleOnSubmit = async (values: any) => {
    await login(values, {
      onSuccess: async (data) => {
        const locale = data?.locale;
        locale && (await setLanguage(locale));

        // 로그인 - 비밀번호 변경 3개월 체크
        const checkExpire = await handleExpireCheck(data);
        // 테넌트 선택 체크
        const checkTenant = await handleTenantCheck(data);

        if (checkExpire && checkTenant) {
          router.navigate({ to: search.redirect || '/' });
          return;
        }

        logout();

        // 임시 : 사용 가능한 API 목록 fetch
        // await usePermissionStore.getState().fetchPermissions();
      },
      onError: async (data: any) => {
        loginErrorAlert(data);
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className={'form_row'}>
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.login}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={authTitleStyle.start}>
            <BrowserView>
              <h2 className={authTitleStyle.title_login}>
                <span className={authTitleStyle.title}>{t('Welcome Back')}</span>
                <span className={authTitleStyle.info}>
                  {t('Please enter your details to login.')}
                </span>
              </h2>
            </BrowserView>
            <MobileView>
              <h2 className={authTitleStyle.title_login}>
                {/* 퍼블확인용 */}
                <span className={authTitleStyle.title}>{t('Welcome Back')}</span>
                <span className={authTitleStyle.info}>
                  {t('Please enter your details to login.')}
                </span>
              </h2>
            </MobileView>
          </div>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'username'}
              element={
                <Input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Tab') {
                      e.preventDefault();
                      onFormFocus('password');
                    }
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'password'}
              element={
                <Input
                  className={formStyles.lg}
                  type="password"
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      if (await onFormValid()) {
                        handleOnSubmit(getValues());
                      }
                    }
                  }}
                />
              }
            />
          </ContentsRow>

          <div className={cn(styles.login_info)}>
            <FormRow
              className="pb-0"
              provider={provider}
              name={'saveId'}
              element={<CheckBoxFormField className={styles.id_save} size="md" />}
            />
            <div className={styles.info}>
              <Link to="/search-account">{t('아이디 찾기')}</Link>
              <Link to="/search-password">{t('비밀번호 찾기')}</Link>
            </div>
          </div>

          {/* 이번 프로젝트에서는 개발 제외 (퍼블,디자인만 작업) */}
          <div className={styles.sns_login}>
            <h3 className={styles.tit_sns}>{t('소셜 로그인')}</h3>
            <ul className={styles.list}>
              <li>
                <Button onClick={() => alert(t('준비중 입니다.'))}>
                  <img src={snsNaverImage} alt="naver" />
                </Button>
              </li>
              <li>
                <Button onClick={() => alert(t('준비중 입니다.'))}>
                  <img src={snskakaoImage} alt="kakao" />
                </Button>
              </li>
              {/* 영문 시 : 구글로그인만 출력 */}
              <li>
                <Button onClick={() => alert(t('준비중 입니다.'))}>
                  <img src={snsGoogleImage} alt="google" />
                </Button>
              </li>
            </ul>
            <div className={styles.noti}>
              {t('회사 메일로 회원가입 이후 SNS 간편회원으로 로그인 할 수 있습니다.')}
            </div>
          </div>

          <div className={styles.btn_box}>
            <Button type="submit" size="xl" variant="primary" className={styles.btn}>
              {t('LABEL.common.login')}
            </Button>
          </div>

          <div className={styles.login_guide}>
            {/* TODO 링크 현행화 */}
            {/* <Link to="/signup-progress">{t('LABEL.common.membershipStatus')}</Link> */}
            {/*<Link to="/signup">{t('LABEL.common.joinTheMembership')}</Link>*/}
            <Link to="/login">{t('LABEL.common.membershipStatus')}</Link>
            <Link to="/login">{t('LABEL.common.joinTheMembership')}</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

const FormConfig = (t: TFunction<'translation', undefined>): DynamicFormConfig => {
  return {
    builders: [
      {
        name: 'username',
        type: 'text',
        label: t('LABEL.common.account(email)'),
        value: '',
        placeholder: t('아아디/이메일을 입력하세요'),
        description: t('기본 메세지'),
        format: 'email',
      },
      {
        name: 'password',
        type: 'text',
        label: t('LABEL.common.password'),
        // maxLength: 10,
        value: '',
        placeholder: t('비밀번호를 입력하세요'),
      },
      {
        name: 'saveId',
        type: 'checkbox',
        checkConfig: {
          label: t('LABEL.common.saveAccount'),
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
};
