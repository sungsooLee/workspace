import React, { FC, useEffect, useMemo, useState, forwardRef, useCallback } from 'react';
import { t } from 'i18next';
import {
  Button,
  ContentsRow,
  DynamicFormField,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  GridBox,
  useModal,
  useGridBox,
} from '@learnway/ui';
import { IcoFormRequired, IcoAlertCircle, IcoRefresh02, IcoSearch } from '@learnway/icons';
import styles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { queryOptions as requestChannelQueryOptions } from '@entities/channel/service/request-channel.queries';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';

const ChannelRequestChoiceModalComponent = () => {
  const { close: closeModal } = useModal();
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getValues);

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

  useEffect(() => {
    gridFetch();
  }, []);

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('channelRequestId', {
      cell: (info) => info.getValue(),
      header: '신청 ID',
      enableGrouping: false,
      size: 200,
    }),
    columnHelper.accessor('tenantName', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('channelName', {
      cell: (info) => info.getValue(),
      header: '채널명',
      size: 180,
      enableGrouping: false,
    }),
    columnHelper.accessor('channelId', {
      cell: (info) => info.getValue(),
      header: '채널ID',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '채널유형',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('division', {
      cell: (info) => info.getValue(),
      header: '채널구분',
      size: 80,
      enableGrouping: false,
    }),
    columnHelper.accessor('companyName', {
      cell: (info) => info.getValue(),
      header: '회사',
      enableGrouping: false,
      size: 156,
    }),
    columnHelper.accessor('companySabun', {
      cell: (info) => info.getValue(),
      header: '사번',
      enableGrouping: false,
      size: 130,
    }),
    columnHelper.accessor('reqeusterName', {
      cell: (info) => info.getValue(),
      header: '이름',
      enableGrouping: false,
      size: 100,
    }),
    columnHelper.accessor('requestDate', {
      cell: (info) =>
        getDateToString(new Date(info.row.original.requestDate), DATE_TIME_FORMAT.DATETIME_SEC),
      header: '신청일',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('approvalStatusTypecd', {
      cell: (info) => t('pms.channel.ChannelApprovalStatus.' + info.getValue()),
      header: '신청 상태',
      enableGrouping: false,
      size: 100,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <ModalContainer>
      <ModalTitle>채널 개설 신청 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={config}
              columns={columns}
              showColumnSettings={false}
              title="채널 개설 신청 목록"
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

export const ChannelRequestChoiceModal = ChannelRequestChoiceModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('선택') }],
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
      },
      {
        name: 'channelName',
        type: 'text',
        label: t('채널명'),
        value: '',
        placeholder: '입력',
      },
      {
        name: 'companySabun',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: '입력',
      },
      {
        name: 'approvalStatusTypecd',
        type: 'dropdown',
        label: t('신청상태'),
        value: 'ACCEPTED',
        optionsConfig: {
          options: [{ value: 'ACCEPTED', label: t('pms.channel.ChannelApprovalStatus.ACCEPTED') }],
        },
      },
    ],
  ],
  validator: {
    tenant: true,
  },
};

const gridConfig = {
  query: requestChannelQueryOptions.list,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 1,
    totalRows: 2,
  },
};
