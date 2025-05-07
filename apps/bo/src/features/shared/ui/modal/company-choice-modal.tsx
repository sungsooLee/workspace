import React, { FC, useEffect, useMemo, useState, forwardRef } from 'react';
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
import { cn } from '@learnway/shared';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@/libs/hooks/src';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';

const CompanyModalComponent = forwardRef((props, ref) => {
  const { close: closeModal } = useModal();
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { gridFetch } = useGridBox(gridConfig, getValues);

  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
  };

  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('order', {
      cell: (info) => info.getValue(),
      header: 'NO.',
      size: 64,
      meta: {
        headerAlign: 'left',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: 'id',
      size: 64,
      meta: {
        headerAlign: 'left',
        cellAlign: 'center',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('companySort', {
      cell: (info) => info.getValue(),
      header: '회사구분',
      enableGrouping: false,
      size: 210,
    }),
    columnHelper.accessor('company', {
      cell: (info) => info.getValue(),
      header: '회사',
      size: 240,
      enableGrouping: false,
    }),
    columnHelper.accessor('owner', {
      cell: (info) => info.getValue(),
      header: '대표자',
      size: 150,
      enableGrouping: false,
    }),
    columnHelper.accessor('registerNumber', {
      cell: (info) => info.getValue(),
      header: '사업자 등록번호',
      size: 220,
      enableGrouping: false,
    }),
    columnHelper.accessor('callNumber', {
      cell: (info) => info.getValue(),
      header: '대표 전화',
      size: 220,
      enableGrouping: false,
    }),
    columnHelper.accessor('email', {
      cell: (info) => info.getValue(),
      header: '대표 이메일',
      size: 240,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    console.log('data', data);
    //TODO fetch
  };

  const handleOnClose = () => {
    closeModal();
  };
  const handleOnConfirm = () => {
    if (!selectedRow) closeModal();
    closeModal(selectedRow);
  };

  return (
    <ModalContainer>
      <ModalTitle>회사 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={gridConfig}
              columns={columns}
              height={380}
              showColumnSettings={false}
              title="타이틀"
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
        name: 'companyDivision',
        type: 'dropdown',
        label: t('회사구분'),
        format: 'array',
        value: undefined,
        options: [{ value: 'div', label: t('회사구분') }],
        dropdownConfig: {
          onChange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: t('입력 선택'),
        },
      },
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사'),
        format: 'array',
        value: undefined,
        options: [{ value: 'div', label: t('회사') }],
        dropdownConfig: {
          onChange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: t('입력 선택'),
        },
      },
    ],
  ],
};

const gridConfig = {
  query: '',
  data: [
    {
      id: 'id1',
      order: '1',
      companySort: '그룹사',
      company: '현대차',
      owner: '김현대',
      registerNumber: '123-45-12345',
      callNumber: '+82 2 1234-4567',
      email: 'asdfged@gmail.com',
    },
    {
      id: 'id2',
      order: '2',
      companySort: '그룹사',
      company: '기아차',
      owner: '김현대',
      registerNumber: '123-45-12345',
      callNumber: '+82 2 1234-4567',
      email: 'asdfged@gmail.com',
    },
  ],
  columns: [
    { name: 'companySort', label: '회사 구분' },
    { name: 'company', label: '회사' },
    { name: 'registerNumber', label: '사업자 등록번호' },
    { name: 'callNumber', label: '대표 전화' },
    { name: 'email', label: '대표 이메일' },
  ],
  page: {
    pageSize: 10,
    pageIndex: 1,
    totalRows: 2,
  },
};
