import { FC } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Grid } from '@learnway/ui';

/**
 * 임시
 * @param config
 * @constructor
 */
const GridBoxComponent: FC<any> = ({ config }) => {
  const { data: data, page, totalRows, gridFetch, columns, onDataChange, ...props } = config;
  const columnHelper = createColumnHelper<any>();
  const girdColumns = columns.map((column: any) => {
    switch (column.type) {
      case 'numbering':
        return columnHelper.display({
          id: column.name,
          header: column.label,
          cell: ({ row }) =>
            page ? page.pageIndex * page.pageSize + row.index + 1 : row.index + 1,
        });
      case 'reverse-numbering':
        return columnHelper.display({
          id: column.name,
          header: column.label,
          cell: ({ row }) =>
            page
              ? page.totalRows - (page.pageIndex * page.pageSize + row.index)
              : totalRows - row.index,
        });
      default:
        return columnHelper.accessor(column.name, {
          cell: (info) => {
            if (column.render) {
              return column.render(info);
            }
            return info.getValue();
          },
          header: column.label,
        });
    }
  });

  const handleChangePage = (pageIndex: number) => {
    gridFetch({
      size: page.pageSize,
      page: pageIndex,
    });
  };

  const handleChangePageSize = (pageSize: number) => {
    console.log('page size');
  };
  const handleChangeGridData = (newData: any) => {
    onDataChange(newData);
  };
  return (
    <Grid
      title={'Editable Grid'}
      {...props}
      data={data}
      columns={girdColumns}
      //disabledSelectionToggle
      hideColumnSettings
      hideRowSelectionCheckBox
      onChange={(newData: any) => handleChangeGridData(newData)}
      pagination={
        page
          ? {
              ...page,
              onPageChange: handleChangePage,
              onPageSizeChange: handleChangePageSize,
            }
          : undefined
      }
    />
  );
};
export const GridBox = GridBoxComponent;
