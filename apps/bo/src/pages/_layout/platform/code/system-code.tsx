import { createFileRoute } from '@tanstack/react-router';
import { pageRouteConfig } from '../../../../features/auth';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '../../../../shared/ui/search-box';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { t } from 'i18next';
import { SystemCodeGrid } from '../../../../features/platform/code/ui/system-code-grid';
import { useSystemCodeList } from '../../../../entities/common-code/service/system-code.hook';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/platform/code/system-code')({
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

  useEffect(() => {
    if (data) {
      const transformedData = data.map((item: string) => ({
        enumNames: item,
      }));
      setFilteredData(transformedData);
    }
  }, [data]);

  const [filteredData, setFilteredData] = useState([]);

  // 데이터 변환 및 초기 설정
  useEffect(() => {
    if (data) {
      const transformedData = data.map((item: string) => ({
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
      <PageContainer scrollHidden={true}>
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
        label: t('그룹코드'),
        value: '',
      },
    ],
  ],
};
