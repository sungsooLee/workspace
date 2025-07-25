import React, { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, ModalFooter, Button, useModal } from '@learnway/ui';

import styles from '@learnway/styles/fo/features/layout/popup/address-confirmation-popup.module.css';
import { Address } from '@types';

interface Props {
  address: Address;
  name: string;
  phoneNumber: string;
}

const AddressConfirmationPopupComponent = ({ address, name, phoneNumber }: Props) => {
  const { close } = useModal();

  const onConfirm = () => {
    close(true);
  };

  const onEdit = () => {
    close(false);
  };
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
              <dd>{`${name}님`}</dd>
            </dl>
            <dl>
              <dt>휴대폰 번호 :</dt>
              <dd>{phoneNumber}</dd>
            </dl>
            <dl>
              <dt>받으실 주소 :</dt>
              <dd>
                {address.postalCode}
                <br />
                {address.roadAddress}
              </dd>
            </dl>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'수정'} variant="gray" size="xl" onClick={onEdit}></Button>
        <Button label={'확인'} variant={'primary'} size={'xl'} onClick={onConfirm}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const AddressConfirmationPopup = memo(AddressConfirmationPopupComponent);
