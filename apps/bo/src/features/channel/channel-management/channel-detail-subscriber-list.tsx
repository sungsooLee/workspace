import { useGetChannelDetail } from '@entities/channel/service/channel.hook';
import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { getDateToString } from '@learnway/shared';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { SearchBox } from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useRouterState } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { Button } from '@learnway/ui/button';

const _global = {
  linkClick: (uuid: string) => {
    return;
  } };

interface ChannelDetailSubscriberListProps {
  onChange: (userUuid: string) => void;
}

const ChannelDetailSubscriberListComponent = ({ onChange }: ChannelDetailSubscriberListProps) => {
  const queryClient = useQueryClient();

  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const { data: channelData } = useGetChannelDetail(channelUuid);

  const { provider: sProvider, getValues, setOptions, setValue } = useSearchBox(searchConfig);

  const searchParam = () => {
    const data = getValues();
    const searchData = {
      ...data,
      channelUuid,
      subscribeStartDate: data.subscribeDate.from
        ? getDateToString(new Date(data.subscribeDate.from), 'YYYYMMDD')
        : '',
      subscribeEndDate: data.subscribeDate.to
        ? getDateToString(new Date(data.subscribeDate.to), 'YYYYMMDD')
        : '',
      unsubscribeStartDate: data.unsubscribeDate.from
        ? getDateToString(new Date(data.unsubscribeDate.from), 'YYYYMMDD')
        : '',
      unsubscribeEndDate: data.unsubscribeDate.to
        ? getDateToString(new Date(data.unsubscribeDate.to), 'YYYYMMDD')
        : '' };
    return searchData;
  };

  const { config: gConfig, gridFetch } = useGridBox(gridConfig, searchParam);

  const tenantIdWatch = useWatch({ control: sProvider.control, name: 'tenantId' });

  useEffect(() => {
    if (channelData) {
      console.log('#### channelData', channelData);
      setOptions(
        'tenantId',
        channelData.tenantList.map((tenant: any) => ({
          label: tenant.tenantName,
          value: tenant.tenantId })),
      );
    }
  }, [channelData]);

  useEffect(() => {
    setValue('companyId', '');
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(tenantIdWatch),
        );
        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyId }));
        setOptions('companyId', companyIdOptions);
      })();
    } else {
      setOptions('companyId', []);
    }
  }, [tenantIdWatch]);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(searchParam());
  }, []);

  _global.linkClick = (uuid: string) => {
    onChange(uuid);
  };

  return (
    <>
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox config={gConfig} columns={columns} multiple />
    </>
  );
};

export const ChannelDetailSubscriberList = ChannelDetailSubscriberListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        format: 'object',
        value: '',
        option: [],
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          isClearable: true,
          placeholder: t('입력 또는 선택') } },
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        format: 'object',
        value: '',
        options: [],
        dropdownConfig: {
          isSearchable: true,
          isClearable: true,
          placeholder: t('입력 또는 선택') } },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '' },
    ],
    [
      {
        type: 'group',
        builders: [
          {
            name: 'channelSubscriptionType',
            type: 'dropdown',
            label: t('구독 방식'),
            value: '',
            optionsConfig: {
              codeGroup: CODE_GROUP['pms.channel.ChannelSubscriptionType'] },
            presetOptionLabel: t('전체') },
          {
            name: 'channelSubscribeStatus',
            type: 'dropdown',
            label: t('상태'),
            value: '',
            options: [
              { label: t('구독'), value: 'A' },
              { label: t('해지'), value: 'B' },
              { label: t('재구독'), value: 'C' },
            ],
            presetOptionLabel: t('전체') },
        ] },
      {
        name: 'subscribeDate',
        label: '구독 신청 기간',
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined } },
      {
        name: 'unsubscribeDate',
        label: '구독 해지 기간',
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined } },
    ],
  ] };

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [],
  data: [
    {
      tenantName: '테넌트1',
      companyName: '현대자동차',
      deptName: '소속팀',
      employeeNumber: '1234567',
      userName: '김현대',
      channelSubscriptionType: '수동 구독',
      channelSubscribeStatus: '구독',
      subscribeDate: '2025-01-01 15:00:00',
      unsubscribeDate: '2025-01-01 15:00:00' },
  ],
  gridState: {
    page: 0,
    size: 1000,
    sort: [] } };

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: t('테넌트'),
    enableGrouping: false }),
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    enableGrouping: false }),
  columnHelper.accessor('deptName', {
    cell: (info) => info.getValue(),
    header: t('소속'),
    enableGrouping: false }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    enableGrouping: false }),
  columnHelper.accessor('userName', {
    cell: (info) => (
      <Button
        className="link"
        stopPropagation
        onClick={(e) => _global.linkClick('c3927956-3f6d-11f0-9435-0218a74d52f7')}
        label={info.getValue()}
      />
    ),
    header: t('이름'),
    enableGrouping: false }),
  columnHelper.accessor('channelSubscriptionType', {
    cell: (info) => info.getValue(),
    header: t('구독 방식'),
    enableGrouping: false }),
  columnHelper.accessor('channelSubscribeStatus', {
    cell: (info) => info.getValue(),
    header: t('상태'),
    enableGrouping: false }),
  columnHelper.accessor('subscribeDate', {
    cell: (info) => info.getValue(),
    header: t('구독 신청일'),
    enableGrouping: false }),
  columnHelper.accessor('unsubscribeDate', {
    cell: (info) => info.getValue(),
    header: t('구독 해지일'),
    enableGrouping: false }),
];
