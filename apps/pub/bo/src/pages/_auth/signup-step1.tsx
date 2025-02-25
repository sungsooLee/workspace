import { isMobile } from 'react-device-detect';

import { createFileRoute } from '@tanstack/react-router';
import { IcoBuilding01 } from '@learnway/icons';
import { IcoOverseasDealer, IcoCaution } from '@learnway/icons';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, RadioCard, Stepper, SelectOption } from '@learnway/ui';

export const Route = createFileRoute('/_auth/signup-step1')({
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
    <div className={`${styles.start} ${signupStyles.auth_wrap} ${signupStyles.signup_step}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.step_box}>
            <Stepper items={items} onChange={handleChange} variant="check" selectedStep="step1" />
          </div>

          <div className={signupStyles.signup_select} role="radiogroup">
            <RadioCard
              className={styles.radio_card}
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoBuilding01 width={48} height={48} className={styles.ico1} />
                      <span>일반 회원</span>
                    </div>
                  ),
                },
                {
                  value: 'type2',
                  label: (
                    <div>
                      <IcoOverseasDealer width={48} height={48} className={styles.ico2} />
                      <span>HTA/HTACV 이용자</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div className={signupStyles.signup_noti}>
            <dl className={styles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>일반회원은 한국 내 협력사, 산학협력등 업체 회원입니다.</dd>
              <dd>HTA/HTACV Member는 해외에 현대자동차 승용/상용 회원입니다.</dd>
            </dl>
          </div>
        </div>
        <div className={signupStyles.btn_wrap}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl" disabled>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
