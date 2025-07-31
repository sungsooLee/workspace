import { createFileRoute } from '@tanstack/react-router';

import { isMobile } from 'react-device-detect';
import { IcoError02 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import myPageContainerStyles from '@learnway/styles/fo/widgets/layout/ui/main/container/my-page-container.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './password-verify.module.css';
import { Panel } from '@learnway/ui/panel';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';

export const Route = createFileRoute('/_layout/my/password-verify')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={myPageContainerStyles.start}>
      <h2 className={myPageContainerStyles.text_center}>비밀번호 확인</h2>
      <div className={`${styles.start} ${styles.password}`}>
        <div className={styles.box}>
          <div className={styles.confirm}>
            <IcoError02 width={isMobile ? 56 : 80} height={isMobile ? 56 : 80} />
            <div className={styles.text_box}>
              <strong>비밀번호가 일치하지 않습니다.</strong>
              <p>개인정보 접근을 위해 비밀번호를 확인해주세요.</p>
              <span>오류횟수 1/5</span>
            </div>
          </div>

          {/* 남은시간 */}
          <Panel hideHeaderUnderline className={styles.timer} type="rounded_fill">
            <p>남은 시간 59:59</p>
          </Panel>

          {/* 비밀번호 */}
          <ContentsRow>
            <div className={cn(formStyles.form_item, styles.from_item)}>
              <label className={formStyles.form_label}>
                <span className={formStyles.form_text}>비밀번호</span>
              </label>
              <div className={formStyles.input_box}>
                <Input type="password" placeholder="Password" inputSize="lg" value="" />
              </div>
            </div>
          </ContentsRow>
        </div>

        {/* pc button */}
        <BrowserView>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl2">
              취소
            </Button>
            <Button variant="primary" size="xl2">
              확인
            </Button>
          </div>
        </BrowserView>

        {/* mobile button */}
        <MobileView>
          <MobileContainerFooter>
            <Button variant="primary" size="xl">
              확인
            </Button>
          </MobileContainerFooter>
        </MobileView>
      </div>
    </div>
  );
}
