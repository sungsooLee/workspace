import { memo, useEffect, useMemo, useState } from 'react';

import {
  useActiveMenuDepthState,
  useAsyncFetchMenusForceRefetch,
  useFetchAuthUser,
  useUpdateTenantRoleLastSelect,
  useUpdateUser,
} from '@learnway/auth/entities';
import { AutoCompleteDropdown } from '@learnway/ui/auto-complete';

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
  const { setActiveMenuDepthMenu } = useActiveMenuDepthState();

  const { data: authUser } = useFetchAuthUser();
  const { asyncMenus } = useAsyncFetchMenusForceRefetch();
  const { updateMenu, updateActiveTenant, updateActiveRole } = useUpdateUser();
  const { update: updateTenantRole } = useUpdateTenantRoleLastSelect();

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

  const [filteredTenantOptions, setFilteredTenantOptions] = useState(tenantList);
  const [filteredRoleOptions, setFilteredRoleOptions] = useState(roleList);

  const [selectedTenant, setSelectedTenant] = useState<any | null>({
    label: authUser?.activeTenant?.tenantName,
    value: authUser?.activeTenant?.tenantId,
  });
  const [selectedRole, setSelectedRole] = useState<any | null>({
    label: authUser?.activeRole?.roleName,
    value: authUser?.activeRole?.roleId,
  });

  useEffect(() => {
    if (authUser?.activeTenant?.tenantId !== authUser?.activeRole?.tenantId) {
      setSelectedRole(null);
    }
  }, [authUser?.activeTenant, authUser?.activeRole]);

  // 초기 셀렉트 셋팅
  useEffect(() => {
    const matched = filteredRoleOptions?.find((r) => r.roleId === selectedRole?.value);
    if (matched) {
      setSelectedRole(matched);
    }
  }, [filteredRoleOptions, selectedRole]);

  // 초기 셀렉트 셋팅
  useEffect(() => {
    const matched = filteredTenantOptions?.find((r) => r.tenantId === selectedTenant?.value);
    if (matched) {
      setSelectedTenant(matched);
    }
  }, [filteredTenantOptions, selectedTenant]);

  // 롤 변경
  const handleRoleChange = async (newValue: any | null) => {
    setSelectedRole(newValue);

    if (!newValue) return;
    // 기존 선택값 체크
    if (newValue.roleId === authUser?.activeRole?.roleId) return;

    // updateTenantRole 에서 유저정보 업데이트 하므로 주석
    // updateActiveRole(newValue);
    await updateTenantRole({
      lastVisitedBoRoleId: newValue?.roleId,
      lastVisitedBoTenantId: authUser?.activeTenant?.tenantId,
    });

    if (authUser?.activeTenant?.tenantId) {
      const menus = await asyncMenus(authUser?.activeTenant?.tenantId, newValue?.roleId);
      updateMenu(menus);
      setActiveMenuDepthMenu([]);
      router.navigate({ to: '/' });
    }
  };

  const handleRoleLoadOptions = async (searchText: string, callback?: any): Promise<any[]> => {
    const reg = new RegExp(searchText, 'i'); // 대소문자 구분 없이 검색하려면 'i' 옵션 추가
    const filteredList = roleList?.filter((role) => reg.test(role.roleName));

    if (filteredList) {
      setFilteredRoleOptions(filteredList);
      callback?.(filteredList);
    } else if (roleList) {
      setFilteredRoleOptions(roleList);
      callback?.(roleList);
    }
    return [];
  };

  // 테넌트 변경
  const handleTenantChange = async (newValue: any | null) => {
    setSelectedTenant(newValue);

    if (!newValue) return;

    // 기존 선택값 체크
    if (newValue.tenantId === authUser?.activeTenant?.tenantId) return;
    // updateTenantRole 에서 유저정보 업데이트 하므로 주석
    // updateActiveTenant(newValue);
    await updateTenantRole({
      lastVisitedBoTenantId: newValue.tenantId,
    });
  };

  const handleTenantLoadOptions = async (searchText: string, callback?: any): Promise<any[]> => {
    const reg = new RegExp(searchText, 'i'); // 대소문자 구분 없이 검색하려면 'i' 옵션 추가
    const filteredList = tenantList?.filter((tenant) => reg.test(tenant.tenantName));

    if (filteredList) {
      setFilteredTenantOptions(filteredList);
      callback?.(filteredList);
    } else if (tenantList) {
      setFilteredTenantOptions(tenantList);
      callback?.(tenantList);
    }
    return [];
  };

  return (
    <>
      <AutoCompleteDropdown
        className={'min-w-[180px]'}
        variant="text"
        size="xs"
        backgroundType={'blue'}
        value={selectedTenant}
        onChange={(value) => {
          const option = tenantList?.find((tenant) => tenant.value === value);
          handleTenantChange(option);
        }}
        defaultOptions={tenantList}
        options={filteredTenantOptions}
        loadOptions={handleTenantLoadOptions}
        placeholder="테넌트를 선택해 주세요."
        noOptionsMessage="검색 결과가 없습니다"
        loadingMessage="검색 중..."
      />
      <AutoCompleteDropdown
        className={'min-w-[180px]'}
        variant="text"
        size="xs"
        backgroundType={'blue'}
        value={selectedRole}
        onChange={(value) => {
          const option = roleList?.find((role) => role.value === value);
          handleRoleChange(option);
        }}
        defaultOptions={roleList}
        options={filteredRoleOptions}
        loadOptions={handleRoleLoadOptions}
        placeholder="역할을 선택해 주세요. "
        noOptionsMessage="검색 결과가 없습니다"
        loadingMessage="검색 중..."
      />
    </>
  );
};

export const GnbRoleSelect = memo(GnbRoleSelectComponent);
