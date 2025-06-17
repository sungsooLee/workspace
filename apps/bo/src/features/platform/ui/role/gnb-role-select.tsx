import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { cn } from '@learnway/shared';
import { AutoCompleteDropdown, Popover } from '@learnway/ui';
import { IcoArrowDown, IcoCheck02 } from '@learnway/icons';
import { Button } from '@learnway/ui';
import {
  useActiveMenuDepthState,
  useAsycFetchMenusForceRefatch,
  useFetchAuthUser,
  useUpdateTenantRoleLastSelect,
  useUpdateUser,
} from '@learnway/auth/entities';

import { useRouter } from '@tanstack/react-router';
import { Tenant } from '@learnway/auth/types';

interface Props {
  className?: string;
}

/**
 * @description GNB 역할 변경 드롭다운
 * @param className
 * @returns
 */
const GnbRoleSelectComponent = ({ className }: Props) => {
  const router = useRouter();

  const [_, setActiveMenuDepth] = useActiveMenuDepthState();

  const { data: authUser } = useFetchAuthUser();
  const { asyncMenus } = useAsycFetchMenusForceRefatch();
  const { updateMenu } = useUpdateUser();
  const { update: updateTenantRole } = useUpdateTenantRoleLastSelect();

  const [selectedOption, setSelectedOption] = useState<any | null>(null);

  useEffect(() => {
    setSelectedOption(authUser?.activeRole);
  }, []);

  useEffect(() => {
    if (authUser?.activeTenant?.tenantId !== authUser?.activeRole?.tenantId) {
      setSelectedOption(null);
    }
  }, [authUser?.activeTenant, authUser?.activeRole]);

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

  const handleChange = async (newValue: any | null) => {
    setSelectedOption(newValue);

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

  const handleLoadOptions = async (searchText: string): Promise<any[]> => {
    const reg = new RegExp(searchText, 'i'); // 대소문자 구분 없이 검색하려면 'i' 옵션 추가
    const filteredList = roleList?.filter((role) => reg.test(role.roleName));

    if (filteredList) {
      return filteredList;
    } else if (roleList) {
      return roleList;
    }
    return [];
  };

  const AutoCompleteDropdownCallback = useCallback(() => {
    return (
      <AutoCompleteDropdown
        className={'min-w-[180px]'}
        variant="text"
        size="md"
        backgroundType={'blue'}
        value={selectedOption?.roleName}
        onChange={(value) => {
          const option = roleList?.find((role) => role.value === value);
          handleChange(option);
        }}
        loadOptions={handleLoadOptions}
        placeholder="역할을 선택해 주세요. "
        noOptionsMessage="검색 결과가 없습니다"
        loadingMessage="검색 중..."
      />
    );
  }, [selectedOption, roleList]);

  return <AutoCompleteDropdownCallback />;
};

export const GnbRoleSelect = memo(GnbRoleSelectComponent);
