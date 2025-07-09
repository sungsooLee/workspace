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

const ExternalUserComponent = ({ handleRowSelect }: Props) => {
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
          title={t('사외이용자 목록')}
        />
      </div>
    </div>
  );
};

export const ExternalUserChoice = ExternalUserComponent;

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
    size: 170,
  }),
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: '회사',
    enableGrouping: false,
    size: 170,
  }),
  columnHelper.accessor('dep', {
    cell: (info) => info.getValue(),
    header: '부서',
    size: 170,
    enableGrouping: false,
  }),
  columnHelper.accessor('position', {
    cell: (info) => info.getValue(),
    header: '직위',
    size: 170,
  }),
  columnHelper.accessor('userNo', {
    cell: (info) => info.getValue(),
    header: '사번',
    size: 170,
    enableGrouping: false,
  }),
  columnHelper.accessor('userName', {
    cell: (info) => info.getValue(),
    header: '이름',
    size: 170,
    enableGrouping: false,
  }),
  columnHelper.accessor('opt2', {
    cell: (info) => info.getValue(),
    header: '재직여부',
    size: 150,
    enableGrouping: false,
  }),
  columnHelper.accessor('opt3', {
    cell: (info) => info.getValue(),
    header: '계정상태',
    size: 150,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
