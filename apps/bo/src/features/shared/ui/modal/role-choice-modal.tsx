import { FC, useState, forwardRef, useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
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
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';

/**
 * 화면번호: NLP_BO_TMS_1001_17
 */
const RoleModalComponent: FC<any> = forwardRef(({ rootPath }, ref) => {
  const { close: closeModal } = useModal();

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
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

  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  /**
   * @param data
   */

  return (
    <ModalContainer>
      <ModalTitle>HRD 담당자 역할 조회</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              config={gConfig}
              columns={columns}
              title={t('HRD 담당자 역할 목록')}
              multiple
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

export const RoleChoiceModal = RoleModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        required: true,
        name: 'tenantId',
        type: 'dropdown',
        format: 'number',
        label: t('테넌트명'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'companyName',
        type: 'text',
        label: t('회사명'),
        value: '',
      },
      {
        name: 'managerRole',
        type: 'dropdown',
        label: t('관리자 역할'),
        value: 'roleA',
        options: [
          { value: 'roleA', label: t('역할A') },
          { value: 'roleB', label: t('역할B') },
          { value: 'roleC', label: t('역할C') },
          { value: 'roleD', label: t('역할D') },
          { value: 'roleE', label: t('역할E') },
        ],
      },
    ],
    [
      {
        name: 'name',
        type: 'text',
        label: t('이름'),
        placeholder: t('이름을 입력하세요.'),
        value: '',
      },
      {
        name: 'memnerNo',
        type: 'text',
        label: t('사번'),
        placeholder: t('사번을 입력하세요.'),
        value: '',
      },
      {
        name: 'roleStatus',
        type: 'dropdown',
        label: t('역할 상태'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'normal', label: t('정상') },
        ],
      },
    ],
  ],
  validator: {
    tenantId: { required: true },
  },
};

const gridConfig = {
  query: roleManagerQueryOptions.list,
  data: [],
  columns: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('tenantName', {
    id: 'tenantName',
    header: t('테넌트명'),
  }),
  columnHelper.accessor('channelName', {
    id: 'channelName',
    header: t('채널명'),
  }),
  columnHelper.accessor('companyName', {
    id: 'companyName',
    header: t('회사'),
    cell: (info: any) => {
      const companyNames = info.row.original.companies.map((item: any) => {
        return item.name;
      });
      return companyNames.toString();
    },
  }),
  columnHelper.accessor('deptId', {
    id: 'deptId',
    header: t('소속'),
    cell: (info: any) => info.row.original.deptId,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    header: t('HRD 담당자 역할'),
  }),
  columnHelper.accessor('memnerNo', {
    id: 'memnerNo',
    header: t('사번'),
    cell: (info: any) => info.row.original.memnerNo,
  }),
  columnHelper.accessor('name3', {
    id: 'name3',
    header: t('이름'),
    cell: (info: any) => info.row.original.name,
  }),
  columnHelper.accessor('roleCode', {
    id: 'roleCode',
    header: t('역할 기간'),
    cell: (info: any) => info.row.original.roleCode,
  }),
  columnHelper.accessor('userOpt1', {
    id: 'userOpt1',
    header: t('재직여부'),
    cell: (info: any) => info.row.original.deptId,
  }),
  columnHelper.accessor('roleCode', {
    id: 'roleCode',
    header: t('역할 상태'),
    cell: (info: any) => info.row.original.roleCode,
  }),
];
