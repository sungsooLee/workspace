import { useFetchChannelByRoleId } from '@entities/channel/service/channel.hook';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { BaseFormFieldProps } from '@learnway/hooks';
import { t } from 'i18next';
import { forwardRef, useMemo } from 'react';
import { DropdownFormField } from '../../../features/form/ui/dropdown-form-field';

interface TenantChannelDropdownFormField2Props extends BaseFormFieldProps<Array<string>> {
  tenantId: number; // -1: 전체, 0 이상이면 테넌트 필터
}

const TenantChannelDropdownFormField2Component = forwardRef<
  HTMLDivElement,
  TenantChannelDropdownFormField2Props
>(({ value, onChange, tenantId, ...props }, ref) => {
  const { data } = useFetchAuthUser<AuthUser>();
  const { data: channel } = useFetchChannelByRoleId(data?.activeRole?.roleId as number);

  // 채널조회 데이터
  const options = useMemo(() => {
    if (!channel) return [];
    if (tenantId === -1) {
      // tenantId가 -1이면 필터 없이 전체 반환
      return channel.map(({ channelName, channelUuid }) => ({
        label: channelName,
        value: channelUuid,
      }));
    }
    // tenantId가 있으면 필터 적용
    return channel
      .filter((d) => !!d.tenantList.find((t) => t.tenantId === tenantId))
      .map(({ channelName, channelUuid }) => ({
        label: channelName,
        value: channelUuid,
      }));
  }, [channel, tenantId]);

  return (
    <DropdownFormField
      {...props}
      options={options}
      value={tenantId ? value : ''}
      presetOptionLabel={t('LABEL.form.label.select')}
      onChange={onChange}
    />
  );
});

export const TenantChannelDropdownFormField2 = TenantChannelDropdownFormField2Component;
