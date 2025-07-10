import { useFetchChannelByRoleId } from '@entities/channel/service/channel.hook';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { BaseFormFieldProps } from '@learnway/hooks';
import { CheckboxGroupFormField } from '@learnway/ui';
import { ChannelByRoleId, TenantList } from '@types';
import { forwardRef, useMemo } from 'react';

interface TenantByRoleChannelCheckboxFormFieldProps extends BaseFormFieldProps<Array<string>> {
  channelUuid: string;
}

const TenantByRoleChannelCheckboxFormFieldComponent = forwardRef<
  HTMLDivElement,
  TenantByRoleChannelCheckboxFormFieldProps
>(({ value, channelUuid, onChange, ...props }, ref) => {
  const roleId = useFetchAuthUser<AuthUser>().data?.activeRole?.roleId;
  const { data } = useFetchChannelByRoleId(roleId as number);
  const channel = data?.content?.find((d: ChannelByRoleId) => d.channelUuid === channelUuid);

  // console.log('### TenantByRoleChannelCheckboxFormFieldProps', { data, channel });
  const options = useMemo(() => {
    if (!channel?.tenantList) {
      return [];
    }
    return channel.tenantList.map((d: TenantList) => ({
      // 옵션 형식으로 변환
      label: d.tenantName,
      value: d.tenantId,
    }));
  }, [channel?.tenantList, channelUuid]);

  return <CheckboxGroupFormField {...props} options={options} value={value} onChange={onChange} />;
});

export const TenantByRoleChannelCheckboxFormField = TenantByRoleChannelCheckboxFormFieldComponent;
