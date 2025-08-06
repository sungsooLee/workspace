import { queryOptions as companysQueryOptions } from '@entities/companies';
import { CODE_GROUP } from '@learnway/hooks';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { DateRangePickerFormField, DropdownFormField, FormRow2 } from '@shared/ui/form';
import { SearchBoxForm } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChannelSubscriberSearchFormData } from '../../../types/type';

interface ChannelSubscriberSearchFormProps {
  channel: any;
  provider: any;
  onSubmit: (
    handler: (data: ChannelSubscriberSearchFormData) => void,
  ) => (event: React.FormEvent) => void;
  onSearch: (data: ChannelSubscriberSearchFormData) => void;
  onReset: () => void;
  watch: any;
}

export const ChannelSubscriberSearchForm: React.FC<ChannelSubscriberSearchFormProps> = ({
  channel,
  provider,
  onSubmit,
  onSearch,
  onReset,
  watch,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const tenantId = watch('tenantId');

  const [tenantOptions, setTenantOptions] = useState<any[]>([]);
  const [companyOptions, setCompanyOptions] = useState<any[]>([]);

  useEffect(() => {
    if (tenantId) {
      (async () => {
        const companys = await queryClient.fetchQuery(companysQueryOptions.tenantCompany(tenantId));
        console.log('### companys', companys);
        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyCode,
        }));
        setCompanyOptions(companyIdOptions);
      })();
    } else {
      setCompanyOptions([]);
    }
  }, [tenantId]);

  useEffect(() => {
    if (channel) {
      const tenantIdOptions = channel.tenantList.map((tenant: any) => ({
        label: tenant.tenantName,
        value: tenant.tenantId,
      }));
      setTenantOptions(tenantIdOptions);
    }
  }, [channel]);

  return (
    <SearchBoxForm onSearch={onSubmit(onSearch)} onReset={onReset}>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="tenantId"
          label={t('테넌트')}
          format={'number'}
          element={<DropdownFormField options={tenantOptions} />}
        />
        <FormRow2
          provider={provider}
          name="companyCode"
          label={t('회사')}
          element={<DropdownFormField options={companyOptions} />}
        />
        <FormRow2 provider={provider} name="employeeNumber" label={t('사번')} element={<Input />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="channelSubscriptionType"
          label={t('구독 방식')}
          element={
            <DropdownFormField
              optionsConfig={{ codeGroup: CODE_GROUP['pms.channel.ChannelSubscriptionType'] }}
            />
          }
        />
        <FormRow2
          provider={provider}
          name="channelSubscriptionStatType"
          label={t('상태')}
          element={
            <DropdownFormField
              optionsConfig={{ codeGroup: CODE_GROUP['pms.channel.ChannelSubscriptionStatType'] }}
            />
          }
        />
        <FormRow2
          provider={provider}
          name="subscriptionDate"
          label={t('구독 신청 기간')}
          element={<DateRangePickerFormField />}
        />
        <FormRow2
          provider={provider}
          name="unSubscriptionDate"
          label={t('구독 해지 기간')}
          element={<DateRangePickerFormField />}
        />
      </ContentsRow>
    </SearchBoxForm>
  );
};
