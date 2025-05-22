// import { DynamicFormConfig } from '@/libs/hooks/src/lib/form-builder/type';
import { useDynamicForm, DynamicFormConfig } from '@learnway/hooks';
import { useSignupStore } from '@features/user/signup';
import { adminItems } from '@features/user/signup/ui/signup-select';
import { IcoCaution } from '@learnway/icons';
import { cn } from '@learnway/shared';
import noticeBoxStyles from '@learnway/styles/bo/shared/ui/notice-box/notice-box.module.css';
import { Button, ContentsRow, DynamicFormField, Stepper } from '@learnway/ui';
import { FormRow } from '@shared/ui';
import styles from './admin-signup-id-check.module.css';
import { useRouter } from '@tanstack/react-router';
import { useExistsEmail } from '@learnway/auth';
import { tokenService } from '@learnway/config';
import { useEffect } from 'react';

// 아이디 확인
export function AdminSignupIdCheck() {
  const router = useRouter();
  const { setAdminPage } = useSignupStore((state) => state);
  const { provider, onSubmit, formState } = useDynamicForm(formConfig);

  useEffect(() => {
    tokenService.clear();
  }, []);

  // email 확인
  const { existsEmail } = useExistsEmail();
  const handleOnSubmit = async (data: any) => {
    console.log('email :: ', data);
    if (!data.email) return;

    existsEmail(data.email, {
      onSuccess: (data) => {
        // TODO 관리자인지 CP사인지 API정보 필요
        if (data.isEmailExists) {
          data && setAdminPage('auth');
        } else {
          alert({
            title: '진행현황이 없습니다.',
            content: (
              <div className="whitespace-pre-wrap">
                {'입력하신 아이디의 진행현황이 없습니다.\n정확한 정보를 다시 입력해 주세요.'}
              </div>
            ),
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
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
            <Button variant="gray" size="xl" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" variant="primary" size="xl" disabled={!formState.isValid}>
              다음
            </Button>
            <Button variant="gray" size="xl" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="primary" size="xl" onClick={() => setAdminPage('auth')}>
              다음(테스트)
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
