import { useFetchTenantByRoleId } from '@entities/tenant';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { BaseFormFieldProps } from '@learnway/hooks';
import { t } from 'i18next';
import { forwardRef, useEffect, useMemo } from 'react';
import { DropdownFormField } from './dropdown-form-field';

const TenantByRoleDropdownFormFieldComponent = forwardRef<
  HTMLInputElement,
  BaseFormFieldProps<any>
>(({ value, onChange, presetOptionLabel, ...props }, ref) => {
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
    // 이미 value가 설정되어 있는 경우 해당 값 으로 세팅
    if (value && options?.find((o) => o.value === value)) {
      return;
    }

    // 테넌트 선택 동기화 로직
    const id = localStorage.getItem('TENANT_ID');
    if (id && options?.find((o) => o.value === parseInt(id))) {
      onChange(parseInt(id));
      return;
    }

    if (options && options.length === 1) {
      onChange(options[0].value);
      return;
    }
    onChange('');
  }, [options, value]);

  return (
    <DropdownFormField
      {...props}
      ref={ref}
      options={options}
      value={value ?? ''}
      presetOptionLabel={presetOptionLabel || t('LABEL.form.label.select')}
      onChange={(v: number) => {
        // 테넌트 선택 동기화 로직
        localStorage.setItem('TENANT_ID', String(v));
        onChange(v);
      }}
    />
  );
});

export const TenantByRoleDropdownFormField = TenantByRoleDropdownFormFieldComponent;
