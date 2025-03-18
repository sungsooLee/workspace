import { createFileRoute } from '@tanstack/react-router';
import { Button, Grid } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoDownload } from '@learnway/icons';

export const Route = createFileRoute('/_guide/guide/grid')({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'Active',
      progress: 50,
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      status: 'active',
      progress: 80,
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
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
      preview: (
        <Link to={'/'} className="link">
          미리보기
        </Link>
      ),
      download: (
        <Button className="download" onlyIcon>
          <IcoDownload width={16} height={16} stroke={'#747D91'} />
        </Button>
      ),
    },
  ];

  const columnHelper = createColumnHelper<any>();

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
  ] as ColumnDef<any, unknown>[];

  return (
    <div className="content">
      <div className="nlp--titlewrap">
        <h2 className="guide_tit2">Grid Table Component Guide(작업중)</h2>
        <p className="loc react">/libs/ui/src/lib/grid/</p>
        <p className="info">케이스가 많아 케이스 추가될때 해당 스타일 적용 필요</p>
        <div className="code_example">
          <pre className="code_block">
            <code>
              {`// 초기 import
import { Grid } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

<Grid
  data={data}
  columns={columns}
  pagination={{
    pageSize,
    pageIndex,
    totalRows: 100,
    onPageChange: setPageIndex,
    onPageSizeChange: setPageSize,
  }}
/>
`}
            </code>
          </pre>
        </div>
        <div className="group">
          <h3 className="guide_tit3">Grid Example</h3>
        </div>
        <Grid
          data={data}
          columns={columns}
          pagination={{
            pageSize,
            pageIndex,
            totalRows: 100,
            onPageChange: setPageIndex,
            onPageSizeChange: setPageSize,
          }}
          title="타이틀"
        />
      </div>
    </div>
  );
}
