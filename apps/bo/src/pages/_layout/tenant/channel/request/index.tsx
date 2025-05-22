import { useEffect, useCallback, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Button, GridBox, useGridBox, useGridBoxConfig, Checkbox } from '@learnway/ui';
import { createColumnHelper, Table } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from '@tanstack/react-router';

import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';

import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { queryOptions as requestChannelQueryOptions } from '@entities/channel/service/request-channel.queries';
import { formUtils } from '@entities/form-utils';

export const Route = createFileRoute('/_layout/tenant/channel/request/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('checkbox', {
      id: 'select-check',
      size: 50,
      maxSize: 50,
      minSize: 50,
      meta: {
        align: 'center',
        headerAlign: 'center',
        cellAlign: 'center',
      },
      enableSorting: false,
      header: ({ table }) => (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(checked) => {
              table.toggleAllRowsSelected(!!checked);
            }}
          />
        </div>
      ),
      cell: ({ row }) => {
        const disabled = row.original.approvalStatusTypecd !== 'PENDING';
        return (
          <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
            <Checkbox
              checked={row.getIsSelected()}
              disabled={row.getIsGrouped() || disabled}
              onCheckedChange={() => {
                if (!row.getIsGrouped()) {
                  row.getToggleSelectedHandler();
                }
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor('channelRequestId', {
      cell: (info) => info.getValue(),
      header: '신청ID',
      enableGrouping: false,
      size: 110,
    }),
    columnHelper.accessor('tenantName', {
      cell: (info) => info.getValue(),
      header: '테넌트',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('channelName', {
      cell: (info) => info.getValue(),
      header: '채널명',
      size: 180,
      enableGrouping: false,
    }),

    columnHelper.accessor('channelId', {
      cell: (info) => info.getValue(),
      header: '채널ID',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('type', {
      cell: (info) => info.getValue(),
      header: '채널유형',
      size: 120,
      enableGrouping: false,
    }),
    columnHelper.accessor('division', {
      cell: (info) => info.getValue(),
      header: '채널구분',
      size: 80,
      enableGrouping: false,
    }),
    columnHelper.accessor('companyName', {
      cell: (info) => info.getValue(),
      header: '회사',
      enableGrouping: false,
      size: 156,
    }),
    columnHelper.accessor('companySabun', {
      cell: (info) => info.getValue(),
      header: '사번',
      enableGrouping: false,
      size: 130,
    }),
    columnHelper.accessor('reqeusterName', {
      cell: (info) => info.getValue(),
      header: '이름',
      enableGrouping: false,
      size: 100,
    }),
    columnHelper.accessor('requestDate', {
      cell: (info) =>
        getDateToString(new Date(info.row.original.requestDate), DATE_TIME_FORMAT.DATETIME_SEC),
      header: '신청일',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('approvalStatusTypecd', {
      cell: (info) => t('pms.channel.ChannelApprovalStatus.' + info.getValue()),
      header: '신청 상태',
      enableGrouping: false,
      size: 100,
    }),
    columnHelper.accessor('approverName', {
      cell: (info) => info.getValue(),
      header: '결제자',
      enableGrouping: false,
      size: 100,
    }),
    columnHelper.accessor('approvalDate', {
      cell: (info) =>
        info.getValue() === null
          ? ''
          : getDateToString(
              new Date(info.row.original.approvalDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            ),
      header: '접수/반려일',
      size: 200,
      enableGrouping: false,
    }),
    columnHelper.accessor('channelOpen', {
      cell: (info) => {
        if (info.row.original.approvalStatusTypecd === 'PENDING')
          return (
            <Button
              size={'xs'}
              variant="text"
              className={layoutStyles.btn_text}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              채널 개설
            </Button>
          );
        else return '';
      },
      header: '채널 확인',
      size: 200,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  useEffect(() => {
    gridFetch();
  }, []);

  const handleGridRowSelect = (row: any) => {
    // router.navigate({
    //   to: '',
    //   state: {
    //     placeUUID: row.educationPlaceUuid,
    //   },
    // });
  };

  const handleGridRowsSelect = (rows: any) => {
    setSelectedRows(rows);
  };

  return (
    <PageContainer>
      <MainContents>
        <div className={cn(searchStyles.start, searchStyles.wrap)}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        </div>

        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox
              config={gConfig}
              columns={columns}
              height={440}
              multiple
              showColumnSettings={false}
              hideRowSelectionCheckBox={true}
              onRowSelect={handleGridRowSelect}
              onRowsSelect={handleGridRowsSelect}
              title={t('채널 개설 신청 목록')}
              customButtonNode={
                <>
                  <Button
                    variant="text"
                    size="sm"
                    className={layoutStyles.btn_text}
                    disabled={selectedRows.length === 0}
                    label={t('접수')}
                  />
                  <Button
                    variant="text"
                    size="sm"
                    className={layoutStyles.btn_text}
                    disabled={selectedRows.length === 0}
                    label={t('반려')}
                  />
                </>
              }
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
        name: 'tenant',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
        dropdownConfig: {
          onChange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 또는 선택',
        },
      },
      {
        name: 'channelName',
        type: 'text',
        label: t('채널명'),
        value: '',
        placeholder: '입력',
      },
      {
        name: 'requesterName',
        type: 'text',
        label: t('신청자 사번'),
        value: '',
        placeholder: '입력',
      },
    ],
    [
      {
        name: 'approvalStatusTypecd',
        type: 'dropdown',
        label: t('신청상태'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('LABEL.all') }],
          codeGroup: CODE_GROUP['pms.channel.ChannelApprovalStatus'],
        },
      },
      {
        name: 'requestDate',
        label: '신청일',
        type: 'date-range',
        value: {
          from: formUtils.now({ unit: 'day', offset: -30 }),
          to: formUtils.now(),
        },
      },
      {
        name: 'approvalDate',
        label: '접수/반려일',
        type: 'date-range',
        value: {
          from: formUtils.now({ unit: 'day', offset: -30 }),
          to: formUtils.now(),
        },
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: requestChannelQueryOptions.list,
  columns: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
