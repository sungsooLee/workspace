import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // 컬럼 커스텀 타입 메타 설정
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType?: 'text' | 'range' | 'select';
    filterOptions?: { label: string; value: string }[];
  }
}

export interface GridProps<T extends object> {
  // 그리드 데이터
  data: T[];
  // 그리드 컬럼
  columns: ColumnDef<T>[];
  // 로딩 여부
  isLoading?: boolean;
  // 로우 클릭에 대한 콜백 처리
  onRowSelect?: (selectedRow: any) => void;
  // 멀티 로우 클릭에 대한 콜백 처리
  onRowsSelect?: (selectedRows: any[]) => void;
  // 컬럼, 그리드 설정 변경에 따른 콜백 함수
  onStateChange?: (state: GridState) => void;
  // 그리드 타이틀
  title?: string;
  // 다중선택을 위한 Props
  multiSelectable?: boolean;
  // 페이지네이션 관련 Props
  pagination?: {
    pageSize: number;
    pageIndex: number;
    totalRows: number;
    onPageChange: (pageIndex: number) => void; // 페이지 변경 시 콜백
    onPageSizeChange: (pageSize: number) => void; // 페이지 크기 변경 시 콜백
    pageSizeOptions?: number[]; // 페이지 사이즈 옵션
  };
  // 정적 그루핑 설정
  columnGrouping?: {
    columns: string[];
  };
  // 고정 컬럼 설정
  columnPinning?: {
    columns: string[];
  };
  // 항목설정 버튼 표시 여부
  hideColumnSettings?: boolean;
  // 전체 rows 개수 표시 여부
  hideTotalCount?: boolean;
  // 선택 rows 개수 표시 여부
  hideSelectedCount?: boolean;
}

export interface GridState {
  filters?: ColumnFiltersState;
  sorting?: SortingState;
  columnVisibility?: VisibilityState;
  columnOrder?: string[];
}

// grid useImperativeHandle() interface
export interface GridImperative {
  resetRowSelection: () => void;
}
