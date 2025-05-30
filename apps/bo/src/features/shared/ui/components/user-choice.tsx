import { t } from 'i18next';
import { GridBox, useGridBox } from '@learnway/ui';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';
import { usersQueryOptions } from '@entities/users/service/users.queries';

type Props = {
  handleRowSelect: (row: any) => void;
};

const UserChoiceComponent = ({ handleRowSelect }: Props) => {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getValues);

  return (
    <div className={popupStyles.wrap}>
      <SearchBox provider={sProvider} onSearch={(data) => gridFetch(data)} />
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
  );
};

export const UserChoice = UserChoiceComponent;

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
      {
        name: 'ust',
        type: 'text',
        label: t('계정상태'),
        value: '',
        options: [
          {
            label: '전체',
            value: '',
          },
          {
            label: '정상',
            value: 'open',
          },
          {
            label: '잠김',
            value: 'close',
          },
        ],
      },
    ],
  ],
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

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor('company', {
    id: 'company',
    cell: (info) => info.row.original.company.name,
    header: '회사',
    enableGrouping: false,
    size: 210,
  }),
  columnHelper.accessor('noDat1', {
    id: 'noDat1',
    cell: (info) => info.getValue(),
    header: '본부/사업부',
    size: 240,
    enableGrouping: false,
  }),
  columnHelper.accessor('noDat2', {
    id: 'noDat2',
    cell: (info) => info.getValue(),
    header: '부서',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('dept', {
    id: 'dept',
    cell: (info) => info.row.original.dept.deptName,
    header: '소속',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('employeeNumber', {
    id: 'employeeNumber',
    cell: (info) => info.getValue(),
    header: '사번',
    size: 220,
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    id: 'name',
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
