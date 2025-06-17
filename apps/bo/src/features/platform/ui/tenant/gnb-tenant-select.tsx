import { memo, useEffect, useMemo, useState } from 'react';
import { useRouter } from '@tanstack/react-router';

import { AutoCompleteDropdown } from '@learnway/ui';
import {
  useActiveMenuDepthState,
  useAsycFetchMenusForceRefatch,
  useFetchAuthUser,
  useUpdateTenantRoleLastSelect,
  useUpdateUser,
} from '@learnway/auth/entities';

interface Props {
  className?: string;
}

/**
 * @description GNB 테넌트 변경 드롭다운
 * @param className
 * @returns
 */
const GnbTenantSelecteComponent = ({ className }: Props) => {
  const router = useRouter();

  const [_, setActiveMenuDepth] = useActiveMenuDepthState();

  const { data: authUser } = useFetchAuthUser();
  const { asyncMenus } = useAsycFetchMenusForceRefatch();
  const { updateMenu, updateActiveTenant } = useUpdateUser();
  const { update: updateTenantRole } = useUpdateTenantRoleLastSelect();

  const [selectedOption, setSelectedOption] = useState<any | null>(null);

  useEffect(() => {
    setSelectedOption(authUser?.activeTenant);
  }, []);

  const tenantList = useMemo(() => {
    return authUser?.tenants?.map?.((tenant) => ({
      value: String(tenant.tenantId),
      label: tenant.tenantName,
      ...tenant,
    }));
  }, [authUser?.tenants]);

  // 테넌트 변경
  const handleChange = async (newValue: any | null) => {
    setSelectedOption(newValue);

    // 기존 선택값 체크
    if (newValue.tenantId === authUser?.activeTenant?.tenantId) return;

    updateActiveTenant(newValue);
    // updateTenantRole({ lastVisitedBoTenantId: newValue.tenantId });
    // const menus = await asyncMenus(newValue.tenantId);
    // updateMenu(menus);
    // setActiveMenuDepth([]);
    // router.navigate({ to: '/' });
  };

  const handleLoadOptions = async (searchText: string): Promise<any[]> => {
    const reg = new RegExp(searchText, 'i'); // 대소문자 구분 없이 검색하려면 'i' 옵션 추가
    const filteredList = tenantList?.filter((tenant) => reg.test(tenant.tenantName));

    if (filteredList) {
      return filteredList;
    } else if (tenantList) {
      return tenantList;
    }
    return [];
  };

  return (
    <AutoCompleteDropdown
      className={'min-w-[180px]'}
      variant="text"
      size="md"
      backgroundType={'blue'}
      value={selectedOption?.tenantName}
      onChange={(value) => {
        const option = tenantList?.find((tenant) => tenant.value === value);
        handleChange(option);
      }}
      loadOptions={handleLoadOptions}
      placeholder="테넌트를 선택해 주세요."
      noOptionsMessage="검색 결과가 없습니다"
      loadingMessage="검색 중..."
    />
  );
};

export const GnbTenantSelect = memo(GnbTenantSelecteComponent);
