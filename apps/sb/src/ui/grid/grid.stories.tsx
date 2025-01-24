/* eslint-disable @nx/enforce-module-boundaries */
import { Meta, StoryObj } from '@storybook/react/*';
import {
  createColumnHelper,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  RowSelectionState,
} from '@tanstack/react-table';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ReactQueryConfigProvider } from '@learnway/config';

import { useMemo, useState } from 'react';
import {
  GridState,
  ModalWrapper,
  Grid,
  CustomCell,
  useModalControl,
  ColumnFactory,
  useModalContext,
  Button,
  DynamicFormField,
  FieldType,
  NumberInput,
} from '@learnway/ui';

export default {
  title: 'Components/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Grid>;

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
  imageUrl?: string;
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
      {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Inactive',
        progress: 80,
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
    header: 'First Name',
    footer: (props) => `Total: ${props.table.getRowModel().rows.length}`,
    meta: {
      filterType: 'text',
    },
    enableGrouping: false,
  }),
  columnHelper.accessor('lastName', {
    cell: (info) => info.getValue(),
    header: 'Last Name',
    enableGrouping: false,
  }),
  columnHelper.accessor('age', {
    cell: (info) => info.getValue(),
    header: 'Age',
    meta: {
      filterType: 'range',
    },
    enableGrouping: false,
  }),
  columnHelper.accessor('visits', {
    cell: (info) => info.getValue(),
    header: 'Visits',
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
    header: 'Status',
    getGroupingValue: (row) => `${row.status}`,
    enableGrouping: true,
    aggregationFn: 'count',
    meta: {
      filterType: 'select',
      filterOptions: [
        { label: '활성', value: 'active' },
        { label: '비활성', value: 'inactive' },
      ],
    },
  }),
  columnHelper.accessor('progress', {
    cell: (info) => info.getValue(),
    header: 'Progress',
    meta: {
      filterType: 'range',
    },
    enableGrouping: false,
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
    console.log(newState);
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filters: newState.filters || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid data={data?.data ?? []} columns={columns} onStateChange={handleStateChange} />
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
      filter: newState.filters || prev.filters,
    }));
  };

  const handleRowSelectStateChange = (selectRowState: RowSelectionState) => {
    console.log(selectRowState);
  };

  return (
    <div className="p-4">
      <Grid
        data={data?.data ?? []}
        columns={columns}
        onStateChange={handleStateChange}
        onRowSelect={handleRowSelectStateChange}
      />
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

const MultiSelectTable = () => {
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
      filters: newState.filters || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid
        data={data?.data ?? []}
        columns={columns}
        onStateChange={handleStateChange}
        multiSelectable={true}
      />
    </div>
  );
};

export const MultiSelectGrid: Story = {
  name: '멀티 셀렉 그리드',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <MultiSelectTable />,
  parameters: {
    docs: {
      description: {
        story: `
  - 그리드 prop의 multiSelectable을 true값으로 넘겨주면 다중 row 선택 가능.
        `,
      },
    },
  },
};

interface TableResponse<T> {
  data: T[];
  meta: {
    totalRows: number;
    hasNextPage: boolean;
  };
}

// 무한 스크롤용 mock API
const fetchInfiniteData = async ({ tableState }: any): Promise<Person[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(tableState);
  const totalRows = 100;

  const data = Array.from({ length: totalRows }).map((_, index) => ({
    firstName: `Name ${index}`,
    lastName: `Surname ${index}`,
    age: Math.floor(Math.random() * 50) + 20,
    visits: Math.floor(Math.random() * 100),
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    progress: Math.floor(Math.random() * 100),
  }));

  return data;
};

const InfiniteScrollTable = () => {
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['PersonEntity', tableState] as const,
    queryFn: () => fetchInfiniteData({ tableState }),
  });

  const handleStateChange = (newState: GridState) => {
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filters: newState.filters || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid
        data={data || []}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isLoading}
        title="가상 스크롤"
        multiSelectable={true}
      />
    </div>
  );
};

export const WithInfiniteScroll: Story = {
  name: '가상 스크롤 그리드',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <InfiniteScrollTable />,
  parameters: {
    docs: {
      description: {
        story: `
  가상 스크롤이 적용된 그리드.
        `,
      },
    },
  },
};

// 페이지네이션용 mock API
const fetchPaginatedData = async ({
  pageIndex,
  pageSize,
  tableState,
}: {
  pageIndex: number;
  pageSize: number;
  tableState: any; // 추후 재정의 필요
}): Promise<TableResponse<Person>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('페이지사이즈 : ' + pageSize + ', 페이지인덱스' + pageIndex + ' !! API 호출');
  console.log(tableState);
  // 전체 100개의 데이터가 있다고 가정
  const totalRows = 100;
  const startIndex = pageIndex * pageSize;

  const data = Array.from({ length: pageSize }).map((_, index) => ({
    firstName: `Name ${startIndex + index}`,
    lastName: `Surname ${startIndex + index}`,
    age: Math.floor(Math.random() * 50) + 20,
    visits: Math.floor(Math.random() * 100),
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    progress: Math.floor(Math.random() * 100),
  }));

  return {
    data,
    meta: {
      totalRows,
      hasNextPage: startIndex + pageSize < totalRows,
    },
  };
};

// 페이지네이션 테이블 컴포넌트
const PaginationTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const { data, isFetching } = useQuery({
    queryKey: ['PersonEntity', pageIndex, pageSize, tableState] as const,
    queryFn: () => fetchPaginatedData({ pageIndex, pageSize, tableState }),
    placeholderData: keepPreviousData,
  });

  const handleStateChange = (newState: GridState) => {
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filters: newState.filters || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid
        data={data?.data ?? []}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isFetching}
        pagination={{
          pageSize,
          pageIndex,
          totalRows: data?.meta.totalRows ?? 0,
          onPageChange: setPageIndex,
          onPageSizeChange: setPageSize,
        }}
        multiSelectable={true}
      />
    </div>
  );
};

export const WithPagination: Story = {
  name: '페이지네이션 그리드',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <PaginationTable />,
  parameters: {
    docs: {
      description: {
        story: `
  페이지네이션이 적용된 그리드
        `,
      },
    },
  },
};

const GroupedColumnTable = () => {
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['PersonEntity', tableState] as const,
    queryFn: () => fetchInfiniteData({ tableState }),
  });

  const handleStateChange = (newState: GridState) => {
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filters: newState.filters || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid
        data={data || []}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isLoading}
        title="Grouping Columns"
        multiSelectable={true}
        columnGrouping={{ columns: ['status'] }}
      />
    </div>
  );
};

export const WithGroupColumn: Story = {
  name: '컬럼 그룹 그리드',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <GroupedColumnTable />,
  parameters: {
    docs: {
      description: {
        story: `
  원하는 컬럼 그룹화
  - prop으로 그룹을 원하는 컬럼을 넘겨준다.
        `,
      },
    },
  },
};

const PinnedColumnTable = () => {
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['PersonEntity', tableState] as const,
    queryFn: () => fetchInfiniteData({ tableState }),
  });

  const handleStateChange = (newState: GridState) => {
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filters: newState.filters || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid
        data={data || []}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isLoading}
        title="Pinning Columns"
        multiSelectable={true}
        columnPinning={{ columns: ['status'] }}
      />
    </div>
  );
};

export const WithPinColumn: Story = {
  name: '고정 컬럼 그리드',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <PinnedColumnTable />,
  parameters: {
    docs: {
      description: {
        story: `
  원하는 컬럼 왼쪽 고정
  - prop으로 고정을 원하는 컬럼을 넘겨준다.
  - Sticky와 같은 스타일 추가 필요
        `,
      },
    },
  },
};

const mockData: Person[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 28,
    visits: 100,
    status: 'Active',
    progress: 50,
    imageUrl: 'https://picsum.photos/seed/1/200/200',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 32,
    visits: 80,
    status: 'Active',
    progress: 75,
    imageUrl: 'https://picsum.photos/seed/2/200/200',
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 45,
    visits: 60,
    status: 'Inactive',
    progress: 30,
    imageUrl: 'https://picsum.photos/seed/3/200/200',
  },
  {
    firstName: 'Alice',
    lastName: 'Williams',
    age: 29,
    visits: 90,
    status: 'Active',
    progress: 85,
    imageUrl: 'https://picsum.photos/seed/4/200/200',
  },
];

const CustomCellTable = () => {
  const { open } = useModalControl();

  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const columnsWithCustomCell = [
    columnHelper.accessor('firstName', {
      cell: (info) => (
        <CustomCell
          row={info.row.original}
          value={info.getValue()}
          imageUrl={info.row.original.imageUrl}
          onAction={(row) => {
            open(
              <div className="p-4">
                <div className="space-y-2">
                  <p>이름:{row.firstName}</p>
                  <p>나이:{row.age}</p>
                  <p>상태: {row.status}</p>
                  <p>이미지 URL:{row.imageUrl}</p>
                </div>
              </div>,
              {
                title: '사용자 정보',
                width: 'sm',
              },
            );
          }}
        />
      ),
      header: 'First Name',
      footer: (props) => `Total: ${props.table.getRowModel().rows.length}`,
      meta: {
        filterType: 'text',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('lastName', {
      cell: (info) => info.getValue(),
      header: 'Last Name',
      enableGrouping: false,
    }),
    columnHelper.accessor('age', {
      cell: (info) => info.getValue(),
      header: 'Age',
      meta: {
        filterType: 'range',
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('visits', {
      cell: (info) => info.getValue(),
      header: 'Visits',
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
      header: 'Status',
      getGroupingValue: (row) => `${row.status}`,
      enableGrouping: true,
      aggregationFn: 'count',
      meta: {
        filterType: 'select',
        filterOptions: [
          { label: '활성', value: 'active' },
          { label: '비활성', value: 'inactive' },
        ],
      },
    }),
    columnHelper.accessor('progress', {
      cell: (info) => info.getValue(),
      header: 'Progress',
      meta: {
        filterType: 'range',
      },
      enableGrouping: false,
    }),
  ] as ColumnDef<Person, unknown>[];

  const handleStateChange = (newState: GridState) => {
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filters: newState.filters || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid
        data={mockData}
        columns={columnsWithCustomCell}
        onStateChange={handleStateChange}
        title="커스텀 셀 테스트"
      />
    </div>
  );
};

export const WithCustomCell: Story = {
  name: '커스텀 셀 그리드',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <CustomCellTable />,
};

const PersonTestModal = ({
  data,
  onConfirm,
}: {
  data: Person;
  onConfirm: (updatedData: Person) => void;
}) => {
  const { closeModal } = useModalContext();
  const [tmpData, setTmpData] = useState(data.visits);
  const handleSubmit = () => {
    onConfirm({ ...data, visits: tmpData });
    closeModal();
  };

  return (
    <div>
      <NumberInput value={tmpData} onChange={(v) => setTmpData(v)} />
      <Button onClick={handleSubmit}>확인</Button>
    </div>
  );
};

export const createPersonColumns = (columnFactory: ColumnFactory<Person>): ColumnDef<Person>[] => {
  const columns = columnFactory.create([
    {
      accessor: 'firstName',
      header: 'First Name',
      filterType: 'text',
      enableGrouping: false,
      customCell: ({ row, openModal }) => (
        <CustomCell
          row={row}
          value={row.firstName}
          imageUrl={row.imageUrl}
          onAction={() => {
            openModal?.(
              <div className="space-y-2 p-4">
                <p>이름:{row.firstName}</p>
                <p>나이:{row.age}</p>
                <p>상태:{row.status}</p>
                <p>이미지 URL:{row.imageUrl}</p>
              </div>,
              { title: '사용자 정보', width: 'sm' },
            );
          }}
        />
      ),
      footer: (props) => `Total: ${props.table.getRowModel().rows.length}`,
    },
    {
      accessor: 'lastName',
      header: 'Last Name',
      enableGrouping: false,
    },
    {
      accessor: 'age',
      header: 'Age',
      enableGrouping: false,
      customCell: ({ row }) => <div>커스텀셀!:{row.age}</div>,
    },
    {
      accessor: 'visits',
      header: 'Visits',
      filterType: 'range',
      customCell: ({ row, openModal }) => (
        <div>
          <Button
            onClick={() => {
              openModal(
                <div>
                  <PersonTestModal
                    data={row}
                    onConfirm={(data) => {
                      console.log(data.visits);
                    }}
                  />
                </div>,
              );
            }}>
            팝업
          </Button>
        </div>
      ),
      footer: (props) => {
        const total = props.table
          .getRowModel()
          .rows.reduce((sum, row) => sum + row.getValue<number>('visits'), 0);
        return `Total: ${total}`;
      },
    },
    {
      accessor: 'status',
      header: 'Status',
      filterType: 'select',
      enableGrouping: true,
      meta: {
        filterOptions: [
          { label: '활성', value: 'active' },
          { label: '비활성', value: 'inactive' },
        ],
      },
    },
    {
      accessor: 'progress',
      header: 'Progress',
      filterType: 'range',
      enableGrouping: false,
    },
  ]);
  return columns as ColumnDef<Person>[];
};

const ColumnFactoryTable = () => {
  const { open } = useModalControl();

  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  // 모달 팝업을 띄울때는 open 을 컬럼 팩토리에 넘겨줌.
  const columnFactory = useMemo(() => new ColumnFactory<Person>(open), [open]);
  const columns = useMemo(() => createPersonColumns(columnFactory), [columnFactory]);

  const handleStateChange = (newState: GridState) => {
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filters: newState.filters || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid
        data={mockData}
        columns={columns}
        onStateChange={handleStateChange}
        title="커스텀 셀 생성"
      />
    </div>
  );
};

export const WithCustomFactoryCell: Story = {
  name: '커스텀 셀 생성',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <ColumnFactoryTable />,
};
