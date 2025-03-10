import { forwardRef } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export interface TeacherListProps {
  dummy?: boolean;
  setModalData?: (data?: any) => void; // modal content 로 사용시 사용
}

/**
 * 강사 리스트
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ManagerListComponent = forwardRef<HTMLDivElement, TeacherListProps>(
  ({ setModalData, ...props }, ref) => {
    const { data: gridData }: any = getMockData();
    const columnHelper = createColumnHelper<any>();
    const columns = [
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: '강사명',
      }),
    ] as ColumnDef<object, unknown>[];

    const handleRowSelect = (row: any) => {
      setModalData?.(row);
    };

    return (
      <div className="p-4">
        <h2>Grid</h2>
      </div>
    );
  },
);
export const CourseTypeOptionCard = ManagerListComponent;

const getMockData = () => {
  return {
    data: Array(5)
      .fill(null)
      .map((d, i) => ({ id: `id${i}`, name: `manager${i}` })),
  };
};
