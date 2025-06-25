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
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { queryOptions } from '@entities/channel/service/channel.queries';

const ChannelListModalComponent: FC<any> = forwardRef(({ rootPath }, ref) => {
  const { close: closeModal } = useModal();

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'tenantId',
          type: 'dropdown',
          format: 'number',
          label: t('테넌트'),
          value: undefined,
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.tenant.tenantId'],
          },
          dropdownConfig: {
            onchange: () => {
              return '';
            },
            isSearchable: true,
            placeholder: '입력 또는 선택',
          },
        },
        {
          name: 'channelName',
          type: 'dropdown',
          label: t('채널'),
          value: '',
          options: [
            { value: '', label: '전체' },
            { value: 'COMMON_CODE', label: t('채널') },
          ],
        },
        {
          name: 'companyId',
          type: 'dropdown',
          label: t('회사'),
          value: undefined,
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.company.companyId'],
          },
          format: 'number',
          isSearchable: true,
          isClearable: true,
          placeholder: '입력 선택',
        },
      ],
      [
        {
          name: 'channelOwnerId',
          label: t('채널 소유자'),
          type: 'text',
          value: '',
          placeholder: '이름 / 소속 / 팀명',
        },
        {
          name: 'isSecretChannel',
          type: 'dropdown',
          label: t('채널 구분'),
          value: true,
          options: [
            {
              value: true,
              label: t('비밀채널'),
            },
            {
              value: false,
              label: t('일반채널'),
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
            { value: 'true', label: t('사용') },
            { value: 'false', label: t('미사용') },
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
        name: 'tenantName',
        label: t('테넌트'),
        render: (info: any) => info.row.original.tenantName,
      },
      {
        name: 'channelName',
        label: t('채널'),
        render: (info: any) => info.row.original.channelName,
      },
      {
        name: 'companyName',
        label: t('회사'),
        render: (info: any) => info.row.original.companyName,
      },
      {
        name: 'channelOwnerName',
        label: t('채널 소유자'),
        render: (info: any) => info.row.original.channelOwnerName,
      },
      {
        name: 'isUniversalChannel',
        label: t('채널구분'),
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
