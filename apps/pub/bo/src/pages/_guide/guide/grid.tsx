import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, GridBox, Tooltip, Checkbox } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import { IcoDownload, IcoInfoCircle, IcoClock01, IcoClipboard, IcoCopy } from '@learnway/icons';
import { WordWrap } from './-component/word-wrap';

export const Route = createFileRoute('/_guide/guide/grid')({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageNumber, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data: any[] = [];

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
      size: 100,
      enableGrouping: false,
    }),
    columnHelper.accessor('download', {
      cell: (info) => info.getValue(),
      header: '다운로드',
      enableGrouping: false,
      size: 100,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('procedure', {
      cell: (info) => info.getValue(),
      header: '과정개설',
      size: 100,
      enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('course', {
      cell: (info) => info.getValue(),
      header: '과정명',
      size: 220,
    }),
    columnHelper.accessor('link', {
      cell: (info) => info.getValue(),
      header: '링크',
      size: 90,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('dataRange', {
      cell: (info) => info.getValue(),
      header: '데이터 접근 범위',
      size: 230,
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
import { GridBox } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

<GridBox
  data={data}
  columns={columns}
  pagination={{
    pageSize,
    pageNumber,
    totalPages: 100,
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
        <GridBox
          data={data}
          columns={columns}
          multiple
          showSelectedCount={true}
          showNumberingColumn={true}
          pagination={{
            pageSize,
            pageNumber,
            totalPages: 100,
            onPageChange: setPageIndex,
            onPageSizeChange: setPageSize,
          }}
          columnPinning={{ columns: ['firstName', 'lastName'] }}
          title="타이틀"
          titleCustomNode={
            <div className="custom_info_wrap">
              <strong className="table_tit">{'타이틀'}</strong>
              <span className="count_info">{'5'}</span>
              <span className="normal_text">{'텍스트'}</span>
            </div>
          }
          guideText={'텍스트'}
          customButtonNode={
            <>
              <Checkbox label={'나의 학습자원'} size={'md'} />
              <Button
                label={'프로그램/가이드 다운로드'}
                icon={<IcoDownload width={16} height={16} stroke={'#4C515E'} />}
              />
              <Button label={'일괄설정'} variant={'text'} />
              <Button label={'복사'} icon={<IcoCopy width={16} height={16} stroke={'#131c30'} />} />
            </>
          }
        />
      </div>
    </div>
  );
}
