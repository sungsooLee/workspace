import { memo } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui';
import { DynamicFormField, ContentsRow } from '@learnway/ui';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';

import { FormRow, EmbededAlert } from '../../../../shared/ui';
import { useLogoutUser, useVerifyPassword } from '../../../../entities';

import styles from '@learnway/styles/bo/assets/styles/modules/widget-management.module.css'; // 화면 css
import { useModal } from '@learnway/ui';

const PasswordVerifyModalComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { alert: openAlert } = useModal();
  const { logout } = useLogoutUser();

  const { provider, onFormChange, control, getValues, onFormValid, onSubmit, setFormError } =
    useDynamicForm(passwordVerifyFormConfig);

  const { verify } = useVerifyPassword();

  const passwordError = async (data: any) => {
    const result = await openAlert({
      title: <div>{t('LABEL.common.inputPassword')}</div>,
      content: (
        <div className="whitespace-pre-wrap">
          {t('LABEL.message.passwordConfirmFail')}
          <div className="error">
            {t('LABEL.common.passwordVerifyCount', { count: data.loginFailCount })}
          </div>
        </div>
      ),
      okButtonLabel: t('LABEL.common.ok'),
    });

    if (result && data.loginFailCount >= 5) {
      logout(undefined, {
        onSuccess: () => {
          router.navigate({ to: '/search-account', params: { tabKey: 'account' } });
        },
      });
    }
  };

  // TODO Lock
  // const passwordLock = () => {
  //   openAlert({
  //     title: <>로그인 계정이 잠겼습니다. </>,
  //     content: (
  //       <>
  //         5회 이상 비밀번호 오류로 인해 60분 동안 계정이 잠기어 남은 시간 동안 로그인이 불가합니다.
  //         <br />
  //         비밀번호 분실 시 그룹웨어에서 비밀번호를 변경해 주세요.
  //         <div className="error">남은 시간 59:59</div>
  //       </>
  //     ),
  //     okButtonLabel: '확인',
  //   });
  // };

  const handleOnSubmit = async (data: any) => {
    verify(
      { password: data.password },
      {
        onSuccess: async (data, variables, context) => {
          console.log('data :: ', data);
          if (data && data.isPasswordCorrect && data.isPasswordCorrect === true) {
            router.navigate({ to: '/my-page/privacy', state: { confirmPassword: 'true' } as any });
          } else {
            passwordError(data);
          }
        },
        onError: handleVerifyError,
      },
    );
  };

  const handleVerifyError = () => {
    console.log('handleVerifyError');
    setFormError('password', t('LABEL.message.invalidAuthNumber'));
    // router.navigate({ to: '/my-page/privacy', state: { confirmPassword: 'true' } as any });
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
      <ModalContainer>
        <ModalTitle>{t('LABEL.common.passwordVerify')}</ModalTitle>

        <ModalBody>
          <EmbededAlert className={styles.search_info} hiddenIcon>
            {t(`LABEL.message.passwordVerifyForChangePassword`)}
          </EmbededAlert>

          <ContentsRow>
            <FormRow provider={provider} name={'password'} />
          </ContentsRow>
        </ModalBody>
        <ModalFooter>
          <Button label={t('LABEL.common.ok')} variant={'primary'} size={'lg'} type="submit" />
        </ModalFooter>
      </ModalContainer>
    </form>
  );
};

export const PasswordVerifyModal = memo(PasswordVerifyModalComponent);

const passwordVerifyFormConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'password',
      type: 'text',
      label: 'LABEL.common.password',
      value: '',
      required: true,
    },
  ],
  validator: {
    password: true,
    // password: {
    //   format: 'password',
    //   required: true,
    // },
  },
};
