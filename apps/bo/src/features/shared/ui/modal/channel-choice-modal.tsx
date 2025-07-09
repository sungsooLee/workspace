// IA105 / NLP_BO_CMS_1017

import {
  Button,
  ModalBody,
  ModalContainer,
  ModalTitle,
  ModalFooter,
  useModal,
  Divider,
  GridBox,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui';
import { t } from 'i18next';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { SearchBox } from '@shared/ui';
import { RoleInfo } from '@types';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { AuthUser } from '@learnway/auth/types';
import { useMemo, useState } from 'react';
import { get } from 'lodash';

interface Channel {
  channelUuid: string;
  channelName: string;
}

const ChannelChoicePopupComponent = () => {
  const { close } = useModal();

  const { data } = useFetchAuthUser<AuthUser>();

  const getChannels = useMemo(() => {
    return ({ tenantId, channelName }: { tenantId: number; channelName: string }) => {
      // 업무 API로 이 함수를 대체해야 함
      const channels =
        data?.myRoles
          ?.filter((d: RoleInfo) => !tenantId || d.tenantId === tenantId) // 테넌트 필터
          ?.map((d: RoleInfo) => d.channels) // 채널만 추출
          ?.flat() // 2차원 배열을 1차원 배열로
          ?.filter((c: any) => c.name.includes(channelName)) // 이름 필터
          ?.map(({ uuid, name }: any) => ({
            channelName: name,
            channelUuid: uuid,
          })) || [];
      return {
        data: channels,
      };
    };
  }, [data?.myRoles]);

  const gridConfig: useGridBoxConfig = {
    query: (params: any) => {
      return {
        queryKey: ['get-channels-by-tenant-and-role'],
        queryFn: () => getChannels(params),
      };
    },
    columns: [
      {
        size: 676,
        name: 'channelUuid',
        label: t('채널명'),
        render: (_: any) => _.row.original.channelName,
      },
    ],
    gridState: {
      page: 0,
      size: 10,
    },
  };

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedRow, setSelectedRow] = useState<Channel | null>(null);

  const handleOnSearch = (query: Record<string, any>) => {
    gridFetch(query);
  };

  const handleOnConfirm = () => {
    if (!selectedRow) return;

    const tenantId = get(getValues(), 'tenantId');
    close({ ...selectedRow, tenantId });
  };

  const handleOnClose = () => {
    close();
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

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        format: 'number',
        presetOptionLabel: t('선택'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
        },
      },
      {
        name: 'channelName',
        type: 'text',
        label: t('채널명'),
        value: '',
      },
    ],
  ],
  validator: {
    tenantId: true,
  },
};
