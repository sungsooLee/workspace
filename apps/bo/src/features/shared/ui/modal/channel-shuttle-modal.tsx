import { useState, forwardRef, useRef } from 'react';
import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  ShuttleGridToGrid,
  ShuttleGridToGridImperative,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { queryOptions } from '@entities/channel/service/channel.queries';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const ChannelShuttleModalComponent = forwardRef((_) => {
  const ref = useRef<ShuttleGridToGridImperative>(null);
  const { close: closeModal } = useModal();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'tenantId',
          type: 'text',
          label: t('테넌트'),
          format: 'object',
          value: '',
        },
        {
          name: 'channelName',
          type: 'text',
          label: t('채널'),
          format: 'object',
          value: '',
        },
        {
          name: 'channelOwnerId',
          label: t('채널 소유자'),
          type: 'custom',
          value: '',
          placeholder: '이름 / 소속 / 팀명',
        },
        {
          name: 'isUsed',
          type: 'dropdown',
          label: t('사용여부'),
          value: '',
          options: [
            { value: '', label: t('전체') },
            { value: 2, label: t('사용') },
            { value: 3, label: t('미사용') },
          ],
        },
      ],
    ],
  };

  const { provider: sProvider } = useSearchBox(searchConfig);

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('tenantName', {
      header: t('테넌트'),
      size: 132,
      cell: (info) => info.getValue(),
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'left', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('channelName', {
      header: t('채널'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('channelOwnerId', {
      header: t('채널 소유자'),
      size: 132,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('isUsed', {
      header: t('사용여부'),
      size: 132,
      cell: (info) => {
        return info.row.original.isUsed ? t('LABEL.common.enable') : t('LABEL.common.disable');
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const handleOnConfirm = () => {
    closeModal(option);
  };
  const queryClient = useQueryClient();

  const [gridData, setGrideData] = useState<any[]>([]);
  const [option, setOption] = useState<any>();

  const handleOnSearch = async (data: any) => {
    const response = await queryClient.fetchQuery(queryOptions.list(data));
    setGrideData(response.content);
  };

  return (
    <ModalContainer>
      <ModalTitle>채널 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <ShuttleGridToGrid
            ref={ref}
            onSelectedChange={(data: any) => {
              setOption(data);
            }}
            showNumberingColumn={false}
            gridData={gridData}
            columns={columns}
            rowKey={'channelId'}
            leftTitle={t('채널 목록')}
            rightTitle={t('채널 선택')}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={closeModal} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const ChannelShuttleModal = ChannelShuttleModalComponent;
