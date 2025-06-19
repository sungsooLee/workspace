import React, { useCallback, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button, GridBox, useGridBox, GridBoxState, Divider, SplitPanel } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { CODE_GROUP, useSearchBox } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { queryOptions } from '@entities/label-messages/service/label-messages.queries';
import { LabelMessagesQueryParams } from '@types';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css'; // 화면 내 컨텐츠 레이아웃 css
import { IcoPlus } from '@learnway/icons';
import { DATE_TIME_FORMAT, formatISODateString, getRowSelectionByList } from '@learnway/shared';
import { Table } from '@tanstack/react-table';
import { MessageDetail } from '../../../../features/platform/label-message/ui/detail';

export const Route = createFileRoute('/_layout/platform/label-message/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);
  const [selectedLabelMessageId, setSelectedLabelMessageId] = useState<number>(0);
  const [lastSavedLabelMessageId, setLastSavedLabelMessageId] = useState<number | null>(null);
  const [tableInstance, setTableInstance] = useState<Table<any>>();

  const currentGridStateRef = useRef<GridBoxState>({ page: 0, size: 20, sort: [] });

  /**
   * 검색 실행 시 호출되는 핸들러
   * @param {any} data - 검색 조건 데이터
   */
  const handleOnSearch = useCallback((data: any) => {
    setLastSavedLabelMessageId(null);
    setSelectedLabelMessageId(0);

    gridFetch(data, { ...currentGridStateRef.current, page: 0 });
  }, []);

  /**
   * 그리드에서 '추가' 버튼 클릭 시 호출되는 핸들러
   * 음수 임시 ID를 설정하여 새 항목 추가 모드로 전환
   */
  const handleGridAddClick = () => {
    if (tableInstance) {
      tableInstance.setRowSelection({});
    }
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
  const handleSuccessSave = (response?: any) => {
    if (response?.labelMessageId) {
      setLastSavedLabelMessageId(response.labelMessageId);
    }

    gridFetch(searchProvider.getValues(), { ...currentGridStateRef.current, page: 0 });
  };

  /**
   * 다국어 관리 화면으로 이동
   */
  const handleMultilingualManageClick = () => {
    router.navigate({
      to: '/platform/system/multilingual',
      state: {
        keyType: 'LABEL',
      },
    });
  };

  // 페이지 변경이나 검색 시 플래그 리셋
  const handleStateChange = (newState: GridBoxState) => {
    if (newState.page !== undefined && newState.page !== currentGridStateRef.current?.page) {
      setSelectedLabelMessageId(0);
      setLastSavedLabelMessageId(null);
    }

    currentGridStateRef.current = newState;
    if (tableInstance) selectFirstRow(data, tableInstance);
  };

  const selectFirstRow = useCallback((dataContent: any[], tableInstance: Table<any>) => {
    if (dataContent.length > 0) {
      const firstRow = dataContent[0];
      setTimeout(() => {
        const newSelection = getRowSelectionByList(tableInstance, [firstRow], 'labelMessageId');
        tableInstance.setRowSelection(newSelection);
        setSelectedLabelMessageId(firstRow.labelMessageId);
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (data?.content && tableInstance) {
      if (lastSavedLabelMessageId) {
        const savedLabelMessage = data.content.find(
          (item: any) => item.labelMessageId === lastSavedLabelMessageId,
        );

        if (savedLabelMessage) {
          setTimeout(() => {
            const newSelection = getRowSelectionByList(
              tableInstance,
              [savedLabelMessage],
              'labelMessageId',
            );
            tableInstance.setRowSelection(newSelection);
            setSelectedLabelMessageId(savedLabelMessage.labelMessageId);
          }, 100);
          setLastSavedLabelMessageId(null);
          return;
        } else {
          setLastSavedLabelMessageId(null);
          selectFirstRow(data.content, tableInstance);
        }
      }

      if (data.content.length > 0) {
        selectFirstRow(data.content, tableInstance);
      }
    }
  }, [data]);

  return (
    <div>
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
          <Divider />
          <SplitPanel size={['auto', 450]} divider>
            <GridBox
              config={gConfig}
              title={t('목록')}
              showNumberingColumn
              onRowSelect={handleGridRowSelect}
              customButtonNode={
                <Button
                  variant="text"
                  onClick={handleGridAddClick}
                  className={layoutStyles.btn_text}
                >
                  <IcoPlus width={16} height={16} stroke="#131C30" />
                  {t('LABEL.grid.header.add')}
                </Button>
              }
              onStateChange={handleStateChange}
              onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
            />
            <MessageDetail
              labelMessageId={selectedLabelMessageId}
              onSuccessSave={handleSuccessSave}
            />
          </SplitPanel>
        </MainContents>
      </PageContainer>
    </div>
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
    {
      name: 'isUsed',
      label: t('LABEL.grid.column.useYn'),
      size: 80,
      render: (info: any) => {
        return <span>{info.getValue() === true ? 'Y' : 'N'}</span>;
      },
      meta: {
        cellAlign: 'center',
      },
    },
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
