import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { FilterState } from './filter';
import { ColumnSetting } from './column-settings';

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
  pageSize?: number;
  onStateChange?: (state: GridState) => void;
  // 추가: state 타입 명시적 정의
  state?: {
    columnVisibility?: VisibilityState;
    columnOrder?: string[] | undefined;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
  };
  onColumnSettingsChange?: (settings: ColumnSetting[]) => void;
}

export interface GridState {
  filter?: ColumnFiltersState;
  sorting?: SortingState;
  columnVisibility?: VisibilityState;
  columnOrder?: string[];
}
