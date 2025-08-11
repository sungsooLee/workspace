import { useSystemCodeList } from '@entities/common-code';
import { pageRouteConfig } from '@features/auth';
import { SystemCodeGrid } from '@features/platform-management/platform/code-managemnet';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { MainContents, PageContainer } from '@shared/ui/layout';
import { SearchBox } from '@shared/ui/search-box';
import { createLazyFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

export const Route = createLazyFileRoute('/_layout/platform/code/system-code')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.page.title.systemCdManage',
    },
  }),
});

function RouteComponent() {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const { data } = useSystemCodeList();

  const [listData, setListData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  // 데이터 변환 및 초기 설정
  useEffect(() => {
    const list = data as any;
    if (list) {
      const transformedData = list.map((item: string) => ({
        enumNames: item,
      }));
      setListData(transformedData);
      setFilteredData(transformedData);
    }
  }, [data]);

  // 검색 처리 함수
  const handleSearch = (values: any) => {
    const value = values.enumName || '';
    if (!value.trim()) {
      setFilteredData(listData);
    } else {
      const filtered = listData.filter((item: any) =>
        item.enumNames.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <PageContainer>
        <MainContents>
          <SearchBox provider={sProvider} onSearch={handleSearch} />
          <SystemCodeGrid data={filteredData || []} />
        </MainContents>
      </PageContainer>
    </div>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'enumName',
        type: 'text',
        label: t('LABEL.cdGroupId'),
        value: '',
      },
    ],
  ],
};
