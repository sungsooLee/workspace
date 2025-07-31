import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, ModalFooter, useModal } from '@learnway/ui/modal';
// IA105 / NLP_BO_CMS_1017

import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { t } from 'i18next';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox, TenantByRoleDropdownFormField } from '@shared/ui';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { useMemo, useState } from 'react';
import { chain, get } from 'lodash';
import { useFetchChannelByRoleId } from '@entities/channel/service/channel.hook';

interface Channel {
  channelUuid: string;
  channelName: string;
}

const ChannelChoicePopupComponent = () => {
  const { closeModal } = useModal();

  const { data } = useFetchAuthUser<AuthUser>();
  const { data: channel } = useFetchChannelByRoleId(data?.activeRole?.roleId as number);

  const getChannels = useMemo(() => {
    return ({ tenantId, channelName }: { tenantId: number; channelName: string }) => {
      const channels = chain(channel)
        .filter((c) => Boolean(c.tenantList.find((t) => t.tenantId === tenantId))) // tenant 필터
        .filter(
          (c) => !channelName || c.channelName.toLowerCase().includes(channelName.toLowerCase()),
        ) // 이름 필터
        .value();
      console.log('🚀 ~ return ~ channels:', channels);
      return {
        data: channels };
    };
  }, [data, channel]);

  const gridConfig: useGridBoxConfig = {
    query: (params: any) => {
      return {
        queryKey: ['get-channels-by-tenant-and-role'],
        queryFn: () => getChannels(params) };
    },
    columns: [
      {
        size: 676,
        name: 'channelUuid',
        label: t('채널명'),
        render: (_: any) => _.row.original.channelName },
    ],
    gridState: {
      page: 0,
      size: 10 } };

  const { provider: sProvider, getValues } = useSearchBox(searchConfig());
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedRow, setSelectedRow] = useState<Channel | undefined>();

  const handleOnSearch = (query: Record<string, any>) => {
    gridFetch(query);
  };

  const handleOnConfirm = () => {
    if (!selectedRow) return;

    const tenantId = get(getValues(), 'tenantId');
    closeModal({ ...selectedRow, tenantId });
  };

  const handleOnClose = () => {
    closeModal();
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('채널 선택')}</ModalTitle>
      <ModalBody>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox config={gConfig} showNumberingColumn onRowSelect={setSelectedRow} />
      </ModalBody>
      <ModalFooter>
        <Button label={t('취소')} variant="gray" size="lg" onClick={handleOnClose} />
        <Button
          label={t('다음')}
          variant="primary"
          size="lg"
          onClick={handleOnConfirm}
          disabled={!selectedRow}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const ChannelChoiceModal = ChannelChoicePopupComponent;

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'tenantId',
        type: 'custom',
        label: t('테넌트'),
        value: '',
        format: 'object',
        element: <TenantByRoleDropdownFormField /> },
      {
        name: 'channelName',
        type: 'text',
        label: t('채널명'),
        value: '' },
    ],
  ],
  validator: {
    tenantId: true } });
