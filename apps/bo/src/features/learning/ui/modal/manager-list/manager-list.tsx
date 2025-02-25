import { forwardRef } from 'react';
import { Button, Grid } from '@learnway/ui';
import { ColumnDef, createColumnHelper, RowSelectionState } from '@tanstack/react-table';

export interface TeacherListProps {
  dummy?: boolean;
  setModalData?: (data?: any) => void; // modal content 로 사용시 사용
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ManagerListComponent = forwardRef<HTMLDivElement, TeacherListProps>(
  ({ setModalData, ...props }, ref) => {
    const { data: gridData }: any = getDummyDataHook();
    const columnHelper = createColumnHelper<any>();
    const columns = [
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: '강사명',
      }),
    ] as ColumnDef<any, unknown>[];

    const handleRowSelect = (selectRowState: RowSelectionState) => {
      // console.log(selectRowState);
    };

    const handleSelectedData = (newData: any) => {
      setModalData?.(newData);
    };

    return (
      <div className="p-4">
        <h2>Grid</h2>
        <Grid data={gridData} columns={columns} />
        <Button
          variant={'gray'}
          size={'md'}
          label={'set manager1'}
          onClick={() => handleSelectedData({ id: '1', name: 'manager1' })}
        />
        <Button
          variant={'gray'}
          label={'get manager2'}
          size={'md'}
          onClick={() => handleSelectedData({ id: '2', name: 'manager2' })}
        />
      </div>
    );
  },
);
export const ManagerList = ManagerListComponent;

const getDummyDataHook = () => {
  return {
    data: {
      data: Array(5)
        .fill(null)
        .map((d, i) => ({ id: `id${i}`, name: `manager${i}` })),
    },
  };
};
