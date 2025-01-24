import { ColumnConfig } from '../types/column';

export class ColumnFactory<T extends object> {
  constructor(private openModal?: any) {}

  create(configs: ColumnConfig<T>[]) {
    return configs.map((config) => ({
      id: String(config.accessor),
      accessorKey: config.accessor,
      header: config.header,
      cell: config.customCell
        ? (info: any) =>
            config.customCell?.({
              row: info.row.original,
              value: info.getValue(),
              openModal: this.openModal,
            })
        : (info: any) => info.getValue(),
      meta: {
        filterType: config.filterType,
        filterOptions: config.meta?.filterOptions,
      },
      enableSorting: config.enableSort ?? true,
      enableFiltering: config.enableFilter ?? true,
      enableGrouping: config.enableGrouping ?? true,
      width: config.width,
    }));
  }
}
