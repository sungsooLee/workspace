import { Meta, StoryObj } from '@storybook/react/*';
import {
  createColumnHelper,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryConfigProvider } from '@learnway/config';

import { useState } from 'react';
import Table from './index';
import { GridState } from './types/grid';
import ModalWrapper from '../modal/modal-wrapper';

export default {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Table>;

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}

interface UseTableDataProps<T> {
  queryKey: string;
  tableState: {
    sorting: SortingState;
    filters: ColumnFiltersState;
  };
  fetch: (params: any) => Promise<{ data: T[] }>;
}

function useTableData<T>({ queryKey, tableState, fetch }: UseTableDataProps<T>) {
  return useQuery({
    queryKey: [queryKey, tableState],
    queryFn: () => fetch(tableState),
    staleTime: 0,
  });
}

const fetchTableData = async (params: { sorting: SortingState; filters: ColumnFiltersState }) => {
  console.log('API 호출:', {
    정렬: params.sorting,
    필터: params.filters,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: [
      {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'Active',
        progress: 50,
      },
      {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Inactive',
        progress: 80,
      },
    ],
  };
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    header: () => 'First Name',
    footer: (props) => `Total: ${props.table.getRowModel().rows.length}`,
    meta: {
      filterType: 'text',
    },
  }),
  columnHelper.accessor('lastName', {
    cell: (info) => info.getValue(),
    header: () => 'Last Name',
  }),
  columnHelper.accessor('age', {
    cell: (info) => info.getValue(),
    header: () => 'Age',
    meta: {
      filterType: 'range',
    },
  }),
  columnHelper.accessor('visits', {
    cell: (info) => info.getValue(),
    header: () => 'Visits',
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, row) => sum + row.getValue<number>('visits'), 0);
      return `Total: ${total}`;
    },
    meta: {
      filterType: 'range',
    },
  }),
  columnHelper.accessor('status', {
    cell: (info) => info.getValue(),
    header: () => 'Status',
  }),
  columnHelper.accessor('progress', {
    cell: (info) => info.getValue(),
    header: () => 'Progress',
    meta: {
      filterType: 'range',
    },
  }),
] as ColumnDef<Person, unknown>[];

const BaseTable = () => {
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const { data } = useTableData<Person>({
    queryKey: 'example-table',
    tableState,
    fetch: fetchTableData,
  });

  const handleStateChange = (newState: GridState) => {
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filter: newState.filter || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Table data={data?.data ?? []} columns={columns} onStateChange={handleStateChange} />
    </div>
  );
};

export const Base: Story = {
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <BaseTable />,
};
const TableWithColumnSettings = () => {
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const { data } = useTableData<Person>({
    queryKey: 'example-table',
    tableState,
    fetch: fetchTableData,
  });

  const handleStateChange = (newState: GridState) => {
    console.log(newState);
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filter: newState.filter || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Table data={data?.data ?? []} columns={columns} onStateChange={handleStateChange} />
    </div>
  );
};

export const WithColumnSettings: Story = {
  name: '컬럼 설정 테스트',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <ModalWrapper />
        <Story />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <TableWithColumnSettings />,
  parameters: {
    docs: {
      description: {
        story: `
  컬럼 설정 기능을 테스트할 수 있는 예제입니다.
  
  - 항목설정 버튼을 클릭하여 컬럼 설정 모달을 엽니다.
  - 드래그 앤 드롭으로 컬럼 순서를 변경할 수 있습니다.
  - 체크박스로 컬럼을 표시하거나 숨길 수 있습니다.
  - 변경사항은 '적용' 버튼을 클릭해야 반영됩니다.
          `,
      },
    },
  },
};
