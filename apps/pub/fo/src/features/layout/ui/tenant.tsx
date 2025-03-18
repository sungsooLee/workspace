import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Popover,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
} from '@learnway/ui';
import styles from './tenant.module.css';
import { IcoArrowDown, IcoCheck } from '@learnway/icons';

const TenantModal = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const tenants = [
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',

    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
    '테넌트명1',
    '테넌트명2',
    '테넌트명3',
    '테넌트명4',
    '테넌트명5',
    '테넌트명6',
    '테넌트명7',
    '테넌트명8',
  ];
  const handleClick = (idx: number): void => {
    setActiveIdx(idx);
  };

  return (
    <ModalContainer>
      <ModalTitle>{'테넌트 선택'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.tenant_content}`}>
          <div className={styles.tenant_wrap}>
            <ul className={styles.tenant_list}>
              {tenants.map((tenants, idx) => (
                <li>
                  <Button
                    key={idx}
                    className={`${styles.btn} ${activeIdx === idx ? styles.active : ''}`}
                    onClick={() => handleClick(idx)}>
                    <span className={styles.label}>
                      <i>
                        <IcoCheck width={16} height={16} stroke="#6f798b"></IcoCheck>
                      </i>
                      대표
                    </span>
                    <span className={styles.txt}>{tenants}</span>
                  </Button>
                </li>
              ))}
            </ul>
            <p className={styles.notice}>메인 테넌트를 변경하려면 좌측 대표 버튼을 선택하세요.</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <a></a>
      </ModalFooter>
    </ModalContainer>
  );
};

const TenantComponent = () => {
  const { open: openModal } = useModal();

  return (
    <Button
      className={styles.btn_tenant}
      onClick={() =>
        openModal({
          width: 'sm',
          content: <TenantModal />,
        })
      }>
      <span className={styles.select}>{'현대 오토에버'}</span>
      <IcoArrowDown width={16} height={16} stroke="#131C30" />
    </Button>
  );
};

export const Tenant = memo(TenantComponent);
