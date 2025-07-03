import React, { useCallback } from 'react';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { useSearchBox } from '@learnway/hooks';

import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';

import { translationQueryOptions } from '../../../../entities/translation/service/translation.queries';

import { SearchBox } from '../../../../shared/ui/search-box';

export const Route = createFileRoute('/_unauth/platform_test/widget/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config, gridFetch } = useGridBox(gridConfig, getValues);

  /**
   * 학습 컨텐츠를 등록하기 위한 Dialog 호출
   */
  const handleRegister = async () => {
    console.log('');
  };

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleRegister}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <GridBox config={config} />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: any = {
  builders: [
    [
      {
        name: 'isUsed',
        type: 'dropdown',
        label: '상태',
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'Y', label: '사용' },
          { value: 'N', label: '사용불가' },
        ],
      },
      {
        name: 'widgetName',
        type: 'text',
        label: '위젯명',
        value: '',
      },
    ],
  ],
};

const gridConfig = {
  query: translationQueryOptions.all,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    { name: 'widgetName', label: '위젯명' },
    { name: 'device', label: '디바이스' },
    { name: 'isUsed', label: '상태' },
    { name: 'preview', label: '미리보기' },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
