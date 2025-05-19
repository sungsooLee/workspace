import { memo } from 'react';
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

import { FormRow, EmbededAlert } from '../../../../shared/ui';
import { useVerifyEmail, useSendVerifyEmail } from '../../../../entities/authorization';
import { useFetchAuthUser, useUpdateUser } from '../../../../entities/authorization';

import styles from '@learnway/styles/bo/assets/styles/modules/widget-management.module.css'; // 화면 css

const TIME_LIMIT_VERIFY = 180;

const ChangeUserIdModalComponent = ({ widget }: { widget: any }) => {
  const { t } = useTranslation();
  const { close: closeModal, alert } = useModal();

  const { provider, onFormChange, control, getValues, onFormValid, onSubmit, setFormError } =
    useDynamicForm(userIdFormConfig);

  const [verifyTimer, verifyTimerCounter] = useCounter(0);
  const [sendedVerifyNumber, setSendedVerifyNumber] = useBoolean(false);

  const { verify: verifyEmail } = useVerifyEmail();
  const { send: sendVerifyEmail } = useSendVerifyEmail();
  const { data: authUser } = useFetchAuthUser();
  const { updateEmail } = useUpdateUser();

  const handleTimeOver = () => {
    verifyTimerCounter.set(0);
  };

  const handleSendVerify = async (d?: any) => {
    const data = d ?? getValues();

    onFormChange({
      verificationCode: '',
    });

    const result = await onFormValid(['currentEmail', 'email']);
    if (!result) {
      return;
    }

    if (!authUser?.name || !authUser?.birthday) {
      return;
    }
    const payload = {
      name: authUser.name,
      birthday: String(authUser.birthday),
    };

    sendVerifyEmail(
      { ...payload, email: data.email },
      {
        onSuccess: () => {
          setSendedVerifyNumber(true);
          verifyTimerCounter.inc();
        },
      },
    );
  };

  const handleOnSubmit = async (data: any) => {
    if (!sendedVerifyNumber) {
      handleSendVerify(data);
      return;
    }
    if (!authUser?.name || !authUser?.birthday) {
      return;
    }
    const payload = {
      name: authUser.name,
      birthday: String(authUser.birthday),
      verificationCode: data.verificationCode,
    };

    verifyEmail(
      { ...payload, email: data.email },
      {
        onSuccess: async (d, variables, context) => {
          updateEmail(data.email);
          verifyTimerCounter.set(0);
          await alert('LABEL.message.updateEmailIdResultMessage');
          closeModal(data.email);
        },
        onError: handleVerifyError,
      },
    );
  };

  const handleVerifyError = () => {
    setFormError('verificationCode', t('LABEL.message.invalidAuthNumber'));
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ModalContainer>
        <ModalTitle>{t('LABEL.common.changeEmailAccount')}</ModalTitle>

        <ModalBody>
          <EmbededAlert className={styles.search_info} hiddenIcon>
            {t(`LABEL.message.canUpdateEmailAfterVerifying`)}
          </EmbededAlert>

          <ContentsRow type="no_line">
            <FormRow provider={provider} name={'currentEmail'} />
          </ContentsRow>
          <ContentsRow type="no_line">
            <FormRow provider={provider} name={'email'} />
          </ContentsRow>
          <ContentsRow type="no_line">
            <FormRow
              provider={provider}
              name={'verificationCode'}
              element={
                <InputTimer
                  initialTime={TIME_LIMIT_VERIFY}
                  startTimer={verifyTimer}
                  onTimerEnd={() => handleTimeOver()}
                  onReset={() => handleSendVerify()}
                  resetLabel={t(
                    sendedVerifyNumber ? 'LABEL.common.resend' : 'LABEL.common.requestVerification',
                  )}
                  disabled={verifyTimer === 0}
                />
              }
            />
          </ContentsRow>
        </ModalBody>
        <ModalFooter>
          <Button
            label={t('LABEL.common.cancel')}
            variant={'gray'}
            size={'lg'}
            onClick={() => closeModal()}
          />
          <Button label={t('LABEL.common.update')} variant={'primary'} size={'lg'} type="submit" />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const ChangeUserIdModal = memo(ChangeUserIdModalComponent);

const userIdFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'currentEmail',
      type: 'text',
      label: 'LABEL.common.currentEmail',
      value: '',
      placeholder: 'LABEL.common.currentEmail',
    },
    {
      name: 'email',
      type: 'text',
      label: 'LABEL.common.newEmail',
      value: '',
      placeholder: 'LABEL.common.newEmail',
    },
    {
      name: 'verificationCode',
      type: 'custom',
      label: 'LABEL.common.emailVerificationCode',
      value: '',
      placeholder: 'LABEL.common.emailVerificationCode',
    },
  ],
  validator: {
    currentEmail: {
      format: 'email',
      required: true,
    },
    email: {
      format: 'email',
      required: true,
    },
    verificationCode: {
      format: 'number',
      required: true,
    },
  },
};
