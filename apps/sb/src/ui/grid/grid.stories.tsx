/* eslint-disable @nx/enforce-module-boundaries */
import { Meta, StoryObj } from '@storybook/react/*';
import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  RowSelectionState,
  SortingState,
  Table,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryConfigProvider } from '@learnway/config';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  Button,
  CustomCell,
  EditCheckboxCell,
  EditDropdownCell,
  EditInputCell,
  EditRadioCell,
  EditTextareaCell,
  Grid,
  GridBox,
  GridState,
  Input,
  ModalWrapper,
  TableBox,
  useModal,
} from '@learnway/ui';
import { IcoDownload, IcoSetting } from '@learnway/icons';
import { DATE_TIME_FORMAT, formatDate, getRandomId, getRowSelectionByList } from '@learnway/shared';
import { PaginationResponse } from '../../../../bo/src/types';

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
  preview?: ReactNode;
  download?: ReactNode;
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

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    data: [
      {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'Active',
        progress: 50,
        preview: <Button className="link">미리보기</Button>,
        download: (
          <Button className="download" onlyIcon>
            <IcoDownload width={16} height={16} stroke={'#747D91'} />
          </Button>
        ),
      },
      {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Inactive',
        progress: 80,
        preview: <Button className="link">미리보기</Button>,
        download: (
          <Button className="download" onlyIcon>
            <IcoDownload width={16} height={16} stroke={'#747D91'} />
          </Button>
        ),
      },
      {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Inactive',
        progress: 80,
        preview: <Button className="link">미리보기</Button>,
        download: (
          <Button className="download" onlyIcon>
            <IcoDownload width={16} height={16} stroke={'#747D91'} />
          </Button>
        ),
      },
      {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Inactive',
        progress: 80,
        preview: <Button className="link">미리보기</Button>,
        download: (
          <Button className="download" onlyIcon>
            <IcoDownload width={16} height={16} stroke={'#747D91'} />
          </Button>
        ),
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
      align: 'left', // 기본 정렬 - 헤더와 셀 모두 적용
    },
    enableGrouping: false,
  }),
  columnHelper.accessor('lastName', {
    cell: (info) => info.getValue(),
    header: 'Last Name',
    enableGrouping: false,
    meta: {
      headerAlign: 'center', // 헤더만 가운데 정렬
      cellAlign: 'right', // 셀은 오른쪽 정렬
    },
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
  columnHelper.accessor('preview', {
    cell: (info) => info.getValue(),
    header: '미리보기',
    enableGrouping: false,
  }),
  columnHelper.accessor('download', {
    cell: (info) => info.getValue(),
    header: 'download',
    enableGrouping: false,
    meta: {
      headerAlign: 'left', // 헤더만 가운데 정렬
      cellAlign: 'center', // 셀은 오른쪽 정렬
    },
  }),
];

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
      <GridBox
        data={data?.data ?? []}
        columns={columns}
        onStateChange={handleStateChange}
        onRowSelect={(row: any) => console.log(row)}
        columnPinning={{
          columns: ['firstName', 'age'],
        }}
      />
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
      // <ReactQueryConfigProvider>
      //   <Story />
      //   <ModalWrapper />
      // </ReactQueryConfigProvider>
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
      <GridBox
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
      <GridBox
        data={data?.data ?? []}
        columns={columns}
        onStateChange={handleStateChange}
        multiple
      />
    </div>
  );
};

export const MultiSelectGrid: Story = {
  name: '멀티 셀렉트',
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
        story: `- 그리드 prop의 multiple을 true값으로 넘겨주면 다중 row 선택 가능.`,
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
    preview: <Button className="link">미리보기</Button>,
    download: (
      <Button className="download" onlyIcon>
        <IcoDownload width={16} height={16} stroke={'#747D91'} />
      </Button>
    ),
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
      <GridBox
        data={data || []}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isLoading}
        title="가상 스크롤"
        multiple={true}
      />
    </div>
  );
};

export const WithInfiniteScroll: Story = {
  name: '가상 스크롤',
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
const fetchPaginatedData = (size: number): PaginationResponse<any> => {
  const content = Array(size)
    .fill({})
    .map((_, index) => ({
      firstName: `firstName ${index}`,
      lastName: `lastName ${index}`,
      age: `age ${index}`,
      visits: `visits ${index}`,
      status: `status ${index}`,
      progress: `progress ${index}`,
      preview: `preview ${index}`,
      download: (
        <Button className="download" onlyIcon>
          <IcoDownload width={16} height={16} stroke={'#747D91'} />
        </Button>
      ),
    }));

  return {
    totalPages: 10,
    totalElements: size,
    size: 10,
    content,
    number: 1,
    numberOfElements: 1,
    first: true,
    last: false,
    empty: false,
    pageable: {
      offset: 0,
      pageSize: 10,
      paged: true,
      pageNumber: 0,
      unpaged: false,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
    },
  };
};

// 페이지네이션 테이블 컴포넌트
const PaginationTable = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const data: PaginationResponse<Person> = fetchPaginatedData(100);

  useEffect(() => {
    console.log('data,', data);
  }, [data]);

  return (
    <div className="p-4">
      <GridBox
        data={data.content}
        columns={columns}
        pagination={{
          pageNumber,
          totalPages: 300,
          onPageChange: (newPageNumber: number) => {
            setPageNumber(newPageNumber);
          },
        }}
        multiple={true}
      />
    </div>
  );
};

export const WithPagination: Story = {
  name: '페이지네이션',
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
      <GridBox
        data={data || []}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isLoading}
        title="Grouping Columns"
        multiple={true}
        columnGrouping={{ columns: ['status'] }}
      />
    </div>
  );
};

export const WithGroupColumn: Story = {
  name: '그룹 컬럼',
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
  원하는 그룹 컬럼화
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
      <GridBox
        data={data || []}
        columns={columns}
        onStateChange={handleStateChange}
        isLoading={isLoading}
        title="Pinning Columns"
        multiple={true}
        columnPinning={{ columns: ['status'] }}
      />
    </div>
  );
};

export const WithPinColumn: Story = {
  name: '고정 컬럼',
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
    preview: <Button className="link">미리보기</Button>,
    download: (
      <Button className="download" onlyIcon>
        <IcoDownload width={16} height={16} stroke={'#747D91'} />
      </Button>
    ),
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 32,
    visits: 80,
    status: 'Active',
    progress: 75,
    imageUrl: 'https://picsum.photos/seed/2/200/200',
    preview: <Button className="link">미리보기</Button>,
    download: (
      <Button className="download" onlyIcon>
        <IcoDownload width={16} height={16} stroke={'#747D91'} />
      </Button>
    ),
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 45,
    visits: 60,
    status: 'Inactive',
    progress: 30,
    imageUrl: 'https://picsum.photos/seed/3/200/200',
    preview: <Button className="link">미리보기</Button>,
    download: (
      <Button className="download" onlyIcon>
        <IcoDownload width={16} height={16} stroke={'#747D91'} />
      </Button>
    ),
  },
  {
    firstName: 'Alice',
    lastName: 'Williams',
    age: 29,
    visits: 90,
    status: 'Active',
    progress: 85,
    imageUrl: 'https://picsum.photos/seed/4/200/200',
    preview: <Button className="link">미리보기</Button>,
    download: (
      <Button className="download" onlyIcon>
        <IcoDownload width={16} height={16} stroke={'#747D91'} />
      </Button>
    ),
  },
];

const CustomCellTable = () => {
  const { open } = useModal();

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
            open({
              content: (
                <div className="p-4">
                  <div className="space-y-2">
                    <p>이름:{row.firstName}</p>
                    <p>나이:{row.age}</p>
                    <p>상태: {row.status}</p>
                    <p>이미지 URL:{row.imageUrl}</p>
                  </div>
                </div>
              ),
              // title: '사용자 정보',
              width: 'sm',
            });
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
      <GridBox
        data={mockData}
        columns={columnsWithCustomCell}
        onStateChange={handleStateChange}
        title="커스텀 셀 테스트"
      />
    </div>
  );
};

export const WithCustomCell: Story = {
  name: '커스텀 셀',
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
  const { close: closeModal } = useModal();
  const [tmpData, setTmpData] = useState(data.visits);
  const handleSubmit = () => {
    onConfirm({ ...data, visits: tmpData });
    closeModal();
  };

  return (
    <div>
      <Input type="number" value={tmpData} onChange={(v: any) => setTmpData(v)} />
      <Button onClick={handleSubmit}>확인</Button>
    </div>
  );
};

// 셀 편집
export const TemplateEditGrid: any = (args: any) => {
  const [data, setData] = useState<any[]>(editGridData);
  const columns = [
    {
      header: 'text',
      accessorKey: 'text',
      size: 150,
      cell: (info: CellContext<any, string>) => (
        <EditInputCell info={info} input={{ type: 'text' }} />
      ),
    },
    {
      header: 'textarea',
      accessorKey: 'textarea',
      size: 150,
      cell: (info: CellContext<any, string>) => (
        <EditTextareaCell info={info} textarea={{ maxLength: 100 }} />
      ),
    },
    {
      header: 'number',
      accessorKey: 'number',
      size: 150,
      cell: (info: CellContext<any, number>) => (
        <EditInputCell info={info} input={{ type: 'number' }} />
      ),
    },
    {
      header: 'dropdown',
      accessorKey: 'dropdown',
      size: 100,
      cell: (info: CellContext<any, string>) => (
        <EditDropdownCell
          info={info}
          dropdown={{
            options: [
              { value: `value1`, label: `label1` },
              { value: `value2`, label: `label2` },
            ],
          }}
        />
      ),
    },
    {
      header: 'check',
      accessorKey: 'check',
      size: 70,
      meta: {
        cellAlign: 'center',
      },
      cell: (info: CellContext<any, boolean>) => <EditCheckboxCell info={info} />,
    },
    {
      header: 'radio',
      accessorKey: 'radio',
      size: 200,
      cell: (info: CellContext<any, string>) => (
        <EditRadioCell
          info={info}
          radio={{
            options: [
              { value: `value1`, label: `label1` },
              { value: `value2`, label: `label2` },
            ],
          }}
        />
      ),
    },
    {
      header: 'delete',
      accessorKey: 'delete',
      size: 70,
      meta: {
        cellAlign: 'center',
      },
      cell: (info: CellContext<any, string>) => (
        <Button
          label={'삭제'}
          variant={'point'}
          size={'xs'}
          onClick={() => info.table.options.meta?.removeData(info.row.index)}
        />
      ),
    },
    {
      header: 'dummy',
      accessorKey: 'dummy',
    },
  ];

  console.log('----- data', data);

  return (
    <div className={'m-6'}>
      <div>
        <Button
          variant={'point'}
          size={'md'}
          label={'reset data'}
          onClick={() => setData(editGridData)}
        />
      </div>
      <GridBox
        title={'Editable Grid'}
        data={data}
        columns={columns}
        disabledSelectionToggle
        hideRowSelectionCheckBox
        onChange={(newData: any) => setData(newData)}
      />
    </div>
  );
};
TemplateEditGrid.storyName = '셀 편집';

// 컬럼 사이즈
export const TemplateColumnSize: any = (args: any) => {
  const data = [
    { name: '현대', code: 'H', code2: 'H' },
    { name: '현대', code: 'H', code2: 'H' },
    // { name: '현대', code: 'H', code2: 'H' },
  ];
  const columns = [
    { accessorKey: 'name', size: 100, maxSize: 100, minSize: 100, enableResizing: false },
    { accessorKey: 'code', maxSize: 100 },
    { accessorKey: 'code2', size: undefined },
  ];
  useEffect(() => {
    console.log('data', data);
  }, [data]);
  return (
    <GridBox
      title={'Editable Grid'}
      data={data}
      columns={columns}
      hideRowSelectionRadioBox={false}
    />
  );
};
TemplateColumnSize.storyName = '컬럼 사이즈';

// 테이블 모드
export const TemplateTable: any = (args: any) => {
  const data = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: getRandomId(),
      name: `name_${i}`,
      name2: `name2_${i}`,
      name3: `name3_${i}`,
      name4: `name4_${i}`,
      name5: `name5_${i}`,
    }));
  const columns = [
    { accessorKey: 'name', size: 200 },
    { accessorKey: 'name2', size: 200 },
    { accessorKey: 'name3', size: 200 },
    { accessorKey: 'name4', size: 200 },
    { accessorKey: 'name5', size: 200 },
  ];
  return <TableBox data={data} columns={columns} variant={'fill'} />;
};
TemplateTable.storyName = '테이블 모드';

// 타이틀 영역
export const TemplateTitleArea: any = (args: any) => {
  const [tableInstance, setTableInstance] = useState<Table<any>>(); // GridComponent로부터 받을 table 인스턴스를 저장할 상태

  const data = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: getRandomId(),
      name: `name_${i}`,
      name2: `name2_${i}`,
      name3: `name3_${i}`,
      name4: `name4_${i}`,
    }));
  const columns = [
    { accessorKey: 'name', size: 300 },
    { accessorKey: 'name2', size: 300 },
    { accessorKey: 'name3', size: 300 },
    { accessorKey: 'name4', size: 300 },
  ];
  const handlerUserRowSelect = () => {
    if (tableInstance) {
      const targets = data.filter((_, i) => i < 5); // 5번째 항목까지
      const newSelection = getRowSelectionByList(tableInstance, targets, 'id');
      tableInstance.setRowSelection(newSelection);
    }
  };
  return (
    <GridBox
      data={data}
      columns={columns}
      multiple
      // 좌측
      title={'목록'}
      titleCustomNode={
        <div className={'custom_info_wrap'}>
          <strong className={'table_tit'}>{'커스텀개수'}</strong>
          <span className={'count_info'}>{'5'}</span>
        </div>
      }
      guideText={'그리드 가이드 텍스트'}
      // 우측
      showColumnSettings
      showExcelDownload
      showUpload
      showSelectAll
      showRemoveAll
      customButtonNode={
        <Button
          variant="outline"
          size="sm"
          label={'특정 행 선택'}
          icon={<IcoSetting width={16} height={16} stroke="#131C30" />}
          className="btn_setting"
          onClick={handlerUserRowSelect}
        />
      }
      onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
    />
  );
};
TemplateTitleArea.storyName = '타이틀 영역';

const editGridData = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: `id_${i}`,
    text: 'text',
    textarea: 'textarea',
    number: 0,
    checkbox: true,
    radio: '',
    dropdown: '',
  }));

// 컬럼 유형
export const TemplateColumnType: any = (args: any) => {
  const data = Array(5)
    .fill(null)
    .map((_, i) => ({
      id: getRandomId(),
      text: `text_${i}`,
      number: 10000,
      date: new Date(),
      button: `button_${i}`,
      link: `link_${i}`,
    }));
  const columns = [
    { accessorKey: 'text', size: 150 },
    { accessorKey: 'number', size: 150 },
    {
      accessorKey: 'date',
      size: 170,
      cell: (info: CellContext<any, Date>) =>
        formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    },
    {
      accessorKey: 'button',
      size: 150,
      cell: (info: CellContext<any, Date>) => {
        return (
          <Button
            label={'버튼'}
            variant={'point'}
            size={'xs'}
            stopPropagation
            onClick={() => console.log('cell button click')}
          />
        );
      },
    },
    {
      accessorKey: 'link',
      size: 150,
      // cell: (info: CellContext<any, any>) => (
      //   <Link className={'text-blue-600'} to={'/'}>
      //     아이디 찾기
      //   </Link>
      // ),
    },
  ];
  return (
    <GridBox data={data} columns={columns} title={'목록'} onRowSelect={(row) => console.log(row)} />
  );
};
TemplateColumnType.storyName = '컬럼 유형';
