import React, { useCallback, useState } from 'react';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { codeConfig } from '@learnway/config';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useSearchBox } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { MessageDetail } from '@pages/_unauth/platform_test/message/-components/detail';
import { SplitPanel } from '@shared/ui';
import { queryOptions } from '@entities/label-messages/service/label-messages.queries';
import { useTranslation } from 'react-i18next';
import { LabelMessagesQueryParams } from '@types';

export const Route = createFileRoute('/_unauth/platform_test/message/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { t } = useTranslation<any>();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedLabelMessageId, setSelectedLabelMessageId] = useState<number>(-1);

  const handleMultilingualManageClick = () => {
    router.navigate({
      to: '/platform/system/multilingual',
      state: {
        keyType: 'LABEL', // 다국어 분류 (다국어 관리 화면에서 검색조건의 '분류' 기본값 설정시 사용)
      },
    });
  };

  const handleOnSearch = useCallback((data: any) => {
    console.log('handleOnSearch', data);
    gridFetch(data);
  }, []);

  const handleGridAddClick = () => {
    console.log('handleGridAddClick');
    setSelectedLabelMessageId(Date.now() * -1); // 음수 랜덤 값 설정
  };

  const handleGridRowSelect = (row: any) => {
    console.log('handleGridRowSelect', row);
    setSelectedLabelMessageId(row?.labelMessageId);
  };

  const code = codeConfig.getCodesByCodeGroup('labelMessageType');

  console.log('code', code, codeConfig.get());
  console.log('gConfig', gConfig);

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
        <SplitPanel rightSize={450}>
          <GridBox
            config={gConfig}
            title={t('목록')}
            height={440}
            showAdd
            showNumberingColumn
            autoSelectFirstRow
            onRowSelect={handleGridRowSelect}
            onAddClick={handleGridAddClick}
          />
          <MessageDetail labelMessageId={selectedLabelMessageId} />
        </SplitPanel>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: any = {
  builders: [
    [
      {
        name: 'labelMessageType',
        type: 'dropdown',
        label: '분류',
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'LABEL', label: '라벨' },
          { value: 'MESSAGE', label: '메세지' },
        ],
      },
      {
        name: 'labelMessageMultilingulKey',
        type: 'text',
        label: '라벨/메세지 코드',
        value: '',
      },
      {
        name: 'labelMessageName',
        type: 'text',
        label: '라벨명/메세지',
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: '사용여부',
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'true', label: '사용' },
          { value: 'false', label: '미사용' },
        ],
      },
    ],
  ],
};

const gridConfig = {
  query: queryOptions.all<LabelMessagesQueryParams>,
  data: [
    { labelMessageId: 1, labelMessageType: 'a', labelMessageMultilingulKey: 'a' },
    { labelMessageId: 2, labelMessageType: 'a2', labelMessageMultilingulKey: 'a2' },
  ],
  columns: [
    { name: 'labelMessageType', label: '분류' },
    {
      name: 'labelMessageMultilingulKey',
      label: '라벨/메세지 코드',
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
};
