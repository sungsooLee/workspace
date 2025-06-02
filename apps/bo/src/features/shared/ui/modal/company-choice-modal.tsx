import React, { useState, forwardRef, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

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

import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';

import { SearchBox } from '@shared/ui/search-box';

import { queryOptions as companyQueryOptions } from '@entities/companies/service/companies.queries';

/**
 * 화면 번호: NLP_BO_TMS_1001_19 or 화면번호 NLP_BO_PMS_1107
 */
const CompanyModalComponent = forwardRef((props, ref) => {
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

  /**
   * @param data
   */

  return (
    <ModalContainer>
      <ModalTitle>{t('회사 조회')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={config}
              columns={columns}
              showColumnSettings={false}
              title={t('회사')}
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

export const CompanyChoiceModal = CompanyModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyCode',
        type: 'text',
        label: t('회사코드'),
        value: '',
      },
      {
        name: 'name',
        type: 'text',
        label: t('회사명'),
        value: '',
      },
    ],
  ],
};

const gridConfig = {
  query: companyQueryOptions.all,
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

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('companyType', {
    id: 'companyType',
    cell: (info) => info.getValue(),
    header: '회사구분',
    enableGrouping: false,
    size: 210,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    cell: (info) => info.getValue(),
    header: '회사',
    size: 240,
    enableGrouping: false,
  }),
  columnHelper.accessor('rpsntrName', {
    id: 'rpsntrName',
    cell: (info) => info.getValue(),
    header: '대표자',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('brn', {
    id: 'brn',
    cell: (info) => info.getValue(),
    header: '사업자 등록번호',
    size: 220,
    enableGrouping: false,
  }),
  columnHelper.accessor('callNumber', {
    id: 'callNumber',
    cell: (info) => info.getValue(),
    header: '대표 전화',
    size: 220,
    enableGrouping: false,
  }),
  columnHelper.accessor('email', {
    id: 'email',
    cell: (info) => info.getValue(),
    header: '대표 이메일',
    size: 240,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
