/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import { Meta, StoryObj } from '@storybook/react/*';
import {
  CellContext,
  ColumnFiltersState,
  createColumnHelper,
  SortingState,
  Table,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryConfigProvider } from '@learnway/config';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  Button,
  CountText,
  EditCheckboxCell,
  EditDropdownCell,
  EditInputCell,
  EditRadioCell,
  EditTextareaCell,
  Grid,
  GridBox,
  GridBoxPagination,
  GridBoxSearchInputCondition,
  GridState,
  ModalWrapper,
  TableBox,
} from '@learnway/ui';
import { IcoDownload, IcoSetting, IcoArrowDown, IcoArrowUp } from '@learnway/icons';
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
  subRows?: Person[]; // 하위 행 추가
  expand?: any;
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
    cell: (info) => {
      return info.getValue();
    },
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
    ),
  ],
  render: () => <BaseTable />,
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

// 하위 행을 생성하는 헬퍼 함수 (depth 1만 생성)
const createSubRows = (parentIndex: number, count: 2): Person[] => {
  return Array.from({ length: count }).map((_, subIndex) => ({
    firstName: `Sub ${parentIndex}-${subIndex + 1}`,
    lastName: `SubSurname ${parentIndex}-${subIndex + 1}`,
    age: Math.floor(Math.random() * 30) + 15,
    visits: Math.floor(Math.random() * 50),
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    progress: Math.floor(Math.random() * 100),
    preview: <Button className="link">하위 미리보기</Button>,
    download: (
      <Button className="download" onlyIcon>
        <IcoDownload width={16} height={16} stroke={'#747D91'} />
      </Button>
    ),
  }));
};

const fetchInfiniteData = async ({ tableState }: any): Promise<Person[]> => {
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
    subRows: index % 2 === 1 ? createSubRows(index, 2) : undefined,
  }));

  return data;
};
// 가상 스크롤
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

// 페이지네이션 테이블 컴포넌트
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
const PaginationTable = () => {
  const [data, setData] = useState<PaginationResponse<Person>>();
  const [pagination, setPagination] = useState<GridBoxPagination>({
    pageNumber: 0,
    pageSize: 20,
    totalPages: 100,
    onPageChange: (newPageNumber: number) =>
      setPagination((state: GridBoxPagination) => ({ ...state, pageNumber: newPageNumber })),
    onPageSizeChange: (newPageSize: number) =>
      setPagination((state: GridBoxPagination) => ({
        ...state,
        pageNumber: 0,
        pageSize: newPageSize,
      })),
  });
  useEffect(() => {
    const response = fetchPaginatedData(pagination.pageNumber, pagination.pageSize);
    setData(response);
  }, [pagination]);

  return (
    <div className="p-4">
      <GridBox
        data={data?.content}
        columns={columns}
        multiple={true}
        pagination={pagination}
        showNumberingColumn
      />
    </div>
  );
};

// 데이터 그룹핑 (컬럼 기준)
export const WithGroupColumn: Story = {
  name: '데이터 그룹핑 (컬럼 기준)',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <GridContentGroupingByColumn />,
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

const GridContentGroupingByColumn = () => {
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

// 고정 컬럼
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
        showNumberingColumn
        columnPinning={{ columns: ['status'] }}
      />
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
      cell: (info: CellContext<any, string>) => (
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
    { name: '현대', code: 'H', code2: 'H21o3j12op3j12po312op3j12op3j1poj231po12j3poj' },
    { name: '현대', code: 'H', code2: 'H' },
  ];

  const columnHelper = createColumnHelper();
  const columns = [
    // columnHelper.accessor('name', { header: 'size: 100', size: 100 }),
    columnHelper.accessor('name', { header: 'size: 200', size: 200 }),
    columnHelper.accessor('name', { header: 'size: 200', size: 200 }),
    columnHelper.accessor('code2', {
      header: 'auto (size 설정안함)',
      size: 111,
      meta: { size: 'auto' },
    }),
  ];
  useEffect(() => {
    console.log('data', data);
  }, [data]);
  return (
    <GridBox
      title={'Editable Grid'}
      data={data}
      columns={columns}
      // hideRowSelectionRadioBox={false}
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
    { accessorKey: 'name2', size: 200, meta: { size: 'auto' } },
    { accessorKey: 'name3', size: 200, meta: { size: 'auto' } },
    { accessorKey: 'name4', size: 200, meta: { size: 'auto' } },
    { accessorKey: 'name5', size: 200, meta: { size: 'auto' } },
  ];
  return <TableBox data={data} columns={columns} variant={'fill'} />;
};
TemplateTable.storyName = '테이블 모드';

// 타이틀 영역
export const TemplateTitleArea: any = (args: any) => {
  const [tableInstance, setTableInstance] = useState<Table<any>>(); // Grid 로부터 받을 table 인스턴스를 저장할 상태
  const [data, setData] = useState<any[]>(dummyData());
  const columns = [
    { accessorKey: 'name', header: '이름', size: 300, searchable: true },
    { accessorKey: 'age', header: '나이', size: 300, searchable: true },
    { accessorKey: 'name3', header: 'name3', size: 300 },
    { accessorKey: 'name4', header: 'name4', size: 300 },
  ];

  const handlerUserRowSelect = () => {
    if (tableInstance) {
      const targets = data.filter((_, i) => i < 2); // 2번째 항목까지
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
      titleCustomNode={<CountText label={'커스텀개수'} count={5} />}
      guideText={'그리드 가이드 텍스트'}
      // 우측
      showColumnSettings
      showExcelDownload
      showUpload
      showSelectAll
      showRemoveAll
      customButtonNode={
        <>
          <Button
            variant="outline"
            size="sm"
            label={'초기화'}
            icon={<IcoSetting width={16} height={16} stroke="#131C30" />}
            className="btn_setting"
            onClick={() => setData(dummyData())}
          />
          <Button
            variant="outline"
            size="sm"
            label={'특정 행 선택'}
            icon={<IcoSetting width={16} height={16} stroke="#131C30" />}
            className="btn_setting"
            onClick={handlerUserRowSelect}
          />
        </>
      }
      onRemoveAllClick={() => setData([])}
      onSearchClick={(condition: GridBoxSearchInputCondition) =>
        console.log('onSearchClick', condition)
      }
      onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
    />
  );
};
TemplateTitleArea.storyName = '타이틀 영역';

// 컬럼 정렬
export const TemplateColumnAlign: any = (args: any) => {
  const data = dummyData(5);
  const columns = [
    {
      accessorKey: 'name',
      header: 'Header left',
      size: 100,
      meta: { headerAlign: 'left' },
      columns: [
        {
          accessorKey: 'name',
          header: 'Cell left',
          size: 100,
          meta: { headerAlign: 'left', cellAlign: 'left' },
        },
        {
          accessorKey: 'name',
          header: 'Cell center',
          size: 100,
          meta: { headerAlign: 'left', cellAlign: 'center' },
        },
        {
          accessorKey: 'name',
          header: 'Cell right',
          size: 100,
          meta: { headerAlign: 'left', cellAlign: 'right' },
        },
      ],
    },
    {
      accessorKey: 'name',
      header: 'Header center',
      size: 100,
      meta: { headerAlign: 'center' },
      columns: [
        {
          accessorKey: 'name',
          header: 'Cell left',
          size: 100,
          meta: { headerAlign: 'center', cellAlign: 'left' },
        },
        {
          accessorKey: 'name',
          header: 'Cell center',
          size: 100,
          meta: { headerAlign: 'center', cellAlign: 'center' },
        },
        {
          accessorKey: 'name',
          header: 'Cell right',
          size: 100,
          meta: { headerAlign: 'center', cellAlign: 'right' },
        },
      ],
    },
    {
      accessorKey: 'name',
      header: 'Header right',
      size: 100,
      meta: { headerAlign: 'right' },
      columns: [
        {
          accessorKey: 'name',
          header: 'Cell left',
          size: 100,
          meta: { headerAlign: 'right', cellAlign: 'left' },
        },
        {
          accessorKey: 'name',
          header: 'Cell center',
          size: 100,
          meta: { headerAlign: 'right', cellAlign: 'center' },
        },
        {
          accessorKey: 'name',
          header: 'Cell right',
          size: 100,
          meta: { headerAlign: 'right', cellAlign: 'right' },
        },
      ],
    },
  ];
  return <GridBox data={data} columns={columns} />;
};
TemplateColumnAlign.storyName = '컬럼 정렬';

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
    },
  ];
  return (
    <GridBox data={data} columns={columns} title={'목록'} onRowSelect={(row) => console.log(row)} />
  );
};
TemplateColumnType.storyName = '컬럼 유형';

// 그룹 컬럼
export const TemplateGroupColumn: any = (args: any) => {
  const data = dummyData(20);
  const columns = [
    {
      accessorKey: 'name',
      header: 'Group A',
      meta: { headerAlign: 'center' },
      columns: [
        { accessorKey: 'name', header: 'Group A-1' },
        { accessorKey: 'name', header: 'Group A-2' },
      ],
    },
    // { accessorKey: 'name', header: 'Column A', meta: { verticalAlign: 'middle' } },
    {
      accessorKey: 'name',
      header: 'Group B',
      meta: { headerAlign: 'center' },
      columns: [
        { accessorKey: 'name', header: 'Group B-1' },
        { accessorKey: 'name', header: 'Group B-2' },
        {
          header: 'Group B-3',
          columns: [
            { accessorKey: 'name', header: 'Group B-3-1' },
            { accessorKey: 'name', header: 'Group B-3-2' },
          ],
        },
      ],
    },
  ];
  return (
    <GridBox data={data} columns={columns} title={'목록'} onRowSelect={(row) => console.log(row)} />
  );
};
TemplateGroupColumn.storyName = '그룹 컬럼';

// -------------------------------------------------
//
// -------------------------------------------------
const dummyData = (size = 10) =>
  Array(size)
    .fill(null)
    .map((_, i) => ({
      id: getRandomId(),
      name: `name_${i}`,
      age: `${i}`,
      name3: `name3_${i}`,
      name4: `name4_${i}`,
    }));

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

// 페이지네이션용 mock API
const fetchPaginatedData = (pageNumber = 0, pageSize = 10): PaginationResponse<any> => {
  const content = Array(pageSize)
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
  const totalElements = 100;
  return {
    content,
    totalPages: Math.ceil(totalElements / pageSize),
    totalElements,
    size: 10,
    number: 1,
    numberOfElements: 1,
    first: true,
    last: false,
    empty: false,
    pageable: {
      offset: 0,
      pageSize,
      paged: true,
      pageNumber,
      unpaged: false,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
    },
  };
};

const expandedColumns = [
  columnHelper.accessor('expand', {
    cell: ({ row, getValue }) => {
      return (
        <>
          {row.getCanExpand() && (
            <Button
              onClick={row.getToggleExpandedHandler()}
              onlyIcon={true}
              icon={
                row.getIsExpanded() ? (
                  <IcoArrowUp width={16} height={16} stroke={'#6F798B'} />
                ) : (
                  <IcoArrowDown width={16} height={16} stroke={'#6F798B'} />
                )
              }
              aria-expanded={row.getIsExpanded()}
            />
          )}
        </>
      );
    },
    header: 'expand',
    enableGrouping: true,
    size: 55,
    meta: {
      headerAlign: 'center', // 헤더만 가운데 정렬
      cellAlign: 'center', // 셀은 오른쪽 정렬
    },
  }),
  columnHelper.accessor('age', {
    cell: ({ row, getValue }) => {
      return (
        // <div
        //   style={{
        //     paddingLeft: `${row.depth * 2}rem`,
        //   }}
        // >

        // </div>
        <>{getValue<number>()}</>
      );
    },
    header: 'Age',
    meta: {
      filterType: 'range',
    },
    enableGrouping: true,
  }),
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
  // columnHelper.accessor('preview', {
  //   cell: (info) => info.getValue(),
  //   header: '미리보기',
  //   enableGrouping: false,
  // }),
  // columnHelper.accessor('download', {
  //   cell: (info) => info.getValue(),
  //   header: 'download',
  //   enableGrouping: false,
  //   meta: {
  //     headerAlign: 'left', // 헤더만 가운데 정렬
  //     cellAlign: 'center', // 셀은 오른쪽 정렬
  //   },
  // }),
];

const ExpandedTable = () => {
  const [tableState, setTableState] = useState({
    sorting: [] as SortingState,
    filters: [] as ColumnFiltersState,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['PersonEntity', tableState] as const,
    queryFn: () => fetchInfiniteData({ tableState }),
  });

  return (
    <div className="p-4">
      <GridBox data={data || []} columns={expandedColumns} isLoading={isLoading} />
    </div>
  );
};
// 확장 컬럼
export const WithExpandColumn: Story = {
  name: '확장 컬럼',
  decorators: [
    (Story) => (
      <ReactQueryConfigProvider>
        <Story />
        <ModalWrapper />
      </ReactQueryConfigProvider>
    ),
  ],
  render: () => <ExpandedTable />,
};
