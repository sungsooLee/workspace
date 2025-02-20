import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { IcoBuilding01 } from '@learnway/icons';
import { IcoFormRequired } from '@learnway/icons';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';
import { Button, Stepper, SelectOption, Input } from '@learnway/ui';

export const Route = createFileRoute('/_auth/signup_step2')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '회원유형선택', subLabel: '', value: 'step1' },
    { label: '사업자 정보 조회', subLabel: '', value: 'step2' },
    { label: '회원정보입력', subLabel: '', value: 'step3' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return (
    <div className={`${styles.start} ${signupStyles.auth_wrap}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.signup_step}>
            <Stepper items={items} onChange={handleChange} variant="check" selectedStep="step2" />
          </div>
        </div>

        <h4 className={signupStyles.title}>협력업체 사업자 정보 조회</h4>
        <div className={formStyles.form_row}>
          <div className={`${formStyles.form_item} ${formStyles.pd_none}`}>
            <label htmlFor="name" className={formStyles.form_label}>
              <span className={formStyles.form_text}>사업자 등록 번호</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name" type="text" placeholder="숫자 10자리 입력(1234567890)" value="" />
              <Button variant="gray" size="sm">
                조회
              </Button>
            </div>
            <p className={cn(formStyles.guide_text)}>사업자 등록 번호가 확인 되었습니다.</p>
          </div>
        </div>

        <div className={signupStyles.btn_wrap}>
          <Button variant="gray" size="xl">
            이전
          </Button>
          <Button variant="primary" size="xl">
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
