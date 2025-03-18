import { useEffect } from 'react';
import { useBoolean, useCounter } from 'react-use';
import { useWatch } from 'react-hook-form';
import { isFunction, isArray } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Button, ContentsRow, InputTimer, PhoneNumber, DynamicFormField } from '@learnway/ui';
import { cn, z } from '@learnway/shared';
import { useDynamicForm } from '@learnway/hooks';

import {
  useVerifyEmail,
  useSendVerifyEmail,
  useVerifyPhoneNumber,
  useSendVerifyPhoneNumber,
} from '../../../../entities/user';
import { FormRow, NoticeBox } from '../../../../shared/ui';
import {
  AuthToolFormField,
  AUTH_TOOL_TYPE,
  VerifyUserIdFormField,
} from '../../../../features/auth';

import styles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';

const TIME_LIMIT_VERIFY = 180;

export interface AuthResultData {
  authToolType: AUTH_TOOL_TYPE;
  userId: string;
  name: string;
  birthday: string;
  phoneNumber: string;
  phoneNumberLocale: string;
  email: string;
}

export interface AuthFormData {
  authToolType: AUTH_TOOL_TYPE;
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
    useDynamicForm(detailConfig);

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
    console.log('1');
    handleReset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    console.log('2', authToolType);
    handleReset(undefined, authToolType);
  }, [authToolType]);

  const handleSendVerify = () => {
    onFormChange({
      verificationCode: '',
    });
    const data = getValues();

    try {
      validator(data as any);
    } catch (e) {
      console.log(e);
      return;
    }

    const payload = {
      name: data.name,
      birthday: data.birthday,
    };

    if (data.authToolType === AUTH_TOOL_TYPE.PHONE) {
      sendVerifyPhone(
        { ...payload, phoneNumber: data.phoneNumber },
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
    console.log('ddd');
    const payload = {
      name: data.name,
      birthday: data.birthday,
      verificationCode: data.verificationCode,
    };

    if (data.authToolType === AUTH_TOOL_TYPE.PHONE) {
      verifyPhone(
        {
          ...payload,
          phoneNumber: data.phoneNumber.number,
          phoneNumberLocale: data.phoneNumber.nationCode,
        },
        {
          onSuccess: async (d, variables, context) => {
            verifyTimerCounter.set(0);
            if (isFunction(onSuccess)) {
              const { verificationCode, ...data } = variables;
              onSuccess({ authToolType: AUTH_TOOL_TYPE.PHONE, ...data });
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
              onSuccess({ authToolType: AUTH_TOOL_TYPE.EMAIL, ...data });
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
    onFormChange(
      defaultValue ?? {
        authToolType: authToolType ?? AUTH_TOOL_TYPE.PHONE,
        userId: '',
        name: '',
        birthday: '',
        phoneNumber: {},
        email: '',
        verificationCode: '',
      },
    );
    setSendedVerifyNumber(false);
  };

  const validator = (data: AuthFormData) => {
    const authSchema = z.object({
      authToolType: z.enum([AUTH_TOOL_TYPE.PHONE, AUTH_TOOL_TYPE.EMAIL]),
      userId: includeUserId ? z.string().required() : z.string(),
      name: z.string().required(),
      birthday: z.number().required(),
      phoneNumber: data.authToolType === AUTH_TOOL_TYPE.PHONE ? z.string().required() : z.string(),
      email:
        data.authToolType === AUTH_TOOL_TYPE.EMAIL
          ? z.string().email().required()
          : z.string().email(),
      verificationCode: z.string().required(),
    });

    const r = authSchema.safeParse(data);
    if (!r.success) {
      r.error.issues.forEach((error: any) => {
        //setFormError(error.path[0], error.message);
      });
      throw 'invalid';
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
        {authToolType === AUTH_TOOL_TYPE.PHONE ? (
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
      <ContentsRow>
        <FormRow provider={provider}>
          <DynamicFormField name={'customText'} />
        </FormRow>
      </ContentsRow>
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
        <Button
          type={'button'}
          variant={'primary'}
          onClick={() => onFormChange({ customText: '새로운 텍스트로 변경합니다.' })}>
          테스트
        </Button>
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
      value: AUTH_TOOL_TYPE.PHONE,
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
    {
      name: 'customText',
      type: 'text',
      label: '커스텀 텍스트',
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
