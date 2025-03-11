import { forwardRef } from 'react';
import { Button, useModal } from '@learnway/ui';
import { ColumnDef, createColumnHelper, RowSelectionState } from '@tanstack/react-table';

export interface TeacherListProps {
  dummy?: boolean;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const TeacherListComponent = forwardRef<HTMLDivElement, TeacherListProps>(({ ...props }, ref) => {
  const { close: closeModal } = useModal();
  const { data }: any = getDummyDataHook();
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

  const handleConfirmClick = () => {
    closeModal({ id: `1`, name: `name1` });
  };

  return (
    <div className="p-4">
      <h2>Grid</h2>
      <Button
        variant={'gray'}
        size={'md'}
        label={'name1'}
        onClick={() => closeModal({ id: '1', name: 'name1' })}
      />
      <Button
        variant={'gray'}
        label={'name2'}
        size={'md'}
        onClick={() => closeModal({ id: '2', name: 'name2' })}
      />
      <Button onClick={handleConfirmClick}>확인</Button>
    </div>
  );
});
export const TeacherList = TeacherListComponent;

const getDummyDataHook = () => {
  return {
    data: {
      data: Array(5)
        .fill(null)
        .map((d, i) => ({ id: `id${i}`, name: `name${i}` })),
    },
  };
};

const getDummyData = {
  data: Array(5)
    .fill(null)
    .map((d, i) => ({ id: `id${i}`, name: `name${i}` })),
};
