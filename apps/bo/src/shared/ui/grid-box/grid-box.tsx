import { FC } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Grid } from '@learnway/ui';

/**
 * 임시
 * @param config
 * @constructor
 */
const GridBoxComponent: FC<any> = ({ config }) => {
  const { data: data, page, totalRows, gridFetch, columns } = config;
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
      pageSize: page.pageSize,
      pageIndex,
    });
  };

  const handleChangePageSize = (pageSize: number) => {
    console.log('page size');
  };
  console.log('page =>  ', page);

  return (
    <Grid
      data={data}
      columns={girdColumns}
      pagination={
        page
          ? {
              ...page,
              onPageChange: handleChangePage,
              onPageSizeChange: handleChangePageSize,
            }
          : undefined
      }
      /*pagination={

      }*/
    />
  );
};
export const GridBox = GridBoxComponent;
