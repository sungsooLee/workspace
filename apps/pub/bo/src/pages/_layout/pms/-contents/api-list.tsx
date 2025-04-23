import { FC } from 'react';
import { cn } from '@learnway/shared';
import { GridBox, Button } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
/* style */
import styles from './role-list-search.module.css';

const ApiListComponent: FC<{}> = ({}) => {
  // grid
  const data: any[] = [
    {
      Sort: 'Common API',
      API: <Button className="link">API 1</Button>,
      Delete: (
        <Button size="xs" variant="gray2">
          삭제
        </Button>
      ),
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('Sort', {
      cell: (info) => info.getValue(),
      header: '분류',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('API', {
      cell: (info) => info.getValue(),
      header: 'API',
      size: 300,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <GridBox data={data} columns={columns} showColumnSettings={false} multiple title="API 목록" />
    </div>
  );
};

ApiListComponent.displayName = 'ApiList';
export const ApiList = ApiListComponent;
