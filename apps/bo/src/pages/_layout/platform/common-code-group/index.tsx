import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { Grid } from '@learnway/ui';
import { pageRouteConfig } from '../../../../features/auth';
import { CommonCodeGroupGrid } from '../../../../features/common-code/ui/common-code-group-grid';
import { useCommonCodeGroupList } from '../../../../entities/common-code/service/common-code-group.hook';
import { useState } from 'react';

export const Route = createFileRoute('/_layout/platform/common-code-group/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '공통코드그룹관리',
    },
  }),
});

function RouteComponent() {
  // 페이지네이션 상태
  const [pageState, setPageState] = useState({
    page: 0,
    size: 10,
  });

  // 검색 파라미터 상태
  const [searchParams, setSearchParams] = useState({
    cdGroupNo: '',
    cdGroupName: '',
    cdGroupAbbreviatonEnglishName: '',
    cdGroupContent: '',
    validityYn: true,
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
    searchParams.cdGroupNo,
    searchParams.cdGroupName,
    searchParams.cdGroupAbbreviatonEnglishName,
    searchParams.cdGroupContent,
    searchParams.validityYn,
    searchParams.cdName,
  );

  return (
    <PageContainer scrollHidden={true}>
      <MainContents>
        <CommonCodeGroupGrid
          data={commonCodeGroupListData && [...(commonCodeGroupListData.content || [])]}
          page={pageState.page}
          size={pageState.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </MainContents>
    </PageContainer>
  );
}
