import { useEffect, useState } from 'react';
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
  Divider,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { queryOptions } from '@entities/user-group/service/user-group.queries';
import { useQueryClient } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import { queryOptions as departmentQueryOptions } from '@entities/department';
import { BlackwhiteUsersParam } from '@types';

const UserGroupModalComponent = ({ groups }: Pick<BlackwhiteUsersParam, 'groups'>) => {
  const gridConfig = {
    query: (data: any) => queryOptions.blackwhiteUsers({ ...data, groups }),
    columns: [],
    data: [],
    pagination: {
      pageSize: 10,
      pageIndex: 1,
      totalRows: 2,
    },
  };

  const { close: closeModal } = useModal();
  const { provider: sProvider, getValues, setOptions, setValue } = useSearchBox(searchConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getValues);
  const queryClient = useQueryClient();
  const companyId = useWatch({ control: sProvider.control, name: 'companyId' });

  useEffect(() => {
    if (!companyId && companyId !== 0) return;

    (async () => {
      const { content } = await queryClient.fetchQuery(departmentQueryOptions.list({ companyId }));
      setValue('deptId', '');
      if (content)
        setOptions(
          'deptId',
          content.map((_: any) => ({ value: _.deptId, label: _.deptName })),
        );
    })();
  }, [companyId]);

  const [selectedRow, setSelectedRow] = useState();

  const handleRowSelect = (row: any) => {
    setSelectedRow(row);
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
      <ModalTitle>유저 그룹 대상자</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={gridFetch} />
          <Divider />
          <GridBox
            onRowSelect={handleRowSelect}
            config={config}
            columns={columns}
            showColumnSettings={false}
            title={t('유저그룹목록')}
          />
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

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        format: 'object',
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyId'],
        },
        isSearchable: true,
        isClearable: true,
        placeholder: '입력 선택',
      },
      {
        name: 'companyCode',
        type: 'text',
        label: t('실'),
        value: '',
      },
      {
        name: 'deptId',
        type: 'dropdown',
        label: t('소속'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.select', '선택'),
        options: [],
        format: 'object',
        isSearchable: true,
        isClearable: true,
      },
    ],
    [
      {
        name: 'employeeNumber',
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
    header: '실',
    size: 210,
    enableGrouping: false,
  }),
  columnHelper.accessor('deptName', {
    id: 'deptName',
    cell: (info) => info.getValue(),
    header: '소속',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('employeeNumber', {
    id: 'employeeNumber',
    cell: (info) => info.getValue(),
    header: '사번',
    enableGrouping: false,
  }),
  columnHelper.accessor('userName', {
    id: 'userName',
    cell: (info) => info.getValue(),
    header: '이름',
    enableGrouping: false,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    cell: (info) => info.getValue(),
    header: '재직여부',
    enableGrouping: false,
  }),
  columnHelper.accessor('accountStatus', {
    id: 'accountStatus',
    cell: (info) => info.getValue(),
    header: '계정상태',
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
