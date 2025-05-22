import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { useSignupStore } from '@features/user/signup';
import { adminItems } from '@features/user/signup/ui/signup-select';
import { IcoCaution } from '@learnway/icons';
import { cn } from '@learnway/shared';
import noticeBoxStyles from '@learnway/styles/bo/shared/ui/notice-box/notice-box.module.css';
import { Button, ContentsRow, Stepper } from '@learnway/ui';
import { FormRow } from '@shared/ui';
import styles from './admin-signup-id-check.module.css';
import { useRouter } from '@tanstack/react-router';

// 아이디 확인
export function AdminSignupIdCheck() {
  const router = useRouter();
  const { setAdminPage } = useSignupStore((state) => state);
  const { provider, onSubmit, formState } = useDynamicForm(formConfig);

  console.log('formState :: ', formState);

  const handleOnSubmit = async (data: any) => {
    console.log('data::', data);
    data && setAdminPage('auth');
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
      <form onSubmit={onSubmit(handleOnSubmit)} className="form_row">
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.signup_info}>
            <div className={styles.step_box}>
              <Stepper items={adminItems} variant="check" selectedStep="step2" />
            </div>
          </div>
          <h4 className={cn(styles.title, 'auth--title')}>{'아이디 확인'}</h4>
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <FormRow provider={provider} name={'email'} />
            </ContentsRow>
          </div>
          <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>학습자 계정아이디 확인 후에 관리자 권한 신청을 할 수 있습니다.</dd>
            </dl>
          </div>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" onClick={() => router.navigate({ to: '/login' })}>
              취소
            </Button>
            <Button type="submit" variant="primary" size="xl" disabled={!formState.isValid}>
              다음
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'email',
      type: 'text',
      label: 'LABEL.common.email',
      value: '',
      placeholder: '이메일(hyunidai.kim@hyundai.com)',
    },
  ],
  validator: {
    email: {
      format: 'email',
      required: true,
    },
  },
};
