import { useEffect, useCallback, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Button, GridBox, useGridBox, useGridBoxConfig, Checkbox, useModal } from '@learnway/ui';
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
import { ChannelRejectModal } from '@features/shared/ui/modal/channel-reject-modal';
import {
  useApproveRequestChannel,
  useRejectRequestChannel,
} from '@entities/channel/service/request-channel.hook';
import { r } from '@faker-js/faker/dist/airline-BXaRegOM';

export const Route = createFileRoute('/_layout/tenant/channel/request/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { open: openModal, confirm: openConfirm, alert } = useModal();
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const [selectedRows, setSelectedRows] = useState([]);

  const { approve: approveRequestChannel } = useApproveRequestChannel({});
  const { reject: rejectRequestChannel } = useRejectRequestChannel({});

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('checkbox', {
      // 상태에 따른 checkbox disabled를 위해 checkbox 따로 구현
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
      cell: (info) => (
        <Button
          className="link"
          onClick={(e) => {
            e.stopPropagation();
            router.navigate({
              to: '/tenant/channel/request/detail',
              state: {
                channelRequestUuid: info.row.original.channelRequestUuid,
              },
            });
          }}
        >
          {info.row.original.channelRequestId}
        </Button>
      ),
      header: '신청ID',
      enableGrouping: false,
      size: 200,
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
              className="link"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              채널 개설
            </Button>
          );
        else if (info.row.original.approvalStatusTypecd === 'APPROVED')
          return (
            <Button
              size={'xs'}
              variant="text"
              className="link"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              채널 상세
            </Button>
          );
        return '';
      },
      header: '채널 확인',
      size: 200,
      enableGrouping: false,
    }),
  ] as ColumnDef<any, unknown>[];

  useEffect(() => {
    gridFetch();
  }, []);

  const handleGridRowsSelect = (rows: any) => {
    setSelectedRows(rows);
  };

  const handleAcceptClick = (e: any) => {
    e.stopPropagation();
    if (selectedRows.length > 0) {
      openConfirm({
        title: t('접수 하시겠습니까?'),
        content: <p>{t('채널 개설 신청을 접수한 후에 채널을 개설해야 합니다.')}</p>,
        onClose: (value: boolean) => {
          if (value) {
            approveRequests();
          }
        },
      });
    }
  };

  const approveRequests = () => {
    if (selectedRows.length > 0) {
      const payload = {
        channelRequestUuid: selectedRows.map((row: any) => row.channelRequestUuid),
        rejectedReasonContent: '',
      };
      console.log('payload', payload);
      approveRequestChannel(payload, {
        onSuccess: (data: any) => {
          gridFetch();
          alert({
            title: t('접수가 완료되었습니다.'),
            content: (
              <p>
                {t(
                  '채널을 개설해야 채널 신청이 왼료됩니다.목록에서 접수 처리한 채널을 개설해 주세요.',
                )}
              </p>
            ),
          });
        },
      });
    }
  };

  const handleRejectClick = (e: any) => {
    e.stopPropagation();
    if (selectedRows.length > 0) {
      openModal({
        width: 'sm',
        content: <ChannelRejectModal />,
        onClose(data: any) {
          console.log('reason', data);
          if (data) {
            setTimeout(() => reject(data.rejectReason), 0);
          }
        },
      });
    }
  };

  const reject = (reason: any) => {
    console.log('reason', reason);
    openConfirm({
      title: t('반려 하시겠습니까?'),
      content: (
        <p>
          {t(
            '채널 개설 신청을 반려하면 해당 신청 건으로 채널 개설을 할 수 없습니다. 반려 처리 시 반려 안내 메일이 발송됩니다.',
          )}
        </p>
      ),
      onClose: (value: boolean) => {
        if (value) {
          rejectRequests(reason);
        }
      },
    });
  };

  const rejectRequests = (reason: any) => {
    console.log('rejectRequests', selectedRows.length);
    if (selectedRows.length > 0) {
      const payload = {
        channelRequestUuid: selectedRows.map((row: any) => row.channelRequestUuid),
        rejectedReasonContent: reason,
      };
      console.log('payload', payload);
      rejectRequestChannel(payload, {
        onSuccess: (data: any) => {
          gridFetch();
          /*
          alert({
            title: t('접수가 완료되었습니다.'),
            content: (
              <p>
                {t(
                  '채널을 개설해야 채널 신청이 왼료됩니다.목록에서 접수 처리한 채널을 개설해 주세요.',
                )}
              </p>
            ),
          });*/
        },
      });
    }
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
                    onClick={handleAcceptClick}
                  />
                  <Button
                    variant="text"
                    size="sm"
                    className={layoutStyles.btn_text}
                    disabled={selectedRows.length === 0}
                    label={t('반려')}
                    onClick={handleRejectClick}
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
