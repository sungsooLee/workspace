import { queryOptions } from '@entities/channel/service/channel.queries';
import { getChannelUrl } from '@features/channel/channel-application/service/channel-application.service';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { getDateToString } from '@learnway/shared';
import { Button, Divider, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { EnGlobalConst } from '@types';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/tenant/channel/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { data: loginUser } = useFetchAuthUser();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [registButtonEnabled, setRegistButtonEnabled] = useState(true);

  useEffect(() => {
    console.log('### loginUser', loginUser);
    gridFetch();
  }, []);

  useEffect(() => {
    if (loginUser)
      setRegistButtonEnabled(
        loginUser.activeRole?.roleType === 'PLATFORM_MANAGER' ||
          loginUser.activeRole?.roleType === 'TENANT_MANAGER',
      );
  }, [loginUser]);

  const handleOnSearch = useCallback((data: any) => {
    const searchData = {
      ...data,
      regStartDate: data.regDate.from
        ? getDateToString(new Date(data.regDate.from), 'YYYYMMDD')
        : '',
      regEndDate: data.regDate.to ? getDateToString(new Date(data.regDate.to), 'YYYYMMDD') : '',
    };
    gridFetch(searchData);
  }, []);

  return (
    <PageContainer>
      {registButtonEnabled && (
        <ContentsButtons>
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              router.navigate({
                to: '/tenant/channel/management/regist',
                state: { method: 'direct' },
              })
            }
            label={t('채널 직접 개설')}
          />
        </ContentsButtons>
      )}
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox
          config={gConfig}
          columns={columns}
          showNumberingColumn
          title={t('채널 관리 목록')}
          disabledSelectionToggle
        />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'channelCreationType',
        type: 'dropdown',
        label: t('개설방식'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.channel.ChannelCreationType'],
        },
        presetOptionLabel: t('전체'),
      },
      {
        name: 'tenantId',
        type: 'dropdown',
        format: 'object',
        label: t('테넌트'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          isClearable: true,
          placeholder: '입력 또는 선택',
        },
      },
      {
        name: 'channelName',
        type: 'text',
        label: t('채널명'),
        value: '',
      },
      {
        name: 'channelMainId',
        type: 'text',
        label: t('채널 핸들'),
        value: '',
      },
    ],
    [
      {
        name: 'channelTenatMappingType',
        type: 'dropdown',
        label: t('체널 유형'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.channel.ChannelTenatMappingType'],
        },
        presetOptionLabel: t('전체'),
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용 여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('사용') },
          { value: 'false', label: t('미사용') },
        ],
      },
      {
        name: 'isDisplay',
        type: 'dropdown',
        label: t('노출 여부'),
        format: 'object',
        value: undefined,
        options: [
          { value: undefined, label: t('전체') },
          { value: true, label: t('노출') },
          { value: false, label: t('비노출') },
        ],
      },
      {
        name: 'regDate',
        type: 'date-range',
        label: t('등록 기간'),
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: queryOptions.list,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('channelCreationType', {
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelCreationType.${info.getValue()}`),
    header: t('개설방식'),
    size: 90,
    enableGrouping: false,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('tenantList', {
    cell: (info) => {
      if (info.row.original.tenantList.length === 1)
        return info.row.original.tenantList[0].tenantName;
      else if (info.row.original.tenantList.length > 1)
        return t('{{name}} 외 {{count}}', {
          name: info.row.original.tenantList[0].tenantName,
          count: info.row.original.tenantList.length - 1,
        });
      return '-';
    },
    header: t('테넌트'),
    enableGrouping: false,
  }),

  columnHelper.accessor('channelName', {
    cell: (info) => (
      <Link
        to={'/tenant/channel/management/detail'}
        state={{ channelUuid: info.row.original.channelUuid }}
        className="link"
      >
        {info.row.original.channelName}
      </Link>
    ),
    header: t('채널명'),
    enableGrouping: false,
  }),
  columnHelper.accessor('channelMainId', {
    cell: (info) => (
      <Button
        variant="link"
        label={info.getValue()}
        onClick={() => window.open(getChannelUrl(info.getValue()), '_blank')}
      />
    ),
    header: t('채널 핸들'),
    enableGrouping: false,
  }),
  columnHelper.accessor('channelTenatMappingType', {
    cell: (info) =>
      t(
        `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelTenatMappingType.${info.getValue()}`,
      ),
    header: t('채널 유형'),
    size: 90,
    enableGrouping: false,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('channelSecretType', {
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelSecretType.${info.getValue()}`),
    header: t('채널 구분'),
    size: 90,
    enableGrouping: false,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('channelSubscriptionType', {
    cell: (info) =>
      t(
        `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelSubscriptionType.${info.getValue()}`,
      ),
    header: t('구독 방식'),
    enableGrouping: false,
    size: 90,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('channelOwnerUserList', {
    cell: (info) => {
      if (info.row.original.channelOwnerUserList.length === 1)
        return info.row.original.channelOwnerUserList[0].userName;
      else if (info.row.original.channelOwnerUserList.length > 1)
        return t('{{name}} 외 {{count}}', {
          name: info.row.original.channelOwnerUserList[0].userName,
          count: info.row.original.channelOwnerUserList.length - 1,
        });
      return '-';
    },
    header: t('채널 소유자'),
    enableGrouping: false,
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
    header: t('사용여부'),
    enableGrouping: false,
    size: 90,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('isDisplay', {
    cell: (info) => (info.getValue() ? t('노출') : t('비노출')),
    header: t('노출 여부'),
    enableGrouping: false,
    size: 90,
    meta: {
      cellAlign: 'center',
    },
  }),
];
