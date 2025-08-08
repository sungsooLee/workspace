import { memo } from 'react';
import styles from './open-license-popup-m.module.css';

import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

const OpenLicensePopupCompoment = () => {
  const { closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'오픈소스 라이선스'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.open_license_popup}`}>
          <div className={styles.details}>오픈소스 라이선스 내용</div>
        </div>
      </ModalBody>

      <ModalFooter>
        <MobileContainerFooter>
          <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
        </MobileContainerFooter>
      </ModalFooter>
    </ModalContainer>
  );
};

export const OpenLicensePopup = memo(OpenLicensePopupCompoment);
