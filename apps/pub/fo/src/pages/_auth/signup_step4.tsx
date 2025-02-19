import { isMobile } from 'react-device-detect';

import { createFileRoute } from '@tanstack/react-router';
import { IcoBuilding01 } from '@learnway/icons';
import { IcoOverseasDealer, IcoCaution } from '@learnway/icons';
import authStyles from './auth.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, RadioCard, Stepper, SelectOption, Checkbox } from '@learnway/ui';

export const Route = createFileRoute('/_auth/signup_step1 copy')({
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
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={authStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.signup_step}>
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

        <div className={signupStyles.signup_check}>
          <div className={signupStyles.check_all}>
            <Checkbox label="전체 약관 동의" />
          </div>
          <ul className={signupStyles.check_list}>
            <li>
              <Checkbox label="러닝웨이 이용약관(필수)" />
              <Button>자세히 보기</Button>
            </li>
            <li>
              <Checkbox label="개인정보 이용동의(필수)" />
              <Button>자세히 보기</Button>
            </li>
            <li>
              <Checkbox label="고유식별 정보 처리 동의(필수)" />
              <Button>자세히 보기</Button>
            </li>
            <li>
              <Checkbox label="개인정보 이용동의(필수)" />
              <Button>자세히 보기</Button>
            </li>
            <li>
              <Checkbox label="러닝웨이 회원가입 및 이용 개인정보 제3자 제공동의(필수)" />
              <Button>자세히 보기</Button>
            </li>
          </ul>
        </div>

        <div className={authStyles.btn_wrap}>
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
