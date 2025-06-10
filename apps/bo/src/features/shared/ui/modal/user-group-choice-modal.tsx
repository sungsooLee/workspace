import { FC, useState, useCallback } from 'react';
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
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { queryOptions } from '@entities/department/service/department.queries';

const UserGroupModalComponent: FC<any> = () => {
  const { close: closeModal } = useModal();
  const [deptOptions, setDeptOptions] = useState<any[]>([]);

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
          name: 'dept',
          type: 'dropdown',
          label: t('부서'),
          value: '',
          options: deptOptions,
        },
      ],
      [
        {
          name: 'num',
          type: 'text',
          label: t('소속'),
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
  };

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const gridConfig = {
    query: queryOptions.list,
    columns: [],
    data: [],
    pagination: {
      pageSize: 10,
      pageIndex: 1,
      totalRows: 2,
    },
  };
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

  return (
    <ModalContainer>
      <ModalTitle>유저 그룹 대상자</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              onRowSelect={handleRowSelect}
              config={config}
              columns={columns}
              showColumnSettings={false}
              title={t('유저조회목록')}
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

export const UserGroupChoiceModal = UserGroupModalComponent;

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('companyName', {
    id: 'companyName',
    cell: (info) => info.getValue(),
    header: '회사',
    enableGrouping: false,
    size: 210,
  }),
  columnHelper.accessor('managerName', {
    id: 'managerName',
    cell: (info) => info.getValue(),
    header: '본부/사업부',
    size: 210,
    enableGrouping: false,
  }),
  columnHelper.accessor('deptName', {
    id: 'deptName',
    cell: (info) => info.getValue(),
    header: '부서',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('deptEngName', {
    id: 'deptEngName',
    cell: (info) => info.getValue(),
    header: '소속',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('managerEmployeeNumber', {
    id: 'managerEmployeeNumber',
    cell: (info) => info.getValue(),
    header: '사번',
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    cell: (info) => info.getValue(),
    header: '이름',
    enableGrouping: false,
  }),
  columnHelper.accessor('opt2', {
    cell: (info) => info.getValue(),
    header: '재직여부',
    enableGrouping: false,
  }),
  columnHelper.accessor('opt3', {
    cell: (info) => info.getValue(),
    header: '계정상태',
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
