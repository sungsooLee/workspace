import { forwardRef, useMemo } from 'react';
import { t } from 'i18next';
import { DropdownFormField } from '../../../features/form/ui/dropdown-form-field';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser, RoleInfo } from '@learnway/auth/types';
import { BaseFormFieldProps } from '@learnway/hooks';

interface TenantChannelDropdownFormFieldProps extends BaseFormFieldProps<boolean> {
  tenantId: number;
}

const TenantChannelDropdownFormFieldComponent = forwardRef<
  HTMLDivElement,
  TenantChannelDropdownFormFieldProps
>(({ value, onChange, tenantId, ...props }, ref) => {
  const { data: { myRoles } = {} } = useFetchAuthUser<AuthUser>();

  const options = useMemo(() => {
    return myRoles
      ?.filter((d: RoleInfo) => d.tenantId === tenantId) // 테넌트 필터
      ?.map((d: RoleInfo) => d.channels) // 채널만 추출
      ?.flat() // 2차원 배열을 1차원 배열로
      ?.map(({ uuid, name }: any) => ({
        // 옵션 형식으로 변환
        label: name,
        value: uuid,
      }));
  }, [myRoles, tenantId]);

  console.log('TenantChannelDropdownFormFieldComponent => ', { options, tenantId });
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

export const TenantChannelDropdownFormField = TenantChannelDropdownFormFieldComponent;
