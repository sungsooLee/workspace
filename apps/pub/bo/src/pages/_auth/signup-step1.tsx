import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { IcoBuilding01, IcoUser01 } from '@learnway/icons';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, RadioCard, Stepper } from '@learnway/ui';

export const Route = createFileRoute('/_auth/signup-step1')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '회원유형선택', value: 'step1' },
    { label: '사업자 정보 조회', value: 'step2' },
    { label: '회원정보입력', value: 'step3' },
  ];
  const items2 = [
    { label: '회원유형선택', value: 'step1' },
    { label: '아이디 확인', value: 'step2' },
    { label: '본인인증', value: 'step3' },
    { label: '권한정보입력', value: 'step4' },
  ];

  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const itemsToShow = selectedValue === 'type1' ? items : items2;

  return (
    <div className={`${styles.start} ${signupStyles.auth_wrap} ${signupStyles.signup_step}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.step_box}>
            <Stepper items={itemsToShow} variant="check" selectedStep="step1" />
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
                      <span>CP사 회원가입</span>
                    </div>
                  ),
                },
                {
                  value: 'type2',
                  label: (
                    <div>
                      <IcoUser01 width={48} height={48} className={styles.ico2} />
                      <span>관리자 권한 신청</span>
                    </div>
                  ),
                },
              ]}
              onValueChange={handleValueChange}
            />
          </div>
        </div>
        <div className={signupStyles.btn_wrap}>
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
