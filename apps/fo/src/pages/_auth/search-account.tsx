import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import { useInterval, useBoolean } from 'react-use';

import { Button, Tabs, ContentsRow } from '@learnway/ui';

import { SearchAccountForm } from '../../widgets/account';
import {
  useVerifyEmail,
  useSendVerifyEmail,
  useVerifyPhoneNumber,
  useSendVerifyPhoneNumber,
} from '../../entities/user';

import useCustomForm from '../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { FormRow } from '../../shared/ui/form-row';
import { DynamicFormField } from '../../shared/ui/dynamic-form-field';

import signupStyles from './signup.module.css';

export const Route = createFileRoute('/_auth/search-account')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [selectedTabKey, setSelectedTabKey] = useState<string>('account');
  const [verifyTimer, setVerifyTimer] = useState<string>('');

  const [isRunningTimer, toggleIsRunningTimer] = useBoolean(false);

  const { provider, onSubmit, onFormChange, control, getValues } = useCustomForm(detailConfig);
  const { verify: verifyEmail } = useVerifyEmail();
  const { verify: verifyPhone } = useVerifyPhoneNumber();
  const { send: sendVerifyEmail } = useSendVerifyEmail();
  const { send: sendVerifyPhone } = useSendVerifyPhoneNumber();

  useInterval(
    () => {
      setVerifyTimer('');
    },
    isRunningTimer ? 1000 : null,
  );

  const handleActiveTab = (value: string) => {
    onFormChange({
      authToolType: 'phone',
      userId: '',
      name: '',
      birthday: '',
      phoneNumber: '',
      phoneNumberLocale: '',
      email: '',
    });
    setSelectedTabKey(value);
  };

  const items = useCreation(
    () => [
      {
        title: '아이디 찾기',
        key: 'account',
        content: <SearchAccountForm provider={provider} type={'account'} />,
      },
      {
        title: '비밀번호 찾기',
        key: 'password',
        content: <SearchAccountForm provider={provider} type={'password'} />,
      },
    ],
    [],
  );

  const handleSendVerify = () => {
    const data = getValues();
    const payload = {
      name: data.name,
      birthday: data.birthday,
    };
    if (data.authToolType === 'phone') {
      sendVerifyPhone(
        { ...payload, phoneNumber: data.phoneNumber },
        {
          onSuccess: (data, variables, context) => {
            toggleIsRunningTimer();
          },
        },
      );
    } else {
      sendVerifyEmail(
        { ...payload, email: data.email },
        {
          onSuccess: (data, variables, context) => {
            toggleIsRunningTimer();
          },
        },
      );
    }
  };

  const handleOnSubmit = async (data: any) => {
    const payload = {
      name: data.name,
      birthday: data.birthday,
      verificationCode: data.verificationCode,
    };
    if (data.authToolType === 'phone') {
      verifyPhone(
        { ...payload, phoneNumber: data.phoneNumber },
        {
          onSuccess: (data, variables, context) => {
            toggleIsRunningTimer();
          },
        },
      );
    } else {
      verifyEmail(
        { ...payload, email: data.email },
        {
          onSuccess: (data, variables, context) => {
            toggleIsRunningTimer();
          },
        },
      );
    }
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <div
        className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.search_account}`}>
        <div className={signupStyles.auth_box}>
          <Tabs
            selectedTabKey={selectedTabKey}
            items={items}
            type="fill"
            color="primary"
            onActiveTab={handleActiveTab}
          />

          {verifyTimer && (
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'verificationCode'} />
              </FormRow>
            </ContentsRow>
          )}

          <div className={signupStyles.btn_wrap}>
            <Button variant="gray" size="xl" onClick={() => handleCancel()}>
              취소
            </Button>
            {verifyTimer ? (
              <Button type="submit" variant="primary" size="xl">
                인증번호 확인
              </Button>
            ) : (
              <Button variant="primary" size="xl" onClick={() => handleSendVerify()}>
                인증번호 요청
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

const detailConfig = {
  builders: [
    {
      name: 'authToolType',
      type: 'custom',
      label: '',
      value: 'phone',
      placeholder: '',
      description: '',
    },
    {
      name: 'userId',
      type: 'text',
      label: '아이디/이메일',
      value: '',
      placeholder: '아이디/이메일을 입력하세요',
      description: '',
    },
    {
      name: 'name',
      type: 'text',
      label: '이름',
      value: '',
      placeholder: '이름을 입력하세요',
      description: '',
    },
    {
      name: 'birthday',
      type: 'text',
      label: '생년월일',
      maxLength: 10,
      value: '',
      placeholder: '비밀번호를 입력하세요',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: '휴대폰 번호',
      value: '',
    },
    {
      name: 'email',
      type: 'text',
      label: '이메일',
      value: '',
    },
    {
      name: 'verificationCode',
      type: 'text',
      label: '인증번호',
      value: '',
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
