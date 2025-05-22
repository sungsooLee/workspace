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
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';

const RoleModalComponent: FC<any> = forwardRef(({ rootPath }, ref) => {
  const { close: closeModal } = useModal();

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

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const gridConfig = {
    query: roleManagerQueryOptions.list,
    columns: [
      {
        name: 'no1',
        label: 'NO.',
        type: 'numbering',
      },
      {
        name: 'tenantId',
        label: t('테넌트명'),
        render: (info: any) => info.row.original.tenantId,
      },
      {
        name: 'channelName',
        label: t('채널명'),
        render: (info: any) => info.row.original.channelName,
      },
      {
        name: 'companyName',
        label: t('회사'),
        render: (info: any) => {
          const companyNames = info.row.original.companies.map((item: any) => {
            return item.name;
          });
          return companyNames.toString();
        },
      },
      {
        name: 'deptId',
        label: t('소속'),
        render: (info: any) => info.row.original.deptId,
      },
      {
        name: 'role',
        label: t('HRD 담당자 역할'),
        render: (info: any) => info.row.original.role,
      },
      {
        name: 'memnerNo',
        label: t('사번'),
        render: (info: any) => info.row.original.memnerNo,
      },
      {
        name: 'name',
        label: t('이름'),
        render: (info: any) => info.row.original.name,
      },
      {
        name: 'roleCode',
        label: t('역할 기간'),
        render: (info: any) => info.row.original.roleCode,
      },
      {
        name: 'deptId',
        label: t('재직여부'),
        render: (info: any) => info.row.original.deptId,
      },
      {
        name: 'roleCode',
        label: t('역할 상태'),
        render: (info: any) => info.row.original.roleCode,
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
              onRowSelect={handleRowSelect}
              config={gConfig}
              //   columns={columns}
              height={380}
              // showColumnSettings={false}
              title={t('HRD 담당자 역할 목록')}
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
