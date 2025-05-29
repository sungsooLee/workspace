import { useEffect } from 'react';
import { useBoolean, useCounter } from 'react-use';
import { useWatch } from 'react-hook-form';
import { isFunction, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Button, ContentsRow, InputTimer } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';

import {
  useVerifyEmail,
  useSendVerifyEmail,
  useVerifyPhoneNumber,
  useSendVerifyPhoneNumber,
} from '../../../../entities/authorization';
import { FormRow, NoticeBox } from '../../../../shared/ui';
import { AuthToolFormField, VerifyUserIdFormField } from '../../../../features/auth';
import { MobileResponsiveContainerFooter, BrowserFooter, MobileFooter } from '../../../../shared';
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
  noticeBoxLabel?: string;
}

function AuthFormComponent({
  defaultValues,
  includeUserId = false,
  onSuccess,
  onCancel,
  noticeBoxLabel = 'LABEL.message.searchAccountNotice', // 본인 명의의 인증 수단 정보를 정확히 입력해 주세요.
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
      sendedVerifyNumber: true,
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
      handleSendVerifySuccess();
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
    onFormChange({
      sendedVerifyNumber: true,
    });
    verifyTimerCounter.inc();
  };

  const handleVerifyError = () => {
    setFormError('verificationCode', t('LABEL.message.invalidAuthNumber'));
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
        sendedVerifyNumber: false,
      }),
      includeUserId,
    });
    setSendedVerifyNumber(false);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ContentsRow>
        <FormRow provider={provider} name={'authToolType'} element={<AuthToolFormField />} />
      </ContentsRow>

      <div className={cn(styles.auth_form, 'no_line', 'col')}>
        {includeUserId && (
          <ContentsRow>
            <FormRow provider={provider} name={'userId'} element={<VerifyUserIdFormField />} />
          </ContentsRow>
        )}
        <ContentsRow>
          <FormRow provider={provider} name={'name'} />
        </ContentsRow>
        <ContentsRow>
          <FormRow provider={provider} name={'birthday'} />
        </ContentsRow>
        {authToolType === 'PHONE' ? (
          <ContentsRow>
            <FormRow provider={provider} name={'phoneNumber'} />
          </ContentsRow>
        ) : (
          <ContentsRow>
            <FormRow provider={provider} name={'email'} />
          </ContentsRow>
        )}
      </div>

      {sendedVerifyNumber && (
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'verificationCode'}
            element={
              <InputTimer
                initialTime={TIME_LIMIT_VERIFY}
                startTimer={verifyTimer}
                onTimerEnd={() => handleTimeOver()}
                onReset={() => handleSendVerify()}
                resetLabel={t('LABEL.common.resend')}
                disabled={verifyTimer === 0}
              />
            }
          />
        </ContentsRow>
      )}

      <NoticeBox title={t('LABEL.common.caution')} className={styles.signup_noti}>
        <dd>{t(noticeBoxLabel)}</dd>
      </NoticeBox>

      <MobileResponsiveContainerFooter>
        <BrowserFooter>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" onClick={() => handleCancel()}>
              {t('LABEL.common.cancel')}
            </Button>
            {sendedVerifyNumber ? (
              <Button type="submit" variant="primary" size="xl" disabled={verifyTimer === 0}>
                {t('LABEL.common.checkAuthNumber')}
              </Button>
            ) : (
              <Button
                type={'button'}
                variant="primary"
                size="xl"
                onClick={() => handleSendVerify()}
                disabled={includeUserId}
              >
                {t('LABEL.common.checkAuthRequest')}
              </Button>
            )}
          </div>
        </BrowserFooter>
        <MobileFooter>
          <Button variant="primary" size="xl" onClick={() => handleSendVerify()}>
            {t('LABEL.common.checkAuthRequest')}
          </Button>
        </MobileFooter>
      </MobileResponsiveContainerFooter>
    </form>
  );
}

export const AuthForm = AuthFormComponent;

const authFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'sendedVerifyNumber',
      type: 'hidden',
      value: false,
    },
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
      label: 'LABEL.common.birthday',
      maxLength: 10,
      value: '',
      placeholder: '생년월일(19991229)',
    },
    {
      name: 'phoneNumber',
      type: 'phone-number',
      label: 'LABEL.common.phoneNumber',
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
      label: 'LABEL.common.email',
      value: '',
      placeholder: '이메일(hyunidai.kim@hyundai.com)',
    },
    {
      name: 'verificationCode',
      type: 'custom',
      label: 'LABEL.common.certificationNumber',
      value: '',
      placeholder: '인증번호 입력',
    },
  ],
  validator: {
    userId: {
      format: 'string',
      required: {
        fn: (data) => {
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
      required: {
        fn: (data) => data.sendedVerifyNumber === true,
      },
    },
  },
};
