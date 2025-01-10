import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { FilterState } from './filter';
import { ColumnSetting } from '../components/column-setting';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    // 고정 열 여부?
    filterType?: 'text' | 'range' | 'select';
  }
}

export interface GridProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  onFilterChange?: (filters: FilterState) => void;
  onRowSelect?: (row: any) => void;
  pageSize?: number;
  onStateChange?: (state: GridState) => void;
  title?: string;
  onColumnSettingsChange?: (settings: ColumnSetting[]) => void;
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
  // 무한 스크롤(페이지네이션) 관련 Props
  infiniteScroll?: {
    isFetching: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<any>;
  };
}

export interface GridState {
  filters?: ColumnFiltersState;
  sorting?: SortingState;
  columnVisibility?: VisibilityState;
  columnOrder?: string[];
}
