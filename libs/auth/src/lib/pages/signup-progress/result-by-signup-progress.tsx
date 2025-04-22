import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { z, cn } from '@learnway/shared';
import { Button, ContentsRow, PhoneNumber, DynamicFormField } from '@learnway/ui';
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
            title={t('MESSAGE.SIGNUP_PROGRESS_RESULT_01')}
            className={styles.success_info}
          >
            신청일시 : <strong>YYYY-MM-DD</strong>
          </ProccessResult>

          <h4 className={cn(styles.title, 'auth--title')}>{t('LABEL.협력업체 회사 정보')}</h4>

          <div className="no_line col">
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'company'} disabled />
              </FormRow>
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'no'} disabled />
              </FormRow>
            </ContentsRow>
          </div>

          <hr className={`${styles.divider} ${styles.divider}`} />

          <h4 className={cn(styles.title, 'auth--title')}>개인정보</h4>

          <div className="no_line col">
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'id'} disabled />
              </FormRow>
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'name'} disabled />
              </FormRow>
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'role'} disabled />
              </FormRow>
            </ContentsRow>

            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'phoneNumber'} disabled>
                  <PhoneNumber />
                </DynamicFormField>
              </FormRow>
            </ContentsRow>
          </div>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="primary" size="xl" onClick={() => goLogin()}>
              로그인
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
      label: 'LABEL.회사명',
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: 'no',
      type: 'text',
      label: 'LABEL.사업자 등록 번호',
      value: '',
      placeholder: '',
      description: '',
      required: true,
    },
    {
      name: 'id',
      type: 'text',
      label: 'LABEL.아이디(이메일)',
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: 'name',
      type: 'text',
      label: 'LABEL.이름',
      value: '',
      placeholder: '',
    },
    {
      name: 'role',
      type: 'text',
      label: 'LABEL.직위',
      value: '',
      placeholder: '',
    },
    {
      name: 'phoneNumber',
      type: 'custom',
      label: 'LABEL.휴대폰번호',
      value: '',
      placeholder: '',
      //required: true,
    },
  ],
};
