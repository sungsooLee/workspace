/* eslint-disable @nx/enforce-module-boundaries */
import { FC, useState } from 'react';
import { t } from 'i18next';
import { cn, getRandomId } from '@learnway/shared';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  GridBox,
  useGridBox,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

const menuLength = 5;
const menuOptions = Array(menuLength)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `메뉴명${i}`,
  }));

const TenantDetailWidgetMappingModalComponent: FC<{ tenantId: number }> = ({ tenantId }) => {
  const [myOptions, setMyOptions] = useState(menuOptions);
  const [value, setValue] = useState<any>();

  const { provider: sProvider } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  const handleOnSearch = () => {
    console.log('handleOnSearch click');
  };

  const handleRowSelect = () => {
    console.log('handleRowSelect click');
  };

  const handleOnClose = () => {
    console.log('handleOnClose click');
  };
  const handleOnConfirm = () => {
    console.log('handleOnClose click');
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('위젯조회')}</ModalTitle>
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
};

export const TenantDetailWidgetMappingModal = TenantDetailWidgetMappingModalComponent;

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

const gridConfig = {
  query: '',
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
