import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';
import { IcoCheck, IcoArrowForward } from '@learnway/icons';
import { useFetchAuthUser, useUpdateUser } from '@learnway/config';

import styles from '@learnway/styles/fo/features/platform/ui/tenant-button/tenant-button.module.css';

const TenantModalComponent = () => {
  const { t } = useTranslation();
  const [tip, setTip] = useState<number | null>(null);

  const { confirm } = useModal();
  const { data } = useFetchAuthUser();
  const { updateActiveTenant, updateMainTenant } = useUpdateUser();

  const handleChangeMainTenant = async (tenantNo: number) => {
    updateMainTenant(tenantNo);
    setTip(tenantNo);
  };

  const handleChangeTenant = async (tenantNo: number) => {
    const result = await confirm(t('MESSAGE.선택한 테넌트로 변경하시겠습니까?'));
    if (result) {
      updateActiveTenant(tenantNo);
      window.location.reload();
    }
  };

  return (
    <ModalContainer>
      <ModalTitle>{'테넌트 선택'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.tenant_content}`}>
          <div className={styles.tenant_wrap}>
            <ul className={styles.tenant_list}>
              {(data?.tenants ?? []).map((tenant, idx) => (
                <li>
                  <Button
                    key={idx}
                    className={`${styles.btn} ${data?.mainTenantId === tenant.tenantNo ? styles.active : ''}`}
                    onClick={() => handleChangeMainTenant(tenant.tenantNo)}
                  >
                    <span className={styles.label}>
                      <i>
                        <IcoCheck width={16} height={16} stroke="#6f798b"></IcoCheck>
                      </i>
                      대표
                    </span>
                    {tip === tenant.tenantNo && (
                      <p className={`${styles.tip} ${styles.tip_show}`}>
                        대표 테넌트로 설정되었습니다.
                      </p>
                    )}
                  </Button>
                  <Button
                    key={idx}
                    className={styles.btn_refresh}
                    onClick={() => handleChangeTenant(tenant.tenantNo)}
                  >
                    <span className={styles.txt}>
                      {tenant.tenantName}
                      {isMobile ? (
                        <i>
                          <IcoArrowForward
                            width={20}
                            height={20}
                            stroke="#6f798b"
                          ></IcoArrowForward>
                        </i>
                      ) : null}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <p className={styles.notice}>메인 테넌트를 변경하려면 좌측 대표 버튼을 선택하세요.</p>
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantModal = memo(TenantModalComponent);
