import { FC, useState, forwardRef, useCallback } from 'react';
import { t } from 'i18next';
import {
  Button,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  GridBox,
  useModal,
  useGridBox,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { queryOptions } from '@entities/channel/service/channel.queries';
import { useRouter } from '@tanstack/react-router';

const ChannelListModalComponent: FC<any> = forwardRef(({ rootPath }, ref) => {
  const router = useRouter();
  const { close: closeModal } = useModal();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'channelName',
          type: 'text',
          label: t('채널명'),
          format: 'object',
          value: '',
        },
        {
          name: 'tenantId',
          type: 'text',
          label: t('테넌트명'),
          format: 'object',
          value: '',
        },
        {
          name: 'companyId',
          type: 'text',
          label: t('회사'),
          format: 'object',
          value: '',
        },
      ],
      [
        {
          name: 'channelOwnerId',
          label: t('채널 소유자'),
          type: 'custom',
          value: '',
          placeholder: '이름 / 소속 / 팀명',
        },
        {
          name: 'isUniversalChannel',
          type: 'radio-group',
          label: t('채널유형'),
          value: 'N',
          options: [
            {
              value: 'Y',
              label: t('유니버설'),
            },
            {
              value: 'N',
              label: t('일반'),
            },
          ],
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

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const gridConfig = {
    query: queryOptions.list,
    columns: [
      {
        name: 'channelName',
        label: t('채널명'),
        render: (info: any) => info.row.original.channelName,
      },
      {
        name: 'tenantName',
        label: t('테넌트명'),
        render: (info: any) => info.row.original.tenantName,
      },
      {
        name: 'companyName',
        label: t('회사명'),
        render: (info: any) => info.row.original.companyName,
      },
      {
        name: 'channelOwnerName',
        label: t('채널 소유자'),
        render: (info: any) => info.row.original.channelOwnerName,
      },
      {
        name: 'isUniversalChannel',
        label: t('채널 유형'),
        render: (info: any) => {
          return info.row.original.isUniversalChannel
            ? t('LABEL.common.enable')
            : t('LABEL.common.disable');
        },
      },
      {
        name: 'isUsed',
        label: '사용여부',
        render: (info: any) => {
          return info.row.original.isUsed ? t('LABEL.common.enable') : t('LABEL.common.disable');
        },
      },
    ],
    data: [],

    pagination: {
      pageSize: 10,
      pageIndex: 0,
      totalRows: 0,
    },
  };
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
  };

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const handleOnClose = () => {
    closeModal();
  };
  const handleOnConfirm = () => {
    if (!selectedRow) closeModal();
    closeModal(selectedRow);
  };

  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  /**
   * @param data
   */

  return (
    <ModalContainer>
      <ModalTitle>채널 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={gConfig}
              //   columns={columns}
              height={380}
              // showColumnSettings={false}
              title={t('채널 목록')}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={handleOnClose} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
});

export const ChannelListChoiceModal = ChannelListModalComponent;
