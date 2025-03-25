import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Stepper, ContentsRow, Input } from '@learnway/ui';
import { IcoCaution, IcoFormRequired } from '@learnway/icons';
import styles from './admin-auth-step2.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/bo/shared/ui/notice-box/notice-box.module.css';

export const Route = createFileRoute('/_auth/admin-auth-step2')({
  component: RouteComponent,
});

function RouteComponent() {
  // 관리자 권한 신청
  const items = [
    { label: '회원유형선택', value: 'step1' },
    { label: '아이디 확인', value: 'step2' },
    { label: '본인인증', value: 'step3' },
    { label: '권한정보입력', value: 'step4' },
  ];
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.signup_info}>
          <div className={styles.step_box}>
            <Stepper items={items} variant="check" selectedStep="step2" />
          </div>
        </div>
        <div className={cn(styles.auth_form, 'no_line', 'col')}>
          <h4 className={cn(styles.title, 'auth--title')}>{'아이디 확인'}</h4>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="email" className={formStyles.form_label}>
                <span className={formStyles.form_text}>이메일</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="email"
                  type="text"
                  placeholder="아이디(hyundai.kim@hyundail.com)"
                  value=""
                />
              </div>
            </div>
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
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl">
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
