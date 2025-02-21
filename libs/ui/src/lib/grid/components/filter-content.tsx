import { useState } from 'react';
import { Input } from '../../input/input';
import '../grid.css';
import { debounce } from 'lodash'; // grid CSS
import { Button } from '../../button/button';
import { useModal } from '../../modal/modal.hook';

interface FilterContentProps {
  column: string;
  type: 'text' | 'range' | 'select';
  // initialValue: string | [number, number] | string[];
  initialValue: unknown;
  onApply: (value: any) => void;
  // 여러 가지 선택 사항을 위한 props
  options?: {
    label: string;
    value: string;
  }[];
}

export const FilterContent = ({
  column,
  type,
  initialValue,
  onApply,
  options = [],
}: FilterContentProps) => {
  const { close: closeModal } = useModal();

  const getInitialValue = () => {
    if (type === 'range') {
      if (Array.isArray(initialValue) && initialValue.length === 2) {
        return initialValue as [number, number];
      }
      return [0, 0] as [number, number];
    }
    if (type === 'select') {
      return (initialValue as string[]) || [];
    }
    return (initialValue as string) || '';
  };

  const [value, setValue] = useState<string | [number, number] | string[]>(getInitialValue());

  const handleReset = () => {
    setValue(type === 'range' ? [0, 0] : type === 'select' ? [] : '');
  };

  const handleApply = () => {
    onApply(value);
    closeModal();
  };
  return (
    <div className="space-y-4">
      {type === 'range' && (
        <div className="space-y-3">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">최소값</label>
            <Input
              type="number"
              value={(value as [number, number])[0]}
              onChange={(e) => setValue(([_, max]) => [Number(e.target.value), max as number])}
              className="w-full rounded border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">최대값</label>
            <Input
              type="number"
              value={(value as [number, number])[1]}
              onChange={(e) => setValue(([min, _]) => [min as number, Number(e.target.value)])}
              className="w-full rounded border p-2"
            />
          </div>
        </div>
      )}

      {type === 'text' && (
        <Input
          value={typeof value === 'string' ? value : ''}
          onChange={debounce((value) => {
            setValue(value as string);
          }, 100)}
          placeholder="Search..."
          className="w-full"
        />
      )}

      {/* {type === 'select' && (
        <div className="min-h-[200px]">
          <MultiSelect
            options={options}
            value={value as string[]}
            onChange={(newValue) => setValue(newValue)}
            placeholder="필터를 설정한 옵션을 선택하세요.."
            maxCount={5}
          />
        </div>
      )} */}

      <div className="modal_button">
        <Button variant="ghost" onClick={handleReset}>
          초기화
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => closeModal()}>
            취소
          </Button>
          <Button onClick={handleApply}>적용</Button>
        </div>
      </div>
    </div>
  );
};
