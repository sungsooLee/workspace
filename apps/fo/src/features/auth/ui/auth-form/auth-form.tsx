import { useEffect } from 'react';
import { useBoolean, useCounter } from 'react-use';
import { useWatch } from 'react-hook-form';
import { isFunction, isArray } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Button, Tabs, ContentsRow, InputTimer, PhoneNumber } from '@learnway/ui';
import { cn, z } from '@learnway/shared';

import {
  useVerifyEmail,
  useSendVerifyEmail,
  useVerifyPhoneNumber,
  useSendVerifyPhoneNumber,
} from '../../../../entities/user';
import { GoogleOtpGuideButton } from '../../../../features/auth';
import useCustomForm from '../../../../shared/ui/dynamic-form-field/use-dynamic-fom';
import { FormRow } from '../../../../shared/ui/form-row/form-row';
import { DynamicFormField } from '../../../../shared/ui/dynamic-form-field';
import { AuthToolFormField, AuthTool, VerifyUserIdFormField } from '../../../../features/auth';

import { NoticeBox } from '../../../../shared/ui';

import styles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';

const TIME_LIMIT_VERIFY = 180;

export interface AuthResultData {
  authToolType: 'phone' | 'email';
  userId: string;
  name: string;
  birthday: string;
  phoneNumber: string;
  phoneNumberLocale: string;
  email: string;
}

export interface AuthFormData {
  authToolType: 'phone' | 'email';
  userId: string;
  name: string;
  birthday: string;
  phoneNumber: string;
  phoneNumberLocale: string;
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
  includeUserId,
  onSuccess,
  onCancel,
}: AuthFormComponentProps) {
  const { t } = useTranslation();

  const { provider, onSubmit, onFormChange, control, getValues, setFormError } =
    useCustomForm(detailConfig);

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
    handleReset(undefined, authToolType);
  }, [authToolType]);

  const handleSendVerify = () => {
    onFormChange({
      verificationCode: '',
    });

    const data = getValues();

    validator(data);

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
            if (isFunction(onSuccess)) {
              const { verificationCode, ...data } = variables;
              onSuccess(data);
            }
          },
          onError: (error: any) => {
            console.log('verifyPhone error', error);
            setFormError('verificationCode', t('MESSAGE.INVALID_AUTH_NUMBER'));
          },
        },
      );
    } else {
      verifyEmail(
        { ...payload, email: data.email },
        {
          onSuccess: (data, variables, context) => {
            verifyTimerCounter.set(0);
            if (isFunction(onSuccess)) {
              const { verificationCode, ...data } = variables;
              onSuccess(data);
            }
          },
          onError: (error: any) => {
            console.log('verifyEmail error', error);
            setFormError('verificationCode', t('MESSAGE.INVALID_AUTH_NUMBER'));
          },
        },
      );
    }
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
    onFormChange(
      defaultValue ?? {
        authToolType: authToolType ?? 'phone',
        userId: '',
        name: '',
        birthday: '',
        phoneNumber: '',
        phoneNumberLocale: '',
        email: '',
        verificationCode: '',
      },
    );
    setSendedVerifyNumber(false);
  };

  const validator = (data: AuthFormData) => {
    const authSchema = z.object({
      authToolType: z.enum(['phone', 'email']),
      userId: includeUserId ? z.string().required() : z.string(),
      name: z.string().required(),
      birthday: z.string().required(),
      phoneNumber: data.authToolType === 'phone' ? z.string().required() : z.string(),
      email: data.authToolType === 'email' ? z.string().required() : z.string(),
      verificationCode: z.string().required(),
    });

    const r = authSchema.safeParse(data);
    if (!r.success) {
      r.error.issues.forEach((error: any) => {
        setFormError(error.path[0], error.message);
      });
    }
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
        {authToolType === 'phone' ? (
          <ContentsRow>
            <FormRow provider={provider}>
              <DynamicFormField name={'phoneNumber'}>
                <PhoneNumber />
              </DynamicFormField>
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
        {/*
        <dd>
          법인명의 휴대전화(법인폰)는 통신사에서 본인인증 서비스 신청 후 휴대폰 인증을 하실 수
          있습니다. <GoogleOtpGuideButton />
        </dd>*/}
      </NoticeBox>

      <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
        <Button variant="gray" size="xl" onClick={() => handleCancel()}>
          {t('LABEL.CANCEL')}
        </Button>
        {sendedVerifyNumber ? (
          <Button type="submit" variant="primary" size="xl" disabled={verifyTimer === 0}>
            {t('LABEL.CHECK_AUTH_NUMBER')}
          </Button>
        ) : (
          <Button variant="primary" size="xl" onClick={() => handleSendVerify()}>
            {t('LABEL.CHECK_AUTH_REQUEST')}
          </Button>
        )}
      </div>
    </form>
  );
}

export const AuthForm = AuthFormComponent;

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
      type: 'custom',
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
      type: 'custom',
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
