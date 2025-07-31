import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useCallback, useState } from 'react';

import { queryOptions as requestChannelQueryOptions } from '@entities/channel/service/request-channel.queries';
import { useChannelApplication } from '@features/channel/channel-application/service/channel-application.service';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { MainContents, PageContainer, TenantByRoleDropdownFormField } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { EnGlobalConst } from '@types';

import layoutStyles from '@learnway/styles/bo/assets/styles/modules/contents-inner-layout.module.css';
import { Button } from '@learnway/ui/button';
import { Checkbox } from '@learnway/ui/checkbox';

export const Route = createFileRoute('/_layout/tenant/channel/request/')({
  component: RouteComponent });

const _global = {
  linkClick: (uuid: string) => {
    return;
  },
  openChannelClick: (uuid: string) => {
    return;
  },
  channelDetailClick: (uuid: string) => {
    return;
  } };

function RouteComponent() {
  const router = useRouter();

  const { provider: sProvider, getValues } = useSearchBox(searchConfig());
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const [tableInstance, setTableInstance] = useState<Table<any>>();
  const [approvalButtonDisabled, setApprovalButtonDisabled] = useState(true);

  const { accept: acceptRequestChannel, reject: rejectRequestChannel } = useChannelApplication();

  const handleOnSearch = useCallback((data: any) => {
    const searchData = {
      ...data,
      regStrDate: data.regDate.from ? getDateToString(new Date(data.regDate.from), 'YYYYMMDD') : '',
      regEndDate: data.regDate.to ? getDateToString(new Date(data.regDate.to), 'YYYYMMDD') : '',
      approvalStrDate: data.approvalDate.from
        ? getDateToString(new Date(data.approvalDate.from), 'YYYYMMDD')
        : '',
      approvalEndDate: data.approvalDate.to
        ? getDateToString(new Date(data.approvalDate.to), 'YYYYMMDD')
        : '' };
    gridFetch(searchData);
  }, []);

  const handleOnSelect = () => {
    const rows = tableInstance?.getSelectedRowModel().rows;
    if (rows && rows.length > 0) setApprovalButtonDisabled(false);
    else setApprovalButtonDisabled(true);
  };

  const handleAcceptClick = (e: any) => {
    const rows = tableInstance?.getSelectedRowModel().rows;
    if (rows && rows.length > 0) {
      const channelRequestUuids = rows.map((row: any) => row.original.channelRequestUuid);
      acceptRequestChannel(channelRequestUuids, () => {
        gridFetch();
      });
    }
  };

  const handleRejectClick = (e: any) => {
    const rows = tableInstance?.getSelectedRowModel().rows;
    if (rows && rows.length > 0) {
      const channelRequestUuids = rows.map((row: any) => row.original.channelRequestUuid);
      rejectRequestChannel(channelRequestUuids, () => {
        gridFetch();
      });
    }
  };

  const handleOnSelectable = (row: any) => {
    const disabled = row.approvalStatusType !== 'PENDING';
    return !disabled;
  };

  _global.linkClick = (uuid: string) => {
    router.navigate({
      to: '/tenant/channel/request/detail',
      state: {
        channelRequestUuid: uuid } });
  };
  _global.openChannelClick = (uuid: string) => {
    router.navigate({
      to: '/tenant/channel/management/regist',
      state: {
        requestUuid: uuid } });
  };
  _global.channelDetailClick = (uuid: string) => {
    router.navigate({
      to: '/tenant/channel/management/detail',
      state: {
        channelUuid: uuid } });
  };

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox
          config={gConfig}
          columns={columns()}
          multiple
          hideRowSelectionCheckBox={true}
          title={t('채널 개설 신청 목록')}
          customButtonNode={
            <>
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                disabled={approvalButtonDisabled}
                label={t('접수')}
                stopPropagation
                onClick={handleAcceptClick}
              />
              <Button
                variant="text"
                size="sm"
                className={layoutStyles.btn_text}
                disabled={approvalButtonDisabled}
                label={t('반려')}
                stopPropagation
                onClick={handleRejectClick}
              />
            </>
          }
          onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
          isRowSelectable={handleOnSelectable}
          onRowSelect={handleOnSelect}
        />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'tenantId',
        type: 'custom',
        label: t('테넌트'),
        value: '',
        format: 'object',
        element: <TenantByRoleDropdownFormField /> },
      {
        name: 'channelName',
        type: 'text',
        label: t('채널명'),
        value: '',
        placeholder: '' },
      {
        name: 'requesterEmployeeNumber',
        type: 'text',
        label: t('신청자 사번'),
        value: '',
        placeholder: '' },
    ],
    [
      {
        name: 'approvalStatusType',
        type: 'dropdown',
        label: t('신청상태'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('LABEL.all') }],
          codeGroup: CODE_GROUP['pms.channel.ChannelApprovalStatusType'] } },
      {
        name: 'regDate',
        label: t('신청일'),
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined } },
      {
        name: 'approvalDate',
        label: t('접수/반려일'),
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined } },
    ],
  ] });

const gridConfig: useGridBoxConfig = {
  query: requestChannelQueryOptions.list,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [] } };

const columnHelper = createColumnHelper<any>();

const columns = () =>
  [
    columnHelper.accessor('checkbox', {
      // 상태에 따른 checkbox disabled를 위해 checkbox 따로 구현
      id: 'select-check',
      size: 50,
      maxSize: 50,
      minSize: 50,
      meta: {
        align: 'center',
        headerAlign: 'center',
        cellAlign: 'center' },
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
        const disabled = row.original.approvalStatusType !== 'PENDING';
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
      } }),
    columnHelper.accessor('channelRequestId', {
      cell: (info) => (
        <Button
          className="link"
          stopPropagation
          onClick={(e) => _global.linkClick(info.row.original.channelRequestUuid)}
          label={info.row.original.channelRequestId}
        />
      ),
      header: t('신청 ID'),
      enableGrouping: false,
      size: 160 }),
    columnHelper.accessor('tenantName', {
      cell: (info) => info.getValue(),
      header: t('테넌트'),
      size: 160,
      enableGrouping: false }),
    columnHelper.accessor('channelName', {
      cell: (info) => info.getValue(),
      header: t('채널명'),
      size: 160,
      enableGrouping: false }),

    columnHelper.accessor('channelMainId', {
      cell: (info) => info.getValue(),
      header: t('채널 핸들'),
      size: 100,
      enableGrouping: false }),
    columnHelper.accessor('channelTenatMappingType', {
      cell: (info) =>
        t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelTenatMappingType.${info.getValue()}`,
        ),
      header: t('채널 유형'),
      size: 80,
      enableGrouping: false,
      enableSorting: false }),
    columnHelper.accessor('channelSecretType', {
      cell: (info) =>
        t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelSecretType.${info.getValue()}`),
      header: t('채널 구분'),
      size: 80,
      enableGrouping: false,
      enableSorting: false }),
    columnHelper.accessor('companyName', {
      cell: (info) => info.getValue(),
      header: t('회사'),
      enableGrouping: false,
      size: 120 }),
    columnHelper.accessor('reqeusterEmployeeNumber', {
      cell: (info) => info.getValue(),
      header: t('사번'),
      enableGrouping: false,
      size: 100 }),
    columnHelper.accessor('reqeusterName', {
      cell: (info) => info.getValue(),
      header: t('이름'),
      enableGrouping: false,
      size: 100 }),
    columnHelper.accessor('requestDate', {
      cell: (info) =>
        getDateToString(new Date(info.row.original.requestDate), DATE_TIME_FORMAT.DATETIME_SEC),
      header: t('신청일'),
      size: 160,
      enableGrouping: false }),
    columnHelper.accessor('approvalStatusType', {
      cell: (info) =>
        t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelApprovalStatusType.${info.getValue()}`,
        ),
      header: t('신청 상태'),
      enableGrouping: false,
      enableSorting: false,
      size: 90 }),
    columnHelper.accessor('approverName', {
      cell: (info) => info.getValue(),
      header: t('결재자'),
      enableGrouping: false,
      size: 90 }),
    columnHelper.accessor('approvalDate', {
      cell: (info) =>
        info.getValue() === null
          ? ''
          : getDateToString(
              new Date(info.row.original.approvalDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            ),
      header: t('접수/반려일'),
      size: 160,
      enableGrouping: false }),
    columnHelper.accessor('channelOpen', {
      cell: (info) => {
        if (info.row.original.approvalStatusType === 'ACCEPTED')
          return (
            <Button
              size={'xs'}
              variant="gray"
              stopPropagation
              onClick={(e) => {
                _global.openChannelClick(info.row.original.channelRequestUuid);
              }}
              label={t('채널 개설')}
            />
          );
        else if (info.row.original.approvalStatusType === 'APPROVED')
          return (
            <Button
              size={'xs'}
              variant="gray"
              stopPropagation
              onClick={(e) => {
                _global.channelDetailClick(info.row.original.channelInfoChannelUuid);
              }}
              label={t('채널 상세')}
            />
          );
        return '';
      },
      header: t('채널 확인'),
      size: 80,
      enableGrouping: false,
      enableSorting: false }),
  ] as ColumnDef<any, unknown>[];
