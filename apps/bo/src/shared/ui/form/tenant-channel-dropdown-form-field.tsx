import { useFetchChannelByRoleId } from '@entities/channel/service/channel.hook';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { BaseFormFieldProps } from '@learnway/hooks';
import { t } from 'i18next';
import { forwardRef, useEffect, useMemo } from 'react';
import { DropdownFormField } from '../../../features/form/ui/dropdown-form-field';
import { useWatch } from 'react-hook-form';
import { ChannelByRoleId, TenantList } from '@types';

interface TenantChannelDropdownFormFieldProps extends BaseFormFieldProps<string> {
  enableFilter: boolean; // 테넌트 id 필터 적용 여부
}

const TenantChannelDropdownFormFieldComponent = forwardRef<
  HTMLDivElement,
  TenantChannelDropdownFormFieldProps
>(({ control, value, onChange, enableFilter = false, ...props }, ref) => {
  const { data } = useFetchAuthUser<AuthUser>();
  const { data: channel } = useFetchChannelByRoleId(data?.activeRole?.roleId as number);

  const tenantId = useWatch({
    control,
    name: 'tenantId',
  });

  const filterFn = (item: ChannelByRoleId, id?: number) => {
    if (!enableFilter) return true;
    // 필터 적용
    return !!item.tenantList.find((t) => t.tenantId === id);
  };

  // myRole 데이터
  // const options = useMemo(() => {
  //   return data?.myRoles
  //     ?.filter((d: RoleInfo) => d.tenantId === tenantId) // 테넌트 필터
  //     ?.map((d: RoleInfo) => d.channels) // 채널만 추출
  //     ?.flat() // 2차원 배열을 1차원 배열로
  //     ?.map(({ uuid, name }: any) => ({
  //       // 옵션 형식으로 변환
  //       label: name,
  //       value: uuid,
  //     }));
  // }, [data?.myRoles, tenantId]);

  // 채널조회 데이터
  const options = useMemo(() => {
    if (!channel) return [];
    return channel
      ?.filter((c) => filterFn(c, tenantId)) // 테넌트 필터
      ?.map(({ channelName, channelUuid }) => ({
        // 옵션 형식으로 변환
        label: channelName,
        value: channelUuid,
      }));
  }, [channel, tenantId]);

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
      value={value}
      presetOptionLabel={t('LABEL.form.label.select')}
      onChange={onChange}
    />
  );
});

export const TenantChannelDropdownFormField = TenantChannelDropdownFormFieldComponent;
