import { IcoArrowDown, IcoCheck02 } from '@learnway/icons';
import { Popover } from '@learnway/ui/popover';
import { memo, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';

import logoImage from '@learnway/styles/fo/assets/images/logo_foot.png';
import styles from '@learnway/styles/fo/features/platform/ui/tenant-button/tenant-button.module.css';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui/modal';

/* 퍼블수정 20250801 전체적으로 수정 (pc, mobile 같이 사용) */
const TenantContent = ({
  selectedTenant,
  onSelect,
}: {
  selectedTenant: string | null;
  onSelect: (tenant: string) => void;
}) => {
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

  const { alert: openAlert } = useModal();

  const handleSelect = async (tenant: string) => {
    try {
      const result = await openAlert({
        title: <>테넌트 변경</>,
        content: <>선택한 테넌트로 변경하시겠어요?</>,
        okButtonLabel: '확인',
        cancelButtonLabel: '취소',
      });

      // 일부 alert는 result가 undefined 이므로 무조건 확인시 실행
      if (result === true) {
        onSelect(tenant);
      }
    } catch (e) {
      // 취소했거나 창을 닫았을 때는 무시
    }
  };

  return (
    <div className={`${styles.start} ${styles.tenant_content}`}>
      <div className={styles.tenant_wrap}>
        <ul className={styles.tenant_list}>
          {tenants.map((tenant, index) => (
            <li key={index}>
              <Button
                variant="text"
                onClick={() => handleSelect(tenant)}
                className={selectedTenant === tenant ? styles.active : ''}
              >
                {tenant}
                {isMobile && selectedTenant === tenant && (
                  <IcoCheck02 width="16" height="16" stroke="#0056ff" />
                )}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TenantModal = () => {
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  return (
    <ModalContainer>
      <ModalTitle>{'언어 설정'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.tenant_modal}`}>
          <TenantContent selectedTenant={selectedTenant} onSelect={setSelectedTenant} />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

const TenantComponent = () => {
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const { openModal } = useModal();

  return (
    <>
      {/* pc */}
      <BrowserView>
        <Popover
          popoverContent={
            <TenantContent selectedTenant={selectedTenant} onSelect={setSelectedTenant} />
          }
          className={styles.btn_tenant}
          side="bottom"
          align="end"
          sideOffset={20}
        >
          <div className={styles.select}>
            <span className={styles.text}>
              {selectedTenant ? selectedTenant : <img src={logoImage} alt="Logo" />}
            </span>
          </div>
          <span className={styles.ico}>
            <IcoArrowDown />
          </span>
        </Popover>
      </BrowserView>

      {/* mobile */}
      <MobileView>
        <Button
          className={styles.btn_tenant}
          onClick={() =>
            openModal({
              width: 'm_full',
              content: <TenantModal />,
            })
          }
        >
          <span className={styles.ico}>
            <IcoArrowDown />
          </span>
        </Button>
      </MobileView>
    </>
  );
};

export const Tenant = memo(TenantComponent);
