import { createFileRoute } from '@tanstack/react-router';
import { Button, Checkbox } from '@learnway/ui';
import { IcoCaution03 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';
import { isMobile } from 'react-device-detect';

import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import styles from './membership-secession.module.css';
import myContainerStyles from '@learnway/styles/fo/widgets/layout/ui/main/container/my-page-container.module.css';

export const Route = createFileRoute('/_layout/my/membership-secession')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={myContainerStyles.start}>
      <h2 className={myContainerStyles.start}>회원탈퇴</h2>
      <div className={`${styles.start} ${styles.secession}`}>
        <div className={styles.box}>
          <div className={styles.confirm}>
            <IcoCaution03 width={32} height={32} stroke="#ff4646"></IcoCaution03>
            <p>
              회원탈퇴를 신청하기 전에
              <br />
              안내 사항을 꼭 확인해주세요.
            </p>
          </div>

          <div className={styles.bullet_notice}>
            <ul>
              <li>사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</li>
              <li>탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아 있습니다.</li>
              <li>
                삭제를 원하는 게시글이 있다면 반드시 탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다.
              </li>
            </ul>
            <Checkbox size="lg" label="안내 사항을 모두 확인하였으며, 이에 동의 합니다." />
          </div>
        </div>

        <BrowserView>
          <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl">
              회원탈퇴
            </Button>
          </div>
        </BrowserView>

        <MobileView>
          <MobileContainerFooter>
            <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="gray" size="xl">
                취소
              </Button>
              <Button variant="primary" size="xl">
                회원탈퇴
              </Button>
            </div>
          </MobileContainerFooter>
        </MobileView>
      </div>
    </div>
  );
}
