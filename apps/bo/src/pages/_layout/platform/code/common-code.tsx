import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { Button, GridState } from '@learnway/ui';

import { t } from 'i18next';
import { pageRouteConfig } from '../../../../features/auth';
import { SearchBoxConfig, useCurrentRoute, useSearchBox } from '@learnway/hooks';
import { useEffect, useState } from 'react';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '../../../../shared/ui/search-box';
import { useCommonCodeList } from '../../../../entities/common-code/service/common-code.hook';
import { ContentsButtons } from '../../../../widgets/layout/ui/container/slot/contents-buttons';
import { CommonCodeGrid } from '../../../../features/platform/code/ui/common-code-grid';

export const Route = createFileRoute('/_layout/platform/code/common-code')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '공통코드관리',
    },
  }),
});

function RouteComponent() {
  const { provider: sProvider, onFormChange } = useSearchBox(searchConfig);
  const { state } = useCurrentRoute(Route);
  const router = useRouter();

  // 페이지네이션 상태
  const [pageState, setPageState] = useState({
    page: 0,
    size: 10,
  });

  const [sortState, setSortState] = useState({
    sort: '',
  });

  // 검색 파라미터 상태
  const [searchParams, setSearchParams] = useState({
    cdGroupId: state.cdGroupId || '',
    cdGroupName: state.cdGroupName || '',
    isUsed: '',
    cdName: '',
  });

  const { data: commonCodeListData } = useCommonCodeList(
    pageState.page,
    pageState.size,
    sortState.sort,
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

  useEffect(() => {
    if (state) {
      onFormChange({ cdGroupId: state.cdGroupId, cdGroupName: state.cdGroupName });
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setPageState({ ...pageState, page: newPage });
  };
  const handlePageSizeChange = (newSize: number) => {
    setPageState({ page: 0, size: newSize });
  };

  const handleGridStateChange = (newState: GridState) => {
    if (newState.sorting && newState.sorting.length > 0) {
      const sortItem = newState.sorting[0];
      const direction = sortItem.desc ? 'desc' : 'asc';
      const sortItemNameMap: Record<string, string> = {
        cdId: 'commonCdEntityId.cdId',
        isUsed: 'commonCdEntity.isUsed',
        createdDate: 'commonCdEntity.createdDate',
        createdBy: 'commonCdEntity.createdBy',
        modifiedDate: 'commonCdEntity.modifiedDate',
        lastModifiedBy: 'commonCdEntity.lastModifiedBy',
      };
      const sortItemName = sortItemNameMap[sortItem.id] || sortItem.id;
      const sortValue = `${sortItemName},${direction}`;
      setSortState({ sort: sortValue });
    } else {
      setSortState({ sort: '' });
    }
  };

  return (
    <div>
      <PageContainer scrollHidden={true}>
        <ContentsButtons>
          <Button
            type="button"
            variant="point"
            size="sm"
            onClick={() => {
              router.navigate({
                to: '/platform/system/multilingual',
                state: {
                  keyType: 'COMMON_CODE', // 다국어 분류 - 공통코드
                },
              });
            }}
          >
            다국어관리
          </Button>
          <Button
            type="button"
            variant="point"
            size="sm"
            onClick={() =>
              router.navigate({
                to: '/platform/code/common-code-group',
              })
            }
          >
            공통코드그룹목록
          </Button>
        </ContentsButtons>
        <MainContents>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <CommonCodeGrid
            data={commonCodeListData && [...(commonCodeListData.content || [])]}
            page={pageState.page}
            size={pageState.size}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            state={{
              ...searchParams,
              sort: sortState.sort,
            }}
            totalRows={commonCodeListData && commonCodeListData.totalElements}
            onStateChange={handleGridStateChange} // 이 부분 추가
          />
        </MainContents>
      </PageContainer>
    </div>
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
