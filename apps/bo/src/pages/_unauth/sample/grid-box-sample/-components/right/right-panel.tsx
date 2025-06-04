import { useFetchLabelMessages } from '@entities/label-messages-mock';
import { t } from 'i18next';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import { GridBox, GridBoxState } from '@learnway/ui';
import { Table } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';

const RightPanelComponent = ({ params, setTableInstance }: any) => {
  const [fetchParams, setFetchParams] = useState<any>(params);
  const { data } = useFetchLabelMessages(fetchParams);

  const columns = [
    // 분류
    { accessorKey: 'labelMessageType', header: () => t('LABEL.grid.column.type'), size: 100 },
    // 라벨/메세지 코드
    {
      accessorKey: 'labelMessageMultilingulKey',
      header: t('LABEL.grid.column.labelMessageCode'),
      size: 200,
    },
    // 라벨/메세지
    { accessorKey: 'labelMessageName', header: t('LABEL.grid.column.labelMessage'), size: 200 },
    // 사용여부
    {
      accessorKey: 'isUsed',
      header: t('LABEL.grid.column.useYn'),
      size: 104,
      cell: (info: any) => (info.getValue() ? 'Y' : 'N'),
    },
    // 등록자
    {
      accessorKey: 'createdBy',
      size: 139,
      header: t('LABEL.grid.column.createdBy'),
    },
    // 등록일
    {
      accessorKey: 'createdDate',
      header: t('LABEL.grid.column.createdDate'),
      size: 200,
      cell: (info: any) => formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    },
  ];

  console.log('right-panel', { params, data });

  const handleStateChange = useCallback(
    (newState: GridBoxState) => {
      console.log(newState);
      setFetchParams({ ...params, ...newState });
    },
    [params],
  );

  useEffect(() => {
    setFetchParams(params);
  }, [params]);

  return (
    <GridBox
      columns={columns}
      data={params ? data?.content : []}
      showNumberingColumn
      pagination={{
        pageSize: data?.pageable?.pageSize,
        pageNumber: data?.pageable?.pageNumber,
        totalPages: data?.totalPages,
      }}
      // pagination={
      // params
      //   ? {
      //       pageSize: data?.pageable?.pageSize,
      //       pageNumber: data?.pageable?.pageNumber,
      //       totalPages: data?.totalPages,
      //     }
      //   : undefined
      // }
      onTableInstanceChange={(table: Table<any>) => setTableInstance?.(table)}
      onStateChange={handleStateChange}
    />
  );
};

export const RightPanel = RightPanelComponent;
