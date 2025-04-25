import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import { TableBox } from '@learnway/ui';

import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createFileRoute('/_layout/pms/menu-channel-detail-management')({
  component: RouteComponent,
});

function RouteComponent() {
  const columnHelper = createColumnHelper<any>();
  //   const data = [
  //     {
  //       applyID: <strong className="tbody_th">{'신청 ID'}</strong>,
  //       data1: 'dd147852223',
  //       channelName: <strong className="tbody_th">{'채널명'}</strong>,
  //       data2: '채널명0000000000000000000000000000000000000',
  //     },
  //   ];

  //   const columns = [
  //     columnHelper.accessor('applyID', { cell: (info) => info.getValue() }),
  //     columnHelper.accessor('data1', { cell: (info) => info.getValue() }),
  //     columnHelper.accessor('channelName', { cell: (info) => info.getValue() }),
  //     columnHelper.accessor('data2', { cell: (info) => info.getValue() }),
  //     columnHelper.accessor('tenantSetting', { cell: (info) => info.getValue() }),
  //     columnHelper.accessor('data3', { cell: (info) => info.getValue() }),
  //     columnHelper.accessor('channelAddress', { cell: (info) => info.getValue() }),
  //     columnHelper.accessor('data4', { cell: (info) => info.getValue() }),
  //   ];
  const columns = [
    columnHelper.accessor('fruit', { header: 'Fruit' }),
    columnHelper.accessor('quantity', { header: 'Qty' }),
    columnHelper.accessor('price', { header: 'Price' }),
  ];

  const data = [
    {
      fruit: 'Apple',
      quantity: 10,
      price: 1.2,
      note: 'Seasonal fruit',
    },
    {
      fruit: 'Banana',
      quantity: 20,
      price: 0.8,
      note: 'Imported from Ecuador',
    },
  ];

  return (
    <form className="form_row">
      <PageContainer>
        {/* main_contents */}
        <div className={styles.main_contents}>
          <TableBox
            data={data}
            columns={columns}
            showTotalCount={false}
            showColumnSettings={false}
            tableMode={true}
            hideHeader={true}
            title="신청정보"
          />
        </div>
      </PageContainer>
    </form>
  );
}
