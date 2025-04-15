import React, { useCallback } from 'react';
import { Button } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useSearchBox } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { translationQueryOptions } from '@entities/translation/service/translation.queries';
import { cn } from '@learnway/shared';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css';
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { MessageDetail } from '@pages/_unauth/platform_test/message/-components/detail';
import { GridBox, useGridBox } from '@shared/ui/grid-box';

export const Route = createFileRoute('/_unauth/platform_test/message/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { gridFetch } = useGridBox(gridConfig, getValues);

  const handleI18nManageClick = (code?: string) => {
    console.log('handleI18nManageClick');
  };

  const handleOnSearch = useCallback((data: any) => {
    console.log('handleOnSearch', data);
    gridFetch(data);
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={() => handleI18nManageClick()}
          label={t('다국어 관리')}
        />
      </ContentsButtons>
      <MainContents>
        {/* 검색 */}
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        {/* 그리드 + 상세 */}
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className={cn(layoutStyles.start, layoutStyles.wrap, layoutStyles.ratio_third)}>
            {/* 그리드 */}
            <div className={cn(layoutStyles.inner, layoutStyles.scrollHidden)}>
              <div className={layoutStyles.inner_contents}>
                <GridBox config={gridConfig} />
              </div>
            </div>
            {/* 상세 */}
            <MessageDetail />
          </div>
        </div>
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
  query: translationQueryOptions.all,
  title: t('목록'),
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    { name: 'labelMessageType', label: '분류' },
    { name: 'labelMessageMultilingulKey', label: '라벨/메세지 코드' },
    { name: 'labelMessageName', label: '라벨명/메세지' },
    { name: 'createdBy', label: '등록자' },
    { name: 'createdDate', label: '등록일' },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
  height: 440,
  hideColumnSettings: true,
  showExcelDownload: true,
};
