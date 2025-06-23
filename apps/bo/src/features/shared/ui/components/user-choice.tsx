import { t } from 'i18next';
import { GridBox, useGridBox } from '@learnway/ui';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
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
        required: true,
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyId'],
        },
        format: 'number',
        isSearchable: true,
        isClearable: true,
        placeholder: '입력 선택',
      },
      {
        name: 'deptId',
        type: 'text',
        label: t('소속'),
        value: '',
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
  validator: { companyId: { required: true } },
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
  columnHelper.accessor('employmentStatus', {
    cell: (info) => info.getValue(),
    header: '재직여부',
    enableGrouping: false,
  }),
  columnHelper.accessor('accountType', {
    cell: (info) => info.getValue(),
    header: '계정상태',
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
