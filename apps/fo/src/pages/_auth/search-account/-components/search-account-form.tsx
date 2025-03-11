import { useTranslation } from 'react-i18next';
import { useWatch } from 'react-hook-form';

import { ContentsRow } from '@learnway/ui';
import { cn } from '@learnway/shared';

import { AuthToolFormField, AuthTool } from '../../../../features/auth';

import { FormRow } from '../../../../shared/ui/form-row';
import { DynamicFormField } from '../../../../shared/ui/dynamic-form-field';

import styles from '@learnway/styles/fo/pages/_auth/search-account/-components/search-account-form.module.css';

interface SearchAccountFormComponentProps {
  type: 'account' | 'password';
  provider: any;
}

function SearchAccountFormComponent({ provider, type }: SearchAccountFormComponentProps) {
  const { t } = useTranslation();

  const authToolType = useWatch({ control: provider.control, name: 'authToolType' });

  return (
    <>
      <div className={styles.search_info}>
        <strong>본인인증</strong> 후<br />
        {type === 'account' ? `아이디를 확인 할 수 있습니다.` : `비밀번호를 재설정 할 수 있습니다.`}
      </div>

      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'authToolType'}>
            {/*<AuthToolFormField value={authTool} onChange={(value) => handleOnChangeAuthTool(value)} />*/}
            <AuthToolFormField />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>

      <div className={cn(styles.auth_form, 'no_line', 'col')}>
        {type === 'password' && (
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'userId'} />
            </FormRow>
          </ContentsRow>
        )}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'name'} />
          </FormRow>
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'birthday'} />
          </FormRow>
        </ContentsRow>
        {authToolType === 'phone' ? (
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'phoneNumber'} />
            </FormRow>
          </ContentsRow>
        ) : (
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'email'} />
            </FormRow>
          </ContentsRow>
        )}
      </div>
    </>
  );
}

export const SearchAccountForm = SearchAccountFormComponent;
