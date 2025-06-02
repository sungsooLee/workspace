import { useFetchLabelMessages } from '@entities/label-messages-mock';
import { useCallback } from 'react';
import { t } from 'i18next';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import { GridBox } from '@learnway/ui';

const RightComponent = ({ condition }: any) => {
  const { data } = useFetchLabelMessages();

  const handleOnSearch = useCallback((data: any) => {
    console.log('handleOnSearch.data', data);
    // gridFetch(data);
  }, []);

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

  return <GridBox columns={columns} data={data} />;
};
