import { forwardRef, useMemo } from 'react';
import { t } from 'i18next';
import { DropdownFormField } from '../../../features/form/ui/dropdown-form-field';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser, RoleInfo } from '@learnway/auth/types';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useFetchTenantByRoleId } from '@entities/tenant';

interface TenantChannelDropdownFormFieldProps extends BaseFormFieldProps<boolean> {
  tenantId: number;
}

const TenantByRoleDropdownFormFieldComponent = forwardRef<
  HTMLDivElement,
  TenantChannelDropdownFormFieldProps
>(({ value, onChange, ...props }, ref) => {
  const { data } = useFetchAuthUser<AuthUser>();
  const { data: tenant } = useFetchTenantByRoleId(data?.activeRole?.roleId as number);

  console.log('### tenant', tenant);
  const options = useMemo(() => {
    return tenant?.content?.map(({ tenantId, tenantName }) => ({
      // 옵션 형식으로 변환
      label: tenantName,
      value: tenantId,
    }));
  }, [data?.activeRole, tenant]);

  return (
    <DropdownFormField
      {...props}
      options={options}
      value={value}
      presetOptionLabel={t('LABEL.form.label.select')}
      onChange={onChange}
    />
  );
});

export const TenantByRoleDropdownFormField = TenantByRoleDropdownFormFieldComponent;
