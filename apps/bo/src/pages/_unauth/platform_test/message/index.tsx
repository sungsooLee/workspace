import React, { useCallback, useState } from 'react';
import { Button, EditInputCell } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useSearchBox } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { MessageDetail } from '@pages/_unauth/platform_test/message/-components/detail';
import { GridBox, useGridBox } from '@shared/ui/grid-box';
import { SplitPanel } from '@shared/ui';
import { CellContext } from '@tanstack/react-table';
import { queryOptions } from '@entities/label-messages/service/label-messages.queries';

export const Route = createFileRoute('/_unauth/platform_test/message/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { gridFetch } = useGridBox(gridConfig, getValues);
  const [labelMessageId, setLabelMessageId] = useState<number>();

  const handleMultilingualManageClick = () => {
    console.log('다국어 관리 화면 이동', {
      to: '/platform/system/multilingual',
      state: {
        keyType: 'LABEL', // 다국어 분류 (다국어 관리 화면에서 검색조건의 '분류' 기본값 설정시 사용)
      },
    });
    // 다국어 관리 화면 이동
    // router.navigate({
    //   to: '/platform/system/multilingual',
    //   state: {
    //     keyType: 'LABEL', // 다국어 분류 (다국어 관리 화면에서 검색조건의 '분류' 기본값 설정시 사용)
    //     // multilinguaKey: key,
    //   },
    // });
  };

  const handleOnSearch = useCallback((data: any) => {
    console.log('handleOnSearch', data);
    gridFetch(data);
  }, []);

  const handleGridRowSelect = (row: any) => {
    console.log('handleGridRowSelect', row);
    // setLabelMessageId(row.labelMessageId);
  };

  return (
    <PageContainer scrollHidden={true}>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => handleMultilingualManageClick()}
          label={t('다국어 관리')}
        />
      </ContentsButtons>
      <MainContents>
        {/* 검색 */}
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        {/* 그리드 + 상세 */}
        <SplitPanel>
          <GridBox config={gridConfig} gridProps={{ onRowSelect: handleGridRowSelect }} />
          <MessageDetail labelMessageId={labelMessageId} />
        </SplitPanel>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: any = {
  builders: [
    [
      {
        name: 'companyTypeCode',
        type: 'dropdown',
        label: t('분류'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: '완성차', label: t('완성차') },
          { value: '현대', label: t('현대') },
          { value: '기아', label: t('기아') },
        ],
      },
      {
        name: 'labelMessageMultilingulKey',
        type: 'text',
        label: t('라벨/메세지 코드'),
        value: '',
      },
      {
        name: 'labelMessageName',
        type: 'text',
        label: t('라벨명/메세지'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 2, label: t('사용') },
          { value: 3, label: t('미사용') },
        ],
      },
    ],
  ],
};

const gridConfig = {
  query: queryOptions.all(),
  title: t('목록'),
  data: [
    { labelMessageId: 1, labelMessageType: 'a', labelMessageMultilingulKey: 'a' },
    { labelMessageId: 2, labelMessageType: 'a2', labelMessageMultilingulKey: 'a2' },
  ],
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    { name: 'labelMessageType', label: '분류' },
    {
      name: 'labelMessageMultilingulKey',
      label: '라벨/메세지 코드',
      cell: (info: CellContext<any, string>) => (
        <EditInputCell info={info} input={{ type: 'text' }} />
      ),
    },
    { name: 'labelMessageName', label: '라벨명/메세지' },
    { name: 'createdBy', label: '등록자' },
    { name: 'createdDate', label: '등록일' },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
  height: 440,
  hideColumnSettings: true,
  showExcelDownload: true,
};
