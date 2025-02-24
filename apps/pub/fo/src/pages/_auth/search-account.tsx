import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { IcoPhone02, IcoMail } from '@learnway/icons';
import { IcoOverseasDealer, IcoCaution } from '@learnway/icons';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, RadioCard, Tabs } from '@learnway/ui';

export const Route = createFileRoute('/_auth/search-account')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTabKey, selectedTabKey2] = useState<string>('');
  const items = [
    {
      title: '아이디 찾기',
      key: 'a',
      content: (
        <>
          <div className={signupStyles.search_info}>
            <strong>본인인증</strong> 후<br /> 아이디를 확인 할 수 있습니다.
          </div>
          <div className={signupStyles.signup_select} role="radiogroup">
            <RadioCard
              className={styles.radio_card}
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoPhone02 width={48} height={48} className={styles.ico1} />
                      <span>일반 회원</span>
                    </div>
                  ),
                },
                {
                  value: 'type2',
                  label: (
                    <div>
                      <IcoMail width={48} height={48} className={styles.ico2} />
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
              <dd>본인 명의의 인증 수단 정보를 정확히 입력해 주세요.</dd>
            </dl>
          </div>
        </>
      ),
    },
    {
      title: '비밀번호 찾기',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
  ];
  return (
    <div className={`${styles.start} ${signupStyles.auth_wrap}`}>
      <div className={`${signupStyles.auth_box} ${signupStyles.search_account}`}>
        <Tabs selectedTabKey={selectedTabKey} items={items} variant="fill" color="primary" />

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
