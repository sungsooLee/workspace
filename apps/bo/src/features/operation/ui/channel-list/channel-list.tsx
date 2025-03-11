import { forwardRef } from 'react';
import { Grid } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export interface ChannelListProps {
  dummy?: boolean;
  setModalData?: (data?: any) => void; // modal content 로 사용시 사용
}

/**
 * 채널 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ChannelListComponent = forwardRef<HTMLDivElement, ChannelListProps>(
  ({ setModalData, ...props }, ref) => {
    const { data: gridData }: any = getMockData();
    const columnHelper = createColumnHelper<any>();
    const columns = [
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: '채널명',
      }),
    ] as ColumnDef<object, unknown>[];

    const handleRowSelect = (row: any) => {
      setModalData?.(row);
    };

    return (
      <div className="p-4">
        <h2>Grid</h2>
        <Grid data={gridData} columns={columns} hideColumnSettings onRowSelect={handleRowSelect} />
      </div>
    );
  },
);
export const ChannelList = ChannelListComponent;

const getMockData = () => {
  return {
    data: Array(5)
      .fill(null)
      .map((d, i) => ({ id: `id${i}`, name: `channel${i}` })),
  };
};
