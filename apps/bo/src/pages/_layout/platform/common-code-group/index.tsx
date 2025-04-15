import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { Grid } from '@learnway/ui';
import { pageRouteConfig } from '../../../../features/auth';
import { CommonCodeGroupGrid } from '../../../../features/common-code/ui/common-code-group-grid';
import { useCommonCodeGroupList } from '../../../../entities/common-code/service/common-code-group.hook';
import { useState } from 'react';
import { SearchBox } from '../../../../shared/ui/search-box';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';

export const Route = createFileRoute('/_layout/platform/common-code-group/')({
  component: RouteComponent,
  ...pageRouteConfig({}),
});

function RouteComponent() {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  // 페이지네이션 상태
  const [pageState, setPageState] = useState({
    page: 0,
    size: 10,
  });

  // 검색 파라미터 상태
  const [searchParams, setSearchParams] = useState({
    cdGroupId: '',
    cdGroupName: '',
    isUsed: true,
    cdName: '',
  });

  const handlePageChange = (newPage: number) => {
    setPageState({ ...pageState, page: newPage });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageState({ page: 0, size: newSize });
  };

  // 검색 파라미터 변경 핸들러
  //   const handleSearchChange = (newParams: Partial<typeof searchParams>) => {
  //     setSearchParams({ ...searchParams, ...newParams });
  //     // 검색 시 1페이지로 리셋
  //     setPageState({ ...pageState, page: 1 });
  //   };

  const { data: commonCodeGroupListData } = useCommonCodeGroupList(
    pageState.page,
    pageState.size,
    searchParams.cdGroupId,
    searchParams.cdGroupName,
    searchParams.isUsed,
    searchParams.cdName,
  );

  const handleOnSearch = (data: any) => {
    setSearchParams({
      cdGroupId: data.cdGroupId || '',
      cdGroupName: data.cdGroupName || '',
      isUsed: data.isUsed || '',
      cdName: data.cdName || '',
    });
  };

  return (
    <PageContainer scrollHidden={true}>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <CommonCodeGroupGrid
          data={commonCodeGroupListData && [...(commonCodeGroupListData.content || [])]}
          page={pageState.page}
          size={pageState.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalRows={commonCodeGroupListData && commonCodeGroupListData.totalElements}
          state={searchParams}
        />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'cdGroupId',
        type: 'text',
        label: t('LABEL.cdGroupId'),
        value: '',
      },
      {
        name: 'cdGroupName',
        type: 'text',
        label: t('LABEL.cdGroupName'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('LABEL.isUsed'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ],
      },
      {
        name: 'cdName',
        type: 'text',
        label: t('LABEL.cdName'),
        value: '',
      },
    ],
  ],
};
