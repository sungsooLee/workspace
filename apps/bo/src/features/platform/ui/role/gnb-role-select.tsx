import { memo, useMemo, useState } from 'react';

import { cn } from '@learnway/shared';
import { AutoCompleteDropdown, Popover } from '@learnway/ui';
import { IcoArrowDown, IcoCheck02 } from '@learnway/icons';
import { Button } from '@learnway/ui';
import {
  useActiveMenuDepthState,
  useAsycFetchMenusForceRefatch,
  useFetchAuthUser,
  useUpdateUser,
} from '@learnway/auth/entities';

import styles from './gnb-role.module.css';
import { useRouter } from '@tanstack/react-router';
import { Tenant } from '@learnway/auth/types';

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
                  label={tenant?.tenantName}
                  icon={
                    <IcoCheck02
                      width={16}
                      height={16}
                      stroke="#131c30"
                      className={styles.icon_check}
                    />
                  }
                />
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
  const { updateActiveTenant, updateMenu } = useUpdateUser();
  const [_, setActiveMenuDepth] = useActiveMenuDepthState();
  const { asyncMenus } = useAsycFetchMenusForceRefatch();
  const router = useRouter();

  const tenantList = useMemo(() => {
    return data?.tenants?.map((tenant) => ({
      value: String(tenant.tenantId),
      label: tenant.tenantName,
      ...tenant,
    }));
  }, [data?.tenants]);

  const [selectedOption, setSelectedOption] = useState<any | null>(null);

  const loadOptions = (searchText: string): any => {
    const reg = new RegExp(searchText, 'i'); // 대소문자 구분 없이 검색하려면 'i' 옵션 추가
    const filteredOptions = tenantList?.filter((option) => reg.test(option.tenantName));

    if (filteredOptions) {
      return filteredOptions;
    } else {
      return tenantList;
    }
  };

  // TODO 테넌트 변경시 서버 등록 API 처리
  // 테넌트 변경
  const handleChange = async (newValue: any | null) => {
    setSelectedOption(newValue);
    updateActiveTenant({ tenantId: newValue.tenantId, tenantName: newValue.tenantName });
    const menus = await asyncMenus(newValue.tenantId);
    updateMenu(menus);
    setActiveMenuDepth([]);
    router.navigate({ to: '/' });
    // if (!menus?.length) {
    // }
  };

  const handleLoadOptions = async (searchText: string): Promise<any[]> => {
    return loadOptions(searchText);
  };

  return (
    <div className={cn(className)}>
      <AutoCompleteDropdown
        className={''}
        variant="text"
        size="md"
        value={selectedOption?.label}
        onChange={(value) => {
          const option = tenantList?.find((opt) => opt.tenantId + '' === value);
          handleChange(option);
        }}
        loadOptions={handleLoadOptions}
        placeholder="테넌트명 "
        noOptionsMessage="검색 결과가 없습니다"
        loadingMessage="검색 중..."
      />
    </div>
    //   <Popover
    //   popoverContent={<PopoverContent />}
    //   className={cn(styles.btn_language, className)}
    //   side="bottom"
    //   align="end"
    //   sideOffset={5}
    // >
    //   <span className={styles.select}>역할 선택</span>
    //   <IcoArrowDown width={16} height={16} stroke="#ffffff" />
    // </Popover>
  );
};

export const GnbRoleSelect = memo(GnbRoleSelectComponent);
