import { memo } from 'react';
import styles from './privacy-popup.module.css';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  useModal,
  Select,
} from '@learnway/ui';

const PrivacyPopupCompoment = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'개인정보처리방침'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}>
          <Select
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
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const PrivacyPopup = memo(PrivacyPopupCompoment);
