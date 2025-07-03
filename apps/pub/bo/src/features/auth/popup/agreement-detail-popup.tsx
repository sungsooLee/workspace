import { memo } from 'react';
import styles from './agreement-detail-popup.module.css';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  useModal,
  Select,
} from '@learnway/ui';

const AgreementDetailPopupCompoment = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'약관 명'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}>
          <Dropdown
            size="lg"
            options={[
              { value: 'type1', label: '약관 명 YYYY-MM-DD' },
              { value: 'type2', label: '약관 명2 YYYY-MM-DD' },
            ]}
            placeholder="이전 약관 보기"
          />

          <div className={styles.details}>약관 내용</div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const AgreementDetailPopup = memo(AgreementDetailPopupCompoment);
