import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { IcoCaution, IcoArrowForward } from '@learnway/icons';
import styles from './agreement-privacy.module.css';
import embededAlert from '@learnway/styles/fo/shared/ui/embeded-alert/embeded-alert.module.css';
import { Button, Checkbox, useModal } from '@learnway/ui';
import { AgreementDetailPopup } from '../../features/auth';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';

export const Route = createFileRoute('/_auth/agreement-privacy')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={`${embededAlert.start} ${styles.search_info}`}>
          <IcoCaution width={48} height={48} stroke={'#A9AFB8'} />
          <p className={embededAlert.txt}>약관에 동의하셔야 서비스를 이용할 수 있습니다.</p>
        </div>

        <div className={styles.signup_check}>
          <div className={styles.check_all}>
            <Checkbox label="전체 약관 동의(선택항목 포함)" className={styles.all} />
          </div>
          <ul className={styles.check_list}>
            <li>
              <Checkbox label="러닝웨이 이용에 관한 동의(필수)" />
              <Button
                className={styles.btn_view}
                onClick={() =>
                  openModal({
                    width: isMobile ? 'm_full' : 'sm',
                    content: <AgreementDetailPopup />,
                  })
                }>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="개인정보 이용동의(필수)" />
              <Button
                className={styles.btn_view}
                onClick={() =>
                  openModal({
                    width: isMobile ? 'm_full' : 'sm',
                    content: <AgreementDetailPopup />,
                  })
                }>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="개인정보 제3자 제공동의(필수)" />
              <Button
                className={styles.btn_view}
                onClick={() =>
                  openModal({
                    width: isMobile ? 'm_full' : 'sm',
                    content: <AgreementDetailPopup />,
                  })
                }>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="고유식별 정보 처리 동의(필수)" />
              <Button
                className={styles.btn_view}
                onClick={() =>
                  openModal({
                    width: isMobile ? 'm_full' : 'sm',
                    content: <AgreementDetailPopup />,
                  })
                }>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="민감정보 수집 및 이용(선택)" />
              <Button
                className={styles.btn_view}
                onClick={() =>
                  openModal({
                    width: isMobile ? 'm_full' : 'sm',
                    content: <AgreementDetailPopup />,
                  })
                }>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
            <li>
              <Checkbox label="러닝웨이 이용약관(필수)" />
              <Button
                className={styles.btn_view}
                onClick={() =>
                  openModal({
                    width: isMobile ? 'm_full' : 'sm',
                    content: <AgreementDetailPopup />,
                  })
                }>
                <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
              </Button>
            </li>
          </ul>
        </div>

        {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
        <BrowserView>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl">
              동의
            </Button>
          </div>
        </BrowserView>

        <MobileView>
          <MobileContainerFooter>
            <Button variant="primary" size="xl">
              동의
            </Button>
          </MobileContainerFooter>
        </MobileView>
      </div>
    </div>
  );
}
