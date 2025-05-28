import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { Grid, GridState } from '@learnway/ui';
import { pageRouteConfig } from '../../../../features/auth';
import { useCodeGroupList } from '../../../../entities/common-code/service/common-code-group.hook';
import { useState } from 'react';
import { SearchBox } from '../../../../shared/ui/search-box';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { CommonCodeGroupGrid } from '../../../../features/platform/code/ui/common-code-group-grid';

export const Route = createFileRoute('/_layout/platform/code/common-code-group')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.page.title.commonCdGroupManage',
    },
  }),
});

function RouteComponent() {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  // 페이지네이션 상태
  const [pageState, setPageState] = useState({
    page: 0,
    size: 10,
  });

  const [sortState, setSortState] = useState<{ sort: string[] }>({
    sort: [],
  });

  // 검색 파라미터 상태
  const [searchParams, setSearchParams] = useState({
    cdGroupId: '',
    cdGroupName: '',
    isUsed: '',
  });

  const [isSearched, setIsSearched] = useState(false);

  const handlePageChange = (newPage: number) => {
    setPageState({ ...pageState, page: newPage });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageState({ page: 0, size: newSize });
  };

  const { data: commonCodeGroupListData } = useCodeGroupList({
    page: pageState.page,
    size: pageState.size,
    sort: sortState.sort,
    cdGroupId: searchParams.cdGroupId,
    cdGroupName: searchParams.cdGroupName,
    isUsed: searchParams.isUsed,
  });

  const handleOnSearch = (data: any) => {
    setSearchParams({
      cdGroupId: data.cdGroupId || '',
      cdGroupName: data.cdGroupName || '',
      isUsed: data.isUsed || '',
    });
    setIsSearched(true);
  };

  const handleGridStateChange = (newState: GridState) => {
    if (newState.sorting && newState.sorting.length > 0) {
      const sortItems = newState.sorting.map((sortItem) => {
        const direction = sortItem.desc ? 'desc' : 'asc';
        const sortItemNameMap: Record<string, string> = {
          isUsed: 'commonCdGroupEntity.isUsed',
          createdDate: 'commonCdGroupEntity.createdDate',
          createdBy: 'commonCdGroupEntity.createdBy',
          modifiedDate: 'commonCdGroupEntity.modifiedDate',
          lastModifiedBy: 'commonCdGroupEntity.lastModifiedBy',
        };
        const sortItemName = sortItemNameMap[sortItem.id] || sortItem.id;
        return `${sortItemName},${direction}`;
      });

      setSortState({ sort: sortItems });
    } else {
      setSortState({ sort: [] });
    }
  };

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <CommonCodeGroupGrid
          data={commonCodeGroupListData?.content || []}
          page={pageState.page}
          size={pageState.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalRows={commonCodeGroupListData?.totalElements}
          state={{
            ...searchParams,
            sort: sortState.sort,
          }}
          onStateChange={handleGridStateChange}
          isSearched={isSearched}
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
    ],
  ],
};
