import { LabelMessage, LabelMessagesQueryParams } from '@entities/label-messages';
import { queryOptions } from '@entities/label-messages-mock';
import { useDynamicForm2 } from '@learnway/hooks';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { PopoverList } from '@learnway/ui/popover-list';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { SearchBox } from './-components/search-box';

export const Route = createFileRoute('/_unauth/sample/search-box-grid-box-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, getValues, onSubmit } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox<LabelMessage>(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const handleOnRowDoubleClick = useCallback((row: any) => {
    console.log('handleOnRowDoubleClick.row {} => ', row);
  }, []);

  const customButtonNode = useMemo(() => {
    return (
      <PopoverList
        options={[
          { label: 'Menu 1', value: '1' },
          { label: 'Menu 2', value: '2' },
          { label: 'Menu 3', value: '3' },
        ]}
        onOptionSelect={(option: any) => {
          console.log('onOptionSelect', option);
        }}
      >
        <Button type="button" variant="point" size="sm" label={'popover'} />
      </PopoverList>
    );
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <PopoverList
          options={[
            { label: 'Menu 1', value: '1' },
            { label: 'Menu 2', value: '2' },
            { label: 'Menu 3', value: '3' },
          ]}
          onOptionSelect={(option: any) => {
            console.log('onOptionSelect', option);
          }}
        >
          <Button type="button" variant="point" size="sm" label={'POP'} />
        </PopoverList>
        <Button type="button" variant="point" size="sm" label={t('과정개설')} />
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={provider} onSearch={handleOnSearch} onSubmit={onSubmit} />
        <Divider />
        <GridBox
          config={gConfig}
          selectedRowIds={['3']}
          showNumberingColumn
          customButtonNode={customButtonNode}
          multiple
          hideRowSelectionCheckBox={false}
          hidePagination
          onRowDoubleClick={handleOnRowDoubleClick}
        />
      </MainContents>
    </PageContainer>
  );
}

const gridConfig = {
  query: queryOptions.all<LabelMessagesQueryParams>,
  rowId: 'labelMessageId',
  columns: [
    // 분류
    { name: 'labelMessageType', label: () => t('LABEL.grid.column.type', '분류'), size: 100 },
    // 라벨/메세지 코드
    {
      name: 'labelMessageMultilingulKey',
      label: () => t('LABEL.grid.column.labelMessageCode', '라벨/메세지 코드'),
      size: 200,
    },
    // 라벨/메세지
    {
      name: 'labelMessageName.aaa',
      id: 'labelMessageName.aaa',
      label: () => t('LABEL.grid.column.labelMessage', '라벨/메세지2'),
      size: 200,
      meta: { sortKey: 'xxx' },
    },
    // 사용여부
    {
      name: 'isUsed',
      label: () => t('LABEL.grid.column.useYn', '사용여부'),
      size: 104,
      render: (info: any) => (info.getValue() ? 'Y' : 'N'),
    },
    // 등록자
    {
      name: 'createdBy',
      size: 139,
      label: () => t('LABEL.grid.column.createdBy', '등록자'),
    },
    // 등록일
    {
      name: 'createdDate',
      label: () => t('LABEL.grid.column.createdDate', '등록일'),
      size: 200,
      render: (info: any) => formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    },
  ],
  gridState: {
    page: 0,
    size: 10,
    sort: ['labelMessageMultilingulKey,desc'],
  },
};

// const columns = [
//   columnHelper.accessor('labelMessageType', {
//     id: 'labelMessageType',
//     header: t('LABEL.grid.column.type', '분류'),
//     size: 100,
//   }),

//   columnHelper.accessor('labelMessageMultilingulKey', {
//     id: 'labelMessageMultilingulKey',
//     header: t('LABEL.grid.column.labelMessageCode', '라벨/메세지 코드'),
//     size: 200,
//   }),

//   columnHelper.accessor('labelMessageName.aaa', {
//     id: 'labelMessageName.aaa',
//     header: t('LABEL.grid.column.labelMessage', '라벨/메세지'),
//     size: 200,
//   }),

//   columnHelper.accessor('isUsed', {
//     id: 'isUsed',
//     header: t('LABEL.grid.column.useYn', '사용여부'),
//     size: 104,
//     cell: (info: any) => (info.getValue() ? 'Y' : 'N'),
//   }),

//   columnHelper.accessor('createdBy', {
//     id: 'createdBy',
//     header: t('LABEL.grid.column.createdBy', '등록자'),
//     size: 139,
//   }),

//   columnHelper.accessor('createdDate', {
//     id: 'createdDate',
//     header: '등록일2',
//     size: 200,
//     cell: (info: any) => formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
//   }),
// ];
