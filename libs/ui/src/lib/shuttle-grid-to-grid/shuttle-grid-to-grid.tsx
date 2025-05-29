import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { cn } from '@learnway/shared';
import { GridBoxProps } from '@learnway/ui';

import styles from './shuttle-grid-to-grid.module.css';
import { Button } from '../button/button';
import { ColumnDef, Table } from '@tanstack/react-table';
import { IcoNarrowRight } from '@learnway/icons';
import { GridBox } from '../grid/grid-box/grid-box';
import { GridImperative } from '../grid/types';
import { useTranslation } from 'react-i18next';

export interface ShuttleGridToGridProps
  extends Pick<GridBoxProps, 'hideRowSelectionCheckBox' | 'showNumberingColumn'> {
  /**
   * 그리드 컬럼 정의 배열
   */
  columns: ColumnDef<any, unknown>[];
  /**
   * 좌측 그리드에 표시될 원본 데이터
   */
  gridData: any;
  /**
   * 각 행을 고유하게 식별할 수 있는 키 (데이터 객체의 속성 이름)
   */
  rowKey: string;
  /**
   * 컴포넌트에 추가될 CSS 클래스 이름
   */
  className?: string;
  /**
   * 좌측 그리드의 제목
   */
  leftTitle?: string;
  /**
   * 우측 그리드의 제목
   */
  rightTitle?: string;
  /**
   * 우측 그리드의 데이터가 변경될 때 호출되는 콜백 함수
   * @param newGridData - 변경된 우측 그리드 데이터
   */
  onSelectedChange?: (newGridData: any) => void;
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

/**
 * ShuttleGridToGrid 컴포넌트 함수형 정의
 * 두 개의 그리드를 나란히 배치하고, 좌측 그리드에서 우측 그리드로 데이터를 선택/이동하며
 * 우측 그리드에서 데이터를 삭제하는 기능을 제공합니다.
 * `forwardRef`를 사용하여 외부에서 `resetSelection` 메서드를 호출할 수 있습니다.
 */
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
    onSelectedChange,
  }: ShuttleGridToGridProps,
  ref: React.Ref<ShuttleGridToGridImperative>,
) => {
  const { t } = useTranslation();
  const [rightGridData, setRightGridData] = useState<any>([]);
  const leftGridRef = useRef<GridImperative>(null);
  const rightGridRef = useRef<GridImperative>(null);

  const [leftTableInstance, setLeftTableInstance] = useState<Table<any>>();
  const [rightTableInstance, setRightTableInstance] = useState<Table<any>>();

  useImperativeHandle(ref, () => ({
    resetSelection: () => {
      // 좌측 그리드 전체 행 선택 해제, 로직 실행하면 handleLeftGridRowsSelect 실행됨
      leftTableInstance?.setRowSelection({});
    },
  }));

  /**
   * 좌측 그리드의 컬럼 정의
   * 기존 컬럼에 '선택' 버튼 컬럼을 추가합니다.
   */
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
            }}
          />
        </div>
      ),
    },
  ];

  /**
   * 우측 그리드의 컬럼 정의
   * 기존 컬럼에 '삭제' 버튼 컬럼을 추가합니다.
   */
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
              handleRightGridRowSelect(row.original);
            }}
          />
        </div>
      ),
    },
  ];

  /**
   * 좌측 그리드에서 행을 선택/해제할 때 호출되는 핸들러.
   * 선탯 버튼 누르거나 전체선택 버튼 누를때 실행됨
   * 선택된 행을 우측 그리드 데이터에 추가하거나 삭제합니다.
   * @param selectedRows - 선택된 (또는 선택 해제된) 행의 원본 데이터
   */
  const handleLeftGridRowsSelect = (selectedRows: any) => {
    setRightGridData(selectedRows);
  };

  /**
   * 우측 그리드의 '전체 삭제' 버튼 클릭 시 호출되는 핸들러.
   * 우측 그리드의 모든 데이터를 비웁니다.
   */
  const handleRightGridRemoveAll = () => {
    // 좌측 그리드 전체 행 선택 해제, 로직 실행하면 handleLeftGridRowsSelect 실행됨
    leftTableInstance?.setRowSelection({});
  };

  /**
   * 우측 그리드에서 행을 선택/해제할 때 호출되는 핸들러.
   * 선택된 행을 우측 그리드에서 삭제합니다.
   * @param selectedRow - 선택된 (또는 선택 해제된) 행의 원본 데이터
   */
  const handleRightGridRowSelect = (selectedRow: any) => {
    // 우측 그리드에서 선택한 행과 같은 내용을 좌측 그리드에서 찾는다.
    const findRow = leftTableInstance
      ?.getRowModel()
      ?.rows?.find((row) => row?.original?.[rowKey] === selectedRow?.[rowKey]);
    // 찾은 좌측 그리드 행 토글 해제, 로직 실행하면 handleLeftGridRowsSelect 실행됨
    findRow?.toggleSelected(false);
  };

  /**
   * `rightGridData` 상태가 변경될 때마다 `onSelectedChange` 콜백을 호출하여 부모에게 변경된 데이터를 알립니다.
   */
  useEffect(() => {
    onSelectedChange?.(rightGridData);
  }, [rightGridData]);

  return (
    <div className={cn(styles.start, styles.transfer_grid, className, 'nlp--shuttle-grid-to-grid')}>
      {/* 좌측 그리드 컨테이너 */}
      <div className={styles.grid_wrap}>
        <GridBox
          ref={leftGridRef} // 좌측 그리드의 명령형 메서드에 접근하기 위한 Ref 연결
          title={leftTitle} // 좌측 그리드 제목
          data={gridData} // 좌측 그리드 데이터
          columns={leftGridColumns} // 좌측 그리드 컬럼 정의
          multiple // 다중 선택 가능
          disabledSelectionToggle // 선택 체크박스 비활성화 (버튼으로 선택 제어)
          showSelectAll // '전체 선택' 기능 표시
          hideRowSelectionCheckBox={hideRowSelectionCheckBox} // 행 선택 체크박스 숨김 여부
          showNumberingColumn={showNumberingColumn} // 번호 매김 컬럼 표시 여부
          onRowsSelect={handleLeftGridRowsSelect} // 행 선택 시 호출되는 핸들러
          onTableInstanceChange={(table: Table<any>) => setLeftTableInstance(table)}
        />
      </div>
      {/* 그리드 사이의 구분 및 이동 아이콘 */}
      <div className={styles.icon_arrow}>
        <IcoNarrowRight width={24} height={24} stroke={'#B5C2D7'} />
      </div>
      {/* 우측 그리드 컨테이너 */}
      <div className={styles.grid_wrap}>
        <GridBox
          ref={rightGridRef} // 우측 그리드의 명령형 메서드에 접근하기 위한 Ref 연결
          title={rightTitle} // 우측 그리드 제목
          data={rightGridData} // 우측 그리드 데이터
          columns={rightGridColumns} // 우측 그리드 컬럼 정의
          disabledSelectionToggle // 선택 체크박스 비활성화
          showRemoveAll // '전체 삭제' 기능 표시
          hideRowSelectionCheckBox={hideRowSelectionCheckBox} // 행 선택 체크박스 숨김 여부
          showNumberingColumn={showNumberingColumn} // 번호 매김 컬럼 표시 여부
          onRowSelect={handleRightGridRowSelect} // 행 선택 시 호출되는 핸들러
          onRemoveAllClick={handleRightGridRemoveAll} // '전체 삭제' 클릭 핸들러
          onTableInstanceChange={(table: Table<any>) => setRightTableInstance(table)}
        />
      </div>
    </div>
  );
};

export const ShuttleGridToGrid = forwardRef(ShuttleGridToGridComponent);
