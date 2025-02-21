import { forwardRef } from 'react';
import { Button } from '@learnway/ui';

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
    const handleSelectedData = (newData: any) => {
      setModalData?.(newData);
    };

    return (
      <div className="p-4">
        {/*<Grid data={getDummyData.data} columns={columns} />*/}
        <h2>Grid</h2>
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
