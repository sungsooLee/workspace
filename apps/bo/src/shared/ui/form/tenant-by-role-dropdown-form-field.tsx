import { forwardRef, useEffect, useMemo } from 'react';
import { t } from 'i18next';
import { DropdownFormField } from '@features/form';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useFetchTenantByRoleId } from '@entities/tenant';

const TenantByRoleDropdownFormFieldComponent = forwardRef<
  HTMLInputElement,
  BaseFormFieldProps<any>
>(({ value, onChange, ...props }, ref) => {
  const { data } = useFetchAuthUser<AuthUser>();
  const { data: tenant } = useFetchTenantByRoleId(data?.activeRole?.roleId as number);

  const options = useMemo(() => {
    return tenant?.map(({ tenantId, tenantName }) => ({
      // 옵션 형식으로 변환
      label: tenantName,
      value: tenantId,
    }));
  }, [data?.activeRole, tenant]);

  useEffect(() => {
    if (options && options.length === 1) {
      onChange(options[0].value);
      return;
    }
    onChange('');
  }, [options]);

  return (
    <DropdownFormField
      {...props}
      ref={ref}
      options={options}
      value={value ?? ''}
      presetOptionLabel={t('LABEL.form.label.select')}
      onChange={onChange}
    />
  );
});

export const TenantByRoleDropdownFormField = TenantByRoleDropdownFormFieldComponent;
