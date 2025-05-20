import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { cn } from '@learnway/shared';
import { GridBoxProps } from '@learnway/ui';

import styles from './shuttle-grid-to-grid.module.css';
import { Button } from '../button/button';
import { ColumnDef } from '@tanstack/react-table';
import { IcoNarrowRight } from '@learnway/icons';
import { GridBox } from '../grid/grid-box';
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
   * 선택된 데이터
   */
  selectedRows: any;
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
    onChange,
  }: ShuttleGridToGridProps,
  ref: React.Ref<ShuttleGridToGridImperative>,
) => {
  const { t } = useTranslation();
  const [rightGridData, setRightGridData] = useState<any>([]);
  const leftGridRef = useRef<GridImperative>(null);
  const rightGridRef = useRef<GridImperative>(null);

  useImperativeHandle(ref, () => ({
    resetSelection: () => {
      leftGridRef.current?.resetRowSelection();
      setRightGridData([]);
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
              handleLeftRowSelect(row.original);
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
              handleRightRowSelect(row.original);
            }}
          />
        </div>
      ),
    },
  ];

  /**
   * 좌측 그리드에서 행을 선택/해제할 때 호출되는 핸들러.
   * 선택된 행을 우측 그리드 데이터에 추가하거나 삭제합니다.
   * @param selectedRow - 선택된 (또는 선택 해제된) 행의 원본 데이터
   */
  const handleLeftRowSelect = (selectedRow: any) => {
    console.log(selectedRow);
    const isDelete = rightGridData.find((d: any) => d[rowKey] === selectedRow[rowKey]);
    const appendedData = [...rightGridData, selectedRow];
    const deletedData = rightGridData?.filter((d: any) => d[rowKey] !== selectedRow[rowKey]);
    const newRightGridData = isDelete ? deletedData : appendedData;
    setRightGridData(newRightGridData);
  };

  /**
   * 우측 그리드에서 행을 삭제할 때 호출되는 핸들러.
   * 우측 그리드에서 해당 행을 삭제하고, 좌측 그리드의 해당 행 선택 상태를 동기화합니다.
   * @param selectedRow - 삭제할 행의 원본 데이터
   */
  const handleRightRowSelect = (selectedRow: any) => {
    const isDelete = rightGridData.find((d: any) => d[rowKey] === selectedRow[rowKey]);
    if (isDelete) {
      leftGridRef.current?.toggleRowById('id', isDelete.id);
    }
    const newRightGridData = rightGridData?.filter((d: any) => d[rowKey] !== selectedRow[rowKey]);
    setRightGridData(newRightGridData);
  };

  /**
   * 좌측 그리드의 '전체 선택' 버튼 클릭 시 호출되는 핸들러.
   * 좌측 그리드의 모든 데이터를 우측 그리드로 복사합니다.
   */
  const handleLeftGridSelectAll = () => {
    setRightGridData(gridData); // 좌측의 모든 원본 데이터를 우측으로 설정
  };

  /**
   * 우측 그리드의 '전체 삭제' 버튼 클릭 시 호출되는 핸들러.
   * 우측 그리드의 모든 데이터를 비웁니다.
   */
  const handleRightGridRemoveAll = () => {
    setRightGridData([]); // 우측 그리드 데이터 비우기
  };

  /**
   * `rightGridData` 상태가 변경될 때마다 `onChange` 콜백을 호출하여 부모에게 변경된 데이터를 알립니다.
   */
  useEffect(() => {
    onChange?.(rightGridData);
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
          onSelectAllClick={handleLeftGridSelectAll} // '전체 선택' 클릭 핸들러
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
          multiple // 다중 선택 가능
          disabledSelectionToggle // 선택 체크박스 비활성화
          showRemoveAll // '전체 삭제' 기능 표시
          hideRowSelectionCheckBox={hideRowSelectionCheckBox} // 행 선택 체크박스 숨김 여부
          showNumberingColumn={showNumberingColumn} // 번호 매김 컬럼 표시 여부
          onRemoveAllClick={handleRightGridRemoveAll} // '전체 삭제' 클릭 핸들러
        />
      </div>
    </div>
  );
};

export const ShuttleGridToGrid = forwardRef(ShuttleGridToGridComponent);
