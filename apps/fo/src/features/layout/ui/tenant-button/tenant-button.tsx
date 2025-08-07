import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser, useUpdateTenantRoleLastSelect } from '@learnway/auth/entities';
import { Tenant } from '@learnway/auth/types';
import { IcoArrowDown, IcoCheck02 } from '@learnway/icons';
import { getFullImagePath } from '@learnway/shared';
import { Popover } from '@learnway/ui/popover';

import styles from '@learnway/styles/fo/features/platform/ui/tenant-button/tenant-button.module.css';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui/modal';
import { useRouter } from '@tanstack/react-router';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';

const TenantContent = ({ setIsOpen }: any) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data } = useFetchAuthUser();
  const { update: updateTenantRole } = useUpdateTenantRoleLastSelect();
  const { confirm } = useModal();

  const handleSelect = async (tenant: Tenant) => {
    try {
      const result = await confirm({
        title: <>{t('테넌트 변경')}</>,
        content: <>{t('선택한 테넌트로 변경하시겠어요?')}</>,
        okButtonLabel: t('확인'),
        cancelButtonLabel: t('취소'),
      });

      // 일부 alert는 result가 undefined 이므로 무조건 확인시 실행
      if (result === true) {
        console.log('@@@ call');

        setIsOpen?.(false);
        // onSelect(tenant);
        updateTenantRole({
          lastVisitedFoTenantId: tenant.tenantId,
        });
        router.navigate({ to: '/', replace: true });
      }
    } catch (e) {
      // 취소했거나 창을 닫았을 때는 무시
    }
  };

  return (
    <div className={`${styles.start} ${styles.tenant_content}`}>
      <div className={styles.tenant_wrap}>
        <ul className={styles.tenant_list}>
          {data?.tenants?.map((tenant, index) => (
            <li key={index}>
              <Button
                variant="text"
                onClick={() => handleSelect(tenant)}
                className={data?.activeTenant?.tenantId === tenant.tenantId ? styles.active : ''}
              >
                {tenant.tenantName}
                {isMobile && data?.activeTenant?.tenantId === tenant.tenantId && (
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
  const { t } = useTranslation();

  return (
    <ModalContainer>
      <ModalTitle>{t('테넌트 선택')}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.tenant_modal}`}>
          <TenantContent />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

const TenantComponent = () => {
  const { data } = useFetchAuthUser();
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  console.log('@@@ isOpen', isOpen);
  return (
    <>
      <BrowserView>
        <Popover
          open={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          popoverContent={<TenantContent setIsOpen={setIsOpen} />}
          className={styles.btn_tenant}
          side="bottom"
          align="end"
          sideOffset={20}
        >
          <div className={styles.select}>
            <span className={styles.text}>
              <img src={getFullImagePath(data?.activeTenant?.logoImageUrl)} alt="Logo" />
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

/**
 * @description PC: NLP_FO_GNB_1002, MO: NLP_FO_GNB_MA_1001
 */
export const TenantButton = memo(TenantComponent);
