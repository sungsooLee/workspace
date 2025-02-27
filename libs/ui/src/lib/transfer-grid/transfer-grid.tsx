import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@learnway/shared';

import styles from './transfer-grid.module.css';
import { Button } from '../button/button';
import { ColumnDef } from '@tanstack/react-table';
import { Grid } from '../grid';
import { IcoChevronLeft, IcoChevronRight } from '@learnway/icons';
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
    const [selectedItems, setSelectedItems] = useState<any>();
    const [leftGridData, setLeftGridData] = useState<any>(gridData);
    const [rightGridData, setRightGridData] = useState<any>([]);
    const [leftSelectedRows, setLeftSelectedRows] = useState<any>();
    const [rightSelectedRows, setRightSelectedRows] = useState<any>();
    const leftGridRef = useRef<GridImperative>(null);
    const rightGridRef = useRef<GridImperative>(null);

    useEffect(() => {
      // selectedItems && onChange?.(selectedItems);
    }, [selectedItems]);

    const handleAppendClick = (event: React.MouseEvent) => {
      // 좌측 그리드 데이터 갱신 : 좌측 그리드 데이터 - 좌측 그리드 선택된 rows
      const newLeftGridData = leftGridData?.filter(
        (d: any) => !leftSelectedRows?.find((x: any) => x[rowKey] === d[rowKey]),
      );
      setLeftGridData(newLeftGridData);

      // 우측 그리드 데이터 갱신 : 우측 그리드 데이터 + 좌측 그리드 선택된 rows
      const newRightGridData = [...rightGridData, ...leftSelectedRows];
      setRightGridData(newRightGridData);

      // 좌측 우측 그리드 선택 초기화
      leftGridRef.current?.resetRowSelection();
      // rightGridRef.current?.resetRowSelection();
    };

    const handleRemoveClick = (event: React.MouseEvent) => {
      // 좌측 그리드 데이터 갱신 : 좌측 그리드 데이터 + 우측 그리드 선택된 rows
      const newLeftGridData = [...leftGridData, ...rightSelectedRows];
      setLeftGridData(newLeftGridData);

      // 우측 그리드 데이터 갱신 : 우측 그리드 데이터 - 우측 그리드 선택된 rows
      const newRightGridData = rightGridData?.filter(
        (d: any) => !rightSelectedRows?.find((x: any) => x[rowKey] === d[rowKey]),
      );
      setRightGridData(newRightGridData);

      // 좌측 우측 그리드 선택 초기화
      // leftGridRef.current?.resetRowSelection();
      rightGridRef.current?.resetRowSelection();
    };

    const onChangeRightGrid = (newItems: any) => {
      setSelectedItems(newItems);
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
          {
            <Grid
              ref={leftGridRef}
              title={leftTitle}
              data={leftGridData}
              columns={columns}
              hideColumnSettings
              multiSelectable
              onRowsSelect={(newSelectedRows) => setLeftSelectedRows(newSelectedRows)}
            />
          }
        </div>
        {/* buttons */}
        <div>
          <Button
            icon={<IcoChevronLeft width={32} height={32} fill="#4C515E" />}
            onClick={handleRemoveClick}
          />
          <Button
            icon={<IcoChevronRight width={32} height={32} fill="#4C515E" />}
            onClick={handleAppendClick}
          />
          {/*<Button icon={<IcoChevronRight />} label={'x'} />*/}
        </div>
        {/* right grid */}
        <div>
          {
            <Grid
              ref={rightGridRef}
              title={rightTitle}
              data={rightGridData}
              columns={columns}
              hideColumnSettings
              multiSelectable
              onRowsSelect={(newSelectedRows) => setRightSelectedRows(newSelectedRows)}
            />
          }
        </div>
      </div>
    );
  },
);

export const TransferGrid = TransferGridComponent;
