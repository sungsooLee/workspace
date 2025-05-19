import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { t } from 'i18next';

import { cn } from '@learnway/shared';
import { GridBoxProps } from '@learnway/ui';

import styles from './shuttle-grid-to-grid.module.css';
import { Button } from '../button/button';
import { ColumnDef } from '@tanstack/react-table';
import { IcoNarrowRight } from '@learnway/icons';
import { GridBox } from '../grid/grid-box';
import { GridImperative } from '../grid/types';

export interface ShuttleGridToGridProps
  extends Pick<GridBoxProps, 'hideRowSelectionCheckBox' | 'showNumberingColumn'> {
  columns: ColumnDef<any, unknown>[]; // 그리드 컬럼
  gridData: any; // 그리드 데이터
  rowKey: string;
  className?: string;
  leftTitle?: string; // 좌측 그리드 title
  rightTitle?: string; // 우측 그리드 title
  onChange?: (newGridData: any) => void;
}

/**
 * 컴포넌트의 외부에서 호출 가능한 명령형 메서드를 정의하는 인터페이스입니다.
 */
export interface ShuttleGridToGridImperative {
  /**
   * 선택 상태를 초기화하는 메서드입니다.
   */
  resetSelection: () => void;
}

const ShuttleGridToGridComponent = (
  {
    hideRowSelectionCheckBox = true,
    showNumberingColumn = false,
    gridData = [],
    columns,
    rowKey,
    className,
    leftTitle,
    rightTitle,
    onChange,
  }: ShuttleGridToGridProps,
  ref: React.Ref<ShuttleGridToGridImperative>,
) => {
  const [rightGridData, setRightGridData] = useState<any>([]);
  const leftGridRef = useRef<GridImperative>(null);
  const rightGridRef = useRef<GridImperative>(null);

  useImperativeHandle(ref, () => ({
    resetSelection: () => {
      leftGridRef.current?.resetRowSelection();
      setRightGridData([]);
    },
  }));

  const leftGridColumns: ColumnDef<any, unknown>[] = [
    ...columns,
    {
      accessorKey: 'select-col',
      header: ({ table }) => t('선택'),
      size: 94,
      meta: {
        headerAlign: 'left',
        cellAlign: 'center',
      },
      cell: ({ row }) => (
        <div className={styles.btn_select}>
          <Button
            label={t('선택')}
            variant={
              rightGridData?.find((d: any) => d[rowKey] === (row?.original as any)?.[rowKey])
                ? 'primary'
                : 'gray2'
            }
            className={
              rightGridData?.find((d: any) => d[rowKey] === (row?.original as any)?.[rowKey])
                ? styles.active
                : ''
            }
            size={'xs'}
            onClick={() => {
              row.toggleSelected();
              handleLeftRowSelect(row.original);
            }}
          />
        </div>
      ),
    },
  ];

  const rightGridColumns: ColumnDef<any, unknown>[] = [
    ...columns,
    {
      accessorKey: 'select-col',
      header: ({ table }) => t('삭제'),
      size: 94,
      meta: {
        headerAlign: 'left',
        cellAlign: 'center',
      },
      cell: ({ row }) => (
        <div className={styles.btn_select}>
          <Button
            label={t('삭제')}
            variant={'gray2'}
            size={'xs'}
            onClick={() => {
              handleRightRowSelect(row.original);
            }}
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
    const isDelete = rightGridData.find((d: any) => d[rowKey] === selectedRow[rowKey]);
    if (isDelete) {
      leftGridRef.current?.toggleRowById('id', isDelete.id);
    }
    const newRightGridData = rightGridData?.filter((d: any) => d[rowKey] !== selectedRow[rowKey]);
    setRightGridData(newRightGridData);
  };

  useEffect(() => {
    onChange?.(rightGridData);
  }, [rightGridData]);

  return (
    <div className={cn(styles.start, styles.transfer_grid, className, 'nlp--shuttle-grid-to-grid')}>
      {/* left grid */}
      <div className={styles.grid_wrap}>
        <GridBox
          ref={leftGridRef}
          title={leftTitle}
          data={gridData}
          columns={leftGridColumns}
          multiple
          disabledSelectionToggle
          showSelectAll
          hideRowSelectionCheckBox={hideRowSelectionCheckBox}
          showNumberingColumn={showNumberingColumn}
        />
      </div>
      <div className={styles.icon_arrow}>
        <IcoNarrowRight width={24} height={24} stroke={'#B5C2D7'} />
      </div>
      <div className={styles.grid_wrap}>
        <GridBox
          ref={rightGridRef}
          title={rightTitle}
          data={rightGridData}
          columns={rightGridColumns}
          multiple
          disabledSelectionToggle
          showDeleteAll
          hideRowSelectionCheckBox={hideRowSelectionCheckBox}
          showNumberingColumn={showNumberingColumn}
        />
      </div>
    </div>
  );
};

export const ShuttleGridToGrid = forwardRef(ShuttleGridToGridComponent);
