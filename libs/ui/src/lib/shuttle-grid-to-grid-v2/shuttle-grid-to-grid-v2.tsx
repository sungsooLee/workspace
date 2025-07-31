import { ColumnDef, Table } from '@tanstack/react-table';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { addOrRemoveItemByKey, cn } from '@learnway/shared';

import styles from './shuttle-grid-to-grid-v2.module.css';

import { IcoNarrowRight } from '@learnway/icons';

import { Button, GridBox, GridBoxProps, GridImperative } from '../..';

// ShuttleGridToGridV2 컴포넌트의 props 타입 정의
export interface ShuttleGridToGridV2Props
  extends Pick<
    GridBoxProps,
    'hideRowSelectionCheckBox' | 'showNumberingColumn' | 'visibleRowCount'
  > {
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
   * 선택된 아이템 목록
   */
  selectedItems?: any[];
  /**
   * 우측 그리드의 데이터가 변경될 때 호출되는 콜백 함수
   * @param newGridData - 변경된 우측 그리드 데이터
   */
  onSelectedChange?: (newGridData: any) => void;
}

/**
 * 컴포넌트의 외부에서 호출 가능한 명령형 메서드를 정의하는 인터페이스입니다.
 */
export interface ShuttleGridToGridV2Imperative {
  /**
   * 선택 상태를 초기화하는 메서드입니다.
   */
  resetSelection: () => void;
}

/**
 * Shuttle Grid To Grid V2 컴포넌트
 * - 좌/우 그리드 간 데이터 이동(셔틀) 기능 제공
 * - 그리드는 페이지네이션 타입을 기본으로 하나, 셔틀 화면은 업무에 맞게 페이지네이션 또는 스크롤 타입을 제공
 * - 그리드 스크롤 타입을 제공할 경우, 필수 조회 항목 설정하여 조회 결과가 소팅되어 목록에 노출될 수 있도록 함
 */
const ShuttleGridToGridV2Component = (
  {
    hideRowSelectionCheckBox = true,
    showNumberingColumn = false,
    gridData = [],
    columns,
    rowKey,
    className,
    leftTitle,
    rightTitle,
    visibleRowCount = 5,
    selectedItems = [],
    onSelectedChange,
  }: ShuttleGridToGridV2Props,
  ref: React.Ref<ShuttleGridToGridV2Imperative>,
) => {
  const { t } = useTranslation();
  // 우측 그리드 데이터 상태
  const [rightGridData, setRightGridData] = useState<any>([]);
  // 좌/우 그리드의 imperative ref
  const leftGridRef = useRef<GridImperative>(null);
  const rightGridRef = useRef<GridImperative>(null);

  // 좌/우 그리드의 table instance 상태
  const [leftTableInstance, setLeftTableInstance] = useState<Table<any>>();
  const [rightTableInstance, setRightTableInstance] = useState<Table<any>>();

  // imperative handle: 외부에서 resetSelection 호출 가능
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
      // 각 행에 '선택' 버튼 렌더링
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
              handleLeftGridRowSelect(row.original);
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
      // 각 행에 '삭제' 버튼 렌더링
      cell: ({ row }) => (
        <div className={styles.btn_select}>
          <Button
            label={t('삭제')}
            variant={'gray2'}
            size={'xs'}
            onClick={() => {
              handleLeftGridRowSelect(row.original);
            }}
          />
        </div>
      ),
    },
  ];

  /**
   * 좌측 그리드에서 행을 선택/해제할 때 호출되는 핸들러.
   * 선택 버튼 누르거나 전체선택 버튼 누를때 실행됨
   * 선택된 행을 우측 그리드 데이터에 추가하거나 삭제합니다.
   * @param selectedRow - 선택된 (또는 선택 해제된) 행의 원본 데이터
   */
  const handleLeftGridRowSelect = (selectedRow: any) => {
    setRightGridData((state: any) => {
      // 선택된 행에 isUserSelected 플래그 추가
      const newSelectedRow = {
        ...selectedRow,
        isUserSelected: true,
      };
      // 이미 있으면 제거, 없으면 추가
      return addOrRemoveItemByKey(state, newSelectedRow, rowKey);
    });
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
   * 좌측 그리드의 선택 상태를 우측 그리드 데이터와 동기화
   * rightGridData가 변경될 때마다 좌측 그리드에서 일치하는 행들을 자동 선택
   */
  const syncLeftGridSelection = useCallback(() => {
    // 우측 그리드에 데이터가 있고, 좌측 테이블 인스턴스가 있을 때
    if (rightGridData?.length > 0 && leftTableInstance) {
      const newRowSelection: Record<string, boolean> = {};
      rightGridData.forEach((item: any) => {
        // 좌측 그리드에서 동일한 rowKey를 가진 행 찾기
        const findRow = leftTableInstance
          ?.getRowModel()
          ?.rows?.find((row) => row?.original?.[rowKey] === item?.[rowKey]);

        if (findRow) {
          newRowSelection[findRow.id] = true;
        }
      });

      leftTableInstance.setRowSelection(newRowSelection);
    } else if (leftTableInstance) {
      // 우측 그리드에 데이터가 없으면 전체 선택 해제
      leftTableInstance.setRowSelection({});
    }
  }, [rightGridData, leftTableInstance, rowKey]);

  /**
   * `rightGridData` 상태가 변경될 때마다 `onSelectedChange` 콜백을 호출하여 부모에게 변경된 데이터를 알립니다.
   * 그리고 좌측 그리드 선택 상태 동기화
   */
  useEffect(() => {
    onSelectedChange?.(rightGridData);
    syncLeftGridSelection();
  }, [rightGridData]);

  /**
   * selectedItems prop이 변경될 때 우측 그리드 데이터에 반영
   * (외부에서 선택된 아이템이 바뀌었을 때 동기화)
   */
  useEffect(() => {
    // 사용자가 직접 선택한 행만 필터링
    const userSelectedRows = rightGridData?.filter((row: any) => row.isUserSelected);
    // 외부 selectedItems와 합쳐서 새로운 우측 그리드 데이터 생성
    const newRightGridData = [...userSelectedRows, ...selectedItems];
    setRightGridData((state: any) => newRightGridData);
  }, [selectedItems]);

  /**
   * gridData(좌측 그리드 데이터)가 변경될 때 좌측 그리드 선택 상태 동기화
   */
  useEffect(() => {
    syncLeftGridSelection();
  }, [gridData]);

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
          onTableInstanceChange={(table: Table<any>) => setLeftTableInstance(table)} // 테이블 인스턴스 변경 시 상태 업데이트
          visibleRowCount={visibleRowCount} // 표시할 행 개수
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
          onRemoveAllClick={handleRightGridRemoveAll} // '전체 삭제' 클릭 핸들러
          onTableInstanceChange={(table: Table<any>) => setRightTableInstance(table)} // 테이블 인스턴스 변경 시 상태 업데이트
          visibleRowCount={visibleRowCount} // 표시할 행 개수
        />
      </div>
    </div>
  );
};

// ShuttleGridToGridV2 컴포넌트 export (forwardRef 적용)
export const ShuttleGridToGridV2 = forwardRef(ShuttleGridToGridV2Component);
