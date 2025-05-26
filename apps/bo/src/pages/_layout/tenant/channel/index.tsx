import { useState, useCallback } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

import { cn } from '@learnway/shared';
import {
  Button,
  GridBox,
  Dropdown,
  DatePicker,
  Input,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { ChannelRequestChoiceModal } from '@features/shared';
import { useModal } from '@learnway/ui';

import { queryOptions } from '@entities/channel/service/channel.queries';

export const Route = createFileRoute('/_layout/tenant/channel/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { open: openModal } = useModal();

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          onClick={() =>
            openModal({
              width: 'xl',
              content: <ChannelRequestChoiceModal />,
              onClose(data: any) {
                if (data) {
                  router.navigate({
                    to: '/tenant/channel/regist',
                    state: { method: 'request', channelRequestUuid: data.channelRequestUuid },
                  });
                }
              },
            })
          }
        >
          {t('채널 신청 개설')}
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            router.navigate({ to: '/tenant/channel/regist', state: { method: 'direct' } })
          }
        >
          {t('채널 직접 개설')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox
              config={gConfig}
              columns={columns}
              // height={440}
              // showColumnSettings={false}
              // showNumberingColumn={true}
              // multiple
              title="채널 목록"
            />
          </div>
        </div>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'createType',
        type: 'dropdown',
        label: t('개설방식'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('직접개설') },
          { value: 'false', label: t('신청개설') },
        ],
      },
      {
        name: 'tenantName',
        type: 'text',
        label: t('테넌트명'),
        format: 'object',
        value: '',
      },
      {
        name: 'channelName',
        type: 'text',
        label: t('채널명'),
        value: '',
      },
      {
        name: 'channelId',
        type: 'text',
        label: t('채널ID'),
        value: '',
      },
    ],
    [
      {
        name: 'isUniversalChannel',
        type: 'dropdown',
        label: t('체널유형'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('유니버셜') },
          { value: 'false', label: t('일반') },
        ],
      },
      {
        name: 'isActive',
        type: 'dropdown',
        label: t('활성여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('활성화') },
          { value: 'false', label: t('비활성화') },
        ],
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('채널상태'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ],
      },
      {
        name: 'date',
        type: 'text',
        label: t('등록기간'),
        value: '',
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: queryOptions.list,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('createType', {
    cell: (info) => info.getValue(),
    header: '개설방식',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: '테넌트',
    size: 100,
    enableGrouping: false,
  }),

  columnHelper.accessor('channelName', {
    cell: (info) => info.getValue(),
    header: '채널명',
    enableGrouping: false,
    size: 94,
  }),
  columnHelper.accessor('channelId', {
    cell: (info) => info.getValue(),
    header: '채널아이디',
    size: 60,
    enableGrouping: false,
  }),
  columnHelper.accessor('isUniversalChannel', {
    cell: (info) => (info.getValue() ? t('일반') : t('유니버셜')),
    header: '채널유형',
    size: 80,
    enableGrouping: false,
  }),
  columnHelper.accessor('isSecretChannel', {
    cell: (info) => (info.getValue() ? t('비밀') : t('공개')),
    header: '채널구분',
    size: 108,
    enableGrouping: false,
  }),
  columnHelper.accessor('subscribe', {
    cell: (info) => info.getValue(),
    header: '구독방식',
    enableGrouping: false,
    size: 80,
  }),
  columnHelper.accessor('channelOwnerName', {
    cell: (info) => info.getValue(),
    header: t('채널소유자'),
    enableGrouping: false,
    size: 80,
  }),
  columnHelper.accessor('isActive', {
    cell: (info) => (info.getValue() ? t('활성화') : t('비활성화')),
    header: '활성 여부',
    enableGrouping: false,
    size: 120,
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
    header: '사용여부',
    enableGrouping: false,
    size: 120,
  }),
  columnHelper.accessor('createdBy', {
    cell: (info) => info.getValue(),
    header: '등록자',
    size: 110,
    enableGrouping: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => info.getValue(),
    header: '등록일',
    enableGrouping: false,
    size: 104,
  }),
  columnHelper.accessor('lastModifiedBy', {
    cell: (info) => info.getValue(),
    header: '수정자',
    enableGrouping: false,
    size: 90,
  }),
  columnHelper.accessor('modifiedDate', {
    cell: (info) => info.getValue(),
    header: '수정일',
    enableGrouping: false,
    size: 104,
  }),
];
