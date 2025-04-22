import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@learnway/shared';

import styles from './transfer-tree-grid.module.css';
import { Button } from '../button/button';
import { ColumnDef } from '@tanstack/react-table';
import { TreeView } from '../tree-view/tree';
import { IcoChevronLeft, IcoChevronRight } from '@learnway/icons';
import { GridBox } from '../grid/grid-box';
import { GridImperative } from '../grid/types';

export interface TransferTreeGridProps {
  columns: ColumnDef<object>[]; // 그리드 컬럼
  treeData: any; // 그리드 데이터
  rowKey: string;
  className?: string;
  leftTitle?: string; // 좌측 그리드 title
  rightTitle?: string; // 우측 그리드 title
  onChange?: (newGridData: any) => void;
}

const TransferTreeGridComponent = forwardRef<HTMLElement, TransferTreeGridProps>(
  (
    {
      treeData: ownerTreeData = [],
      columns,
      rowKey,
      className,
      leftTitle,
      rightTitle,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [selectedItems, setSelectedItems] = useState<any>();
    const [treeData, setTreeData] = useState<any>(ownerTreeData);
    const [selectedTreeItems, setSelectedTreeItems] = useState<any>();

    const [gridData, setGridData] = useState<any>([]);
    const [selectedGridRows, setSelectedGridRows] = useState<any>();
    const gridRef = useRef<GridImperative>(null);

    const [expandTrigger, setExpandTrigger] = useState<boolean>(true);

    useEffect(() => {
      // selectedItems && onChange?.(selectedItems);
    }, [selectedItems]);

    const handleAppendClick = (event: React.MouseEvent) => {
      // 좌측 그리드 데이터 갱신 : 좌측 그리드 데이터 - 좌측 그리드 선택된 rows
      // const newLeftGridData = treeData?.filter(
      //   (d: any) => !leftSelectedRows?.find((x: any) => x[rowKey] === d[rowKey]),
      // );
      // setTreeData(newLeftGridData);

      // 우측 그리드 데이터 갱신 : 우측 그리드 데이터 + 좌측 그리드 선택된 rows
      const newGridData = [...gridData, ...selectedTreeItems];
      setGridData(newGridData);

      // 좌측 우측 그리드 선택 초기화
      // gridRef.current?.resetRowSelection();
    };

    const handleRemoveClick = (event: React.MouseEvent) => {
      // 좌측 그리드 데이터 갱신 : 좌측 그리드 데이터 + 우측 그리드 선택된 rows
      // const newLeftGridData = [...treeData, ...selectedGridRows];
      // setTreeData(newLeftGridData);

      // 우측 그리드 데이터 갱신 : 우측 그리드 데이터 - 우측 그리드 선택된 rows
      const newGridData = gridData?.filter(
        (d: any) => !selectedGridRows?.find((x: any) => x[rowKey] === d[rowKey]),
      );
      setGridData(newGridData);

      // 좌측 우측 그리드 선택 초기화
      // leftGridRef.current?.resetRowSelection();
      // gridRef.current?.resetRowSelection();
    };

    return (
      <div
        className={cn(
          styles.start,
          className,
          'nlp--transfer-grid',
          'flex h-[300px] flex-row bg-amber-100',
        )}
      >
        {/* left grid */}
        <div>
          <TreeView
            data={treeData}
            treeId={'1'}
            expandTrigger={expandTrigger}
            // nodeButtons={renderNodeButtons}
            type={'DEFAULT'}
          />
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
          <GridBox
            ref={gridRef}
            title={rightTitle}
            data={gridData}
            columns={columns}
            hideColumnSettings
            multiple
            onRowsSelect={(newSelectedRows: any) => setSelectedGridRows(newSelectedRows)}
          />
        </div>
      </div>
    );
  },
);

export const TransferTreeGrid = TransferTreeGridComponent;
