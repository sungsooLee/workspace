import React, { useCallback, useState } from 'react';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useSearchBox } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { SplitPanel } from '@shared/ui';
import { MessageDetail } from './-components/detail';
import { queryOptions } from '@entities/label-messages/service/label-messages.queries';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { LabelMessagesQueryParams } from '@types';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';

export const Route = createFileRoute('/_unauth/platform_test/message/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { t } = useTranslation();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [selectedLabelMessageId, setSelectedLabelMessageId] = useState<number>(0);

  /**
   * 검색 실행 시 호출되는 핸들러
   * @param {any} data - 검색 조건 데이터
   */
  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  /**
   * 그리드에서 '추가' 버튼 클릭 시 호출되는 핸들러
   * 음수 임시 ID를 설정하여 새 항목 추가 모드로 전환
   */
  const handleGridAddClick = () => {
    setSelectedLabelMessageId(Date.now() * -1); // 음수 랜덤 값 설정
  };

  /**
   * 그리드의 행 선택 시 호출되는 핸들러
   * @param {any} row - 선택된 행 데이터
   */
  const handleGridRowSelect = (row: any) => {
    row && setSelectedLabelMessageId(row?.labelMessageId);
  };

  /**
   * 상세 저장 완료 시 호출
   * 마지막 검색 조건을 기준으로 그리드를 재조회함
   */
  const handleSuccessSave = () => {
    gridFetch(searchProvider.originalValues);
  };

  /**
   * 다국어 관리 화면으로 이동
   */
  const handleMultilingualManageClick = () => {
    router.navigate({
      to: '/platform/system/multilingual',
      state: {
        keyType: 'LABEL', // 다국어 분류 (다국어 관리 화면에서 검색조건의 '분류' 기본값 설정시 사용)
      },
    });
  };

  // console.log('======>', {
  //   gConfig,
  //   code: codeConfig.getCodesByCodeGroup('labelMessageType'),
  // });

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => handleMultilingualManageClick()}
          label={t('LABEL.button.multilingualManage')}
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
          <MessageDetail
            labelMessageId={selectedLabelMessageId}
            onSuccessSave={handleSuccessSave}
          />
        </SplitPanel>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: any = {
  builders: [
    [
      // 분류
      {
        name: 'labelMessageType',
        type: 'dropdown',
        label: t('LABEL.form.label.category'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'LABEL', label: '라벨' },
          { value: 'MESSAGE', label: '메세지' },
        ],
      },
      // 라벨/메세지 코드
      {
        name: 'labelMessageMultilingulKey',
        type: 'text',
        label: t('LABEL.form.label.labelMessageCode'),
        value: '',
      },
      // 라벨/메세지
      {
        name: 'labelMessageName',
        type: 'text',
        label: t('LABEL.form.label.labelMessage'),
        value: '',
      },
      // 사용여부
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('LABEL.form.label.useYn'),
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
  // data: [
  //   {
  //     labelMessageId: 1,
  //     labelMessageMultilingulKey: 'aaa',
  //     labelMessageType: 'LABEL',
  //     labelMessageName: 'aa544',
  //     labelMessageDesc: 'bbb22',
  //     isUsed: false,
  //     createdBy: '9488404@ict-companion.com',
  //     createdDate: '2025-04-22T22:32:42.684Z',
  //     lastModifiedBy: '9488404@ict-companion.com',
  //     modifiedDate: '2025-05-02T00:43:24.852Z',
  //   },
  // ],
  columns: [
    // 분류
    { name: 'labelMessageType', label: () => t('LABEL.grid.column.type'), size: 100 },
    // 라벨/메세지 코드
    {
      name: 'labelMessageMultilingulKey',
      label: t('LABEL.grid.column.labelMessageCode'),
      size: 200,
    },
    // 라벨/메세지
    { name: 'labelMessageName', label: t('LABEL.grid.column.labelMessage'), size: 200 },
    // 사용여부
    {
      name: 'isUsed',
      label: t('LABEL.grid.column.useYn'),
      size: 104,
      render: (info: any) => (info.getValue() ? 'Y' : 'N'),
    },
    // 등록자
    {
      name: 'createdBy',
      size: 139,
      label: t('LABEL.grid.column.createdBy'),
    },
    // 등록일
    {
      name: 'createdDate',
      label: t('LABEL.grid.column.createdDate'),
      size: 200,
      render: (info: any) => formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
