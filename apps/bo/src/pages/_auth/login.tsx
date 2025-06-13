import { useEffect } from 'react';
import { createFileRoute, useRouter, Link, useSearch } from '@tanstack/react-router';
import { t } from 'i18next';
import { isEmpty } from 'lodash';

import { Button, ContentsRow, Input, useModal } from '@learnway/ui';
import { useExpStore, useFetchAuthUser } from '@learnway/auth/entities';
import { cn } from '@learnway/shared';
// import { DynamicFormField } from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';

import { useAuthSignin, getSavedUserid, pageRouteConfig, TenantRoleModal } from '@features/auth';
import { useSetLanguage } from '../../features/platform';

import { FormRow } from '../../shared/ui/form';
import { AUTH_CONTAINERS } from '../../widgets/layout';

import authStyles from './auth.module.css';
import styles from '@learnway/styles/bo/pages/_auth/login.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { usePermissionStore } from '../../shared/lib/permission-store';

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
  const params = Route.useParams();
  const search = Route.useSearch();
  const { open: openModal } = useModal();
  const { reset } = useExpStore();
  const { provider, onSubmit, onFormChange, control } = useDynamicForm(detailConfig);

  const { data: authData } = useFetchAuthUser();

  const { login } = useAuthSignin();
  const { set: setLanguage, inProgress } = useSetLanguage();

  useEffect(() => {
    reset();
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

        // 임시 : 사용 가능한 API 목록 fetch
        await usePermissionStore.getState().fetchPermissions();
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
            <Button
              type="button"
              size="sm"
              variant="link"
              className={cn('text-red-800 underline')}
              onClick={() => {
                openModal({
                  content: <TenantRoleModal />,
                  height: 'lg',
                  width: 'sm',
                  hideCloseButton: true,
                  closeOnOutsideClick: false,
                  onClose: (data: any) => {
                    const text = `선택 \n테넌트: ${data.tenant.label}\n역할: ${data.role.label}`;
                    alert(text);
                  },
                });
              }}
            >
              테넌트/역할TEST
            </Button>
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
