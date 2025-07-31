import { memo } from 'react';

import { Popover } from '@learnway/ui/popover-list';
import { IcoArrowDown } from '@learnway/icons';
import { useFetchAuthUser, useUpdateTenantRoleLastSelect } from '@learnway/auth/entities';
import { Tenant } from '@learnway/auth/types';

import styles from '@learnway/styles/fo/features/platform/ui/tenant-button/tenant-button.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

const TenantContent = () => {
  const { data } = useFetchAuthUser();
  const { update: updateTenantRole } = useUpdateTenantRoleLastSelect();
  const { confirm } = useModal();

  const handleSelect = async (tenant: Tenant) => {
    try {
      const result = await confirm({
        title: <>테넌트 변경</>,
        content: <>선택한 테넌트로 변경하시겠어요?</>,
        okButtonLabel: '확인',
        cancelButtonLabel: '취소',
      });

      // 일부 alert는 result가 undefined 이므로 무조건 확인시 실행
      if (result === true) {
        // onSelect(tenant);
        updateTenantRole({
          lastVisitedFoTenantId: tenant.tenantId,
        });
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
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TenantComponent = () => {
  const { data } = useFetchAuthUser();

  return (
    <Popover
      popoverContent={<TenantContent />}
      className={styles.btn_tenant}
      side="bottom"
      align="end"
      sideOffset={20}
    >
      <div className={styles.select}>
        <span className={styles.text}>
          <img src={data?.activeTenant?.logoImageUrl} alt="Logo" />
        </span>
      </div>
      <span className={styles.ico}>
        <IcoArrowDown />
      </span>
    </Popover>
  );
};

export const TenantButton = memo(TenantComponent);
