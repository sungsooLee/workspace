import React, { useCallback } from 'react';
import { Button } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { t } from 'i18next';
import { SearchBox } from '../../../../../shared/ui/search-box';
import { useSearchBox } from '@learnway/hooks';
import { translationQueryOptions } from '../../../../../entities/translation/service/translation.queries';
import { GridBox, useGridBox } from '../../../../../shared/ui/grid-box';

export const Route = createFileRoute('/_unauth/platform_test/company/company/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { gridFetch } = useGridBox(gridConfig, getValues);

  const handleBulkRegister = async () => {
    console.log('handleBulkRegister');
  };

  const handleRegister = async () => {
    console.log('handleRegister');
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
          onClick={handleBulkRegister}
          label={t('일괄등록')}
        />
        <Button
          type="button"
          variant="point"
          size="sm"
          onClick={handleRegister}
          label={t('등록')}
        />
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <GridBox config={gridConfig} />
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
        label: t('회사구분'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: '완성차', label: t('완성차') },
          { value: '현대', label: t('현대') },
          { value: '기아', label: t('기아') },
        ],
      },
      {
        name: 'name',
        type: 'text',
        label: t('회사/법인명'),
        value: '',
      },
      {
        name: 'useYn',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: true, label: t('사용') },
          { value: false, label: t('미사용') },
        ],
      },
    ],
  ],
};

const gridConfig = {
  query: translationQueryOptions.all,
  title: t('회사(법인)목록'),
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    { name: '회사구분', label: '회사구분' },
    { name: '법인코드', label: '법인코드' },
    { name: '회사/법인명', label: '회사/법인명' },
    { name: '대표자', label: '대표자' },
    { name: '사업자번호', label: '사업자번호' },
    { name: '사용여부', label: '사용여부' },
    { name: '담당자', label: '담당자' },
    { name: '등록일자', label: '등록일자' },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
  height: 566,
  hideColumnSettings: true,
  showExcelDownload: true,
};
