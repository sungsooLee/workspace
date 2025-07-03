import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { z, cn } from '@learnway/shared';
import { Button, ContentsRow, PhoneNumber, DynamicFormField, Input } from '@learnway/ui';
import { useDynamicForm } from '@learnway/hooks';

import { FormRow, ProccessResult } from '../../shared';

import styles from '@learnway/styles/fo/pages/_auth/signup-progress/result.module.css';

export function ResultBySignupProgressPage({ route }: any) {
  const { t } = useTranslation();
  const router = useRouter();

  const { provider, onSubmit, onFormChange, control, getValues, setFormError, clearFormError } =
    useDynamicForm(detailConfig);

  const goLogin = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <ProccessResult
            title={t('LABEL.message.signupProgressResult01')}
            className={styles.success_info}
          >
            {t('LABEL.common.applicationDateTime')} : <strong>YYYY-MM-DD</strong>
          </ProccessResult>

          <h4 className={cn(styles.title, 'auth--title')}>
            {t('LABEL.common.partnerCompanyInformation')}
          </h4>

          <div className="no_line col">
            <ContentsRow>
              <FormRow provider={provider} name={'company'} element={<Input disabled={true} />} />
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider} name={'no'} element={<Input disabled={true} />} />
            </ContentsRow>
          </div>

          <hr className={`${styles.divider} ${styles.divider}`} />

          <h4 className={cn(styles.title, 'auth--title')}>
            {t('LABEL.common.personalInformation')}
          </h4>

          <div className="no_line col">
            <ContentsRow>
              <FormRow provider={provider} name={'id'} element={<Input disabled={true} />} />
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider} name={'name'} element={<Input disabled={true} />} />
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider} name={'role'} element={<Input disabled={true} />} />
            </ContentsRow>

            <ContentsRow>
              <FormRow
                provider={provider}
                name={'phoneNumber'}
                element={<PhoneNumber disabled={true} />}
              />
            </ContentsRow>
          </div>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="primary" size="xl" onClick={() => goLogin()}>
              {t('LABEL.common.login')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

const detailConfig = {
  builders: [
    {
      name: 'company',
      type: 'text',
      label: 'LABEL.common.companyName',
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: 'no',
      type: 'text',
      label: 'LABEL.common.businessRegistrationNumber',
      value: '',
      placeholder: '',
      description: '',
      required: true,
    },
    {
      name: 'id',
      type: 'text',
      label: 'LABEL.common.account(email)',
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: 'name',
      type: 'text',
      label: 'LABEL.common.name',
      value: '',
      placeholder: '',
    },
    {
      name: 'role',
      type: 'text',
      label: 'LABEL.common.spot',
      value: '',
      placeholder: '',
    },
    {
      name: 'phoneNumber',
      type: 'custom',
      label: 'LABEL.common.phoneNumber',
      value: '',
      placeholder: '',
      //required: true,
    },
  ],
};
