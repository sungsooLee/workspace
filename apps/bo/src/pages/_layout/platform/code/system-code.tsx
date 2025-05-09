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
  const { provider: sProvider } = useSearchBox(searchConfig);

  const { data } = useSystemCodeList();

  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (data) {
      const transformedData = data.map((item: string) => ({
        enumNames: item,
      }));
      setListData(transformedData);
    }
  }, [data]);

  return (
    <div>
      <PageContainer scrollHidden={true}>
        <MainContents>
          <SearchBox provider={sProvider} onSearch={() => console.log('~')} />
          <SystemCodeGrid data={listData || []} />
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
