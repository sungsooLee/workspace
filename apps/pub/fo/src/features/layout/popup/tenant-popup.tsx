import { Button, ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui';
import { memo, useState } from 'react';

import { IcoCheck02 } from '@learnway/icons';
import styles from './tenant-popup.module.css';

const TenantPopupComponent = () => {
  const { confirm: openConfirm } = useModal();
  const tenants = [
    '테넌트명1',
    '테넌트명2테넌트명2테넌트명2테넌트명2테넌트명2테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
  ];

  const [activeTenant, setActiveTenant] = useState<number>();
  const handleClickAlert = (index: number) => {
    openConfirm({
      title: '테넌트 변경',
      content: '선택한 테넌트로 변경하시겠어요?',
      okButtonLabel: '확인',
      cancelButtonLabel: '취소',
      onClose: (value: boolean) => {
        if (value) {
          setActiveTenant(index);
        }
      },
    });
  };

  return (
    <ModalContainer>
      <ModalTitle>{'테넌트 선택'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.tenant_content}`}>
          <ul className={styles.tenant_list}>
            {tenants.map((tenant, index) => (
              <li key={index}>
                <Button variant="text" onClick={() => handleClickAlert(index)}>
                  {tenant}
                  {activeTenant === index && <IcoCheck02 width="16" height="16" stroke="#0056ff" />}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const TenantPopup = memo(TenantPopupComponent);
