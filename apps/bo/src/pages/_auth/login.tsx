import { useEffect } from 'react';
import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { isEmpty } from 'lodash';

import { Button, ContentsRow, Input, useModal } from '@learnway/ui';
import { useExpStore, useFetchAuthUser, useLogoutUser } from '@learnway/auth/entities';
import { cn, dateDiff } from '@learnway/shared';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { AUTH_ERROR_CODE } from '@learnway/auth/features/auth';

import {
  useAuthSignin,
  getSavedUserid,
  pageRouteConfig,
  TenantRoleModal,
  LoginErrorAlert,
} from '@features/auth';
import { useSetLanguage } from '@features/platform';

import { FormRow } from '@shared/ui/form';
import { AUTH_CONTAINERS } from '@widgets/layout';

import authStyles from './auth.module.css';
import styles from '@learnway/styles/bo/pages/_auth/login.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
// import { usePermissionStore } from '../../shared/lib/permission-store';

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
  const router = useRouter();
  const search = Route.useSearch();
  const { reset } = useExpStore();
  const { provider, onSubmit, onFormChange, control } = useDynamicForm(detailConfig);

  // const { data: authData } = useFetchAuthUser();

  const { login } = useAuthSignin();
  const { logout } = useLogoutUser();
  const { set: setLanguage, inProgress } = useSetLanguage();
  const { open: openModal, alert: openAlert } = useModal();

  useEffect(() => {
    reset();
    onFormChange({
      username: getSavedUserid() ?? '@ict-companion.com',
      password: 'hae1234',
      saveId: !isEmpty(getSavedUserid()),
    });
  }, []);

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
        openAlert({
          title: t('LABEL.alert.LOGIN_LOCK_PASSWORD_NOT_USE.title'),
          content: (
            <LoginErrorAlert
              message={t('LABEL.alert.LOGIN_LOCK_PASSWORD_USE.message')}
              subMessage={t('LABEL.alert.LOGIN_LOCK_PASSWORD_USE.etc', {
                data: error?.lockDate,
              })}
            />
          ),
        });
        break;
      case AUTH_ERROR_CODE.APPROVAL_ADMIN_PENDING: // 어드민 승인 대기
        openAlert({
          title: t('LABEL.alert.APPROVAL_ADMIN_PENDING.title'),
          content: (
            <LoginErrorAlert
              message={t('LABEL.alert.APPROVAL_ADMIN_PENDING.message')}
              subMessage={t('LABEL.alert.APPROVAL_ADMIN_PENDING.etc', {
                data: error.loginFailCount,
              })}
            />
          ),
        });
        break;
      case AUTH_ERROR_CODE.APPROVAL_ADMIN_REJECT: // 어드민 승인 반려
        openAlert({
          title: t('LABEL.alert.APPROVAL_ADMIN_REJECT.title'),
          content: (
            <LoginErrorAlert
              message={t('LABEL.alert.APPROVAL_ADMIN_REJECT.message')}
              subMessage={t('LABEL.alert.APPROVAL_ADMIN_REJECT.etc', {
                data: error.loginFailCount,
              })}
            />
          ),
        });
        break;
      case AUTH_ERROR_CODE.APPROVAL_CP_PENDING: // CP 승인 대기
        openAlert({
          title: t('LABEL.alert.APPROVAL_CP_PENDING.title'),
          content: (
            <LoginErrorAlert
              message={t('LABEL.alert.APPROVAL_CP_PENDING.message')}
              subMessage={t('LABEL.alert.APPROVAL_CP_PENDING.etc', {
                data: error.loginFailCount,
              })}
            />
          ),
        });
        break;
      case AUTH_ERROR_CODE.APPROVAL_CP_REJECT: // CP 승인 반려
        openAlert({
          title: t('LABEL.alert.APPROVAL_CP_REJECT.title'),
          content: (
            <LoginErrorAlert
              message={t('LABEL.alert.APPROVAL_CP_REJECT.message')}
              subMessage={t('LABEL.alert.APPROVAL_CP_REJECT.etc', {
                data: error.loginFailCount,
              })}
            />
          ),
        });
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
        openAlert({ title: t('LABEL.message.invalidInputInformation'), content: error?.message });
        break;
    }
  };

  const handleExpireCheck = (data: any) => {
    // if (dayjs(authData?.passwordExpireDate).diff(dayjs()) < 0) {
    const diff = dateDiff(data!.passwordExpireDate, new Date(), 'd');
    console.log('### login date check', diff);
    if (diff !== undefined && 0 >= diff) {
      if (data?.authType === 'PLATFORM') {
        // 패스워드 사용자
        openAlert({
          title: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_USE.title'),
          content: t('LABEL.alert.PASSWORD_CHANGE_PASSWORD_USE.message'),
          onClose: () => {
            router.navigate({ to: '/change-password' });
          },
        });
        return false;
      } else {
        // 패스워드 미사용자
        openAlert({
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

    // 테넌트/역할 선택 - 최초 로그인 사용자
    // if (!data?.lastVisitedBoRoleId || !data?.lastVisitedBoTenantId) {
    if (!data?.lastVisitedBoTenantId) {
      await openModal({
        content: <TenantRoleModal />,
        height: 'lg',
        width: 'sm',
        // hideCloseButton: true,
        closeOnOutsideClick: false,
        onClose: (data: any) => {
          return data;
        },
      });
    }
    return true;
  };

  const handleOnSubmit = async (values: any) => {
    await login(values, {
      onSuccess: async (data) => {
        const locale = data?.locale;
        locale && (await setLanguage(locale));

        // 로그인 - 비밀번호 변경 3개월 체크
        const checkExpire = handleExpireCheck(data);
        // 테넌트 선택 체크
        const checkTenant = await handleTenantCheck(data);

        if (checkExpire && checkTenant) {
          router.navigate({ to: search.redirect || '/' });
          return;
        }

        // 임시 : 사용 가능한 API 목록 fetch
        // await usePermissionStore.getState().fetchPermissions();
      },
      onError: async (data: any) => {
        loginErrorAlert(data);
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.login}`}>
        <div className={authStyles.auth_box}>
          <ContentsRow>
            <FormRow provider={provider} name={'username'} />
          </ContentsRow>
          <ContentsRow className={formStyles.no_line}>
            <FormRow provider={provider} name={'password'} element={<Input type="password" />} />
          </ContentsRow>

          <ContentsRow className={cn(formStyles.no_line, styles.login_info)}>
            <FormRow provider={provider} name={'saveId'} />
            <div className={styles.info}>
              <Link to="/search-account" state={{ tabKey: 'account' }}>
                {t('LABEL.common.searchAccount')}
              </Link>
              <Link to="/search-password" state={{ tabKey: 'password', step: 'email' }}>
                {t('LABEL.common.searchPassword')}
              </Link>
            </div>
          </ContentsRow>

          <div className={styles.btn_box}>
            <Button type="submit" size="xl" variant="primary" className={styles.btn}>
              {t('LABEL.common.login')}
            </Button>
          </div>
        </div>

        <div className={styles.login_guide}>
          <span>
            <Link to="/signup-progress">{t('LABEL.common.membershipStatus')}</Link>
            <Link to="/signup">{t('LABEL.common.joinTheAdminMembership')}</Link>
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
      label: 'LABEL.form.input.idEmail',
      value: '',
      format: 'email',
    },
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.form.input.password',
      maxLength: 10,
      value: '',
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
