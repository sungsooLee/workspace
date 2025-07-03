import React from 'react';
import { Button } from '../../button/button';

interface CustomCellProps<T> {
  row: T;
  value: string;
  imageUrl?: string;
  onAction?: (row: T) => void;
}

const CustomCell = <T extends object>({ row, value, imageUrl, onAction }: CustomCellProps<T>) => {
  const handleAction = () => {
    if (onAction) {
      onAction(row);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <span className="flex-1">{value}</span>
      <Button
        size="sm"
        className="link"
        onClick={(e) => {
          e.stopPropagation();
          handleAction();
        }}>
        더보기
      </Button>
    </div>
  );
};

export { CustomCell };
