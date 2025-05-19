import { useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import { t } from 'i18next';

import { Button, Stepper, ContentsRow, DynamicFormField } from '@learnway/ui';
import styles from './cp-signup-check.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { FormRow } from '@shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { useDynamicFormContext } from '@learnway/hooks';
import { useSignupStore } from '@features/user/signup/store/use-signup-store';
import { cpItems } from '@features/user/signup/ui/signup-select';
import { useRouter } from '@tanstack/react-router';

// TODO API
export const CPSignupCheck = () => {
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);

  const { provider, fetchData, onSubmit, onFormChange, getValues, clearFormError, setFormError } =
    useDynamicForm(formConfig);
  const { setBusinessCode, setCpPage, reset } = useSignupStore((state) => state);

  const handleOnSubmit = (data: any) => {
    console.log(data);
    setBusinessCode(data.businessCode);
    setIsSuccess(true);
  };

  function BussnessCodeCheckButton({ success }: { success: boolean }) {
    const { onChangeGuideText } = useDynamicFormContext();
    useEffect(() => {
      if (success) {
        onChangeGuideText(
          <p className={cn(formStyles.guide_text)}>사업자 등록 번호가 확인 되었습니다.</p>,
        );
      } else {
        onChangeGuideText('');
      }
    }, [success]);

    return (
      <Button type="submit" variant="gray" size="lg">
        조회
      </Button>
    );
  }

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  const handleNext = () => {
    isSuccess && setCpPage('signup');
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.signup_info}>
            <div className={styles.step_box}>
              <Stepper items={cpItems} variant="check" selectedStep="step2" />
            </div>
          </div>

          <h4 className={cn(styles.title, 'auth--title')}>{'협력업체 사업자 정보 조회'}</h4>
          <ContentsRow>
            <FormRow provider={provider} name={'businessCode'}>
              <BussnessCodeCheckButton success={isSuccess} />
            </FormRow>
          </ContentsRow>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="primary" size="xl" disabled={!isSuccess} onClick={handleNext}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'businessCode',
      type: 'text',
      format: 'string',
      label: t('사업자 등록 번호'),
      placeholder: '숫자 10자리 입력(1234567890)',
      value: '',
      maxLength: 10,
    },
  ],
  validator: {
    businessCode: true,
  },
};
