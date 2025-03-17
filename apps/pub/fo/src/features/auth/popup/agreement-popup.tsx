import { memo } from 'react';
import styles from './agreement-popup.module.css';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  useModal,
  Select,
} from '@learnway/ui';

const AgreementPopupCompoment = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'약관 명'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}>
          <Select
            size="lg"
            options={[
              { value: 'type1', label: '약관 명 YYYY-MM-DD' },
              { value: 'type2', label: '약관 명 YYYY-MM-DD' },
            ]}
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

export const AgreementPopup = memo(AgreementPopupCompoment);
