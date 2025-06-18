import { memo, useEffect, useMemo, useState } from 'react';

import { AutoCompleteDropdown } from '@learnway/ui';
import {
  useActiveMenuDepthState,
  useAsycFetchMenusForceRefatch,
  useFetchAuthUser,
  useUpdateTenantRoleLastSelect,
  useUpdateUser,
} from '@learnway/auth/entities';

import { useRouter } from '@tanstack/react-router';

interface Props {
  className?: string;
}

/**
 * @description GNB 테넌트 역할 변경 드롭다운
 * @param className
 * @returns
 */
const GnbRoleSelectComponent = ({ className }: Props) => {
  const router = useRouter();

  const [_, setActiveMenuDepth] = useActiveMenuDepthState();

  const { data: authUser } = useFetchAuthUser();
  const { asyncMenus } = useAsycFetchMenusForceRefatch();
  const { updateMenu, updateActiveTenant } = useUpdateUser();
  const { update: updateTenantRole } = useUpdateTenantRoleLastSelect();

  const [selectedTenant, setSelectedTenant] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);

  useEffect(() => {
    setSelectedTenant(authUser?.activeTenant);
    setSelectedRole(authUser?.activeRole);
  }, []);

  useEffect(() => {
    if (authUser?.activeTenant?.tenantId !== authUser?.activeRole?.tenantId) {
      setSelectedRole(null);
    }
  }, [authUser?.activeTenant, authUser?.activeRole]);

  // 테넌트 목록
  const tenantList = useMemo(() => {
    return authUser?.tenants?.map?.((tenant) => ({
      value: String(tenant.tenantId),
      label: tenant.tenantName,
      ...tenant,
    }));
  }, [authUser?.tenants]);

  // 역할 목록
  const roleList = useMemo(() => {
    // 테넌트하위 역할 필터링
    return authUser?.roles
      ?.map?.((role) => ({
        value: String(role.roleId),
        label: role.roleName,
        ...role,
      }))
      ?.filter((role) => role.tenantId === authUser?.activeTenant?.tenantId);
  }, [authUser?.activeTenant?.tenantId, authUser?.roles]);

  // 롤 변경
  const handleRoleChange = async (newValue: any | null) => {
    setSelectedRole(newValue);

    if (!newValue) return;
    // 기존 선택값 체크
    if (newValue.roleId === authUser?.activeRole?.roleId) return;

    await updateTenantRole({
      lastVisitedBoRoleId: newValue?.roleId,
      lastVisitedBoTenantId: authUser?.activeTenant?.tenantId,
    });
    const menus = await asyncMenus(newValue.tenantId);
    updateMenu(menus);
    setActiveMenuDepth([]);
    router.navigate({ to: '/' });
  };

  const handleRoleLoadOptions = async (searchText: string): Promise<any[]> => {
    const reg = new RegExp(searchText, 'i'); // 대소문자 구분 없이 검색하려면 'i' 옵션 추가
    const filteredList = roleList?.filter((role) => reg.test(role.roleName));

    if (filteredList) {
      return filteredList;
    } else if (roleList) {
      return roleList;
    }
    return [];
  };

  // 테넌트 변경
  const handleTenantChange = async (newValue: any | null) => {
    setSelectedTenant(newValue);

    if (!newValue) return;

    // 기존 선택값 체크
    if (newValue.tenantId === authUser?.activeTenant?.tenantId) return;

    updateActiveTenant(newValue);
  };

  const handleTenantLoadOptions = async (searchText: string): Promise<any[]> => {
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
    <>
      <AutoCompleteDropdown
        cacheOptions={false}
        className={'min-w-[180px]'}
        variant="text"
        size="md"
        backgroundType={'blue'}
        value={selectedTenant?.tenantName}
        onChange={(value) => {
          const option = tenantList?.find((tenant) => tenant.value === value);
          handleTenantChange(option);
        }}
        loadOptions={handleTenantLoadOptions}
        placeholder="테넌트를 선택해 주세요."
        noOptionsMessage="검색 결과가 없습니다"
        loadingMessage="검색 중..."
      />
      <AutoCompleteDropdown
        defaultOptions={roleList}
        className={'min-w-[180px]'}
        variant="text"
        size="md"
        backgroundType={'blue'}
        value={selectedRole?.roleName}
        onChange={(value) => {
          const option = roleList?.find((role) => role.value === value);
          handleRoleChange(option);
        }}
        loadOptions={handleRoleLoadOptions}
        placeholder="역할을 선택해 주세요. "
        noOptionsMessage="검색 결과가 없습니다"
        loadingMessage="검색 중..."
      />
    </>
  );
};

export const GnbRoleSelect = memo(GnbRoleSelectComponent);
