import { useState } from 'react';

interface FilterPopupProps {
  column: string;
  type: 'text' | 'range' | 'select';
  onClose: () => void;
  onApply: (value: string | [number, number] | string[]) => void;
  //   options :
}

export const FilterPopup = ({ column, type, onClose, onApply }: FilterPopupProps) => {
  const [value, setValue] = useState<string | [number, number] | string[]>(
    type === 'range' ? [0, 0] : type === 'select' ? [] : '',
  );

  return (
    <div className="absolute z-10  bg-white border rounded-lg shadow-lg p-4 min-w-[250px]">
      {type === 'range' && (
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min"
            onChange={(e) => setValue((old: any) => [Number(e.target.value), old[1]])}
            className="w-full border rounded p-1"
          />
          <input
            type="number"
            placeholder="Max"
            onChange={(e) => setValue((old: any) => [old[0], Number(e.target.value)])}
            className="w-full border rounded p-1"
          />
        </div>
      )}

      {type === 'select' && (
        <div className="space-y-2">
          {/* {options.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={(value as string[]).includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue((old: any) => [...old, option.value]);
                  } else {
                    setValue((old: any) => old.filter((v: string) => v !== option.value));
                  }
                }}
              />
              <span className="ml-2">{option.label}</span>
            </label>
          ))} */}
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        <button onClick={onClose} className="px-3 py-1 border rounded hover:bg-gray-100">
          취소
        </button>
        <button
          onClick={() => onApply(value)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          적용
        </button>
      </div>
    </div>
  );
};
