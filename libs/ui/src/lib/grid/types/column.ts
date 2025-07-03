import { ColumnDefTemplate, ColumnMeta, HeaderContext, RowData } from '@tanstack/react-table';
import { FilterType } from './filter';

export interface ColumnConfig<TData extends RowData, TValue = unknown> {
  accessor: keyof TData;
  header: string;
  filterType?: FilterType;
  customCell?: (props: { row: TData; value: TValue; openModal?: any }) => React.ReactNode;
  enableSort?: boolean;
  enableFilter?: boolean;
  enableGrouping?: boolean;
  width?: number;
  footer?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
  meta?: ColumnMeta<TData, TValue>;
}
