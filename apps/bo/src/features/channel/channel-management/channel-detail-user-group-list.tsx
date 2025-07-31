import { useGetChannelDetail } from '@entities/channel/service/channel.hook';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { getDateToString } from '@learnway/shared';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { getCurrentAuthUser } from '@shared/lib';
import { SearchBox } from '@shared/ui';
import { useRouterState } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect } from 'react';
import { Button } from '@learnway/ui/button';

const _global = {
  linkClick: (userGroupId: number) => {
    return;
  } };

interface ChannelDetailUserGroupListProps {
  onChange: (userGroupId: number) => void;
}

const ChannelDetailUserGroupListComponent = ({ onChange }: ChannelDetailUserGroupListProps) => {
  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const { data: channelData } = useGetChannelDetail(channelUuid);

  const { provider: sProvider, getValues, setOptions, setValue } = useSearchBox(searchConfig);

  const searchParam = () => {
    const data = getValues();
    const searchData = {
      ...data,
      channelUuid,
      modifiedStartDate: data.modifiedDate.from
        ? getDateToString(new Date(data.modifiedDate.from), 'YYYYMMDD')
        : '',
      modifiedEndDate: data.modifiedDate.to
        ? getDateToString(new Date(data.modifiedDate.to), 'YYYYMMDD')
        : '' };
    return searchData;
  };

  const { config: gConfig, gridFetch } = useGridBox(gridConfig, searchParam);

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
    if (channelData) {
      const loginUser = getCurrentAuthUser();
      if (loginUser) setValue('tenantId', loginUser.activeTenant?.tenantId);
    }
  }, [channelData]);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(searchParam());
  }, []);

  _global.linkClick = (userGroupId: number) => {
    onChange(userGroupId);
  };

  return (
    <>
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox config={gConfig} columns={columns} showNumberingColumn />
    </>
  );
};

export const ChannelDetailUserGroupList = ChannelDetailUserGroupListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        format: 'object',
        value: '',
        option: [] },
      {
        name: 'userGroupOriginType',
        type: 'dropdown',
        label: t('유저그룹 유형'),
        value: '',
        format: 'object',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.user.UserGroupOriginType'] } },
      {
        name: 'channelName',
        type: 'text',
        label: t('채널'),
        value: '' },
    ],
    [
      {
        name: 'userGroupName',
        type: 'text',
        label: t('유저그룹명'),
        value: '' },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용 여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: true, label: t('사용') },
          { value: false, label: t('미사용') },
        ] },
      {
        name: 'modifiedDate',
        label: '수정 기간',
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
      userGroupOriginType: '채널 유저그룹',
      channelName: '채널명1',
      userGroupName: '수동 유저그룹1',
      memberCount: '10,000명',
      isUsed: '사용',
      createdDate: '2025-01-01 15:00:00',
      modifiedDate: '2025-01-01 15:00:00' },
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
  columnHelper.accessor('userGroupOriginType', {
    cell: (info) => info.getValue(),
    header: t('유저그룹 유형'),
    enableGrouping: false }),
  columnHelper.accessor('channelName', {
    cell: (info) => info.getValue(),
    header: t('채널'),
    enableGrouping: false }),
  columnHelper.accessor('userGroupName', {
    cell: (info) => (
      <Button
        className="link"
        stopPropagation
        onClick={(e) => _global.linkClick(0)}
        label={info.getValue()}
      />
    ),
    header: t('유저그룹명'),
    enableGrouping: false }),
  columnHelper.accessor('memberCount', {
    cell: (info) => info.getValue(),
    header: t('대상자'),
    enableGrouping: false }),
  columnHelper.accessor('members', {
    cell: (info) => <Button variant="gray" label={t('대상자')} />,
    header: t('대상자 확인'),
    enableGrouping: false,
    meta: {
      cellAlign: 'center' },
    enableSorting: false }),
  columnHelper.accessor('isUsed', {
    cell: (info) => info.getValue(),
    header: t('사용 여부'),
    enableGrouping: false,
    meta: {
      cellAlign: 'center' } }),
  columnHelper.accessor('createdDate', {
    cell: (info) => info.getValue(),
    header: t('등록일'),
    enableGrouping: false,
    meta: {
      cellAlign: 'center' } }),
  columnHelper.accessor('modifiedDate', {
    cell: (info) => info.getValue(),
    header: t('수정일'),
    enableGrouping: false,
    meta: {
      cellAlign: 'center' } }),
];
