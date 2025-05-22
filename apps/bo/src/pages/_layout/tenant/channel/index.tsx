import { useState, useCallback } from 'react';
import { t } from 'i18next';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
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

import { queryOptions } from '@entities/channel/service/channel.queries';

export const Route = createFileRoute('/_layout/tenant/channel/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    console.log(data);
    gridFetch(data);
  }, []);

  return (
    <PageContainer>
      {/* main_contents */}
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox
              config={gConfig}
              // columns={columns}
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
        name: 'tenantName',
        type: 'text',
        label: t('테넌트명'),
        format: 'object',
        value: '',
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
    ],
    [
      {
        name: 'isSecretChannel',
        type: 'dropdown',
        label: t('채널구분'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('비밀') },
          { value: 'false', label: t('공개') },
        ],
      },
      {
        name: 'date',
        type: 'text',
        label: t('등록기간'),
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

// const columnHelper = createColumnHelper<any>();

// const columns = [
//   columnHelper.accessor('applyId', {
//     cell: (info) => info.getValue(),
//     header: '신청ID',
//     enableGrouping: false,
//     size: 94,
//   }),
//   columnHelper.accessor('tenantSetting', {
//     cell: (info) => info.getValue(),
//     header: '테넌트설정',
//     size: 100,
//     enableGrouping: false,
//   }),
//   columnHelper.accessor('channelName', {
//     cell: (info) => info.getValue(),
//     header: '채널명',
//     size: 200,
//     enableGrouping: false,
//   }),
//   columnHelper.accessor('type', {
//     cell: (info) => info.getValue(),
//     header: '유형',
//     size: 60,
//     enableGrouping: false,
//   }),
//   columnHelper.accessor('proposer', {
//     cell: (info) => info.getValue(),
//     header: '신청자명',
//     size: 80,
//     enableGrouping: false,
//   }),
//   columnHelper.accessor('companyName', {
//     cell: (info) => info.getValue(),
//     header: '회사명',
//     size: 108,
//     enableGrouping: false,
//   }),
//   columnHelper.accessor('organizationInfo', {
//     cell: (info) => info.getValue(),
//     header: '조직정보',
//     enableGrouping: false,
//     size: 80,
//   }),
//   columnHelper.accessor('applyStatus', {
//     cell: (info) => info.getValue(),
//     header: '신청상태',
//     enableGrouping: false,
//     size: 80,
//   }),
//   columnHelper.accessor('applyDate', {
//     cell: (info) => info.getValue(),
//     header: '신청일시',
//     enableGrouping: false,
//     size: 120,
//   }),
//   columnHelper.accessor('receiptID', {
//     cell: (info) => info.getValue(),
//     header: '접수ID',
//     size: 110,
//     enableGrouping: false,
//   }),
//   columnHelper.accessor('mailSend', {
//     cell: (info) => info.getValue(),
//     header: '메일발송',
//     enableGrouping: false,
//     size: 104,
//   }),
//   columnHelper.accessor('channelStatus', {
//     cell: (info) => info.getValue(),
//     header: '채널상태',
//     enableGrouping: false,
//     size: 90,
//   }),
//   columnHelper.accessor('owner', {
//     cell: (info) => info.getValue(),
//     header: '김현대',
//     enableGrouping: false,
//     size: 104,
//   }),
//   columnHelper.accessor('receiptDate', {
//     cell: (info) => info.getValue(),
//     header: '접수/반려일시',
//     enableGrouping: false,
//     size: 120,
//   }),
// ] as ColumnDef<any, unknown>[];

// const [selectedValues, setSelectedValues] = useState<null>(null);
// const [selectedValues2, setSelectedValues2] = useState<null>(null);
// const [selectedValues3, setSelectedValues3] = useState<null>(null);
// const [selectedValues4, setSelectedValues4] = useState<null>(null);
// const options = [
//   { value: 'option1', label: '전체' },
//   { value: 'option2', label: '옵션 2' },
//   { value: 'option3', label: '옵션 3' },
// ];
// const options2 = [
//   { value: 'option1', label: '전체' },
//   { value: 'option2', label: '옵션 2' },
//   { value: 'option3', label: '옵션 3' },
// ];
// const options3 = [
//   { value: 'option1', label: '전체' },
//   { value: 'option2', label: '옵션 2' },
//   { value: 'option3', label: '옵션 3' },
// ];
// const options4 = [
//   { value: 'option1', label: '전체' },
//   { value: 'option2', label: '옵션 2' },
//   { value: 'option3', label: '옵션 3' },
// ];

// // grid
// const [pageIndex, setPageIndex] = useState(0);
// const [pageSize, setPageSize] = useState(10);
// const data: any[] = [
//   {
//     applyId: 'IA000000',
//     tenantSetting: '테넌트명',
//     channelName: '채널명채널명채널명채널명',
//     type: '공개',
//     proposer: '김현대',
//     companyName: '회사명',
//     organizationName: '조직명',
//     applyStatus: '조직명',
//     applyDate: '2025-01-01 07:12',
//     receiptID: (
//       <Button size={'xs'} className="link">
//         {'IS0000000'}
//       </Button>
//     ),
//     mailSend: 'N',
//     channelStatus: '사용',
//     owner: '김현대',
//     receiptDate: '2025-01-01 07:12',
//   },
// ];
