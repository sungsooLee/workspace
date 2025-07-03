import { memo } from 'react';
import styles from './mpass-popup.module.css';
import { cn } from '@learnway/shared';
import imgGuide1 from '@learnway/styles/fo/assets/images/popup/img_mpass_guide1.png';
import imgGuide2 from '@learnway/styles/fo/assets/images/popup/img_mpass_guide2.png';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, Button, useModal } from '@learnway/ui';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

const MpassPopupCompoment = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'FIDO 인증'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.mpass_popup}`}>
          <div className={styles.title_box}>
            <h3 className={styles.tit}>현재 본인 확인이 진행 중입니다.</h3>
            <p className={styles.txt}>모바일 MPASS 앱에서 인증을 진행해 주세요</p>
          </div>

          <div className={styles.guide_info}>
            <div className={styles.info_box}>
              <div className={styles.time}>
                남은 시간 <strong>30</strong>초
              </div>
              <p className={styles.info}>
                남은 시간 내에 모바일 MPASS 앱에서 본인 확인을 진행해 주세요. <br />
                현재 창을 닫으면 본인 확인이 종료됩니다.
              </p>
            </div>

            <div className={styles.guide_box}>
              <div className={styles.item}>
                <figure className={styles.img}>
                  <img src={imgGuide1} alt="" />
                </figure>
                <p className={styles.desc}>
                  1. 모바일에서 MPASS 앱을 실행하거나
                  <br /> PUSH 메시지를 터치해 주세요.
                </p>
              </div>

              <div className={styles.item}>
                <figure className={styles.img}>
                  <img src={imgGuide2} alt="" />
                </figure>
                <p className={styles.desc}>
                  2. MPASS 앱에서 FIDO 인증을 완료하면
                  <br /> 로그인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.inquiry}>지원 문의 계정인증 개발팀 : +82-2-6296-6409</div>
        </div>
      </ModalBody>

      <ModalFooter>
        {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
        <BrowserView>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
            <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
          </div>
        </BrowserView>

        <MobileView>
          <MobileContainerFooter>
            <Button variant="primary" size="xl">
              확인
            </Button>
          </MobileContainerFooter>
        </MobileView>
      </ModalFooter>
    </ModalContainer>
  );
};

export const MpassPopup = memo(MpassPopupCompoment);
