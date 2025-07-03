import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, Checkbox } from '@learnway/ui';
import { IcoArrowForward } from '@learnway/icons';
import styles from './agreement-check.module.css'; // 페이지 모듈

import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';

export const Route = createFileRoute('/_auth/agreement_check')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.agreement}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
          <h3 className={proccessResultStyles.title}>Learningway 이용약관 및 개인정보 처리방침 </h3>
          <p className={proccessResultStyles.noti}>
            이용약관 및 개인정보 처리방침에 동의하셔야 러닝웨이 서비스를 이용할 수 있습니다.
          </p>
        </div>

        <div className={styles.agreement_check_box}>
          <div className={styles.check_all}>
            <Checkbox label="이용약관 및 개인정보 취급방침에 모두 동의합니다." />
          </div>
          <div className={styles.check_list}>
            <div className={styles.list}>
              <h4 className={styles.tit}>러닝웨이 이용에 관한 동의(필수)</h4>
              <Checkbox label="개인정보 수집 및 이용에 관한 동의에 동의합니다." />
              <div className={styles.details}>
                1. 수집 및 이용목적
                <br /> - 홈페이지 회원 가입 및 관리
                <br /> - 재화 또는 서비스 제공 1. 수집 및 이용목적
                <br /> - 홈페이지 회원 가입 및 관리
                <br /> - 재화 또는 서비스 제공
              </div>
            </div>

            <div className={styles.list}>
              <h4 className={styles.tit}>개인정보 이용동의(필수)</h4>
              <Checkbox label="개인정보 이용에 동의합니다." />
              <div className={styles.details}></div>
            </div>

            <div className={styles.list}>
              <h4 className={styles.tit}>개인정보 제3자 제공동의(필수)</h4>
              <Checkbox label="개인정보 이용에 동의합니다." />
              <div className={styles.details}></div>
            </div>

            <div className={styles.list}>
              <h4 className={styles.tit}>고유식별 정보 처리 동의(필수)</h4>
              <Checkbox label="개인정보 제3자 동의에 동의합니다." />
              <div className={styles.details}></div>
            </div>

            <div className={styles.list}>
              <h4 className={styles.tit}>민감정보 수집 및 이용(선택)</h4>
              <Checkbox label="민감정보 수집 및 이용에 동의합니다." />
              <div className={styles.details}></div>
            </div>
          </div>
        </div>

        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl">
            동의
          </Button>
        </div>
      </div>
    </div>
  );
}
