import { Table } from '@tanstack/react-table';

export interface ColumnSetting {
  id: string;
  header: string;
  isVisible: boolean;
}

export interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export interface ColumnSettingsContentProps<T extends object> {
  onApply: (settings: ColumnSetting[]) => void;
  table: Table<T>;
}

export interface ColumnSettingsProps<T extends object> {
  table: Table<T>;
  onColumnChange?: (settings: ColumnSetting[]) => void;
}
