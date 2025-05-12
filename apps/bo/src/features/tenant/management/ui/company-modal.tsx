import React, { FC, useEffect, useMemo, useState } from 'react';
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
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';

const CompanyModalComponent = () => {
  const { close: closeModal } = useModal();
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { gridFetch } = useGridBox(gridConfig, getValues);

  const handleOnSearch = (data: any) => {
    console.log(data);
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

  return (
    <ModalContainer>
      <ModalTitle>회사 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />

          <div className={popupStyles.container}>
            <GridBox
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
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const CompanyModal = CompanyModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyDivision',
        type: 'dropdown',
        label: t('회사구분'),
        value: '',
        options: [{ value: 'div', label: t('회사구분') }],
        dropdownConfig: {
          onChange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 선택1',
        },
      },
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        options: [{ value: 'div', label: t('회사') }],
        dropdownConfig: {
          onChange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 선택1',
        },
      },
    ],
  ],
};

const gridConfig = {
  query: '',
  data: [
    {
      order: '1',
      companySort: '그룹사',
      company: '현대차',
      owner: '김현대',
      registerNumber: '123-45-12345',
      callNumber: '+82 2 1234-4567',
      email: 'asdfged@gmail.com',
    },
    {
      order: '2',
      companySort: '그룹사',
      company: '현대차',
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
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
