import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import { Tabs, GridBox, Button, DatePicker } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

/* style */
import styles from './channel-role-info.module.css';

const ChannelRoleInfoComponent: FC<{}> = ({}) => {
  // tab
  const tabItems = [
    {
      title: '채널  소유자',
      key: 'tab01',
      content: '',
    },
    {
      title: '채널 구성원',
      key: 'tab02',
      content: '',
    },
    {
      title: '채널 게스트',
      key: 'tab03',
      content: '',
    },
  ];
  // grid
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const columnHelper = createColumnHelper<any>();
  const data: any[] = [
    {
      sort: '사내',
      company: '회사명',
      group: '조직명',
      name: <Button className="link" label={'김현대'} />,
      userID: '김현대',
      startDay: <DatePicker displayType={'day'} size={'md'} />,
      endDay: <DatePicker displayType={'day'} size={'md'} />,
    },
  ];
  const columns = [
    columnHelper.accessor('sort', {
      cell: (info) => info.getValue(),
      header: '구분',
      size: 80,
      enableGrouping: false,
    }),
    columnHelper.accessor('company', {
      cell: (info) => info.getValue(),
      header: '회사',
      size: 230,
      enableGrouping: false,
    }),
    columnHelper.accessor('group', {
      cell: (info) => info.getValue(),
      header: '조직',
      size: 230,
      enableGrouping: false,
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: '이름',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('userID', {
      cell: (info) => info.getValue(),
      header: '사용자ID',
      size: 160,
      enableGrouping: false,
    }),
    columnHelper.accessor('startDay', {
      cell: (info) => info.getValue(),
      header: '권한시작일',
      size: 290,
      enableGrouping: false,
    }),
    columnHelper.accessor('endDay', {
      cell: (info) => info.getValue(),
      header: '권한종료일',
      size: 290,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <div className={cn(styles.start)}>
      <Tabs items={tabItems} type="line" size={'sm'} selectedTabKey={'tab01'} />
      <GridBox
        data={data}
        columns={columns}
        showSelectedCount={true}
        showNumberingColumn={true}
        pagination={{
          pageSize,
          pageIndex,
          totalRows: 100,
          onPageChange: setPageIndex,
          onPageSizeChange: setPageSize,
        }}
        title="목록"
        height={440}
      />
    </div>
  );
};

ChannelRoleInfoComponent.displayName = 'ChannelRoleInfo';
export const ChannelRoleInfo = ChannelRoleInfoComponent;
