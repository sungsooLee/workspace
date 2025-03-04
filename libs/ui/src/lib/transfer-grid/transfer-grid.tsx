import React, { forwardRef, useRef, useState } from 'react';

import { cn } from '@learnway/shared';

import styles from './transfer-grid.module.css';
import { Button } from '../button/button';
import { ColumnDef } from '@tanstack/react-table';
import { Grid } from '../grid';
import { GridImperative } from '@/libs/ui/src';

export interface TransferGridProps {
  columns: ColumnDef<object>[]; // 그리드 컬럼
  gridData: any; // 그리드 데이터
  rowKey: string;
  className?: string;
  leftTitle?: string; // 좌측 그리드 title
  rightTitle?: string; // 우측 그리드 title
  onChange?: (newGridData: any) => void;
}

const TransferGridComponent = forwardRef<HTMLElement, TransferGridProps>(
  ({ gridData = [], columns, rowKey, className, leftTitle, rightTitle, onChange, ...props }) => {
    const [leftGridData, setLeftGridData] = useState<any>(gridData);
    const [rightGridData, setRightGridData] = useState<any>([]);
    const leftGridRef = useRef<GridImperative>(null);
    const rightGridRef = useRef<GridImperative>(null);

    const leftGridColumns: ColumnDef<object>[] = [
      ...columns,
      {
        accessorKey: 'select-col',
        header: ({ table }) => '선택',
        cell: ({ row }) => (
          <div>
            <Button
              label={'선택'}
              variant={
                rightGridData?.find((d: any) => d[rowKey] === (row?.original as any)?.[rowKey])
                  ? 'primary'
                  : 'point'
              }
              size={'sm'}
              onClick={() => handleLeftRowSelect(row.original)}
            />
          </div>
        ),
      },
    ];

    const rightGridColumns: ColumnDef<object>[] = [
      ...columns,
      {
        accessorKey: 'select-col',
        header: ({ table }) => '선택',
        cell: ({ row }) => (
          <div>
            <Button
              label={'선택'}
              variant={'point'}
              size={'sm'}
              onClick={() => handleRightRowSelect(row.original)}
            />
          </div>
        ),
      },
    ];

    const handleLeftRowSelect = (selectedRow: any) => {
      console.log(selectedRow);
      const isDelete = rightGridData.find((d: any) => d[rowKey] === selectedRow[rowKey]);
      const appendedData = [...rightGridData, selectedRow];
      const deletedData = rightGridData?.filter((d: any) => d[rowKey] !== selectedRow[rowKey]);
      const newRightGridData = isDelete ? deletedData : appendedData;
      setRightGridData(newRightGridData);
    };

    const handleRightRowSelect = (selectedRow: any) => {
      const newRightGridData = rightGridData?.filter((d: any) => d[rowKey] !== selectedRow[rowKey]);
      setRightGridData(newRightGridData);
    };

    return (
      <div
        className={cn(
          styles.start,
          className,
          'nlp--transfer-grid',
          'flex h-[300px] flex-row bg-amber-100',
        )}>
        {/* left grid */}
        <div>
          <Grid
            ref={leftGridRef}
            title={leftTitle}
            data={leftGridData}
            columns={leftGridColumns}
            hideColumnSettings
            multiSelectable
            enableRowSelectionToggle={false}
          />
        </div>
        <div>
          <Grid
            ref={rightGridRef}
            title={rightTitle}
            data={rightGridData}
            columns={rightGridColumns}
            hideColumnSettings
            multiSelectable
            enableRowSelectionToggle={false}
          />
        </div>
      </div>
    );
  },
);

export const TransferGrid = TransferGridComponent;
