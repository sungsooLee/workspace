import { GridBoxConfig } from '@learnway/ui/grid';
import { ColumnMeta } from '@tanstack/react-table';

export interface CoursePackageSearchFormData {
  tenantId: number;
  channelUuid: string;
  packageName?: string;
  isUsed?: boolean;
}

export interface CoursePackageHookResult {
  provider: any;
  getValues: () => any;
  onSubmit: any;
  onReset: () => void;
  gConfig: GridBoxConfig;
  //   selectedRows: CourseListItem[];
  //   buttonState: CourseButtonState;
  handleOnSearch: (data: CoursePackageSearchFormData) => void;
  handleSavePackage: () => void;
  //   handleGridRowsSelect: (rows: CoursePackageListItem[]) => void;
}

export interface CoursePackageListGridColumn {
  name: string;
  label: () => string;
  size: number;
  render?: (info: any) => React.ReactNode;
  meta?: ColumnMeta<any, any>;
}

export enum CoursePackageDetailTab {
  BASIC_INFO = 'BASIC_INFO',
  PACKAGE_INFO = 'PACKAGE_INFO',
}
