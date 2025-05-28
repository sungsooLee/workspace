import React, { useCallback, useState } from 'react';
import { Button, GridBox, GridState, useGridBox } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { CODE_GROUP, useSearchBox } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { SplitPanel } from '@shared/ui';
import { MessageDetail } from '../../../../features/platform/label-message/ui/detail';
import { queryOptions } from '@entities/label-messages/service/label-messages.queries';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { LabelMessagesQueryParams } from '@types';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { IcoPlus } from '@learnway/icons';
import { DATE_TIME_FORMAT, formatISODateString } from '@learnway/shared';

export const Route = createFileRoute('/_layout/platform/label-message/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
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

  const handleStateChange = (newState: GridState) => {
    console.log(newState);
  };

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
            // height={400}
            // showAdd
            showNumberingColumn
            autoSelectFirstRow
            onRowSelect={handleGridRowSelect}
            // onAddClick={handleGridAddClick}
            customButtonNode={
              <Button variant="text" onClick={handleGridAddClick} className={layoutStyles.btn_text}>
                <IcoPlus width={16} height={16} stroke="#131C30" />
                {t('LABEL.grid.header.add')}
              </Button>
            }
            onStateChange={handleStateChange}
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
      {
        name: 'labelMessageType',
        type: 'dropdown',
        label: t('LABEL.form.label.category'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('LABEL.all') }],
          codeGroup: CODE_GROUP['pms.labelmessage.LabelMessageType'],
        },
      },
      {
        name: 'labelMessageMultilingulKey',
        type: 'text',
        label: t('LABEL.form.label.labelMessageCode'),
        value: '',
      },
      {
        name: 'labelMessageName',
        type: 'text',
        label: t('LABEL.form.label.labelMessage'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('LABEL.form.label.useYn'),
        value: '',
        options: [
          { value: '', label: t('LABEL.all') },
          { value: 'true', label: t('LABEL.common.isUsed') },
          { value: 'false', label: t('LABEL.common.disable') },
        ],
      },
    ],
  ],
};

const gridConfig = {
  query: queryOptions.all<LabelMessagesQueryParams>,
  columns: [
    { name: 'labelMessageType', label: () => t('LABEL.grid.column.type') },
    {
      name: 'labelMessageMultilingulKey',
      label: t('LABEL.grid.column.labelMessageCode'),
    },
    { name: 'labelMessageName', label: t('LABEL.grid.column.labelMessage') },
    { name: 'createdBy', label: t('LABEL.grid.column.createdBy') },
    {
      name: 'createdDate',
      label: t('LABEL.grid.column.createdDate'),
      render: (info: any) => formatISODateString(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
