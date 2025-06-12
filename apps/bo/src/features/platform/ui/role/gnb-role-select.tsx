import { memo } from 'react';

import { cn } from '@learnway/shared';
import { Popover } from '@learnway/ui';
import { IcoArrowDown } from '@learnway/icons';
import { Button } from '@learnway/ui';
import {
  Tenant,
  useAsycFetchMenusForceRefatch,
  useFetchAuthUser,
  useUpdateUser,
} from '@learnway/auth';

import styles from './gnb-role.module.css';
import { useRouter } from '@tanstack/react-router';

// TODO 역할 조회, 역할 선택기능
const PopoverContent = () => {
  const { data } = useFetchAuthUser();
  const { updateActiveTenant, updateMenu } = useUpdateUser();
  const { asyncMenus } = useAsycFetchMenusForceRefatch();
  const router = useRouter();

  // 테넌트 변경
  const handleLanguage = async (tenant: Tenant) => {
    updateActiveTenant(tenant);
    const menus = await asyncMenus(tenant.tenantId);
    updateMenu(menus);
    router.navigate({ to: '/' });

    // if (!menus?.length) {
    // }
  };

  if (!data || !data?.tenants) {
    return <></>;
  }

  return (
    <div className={`${styles.language_content}`}>
      <div className={styles.lang_wrap}>
        <ul className={styles.lang_list}>
          {data.tenants.map((tenant: Tenant, i: number) => (
            <Popover.Close asChild>
              <li>
                <Button
                  key={`tenant_${i}`}
                  className={`${styles.btn} ${tenant.tenantId === data?.activeTenant?.tenantId ? styles.active : ''}`}
                  onClick={() => handleLanguage(tenant)}
                >
                  {tenant?.tenantName}
                </Button>
              </li>
            </Popover.Close>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface Props {
  className?: string;
}

/**
 * @description GNB 역할 변경 드롭다운
 * @param className
 * @returns
 */
const GnbRoleSelectComponent = ({ className }: Props) => {
  const { data } = useFetchAuthUser();

  return (
    <Popover
      popoverContent={<PopoverContent />}
      className={cn(styles.btn_language, className)}
      side="bottom"
      align="end"
      sideOffset={5}
    >
      <span className={styles.select}>역할 선택</span>
      <IcoArrowDown width={16} height={16} stroke="#ffffff" />
    </Popover>
  );
};

export const GnbRoleSelect = memo(GnbRoleSelectComponent);
