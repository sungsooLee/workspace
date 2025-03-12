import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { t } from 'i18next';

import { Button, Tabs, ContentsRow, InputTimer } from '@learnway/ui';
import { z, cn } from '@learnway/shared';

import useCustomForm from '../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { FormRow } from '../../shared/ui/form-row';
import { DynamicFormField } from '../../shared/ui/dynamic-form-field';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

export const Route = createFileRoute('/_auth/change-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    provider,
    onSubmit,
    onFormChange,
    control,
    getValues,
    formState: { errors },
  } = useCustomForm(detailConfig);

  const [selectedTabKey, setSelectedTabKey] = useState<string>('account');

  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'password'} />
              </FormRow>
            </ContentsRow>
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'confirm_password'} />
              </FormRow>
            </ContentsRow>
          </div>
        </div>
      </div>
    </form>
  );
}

const detailConfig = {
  builders: [
    {
      name: 'password',
      type: 'custom',
      label: t('LABEL.NEW_PASSWORD'),
      value: '',
      placeholder: '아이디/이메일을 입력하세요',
      description: '',
      required: true,
    },
    {
      name: 'confirm_password',
      type: 'text',
      label: 'LABEL.NEW_PASSWORD_CHECK',
      value: '',
      placeholder: '이름을 입력하세요',
      description: '',
    },
  ],
  validator: {
    password: z.string().required(),
    confirm_password: z.string().required(),
    /*channel: z.string().nonempty(t('채널을 선택해 주세요.')),
        category: z.string().nonempty(t('유효성 테스트')),
         language_code: z.string().nonempty(t('유효성 테스트')),
         subdivision: z.string().nonempty(t('유효성 테스트')),
         check: z.boolean(),
         tenant: z.array(z.string()).nonempty(t('유효성 테스트')),*/
  },
};
