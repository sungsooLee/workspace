import { memo } from 'react';
import { cn } from '@learnway/shared';
import styles from './privacy-popup.module.css';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  useModal,
  Dropdown,
} from '@learnway/ui';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

const PrivacyPopupCompoment = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'개인정보처리방침'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}>
          <Dropdown
            size="lg"
            options={[
              { value: 'type1', label: '약관 명 YYYY-MM-DD' },
              { value: 'type2', label: '약관 명 YYYY-MM-DD' },
            ]}
          />

          <div className={styles.details}>개인정보처리방침 내용</div>
        </div>
      </ModalBody>

      <ModalFooter>
        {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
        <BrowserView>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
          </div>
        </BrowserView>

        <MobileView>
          <MobileContainerFooter>
            <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
          </MobileContainerFooter>
        </MobileView>
      </ModalFooter>
    </ModalContainer>
  );
};

export const PrivacyPopup = memo(PrivacyPopupCompoment);
