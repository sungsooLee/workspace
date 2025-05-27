import { useState, forwardRef, useCallback } from 'react';
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
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';

import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { usersQueryOptions } from '@entities/users/service/users.queries';

const ExternalUserModalComponent = forwardRef((props, ref) => {
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
      <ModalTitle>{t('사외이용자 조회')}</ModalTitle>
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
              title={t('사외이용자 목록')}
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

export const ExternalUserChoiceModal = ExternalUserModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'externalUserType',
        type: 'text',
        label: t('사외이용자 유형'),
        value: '',
      },
      {
        name: 'compayId',
        type: 'text',
        label: t('회사'),
        value: '',
      },
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
  validator: {
    compayId: { required: true },
  },
};

const gridConfig = {
  query: usersQueryOptions.list,
  columns: [],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 1,
    totalRows: 2,
  },
};

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor('externalUserType', {
    cell: (info) => info.getValue(),
    header: '사외이용자 유형',
    enableGrouping: false,
    size: 210,
  }),
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: '회사',
    enableGrouping: false,
    size: 210,
  }),
  columnHelper.accessor('dep', {
    cell: (info) => info.getValue(),
    header: '부서',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('position', {
    cell: (info) => info.getValue(),
    header: '직위',
    size: 210,
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
