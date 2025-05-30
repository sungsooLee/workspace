import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import { GridProps } from './types/grid'; // GridProps 타입 import
import { useTranslation } from 'react-i18next';
import { cn } from '@learnway/shared'; // t 함수 필요 시 import
import styles from './grid.module.css';
import { Checkbox } from '../checkbox/checkbox';

// useGridTable의 반환 타입 정의 (필요한 부분만 예시)
interface UseGridTableReturn<T extends object> {
  table: ReturnType<typeof useReactTable<T>>;
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  columnVisibility: VisibilityState;
  columnOrder: string[];
  rowSelection: RowSelectionState;
  isInitialSelectionEffect: React.MutableRefObject<boolean>;
  lastPinnedColumnId: string; // 마지막 고정 열의 ID
}

export function useGridTable<T extends object>(
  props: GridProps<T>, // GridProps를 인자로 받음
): UseGridTableReturn<T> {
  const {
    data,
    columns,
    multiple,
    pagination,
    columnGrouping,
    columnPinning = { columns: [] },
    clientSideFiltering,
    clientSideSorting,
    onStateChange,
    onRowSelect,
    onRowsSelect,
    onChange,
    autoSelectFirstRow,
    tableMode, // tableMode 추가
    onTableInstanceChange, // table 인스턴스 전달 콜백
  } = props;

  const { t } = useTranslation();

  const [expanded, setExpanded] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const isInitialSelectionEffect = useRef(true);
  const prevSelectedRowIdsRef = useRef<string[]>([]); // rowSelection 변경 체크를 위한 ref

  const groupingState = useMemo<GroupingState>(
    () => columnGrouping?.columns || [],
    [columnGrouping?.columns],
  );
  const [columnPinningState, setColumnPinningState] = useState<ColumnPinningState>({
    left: columnPinning.columns?.length
      ? [
          ...(props.showNumberingColumn ? ['select-radio'] : []),
          ...(multiple && !props.hideRowSelectionCheckBox ? ['select-check'] : []),
          ...(props.showNumberingColumn ? ['numbering'] : []),
          ...columnPinning.columns,
        ]
      : [],
    right: [],
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
    columns.reduce((acc, col) => {
      acc[col.id as string] = true;
      return acc;
    }, {} as VisibilityState),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((col) => col.id as string),
  );

  // 넘버링/선택 컬럼 정의를 이 훅 안으로 이동
  const createNumberingColumn = (): ColumnDef<T> => ({
    id: 'numbering',
    size: 64,
    header: 'NO.',
    meta: { cellAlign: 'center' },
    enableSorting: true,
    accessorFn: (row, index) => index,
    cell: ({ row }: any) =>
      pagination ? (
        <p>{pagination.pageNumber * pagination.pageSize + row.index + 1}</p>
      ) : (
        <p>{row.index + 1}</p>
      ),
  });

  const createSingleRadioColumn = (): ColumnDef<T> => ({
    id: 'select-radio',
    size: 50,
    maxSize: 50,
    minSize: 50,
    enablePinning: true,
    meta: { align: 'center', headerAlign: 'center', cellAlign: 'center' },
    header: t('LABEL.grid.column.selected', '선택'),
    cell: ({ row, table: reactTableInstance }) => {
      // table prop 이름을 reactTableInstance로 변경하여 충돌 방지
      const checked = !!reactTableInstance
        .getSelectedRowModel()
        .rows.find((d) => d.original === row.original);
      return (
        <div className={cn(styles.select_row_radio, checked && styles.checked)}>
          <input
            type="radio"
            name="select-row"
            checked={checked}
            onChange={() => row.getToggleSelectedHandler()}
          />
        </div>
      );
    },
  });

  const createMultipleCheckColumn = (): ColumnDef<T> => ({
    id: 'select-check',
    size: 50,
    maxSize: 50,
    minSize: 50,
    enablePinning: true,
    meta: { align: 'center', headerAlign: 'center', cellAlign: 'center' },
    header: (
      { table: reactTableInstance }, // table prop 이름을 reactTableInstance로 변경하여 충돌 방지
    ) => (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Checkbox
          checked={reactTableInstance.getIsAllRowsSelected()}
          onCheckedChange={(checked) => {
            reactTableInstance.toggleAllRowsSelected(!!checked);
          }}
        />
      </div>
    ),
    cell: ({ row }: { row: Row<T> }) => (
      <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
        <Checkbox
          checked={row.getIsSelected()}
          disabled={row.getIsGrouped()}
          onCheckedChange={() => {
            if (!row.getIsGrouped()) {
              row.getToggleSelectedHandler();
            }
          }}
        />
      </div>
    ),
  });

  const tableColumns = useMemo(() => {
    let finalColumns = [...columns];
    if (props.showNumberingColumn) {
      finalColumns = [createNumberingColumn(), ...finalColumns];
    }
    if (!multiple && !props.hideRowSelectionRadioBox) {
      finalColumns = [createSingleRadioColumn(), ...finalColumns];
    }
    if (multiple && !props.hideRowSelectionCheckBox) {
      finalColumns = [createMultipleCheckColumn(), ...finalColumns];
    }
    return finalColumns;
  }, [
    columns,
    multiple,
    pagination,
    props.showNumberingColumn,
    props.hideRowSelectionRadioBox,
    props.hideRowSelectionCheckBox,
    t, // t 함수 의존성 추가
  ]);

  const handleRowSelectionChangeForSingle: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
    const newSelection =
      typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
    if (isEmpty(newSelection)) return;
    const selectedRowIds = Object.keys(newSelection);
    const lastId = selectedRowIds?.at(-1);
    const newSelectionState = lastId ? { [lastId]: true } : {};
    setRowSelection(newSelectionState);
  };

  const handleRowSelectionChangeForMultiple: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
    const newSelection =
      typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
    setRowSelection(newSelection);
  };

  // 외부에서 데이터 업데이트/삭제를 제어할 수 있도록 함수 정의
  const handleUpdateData = (rowIndex: number, columnId: string, value: unknown) => {
    const newData = table
      .getRowModel()
      .rows.map((row) => row.original)
      .map((row: any, index: number) => {
        if (index === rowIndex) {
          return { ...row, [columnId]: value };
        }
        return row;
      });
    onChange?.(newData);
  };

  const handleRemoveData = (rowIndex: number) => {
    const newData = table
      .getRowModel()
      .rows.map((row) => row.original)
      .filter((row: any, index: number) => index !== rowIndex);
    onChange?.(newData);
  };

  const table = useReactTable({
    data,
    columns: tableColumns,
    defaultColumn: { minSize: 50 },
    state: {
      columnOrder,
      columnVisibility,
      sorting,
      columnFilters,
      rowSelection,
      grouping: groupingState,
      expanded,
      ...(pagination && {
        pagination: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        } as PaginationState,
      }),
      columnPinning: columnPinningState,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    onColumnPinningChange: setColumnPinningState,
    onPaginationChange: (updater) => {
      if (!pagination) return;
      const newPagination =
        typeof updater === 'function'
          ? updater({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize })
          : updater;
      pagination.onPageChange(newPagination.pageIndex);
      pagination.onPageSizeChange(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: multiple
      ? handleRowSelectionChangeForMultiple
      : handleRowSelectionChangeForSingle,
    enableMultiRowSelection: multiple,
    enableHiding: true,
    enableGrouping: true,
    enableExpanding: true,
    enablePinning: true,
    ...(clientSideFiltering && { getFilteredRowModel: getFilteredRowModel() }),
    ...(clientSideSorting && { getSortedRowModel: getSortedRowModel() }),
    manualSorting: !clientSideSorting,
    manualFiltering: !clientSideFiltering,
    manualPagination: true,
    getRowId: (row: T, index: number) => {
      return `${pagination?.pageIndex ?? 0}-${index}`;
    },
    meta: {
      updateData: handleUpdateData,
      removeData: handleRemoveData,
    },
  });

  // 고정된 왼쪽 열의 ID들 가져오기
  const pinnedLeftColumns = table.getState().columnPinning.left || [];
  // 마지막 고정 열의 ID
  const lastPinnedColumnId = pinnedLeftColumns[pinnedLeftColumns.length - 1];

  // 그리드 상태 변화(e.g. 필터, 소팅, 순서, visibility)에 따른 콜백 전달
  useEffect(() => {
    onStateChange?.({
      filters: columnFilters,
      sorting,
      columnVisibility,
      columnOrder,
    });
  }, [columnFilters, sorting, columnVisibility, columnOrder]);

  // 그리드 row 선택 변경시 onRowSelect(단건), onRowsSelect(다건) callback 실행
  useEffect(() => {
    // 1. 초기 로드 시 콜백 실행 건너뛰기
    if (isInitialSelectionEffect.current) {
      isInitialSelectionEffect.current = false;
      return;
    }

    // 2. 현재 선택된 행들의 ID 목록 가져오기
    const currentSelectedRows = table.getSelectedRowModel().rows;
    const currentSelectedRowIds = currentSelectedRows.map((row) => row.id);

    // 3. 이전 선택 상태와 현재 선택 상태 비교
    const prevSelectedRowIds = prevSelectedRowIdsRef.current;

    // 선택된 ID 배열의 길이와 모든 ID가 순서대로 같은지 확인
    const isSameSelection =
      currentSelectedRowIds.length === prevSelectedRowIds.length &&
      currentSelectedRowIds.every((id, index) => id === prevSelectedRowIds[index]);

    // 4. 선택 상태가 변경되지 않았다면 콜백 실행 건너뛰기
    if (isSameSelection) {
      return;
    }

    // 5. 선택 상태 갱신
    prevSelectedRowIdsRef.current = currentSelectedRowIds;

    // 6. 실제 데이터(original) 추출 및 콜백 실행
    const originalSelectedRows = currentSelectedRows.map((row) => row.original);
    const firstSelectedRow = originalSelectedRows?.[0]; // 단건 선택 시 첫 번째 행

    onRowSelect?.(firstSelectedRow);
    onRowsSelect?.(originalSelectedRows);
  }, [rowSelection, table, onRowSelect, onRowsSelect]);
  // useEffect(() => {
  //   if (isInitialSelectionEffect.current) {
  //     isInitialSelectionEffect.current = false;
  //     return;
  //   }
  //   const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
  //   const selectedRow = selectedRows?.[0];
  //   onRowSelect?.(selectedRow);
  //   onRowsSelect?.(selectedRows);
  // }, [rowSelection, table, onRowSelect, onRowsSelect]);

  // data 변경시 첫번째 행 선택
  useEffect(() => {
    const firstRowId = table.getRowModel()?.rows?.[0]?.id;
    if (firstRowId && autoSelectFirstRow && !tableMode) {
      setRowSelection({ [firstRowId]: true });
    } else {
      table.toggleAllRowsSelected(false);
    }
  }, [data, table, autoSelectFirstRow, tableMode]);

  // useReactTable 훅으로 생성된 table 인스턴스를 상위 컴포넌트로 전달
  useEffect(() => {
    if (onTableInstanceChange) {
      onTableInstanceChange(table);
    }
  }, [table, onTableInstanceChange]);

  return {
    table,
    columnFilters,
    sorting,
    columnVisibility,
    columnOrder,
    rowSelection,
    isInitialSelectionEffect,
    lastPinnedColumnId,
    // updateData: handleUpdateData,
    // removeData: handleRemoveData,
    // 필요하다면 setExpanded, setColumnPinningState 등도 반환
  };
}
