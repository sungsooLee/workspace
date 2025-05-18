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

const UserModalComponent = forwardRef((props, ref) => {
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

export const UserChoiceModal = UserModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'compayId',
        type: 'text',
        label: t('회사'),
        value: '',
      },
      {
        name: 'opt1',
        type: 'text',
        label: t('본부/사업부'),
        value: '',
      },
      {
        name: 'num',
        type: 'text',
        label: t('소속'),
        value: '',
      },
    ],
    [
      {
        name: 'userNo',
        type: 'text',
        label: t('사번'),
        value: '',
      },
      {
        name: 'userName',
        type: 'text',
        label: t('이름'),
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
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: '회사',
    enableGrouping: false,
    size: 210,
  }),
  columnHelper.accessor('deptName', {
    cell: (info) => info.getValue(),
    header: '본부/사업부',
    size: 240,
    enableGrouping: false,
  }),
  columnHelper.accessor('dept2', {
    cell: (info) => info.getValue(),
    header: '소속',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('userNo', {
    cell: (info) => info.getValue(),
    header: '사번',
    size: 220,
    enableGrouping: false,
  }),
  columnHelper.accessor('userName', {
    cell: (info) => info.getValue(),
    header: '이름',
    size: 220,
    enableGrouping: false,
  }),
  columnHelper.accessor('opt2', {
    cell: (info) => info.getValue(),
    header: '재직여부',
    size: 240,
    enableGrouping: false,
  }),
  columnHelper.accessor('opt3', {
    cell: (info) => info.getValue(),
    header: '계정상태',
    size: 240,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
