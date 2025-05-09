import { memo, useCallback, useEffect } from 'react';
import { useBoolean, useCounter } from 'react-use';
import { useTranslation } from 'react-i18next';

import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  useModal,
  ModalTitle,
  InputTimer,
} from '@learnway/ui';
import { cn } from '@learnway/shared';
import { DynamicFormField, ContentsRow } from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import { FormRow } from '../../../../shared/ui';
import {
  useFetchAuthUser,
  useVerifySMS,
  useSendVerifySMS,
  useUpdatePhoneNumber,
  useUserDetail,
} from '../../../../entities/authorization';
import { t } from 'i18next';

const TIME_LIMIT_VERIFY = 180;

const ChangePhoneNumberModalComponent = ({ widget }: { widget: any }) => {
  const { t } = useTranslation();
  const { close: closeModal, alert } = useModal();

  const {
    provider,
    fetchData,
    control,
    getValues,
    onFormValid,
    onSubmit,
    setFormError,
    onFormChange,
  } = useDynamicForm(phoneNumberFormConfig);
  const { data: authUser } = useFetchAuthUser();
  const { data: userDetail } = useUserDetail();
  const { update: updatePhoneNumber } = useUpdatePhoneNumber();
  const { send: sendVerifySMS } = useSendVerifySMS(); // 인증번호 요청
  const { verify: verifySMS } = useVerifySMS(); // 인증번호 인증 요청

  const [verifyTimer, verifyTimerCounter] = useCounter(0);
  const [sendedVerifyNumber, setSendedVerifyNumber] = useBoolean(false);

  console.log('verifyTimer', verifyTimer);

  useEffect(() => {
    if (!authUser) {
      return;
    }
    fetchData({
      currentPhoneNumber: userDetail.phoneNumber,
      currentPhoneNumberNationCode: authUser.phoneNumberNationCode,
    });
  }, [authUser]);

  const handleTimeOver = () => {
    verifyTimerCounter.set(0);
  };

  const handleSendVerify = async (d?: any) => {
    const data = d ?? getValues();

    console.log('data :: ', data);

    onFormChange({
      verificationCode: '',
    });

    const payload = {
      name: userDetail.name,
      birthday: String(userDetail.birthday),
      phoneNumber: data.newPhoneNumber,
    };

    console.log('payload', payload);
    // return;
    sendVerifySMS(payload, {
      onSuccess: () => {
        setSendedVerifyNumber(true);
        verifyTimerCounter.inc();
      },
    });
  };

  const handleOnSubmit = async (data: any) => {
    console.log(' handleOnSubmit data :: ', data);

    const result = await onFormValid(['verificationCode', 'newPhoneNumber']);
    if (!result) {
      return;
    }

    const smsVerifyPayload = {
      name: userDetail.name,
      birthday: userDetail.birthday,
      verificationCode: data.verificationCode,
      phoneNumber: data.newPhoneNumber,
    };

    const payload = {
      name: userDetail.name,
      birthday: userDetail.birthday,
      currentPhoneNumber: data.currentPhoneNumber,
      // currentPhoneNumberNationCode: authUser.phoneNumberNationCode,
      newPhoneNumber: data.newPhoneNumber,
      // newPhoneNumberNationCode: data.newPhoneNumberNationCode,
    };

    verifySMS(smsVerifyPayload, {
      onSuccess: async () => {
        updatePhoneNumber(payload, {
          onSuccess: async (d, variables, context) => {
            await alert('LABEL.message.updatePhoneNumberResultMessage');
            closeModal({
              number: variables.newPhoneNumber,
              nationCode: variables.newPhoneNumberNationCode,
            });
          },
        });
      },
      onError: () => {
        setFormError('verificationCode', t('LABEL.common.invalidAuthNumber'));
      },
    });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ModalContainer>
        <ModalTitle>{t('LABEL.common.phoneNumberChange')}</ModalTitle>

        <ModalBody>
          <ContentsRow type="no_line">
            <FormRow provider={provider}>
              <DynamicFormField name={'currentPhoneNumber'} />
            </FormRow>
          </ContentsRow>
          <ContentsRow type="no_line">
            <FormRow provider={provider}>
              <DynamicFormField name={'newPhoneNumber'} />
            </FormRow>
          </ContentsRow>
          {sendedVerifyNumber && (
            <ContentsRow type="no_line">
              <FormRow provider={provider}>
                <DynamicFormField name={'verificationCode'}>
                  <InputTimer
                    initialTime={TIME_LIMIT_VERIFY}
                    startTimer={verifyTimer}
                    onTimerEnd={() => handleTimeOver()}
                    onReset={() => handleSendVerify()}
                    resetLabel={t(
                      sendedVerifyNumber
                        ? 'LABEL.common.resend'
                        : 'LABEL.common.requestVerification',
                    )}
                    disabled={verifyTimer === 0}
                  />
                </DynamicFormField>
              </FormRow>
            </ContentsRow>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type={'button'}
            label={t('LABEL.common.cancel')}
            variant={'gray'}
            size={'lg'}
            onClick={() => closeModal()}
          />
          {sendedVerifyNumber ? (
            <Button
              label={t('LABEL.common.checkAuthNumber')}
              variant={'primary'}
              size={'lg'}
              type="submit"
            />
          ) : (
            <Button
              label={t('LABEL.common.checkAuthRequest')}
              variant={'primary'}
              size={'lg'}
              type={'button'}
              onClick={() => {
                handleSendVerify();
              }}
            />
          )}
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const ChangePhoneNumberModal = memo(ChangePhoneNumberModalComponent);

const phoneNumberFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'currentPhoneNumber',
      type: 'phone-number',
      label: 'LABEL.common.currentPhoneNumber',
      value: '',
      placeholder: 'LABEL.common.currentPhoneNumber',
      fields: {
        nationCode: 'currentPhoneNumberNationCode',
        number: 'currentPhoneNumber',
      },
      disabled: true,
    },
    {
      name: 'currentPhoneNumberNationCode',
      type: 'hidden',
      value: 'KR',
    },
    {
      name: 'newPhoneNumber',
      type: 'phone-number',
      label: 'LABEL.common.newPhoneNumber',
      value: '',
      placeholder: 'LABEL.common.newPhoneNumber',
      fields: {
        nationCode: 'newPhoneNumberNationCode',
        number: 'newPhoneNumber',
      },
    },
    {
      name: 'newPhoneNumberNationCode',
      type: 'hidden',
      value: 'KR',
    },
    {
      name: 'verificationCode',
      type: 'custom',
      label: 'LABEL.common.certificationNumber',
      value: '',
      placeholder: 'LABEL.common.certificationNumber',
    },
  ],
  validator: {
    newPhoneNumber: {
      format: 'phone-number',
      required: true,
    },
    verificationCode: true,
  },
};
