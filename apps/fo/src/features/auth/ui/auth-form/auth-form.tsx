import { startTransition, useEffect } from 'react';
import { useBoolean, useCounter } from 'react-use';
import { useWatch } from 'react-hook-form';
import { isFunction, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView } from 'react-device-detect';

import { Button, ContentsRow, InputTimer, PhoneNumber, DynamicFormField } from '@learnway/ui';
import { cn, z } from '@learnway/shared';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';

import {
  useVerifyEmail,
  useSendVerifyEmail,
  useVerifyPhoneNumber,
  useSendVerifyPhoneNumber,
} from '../../../../entities/user';
import { FormRow, NoticeBox } from '../../../../shared/ui';
import { AuthToolFormField, VerifyUserIdFormField } from '../../../../features/auth';
import { MobileContainerFooter } from '../../../../shared/m.ui/container-footer/container-footer';
import { AUTH_TOOL_TYPE } from '../../../../types';

import styles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';

const TIME_LIMIT_VERIFY = 180;

export interface AuthResultData {
  authToolType: AUTH_TOOL_TYPE;
  userId: string;
  name: string;
  birthday: string;
  nationCode: string;
  phoneNumber: string;
  email: string;
}

export interface AuthFormData {
  authToolType: AUTH_TOOL_TYPE;
  userId: string;
  name: string;
  birthday: string;
  nationCode: string;
  phoneNumber: string;
  email: string;
  verificationCode: string;
}

interface AuthFormComponentProps {
  includeUserId?: boolean;
  defaultValues?: AuthFormData;
  onSuccess?: (authData: any) => void;
  onCancel?: () => void;
}

function AuthFormComponent({
  defaultValues,
  includeUserId = false,
  onSuccess,
  onCancel,
}: AuthFormComponentProps) {
  const { t } = useTranslation();

  const { provider, onSubmit, onFormChange, control, getValues, setFormError, onFormValid } =
    useDynamicForm(authFormConfig);

  const authToolType = useWatch({ control: control, name: 'authToolType' });

  const [verifyTimer, verifyTimerCounter] = useCounter(0);

  const [sendedVerifyNumber, setSendedVerifyNumber] = useBoolean(false);

  const { verify: verifyEmail } = useVerifyEmail();
  const { verify: verifyPhone } = useVerifyPhoneNumber();
  const { send: sendVerifyEmail } = useSendVerifyEmail();
  const { send: sendVerifyPhone } = useSendVerifyPhoneNumber();

  useEffect(() => {
    if (!defaultValues) {
      return;
    }
    handleReset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    onFormChange();
    onFormChange({
      authToolType,
    });
  }, [authToolType]);

  const handleSendVerify = async (d?: any) => {
    const data = d ?? getValues();

    onFormChange({
      verificationCode: '',
    });

    const result = await onFormValid([
      'userId',
      'name',
      'birthday',
      data.authToolType === 'PHONE' ? 'phoneNumber' : 'email',
    ]);
    if (!result) {
      return;
    }

    const payload = {
      name: data.name,
      birthday: data.birthday,
    };

    if (data.authToolType === 'PHONE') {
      sendVerifyPhone(
        {
          ...payload,
          phoneNumber: data.phoneNumber,
          phoneNumberLocale: data.nationCode,
        },
        {
          onSuccess: handleSendVerifySuccess,
        },
      );
    } else {
      sendVerifyEmail(
        { ...payload, email: data.email },
        {
          onSuccess: handleSendVerifySuccess,
        },
      );
    }
  };

  const handleOnSubmit = async (data: any) => {
    if (!sendedVerifyNumber) {
      handleSendVerify(data);
      return;
    }
    const payload = {
      name: data.name,
      birthday: data.birthday,
      verificationCode: data.verificationCode,
    };

    if (data.authToolType === 'PHONE') {
      verifyPhone(
        {
          ...payload,
          phoneNumber: data.phoneNumber,
          phoneNumberLocale: data.nationCode,
        },
        {
          onSuccess: async (d, variables, context) => {
            verifyTimerCounter.set(0);
            if (isFunction(onSuccess)) {
              const { verificationCode, ...data } = variables;
              onSuccess({ authToolType: 'PHONE', ...data });
            }
          },
          onError: handleVerifyError,
        },
      );
    } else {
      verifyEmail(
        { ...payload, email: data.email },
        {
          onSuccess: (d, variables, context) => {
            verifyTimerCounter.set(0);
            if (isFunction(onSuccess)) {
              const { verificationCode, ...data } = variables;
              onSuccess({ authToolType: 'EMAIL', ...data });
            }
          },
          onError: handleVerifyError,
        },
      );
    }
  };

  const handleSendVerifySuccess = () => {
    setSendedVerifyNumber(true);
    verifyTimerCounter.inc();
  };

  const handleVerifyError = () => {
    setFormError('verificationCode', t('MESSAGE.INVALID_AUTH_NUMBER'));
  };

  const handleCancel = () => {
    if (isFunction(onCancel)) {
      onCancel();
    }
  };

  const handleTimeOver = () => {
    verifyTimerCounter.set(0);
  };

  const handleReset = (defaultValue?: any, authToolType?: string) => {
    onFormChange();
    onFormChange({
      ...(defaultValue ?? {
        authToolType: authToolType ?? 'PHONE',
        userId: '',
        name: '',
        birthday: '',
        phoneNumber: '',
        nationCode: '',
        email: '',
        verificationCode: '',
      }),
      includeUserId,
    });
    setSendedVerifyNumber(false);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'authToolType'}>
            {/*<AuthToolFormField value={authTool} onChange={(value) => handleOnChangeAuthTool(value)} />*/}
            <AuthToolFormField />
          </DynamicFormField>
        </FormRow>
      </ContentsRow>

      <div className={cn(styles.auth_form, 'no_line', 'col')}>
        {includeUserId && (
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'userId'}>
                <VerifyUserIdFormField />
              </DynamicFormField>
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
        {authToolType === 'PHONE' ? (
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'phoneNumber'}></DynamicFormField>
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

      {sendedVerifyNumber && (
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'verificationCode'}>
              <InputTimer
                initialTime={TIME_LIMIT_VERIFY}
                startTimer={verifyTimer}
                onTimerEnd={() => handleTimeOver()}
                onReset={() => handleSendVerify()}
                resetLabel={t('LABEL.RESEND')}
                disabled={verifyTimer === 0}
              />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
      )}

      <NoticeBox title={t('LABEL.CAUTION')} className={styles.signup_noti}>
        <dd>{t('MESSAGE.SEARCH_ACCOUNT_NOTICE')}</dd>
      </NoticeBox>

      <BrowserView>
        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl" onClick={() => handleCancel()}>
            {t('LABEL.CANCEL')}
          </Button>
          {sendedVerifyNumber ? (
            <Button type="submit" variant="primary" size="xl" disabled={verifyTimer === 0}>
              {t('LABEL.CHECK_AUTH_NUMBER')}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="xl"
              onClick={() => handleSendVerify()}
              disabled={includeUserId}>
              {t('LABEL.CHECK_AUTH_REQUEST')}
            </Button>
          )}
        </div>
      </BrowserView>

      <MobileView>
        <MobileContainerFooter>
          <Button variant="primary" size="xl" onClick={() => handleSendVerify()}>
            {t('LABEL.CHECK_AUTH_REQUEST')}
          </Button>
        </MobileContainerFooter>
      </MobileView>
    </form>
  );
}

export const AuthForm = AuthFormComponent;

const authFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'includeUserId',
      type: 'hidden',
      value: false,
    },
    {
      name: 'authToolType',
      type: 'custom',
      label: '',
      value: 'PHONE',
      placeholder: '',
      description: '',
    },
    {
      name: 'userId',
      type: 'custom',
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
      placeholder: '생년월일(19991229)',
    },
    {
      name: 'phoneNumber',
      type: 'phone-number',
      label: '휴대폰 번호',
      value: '',
      placeholder: '-없이 휴대폰 번호입력(0102345678)',
      fields: {
        nationCode: 'nationCode',
        number: 'phoneNumber',
      },
    },
    {
      name: 'nationCode',
      type: 'hidden',
      value: 'KR',
    },
    {
      name: 'email',
      type: 'text',
      label: '이메일',
      value: '',
      placeholder: '이메일(hyunidai.kim@hyundai.com)',
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
    userId: {
      format: 'string',
      required: {
        fn: (data) => {
          console.log('userId', data);
          return data.includeUserId;
        },
      },
    },
    name: {
      format: 'string',
      required: true,
    },
    birthday: {
      format: 'number',
      required: true,
    },
    phoneNumber: {
      format: 'object',
      required: {
        fn: (data) => {
          return isEmpty(data.phoneNumber) && data.authToolType === 'PHONE';
        },
      },
    },
    email: {
      format: 'email',
      required: {
        fn: (data) => data.authToolType === 'EMAIL',
      },
    },
    verificationCode: {
      format: 'number',
      required: true,
    },
  },
};
