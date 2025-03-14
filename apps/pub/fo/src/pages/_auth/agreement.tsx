import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, Checkbox } from '@learnway/ui';
import { IcoArrowForward } from '@learnway/icons';
import styles from './agreement.module.css'; // 페이지 모듈

import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';

export const Route = createFileRoute('/_auth/agreement')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.agreement}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={`${proccessResultStyles.start} ${styles.title_info}`}>
          <h3 className={proccessResultStyles.title}>Learningway 이용약관 및 개인정보 처리방침 </h3>
          <p className={proccessResultStyles.noti}>
            이용약관 및 개인정보 처리방침에 동의하셔야 러닝웨이 서비스를 이용할 수 있습니다.
          </p>
        </div>

        <div className={styles.agreement_check_box}>
          <div className={styles.check_all}>
            <Checkbox label="전체 약관 동의(선택항목 포함)" />
          </div>
          <ul className={styles.check_list}>
            <li>
              <Checkbox label="러닝웨이 이용약관(필수)" />
              <Button className={styles.btn_view}>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="개인정보 이용동의(필수)" />
              <Button className={styles.btn_view}>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="고유식별 정보 처리 동의(필수)" />
              <Button className={styles.btn_view}>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="회원가입 및 이용 개인정보 제3자 제공동의(필수)" />
              <Button className={styles.btn_view}>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="민감정보 수집 및 이용(선택)" />
              <Button className={styles.btn_view}>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
          </ul>
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
