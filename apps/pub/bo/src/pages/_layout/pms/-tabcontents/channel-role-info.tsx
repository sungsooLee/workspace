import { FC, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Tabs, GridBox, Button } from '@learnway/ui';
import { IcoMinus } from '@learnway/icons';
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
  const columns = [
    columnHelper.accessor('firstName', {
      header: 'First Name',
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];
  const data: any[] = [
    {
      firstName: 'tanner',
    },
    {
      firstName: 'tanner',
    },
  ];
  return (
    <div className={cn(styles.start)}>
      <Tabs items={tabItems} type="line" size={'sm'} selectedTabKey={'tab01'} />
      <GridBox
        data={data}
        columns={columns}
        showSelectedCount={true}
        showNumberingColumn={false}
        multiple
        pagination={{
          pageSize,
          pageIndex,
          totalRows: 100,
          onPageChange: setPageIndex,
          onPageSizeChange: setPageSize,
        }}
        title="목록"
        customButtonNode={
          <Button
            variant="outline"
            size="sm"
            label={'삭제'}
            icon={<IcoMinus width={16} height={16} stroke="#131C30" />}
          />
        }
        showAdd={true}
      />
    </div>
  );
};

ChannelRoleInfoComponent.displayName = 'ChannelRoleInfo';
export const ChannelRoleInfo = ChannelRoleInfoComponent;
