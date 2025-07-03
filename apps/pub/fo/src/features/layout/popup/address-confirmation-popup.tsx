import React, { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, ModalFooter, Button } from '@learnway/ui';

import styles from './address-confirmation-popup.module.css';

const AddressConfirmationPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'주소 확인'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.confirmation}`}>
          <p>
            해당 주소로 교재가 배송됩니다
            <br />
            다시 한번 정확하게 확인해주세요
          </p>
          <div className={styles.box}>
            <dl>
              <dt>받으실 분 :</dt>
              <dd>김현대님</dd>
            </dl>
            <dl>
              <dt>휴대폰 번호 :</dt>
              <dd>010-222-3333</dd>
            </dl>
            <dl>
              <dt>받으실 주소 :</dt>
              <dd>
                06134
                <br />
                서울 강남구 테헤란로5길 7 (역삼동, KG Tower), 902호
              </dd>
            </dl>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'수정'} variant="gray" size="lg"></Button>
        <Button label={'확인'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const AddressConfirmationPopup = memo(AddressConfirmationPopupComponent);
