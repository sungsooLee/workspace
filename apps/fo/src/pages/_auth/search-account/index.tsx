import { useState } from 'react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import { useBoolean, useCounter } from 'react-use';

import { Button, Tabs, ContentsRow, InputTimer } from '@learnway/ui';
import { cn, z } from '@learnway/shared';

import { SearchAccountForm } from './-components/search-account-form';
import {
  useVerifyEmail,
  useSendVerifyEmail,
  useAsyncFetchEmail,
  useVerifyPhoneNumber,
  useSendVerifyPhoneNumber,
} from '../../../entities/user';

import { GoogleOtpGuideButton } from '../../../features/auth';
import useCustomForm from '../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { FormRow } from '../../../shared/ui/form-row';
import { DynamicFormField } from '../../../shared/ui/dynamic-form-field';

import { NoticeBox } from '../../../shared/ui';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

export const Route = createFileRoute('/_auth/search-account/')({
  component: RouteComponent,
});

const TIME_LIMIT_VERIFY = 180;
function RouteComponent() {
  const router = useRouter();
  const [selectedTabKey, setSelectedTabKey] = useState<string>('account');
  const [verifyTimer, verifyTimerCounter] = useCounter(0);

  const [sendedVerifyNumber, setSendedVerifyNumber] = useBoolean(false);

  const {
    provider,
    onSubmit,
    onFormChange,
    control,
    getValues,
    formState: { errors },
  } = useCustomForm(detailConfig);
  const { verify: verifyEmail } = useVerifyEmail();
  const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();
  const { verify: verifyPhone } = useVerifyPhoneNumber();
  const { send: sendVerifyEmail } = useSendVerifyEmail();
  const { send: sendVerifyPhone } = useSendVerifyPhoneNumber();

  const handleActiveTab = (value: string) => {
    onFormChange({
      authToolType: 'phone',
      userId: '',
      name: '배성련',
      birthday: '19781223',
      phoneNumber: '01093432161',
      phoneNumberLocale: '',
      email: '',
      verificationCode: 'dek479',
    });
    setSendedVerifyNumber(false);
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
    console.log('handleSendVerify data', data, errors);
    const payload = {
      name: data.name,
      birthday: data.birthday,
    };
    if (data.authToolType === 'phone') {
      sendVerifyPhone(
        { ...payload, phoneNumber: data.phoneNumber },
        {
          onSuccess: (data, variables, context) => {
            setSendedVerifyNumber(true);
            verifyTimerCounter.inc();
          },
        },
      );
    } else {
      sendVerifyEmail(
        { ...payload, email: data.email },
        {
          onSuccess: (data, variables, context) => {
            setSendedVerifyNumber(true);
            verifyTimerCounter.inc();
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
          onSuccess: async (d, variables, context) => {
            verifyTimerCounter.set(0);
            asyncFetchAccount(d);
          },
          onError: (error: any) => {
            console.log('verifyPhone error', error);
          },
        },
      );
    } else {
      verifyEmail(
        { ...payload, email: data.email },
        {
          onSuccess: (data, variables, context) => {
            verifyTimerCounter.set(0);
          },
        },
      );
    }
  };

  const asyncFetchAccount = (data: any) => {
    asyncFetchEmail(
      {
        name: data.name,
        birthday: data.birthday,
        phoneNumber: data.phoneNumber,
      },
      {
        onSuccess: (email, variables, context) => {
          router.navigate({
            to: '/search-account/result',
            state: { email },
          });
        },
        onError: (error: any) => {
          console.log('asyncFetchAccount error', error);
        },
      },
    );
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  const handleTimeOver = () => {
    verifyTimerCounter.set(0);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <Tabs
            selectedTabKey={selectedTabKey}
            items={items}
            type="fill"
            color="primary"
            onActiveTab={handleActiveTab}
          />

          {sendedVerifyNumber && (
            <ContentsRow>
              <FormRow provider={provider}>
                <DynamicFormField name={'verificationCode'}>
                  <InputTimer
                    initialTime={TIME_LIMIT_VERIFY}
                    startTimer={verifyTimer}
                    onTimerEnd={() => handleTimeOver()}
                    disabled={verifyTimer === 0}
                  />
                </DynamicFormField>
              </FormRow>
              <Button variant="gray" size="lg" onClick={() => handleSendVerify()}>
                재전송
              </Button>
            </ContentsRow>
          )}

          <NoticeBox title={'유의사항'}>
            <dd>본인 명의의 인증 수단 정보를 정확히 입력해 주세요.</dd>
            <dd>
              법인명의 휴대전화(법인폰)는 통신사에서 본인인증 서비스 신청 후 휴대폰 인증을 하실 수
              있습니다. <GoogleOtpGuideButton />
            </dd>
          </NoticeBox>

          <div className={styles.btn_wrap}>
            <Button variant="gray" size="xl" onClick={() => handleCancel()}>
              취소
            </Button>
            {sendedVerifyNumber ? (
              <Button type="submit" variant="primary" size="xl" disabled={verifyTimer === 0}>
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
      required: true,
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
      placeholder: '생년월일(19991229)',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: '휴대폰 번호',
      value: '',
      placeholder: '-없이 휴대폰 번호입력(0102345678)',
    },
    {
      name: 'email',
      type: 'text',
      label: '이메일',
      value: '',
      placeholder: '이메일(hyunidai.kim@hyundai.com)',
      //required: true,
    },
    {
      name: 'verificationCode',
      type: 'custom',
      label: '인증번호',
      value: '',
      placeholder: '인증번호 입력',
    },
  ],
  validator: {
    name: z.string().required(),
    birthday: z.string().required(),
    /*channel: z.string().nonempty(t('채널을 선택해 주세요.')),
    category: z.string().nonempty(t('유효성 테스트')),
     language_code: z.string().nonempty(t('유효성 테스트')),
     subdivision: z.string().nonempty(t('유효성 테스트')),
     check: z.boolean(),
     tenant: z.array(z.string()).nonempty(t('유효성 테스트')),*/
  },
};
