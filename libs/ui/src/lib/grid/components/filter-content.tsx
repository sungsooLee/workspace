import { useState } from 'react';
import { useModalContext } from '../../modal/modal-context';
import { Button } from '../../shadcn/button';

interface FilterContentProps {
  column: string;
  type: 'text' | 'range' | 'select';
  initialValue: string | [number, number] | string[];
}

export const FilterContent = ({ column, type, initialValue }: FilterContentProps) => {
  const { closeModal } = useModalContext();

  const [value, setValue] = useState(
    initialValue || (type === 'range' ? [0, 0] : type === 'select' ? [] : ''),
  );

  const handleReset = () => {
    setValue(type === 'range' ? [0, 0] : type === 'select' ? [] : '');
  };
  return (
    <div className="space-y-4">
      {type === 'range' && (
        <div className="space-y-3">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">최소값</label>
            <input
              type="number"
              value={(value as [number, number])[0]}
              onChange={(e) => setValue(([_, max]) => [Number(e.target.value), max as number])}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">최대값</label>
            <input
              type="number"
              value={(value as [number, number])[1]}
              onChange={(e) => setValue(([min, _]) => [min as number, Number(e.target.value)])}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleReset}>
          초기화
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => closeModal()}>
            취소
          </Button>
          <Button onClick={() => closeModal(value)}>적용</Button>
        </div>
      </div>
    </div>
  );
};
