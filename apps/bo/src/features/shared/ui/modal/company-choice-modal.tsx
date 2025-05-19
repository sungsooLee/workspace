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
import { cn } from '@learnway/shared';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { queryOptions as companyQueryOptions } from '@entities/companies/service/companies.queries';

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

  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('companyType', {
      cell: (info) => info.getValue(),
      header: '회사구분',
      enableGrouping: false,
      size: 210,
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: '회사',
      size: 240,
      enableGrouping: false,
    }),
    columnHelper.accessor('rpsntrName', {
      cell: (info) => info.getValue(),
      header: '대표자',
      size: 150,
      enableGrouping: false,
    }),
    columnHelper.accessor('brn', {
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

  return (
    <ModalContainer>
      <ModalTitle>회사 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={config}
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
        name: 'name',
        type: 'text',
        label: t('회사명'),
        value: '',
      },
      {
        name: 'companyCode',
        type: 'text',
        label: t('회사코드'),
        value: '',
      },
      {
        name: 'useYn',
        type: 'dropdown',
        label: t('LABEL.isUsed'),
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
