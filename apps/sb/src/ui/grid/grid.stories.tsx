/* eslint-disable @nx/enforce-module-boundaries */
import { Meta, StoryObj } from '@storybook/react/*';
import {
  createColumnHelper,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/react-table';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ReactQueryConfigProvider } from '@learnway/config';

import { useMemo, useState } from 'react';
import { GridState, ModalWrapper, Grid } from '@learnway/ui';

export default {
  title: 'Components/Table',
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
      filter: newState.filter || prev.filters,
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
      filter: newState.filter || prev.filters,
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
const fetchInfiniteData = async (pageParam = 0): Promise<TableResponse<Person>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const pageSize = 5;
  const totalRows = 100;
  const startIndex = pageParam * pageSize;

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

const InfiniteScrollTable = () => {
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['infinite-table', tableState],
    queryFn: ({ pageParam = 0 }) => fetchInfiniteData(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.meta.hasNextPage ? pages.length : undefined),
  });

  const flatData = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const handleStateChange = (newState: GridState) => {
    setTableState((prev) => ({
      ...prev,
      sorting: newState.sorting || prev.sorting,
      filter: newState.filter || prev.filters,
    }));
  };

  return (
    <div className="p-4">
      <Grid
        data={flatData}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isLoading}
        infiniteScroll={{
          hasNextPage: !!hasNextPage, // 다음 페이지 여부
          isFetching: isFetchingNextPage, //로딩 상태
          fetchNextPage,
        }}
        title="무한 스크롤"
      />
    </div>
  );
};

export const WithInfiniteScroll: Story = {
  name: '무한 스크롤 그리드',
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
  무한 스크롤이 적용된 그리드.
        `,
      },
    },
  },
};

// 페이지네이션용 mock API
const fetchPaginatedData = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}): Promise<TableResponse<Person>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
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

  const { data, isLoading } = useQuery({
    queryKey: ['paginated-table', pageIndex, pageSize, tableState],
    queryFn: () => fetchPaginatedData({ pageIndex, pageSize }),
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
      <Grid
        data={data?.data ?? []}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isLoading}
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
