import React, { useCallback } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useSearchBox } from '@learnway/hooks';
import { useCreation } from 'ahooks';
import { cn } from '@learnway/shared';

import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';

import { widgetsQueryOptions } from '../../../../../entities/widgets';

import { SearchBox } from '../../../../../shared/ui/search-box';

import { WidgetPreviewButton } from '../../../../../features/platform';
import { GridBox, useGridBox } from '@learnway/ui';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/platform/system/widget/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const gridInitConfig = useCreation(
    () => ({
      title: '위젯 목록',
      query: widgetsQueryOptions.all,
      columns: [
        {
          name: 'no1',
          label: 'NO.',
          type: 'numbering',
        },
        { name: 'widgetName', label: '위젯명' },
        { name: 'deviceNames', label: '디바이스' },
        { name: 'status', label: '상태' },
        {
          name: 'preview',
          label: '미리보기',
          render: ({ row }: any) => <WidgetPreviewButton widget={row.original} />,
        },
      ],
      data: [],
      pagination: {
        pageSize: 10,
        pageIndex: 0,
        totalRows: 0,
      },
      height: 450,
    }),
    [],
  );

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gridConfig, gridFetch } = useGridBox(gridInitConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox
              config={gridConfig}
              onRowSelect={(row: any) => {
                router.navigate({
                  to: '/platform/system/widget/view',
                  state: { widgetCode: row?.widgetCode },
                });
              }}
            />
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
        name: 'isUsed',
        type: 'dropdown',
        label: '상태',
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'true', label: '사용' },
          { value: 'false', label: '사용불가' },
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
