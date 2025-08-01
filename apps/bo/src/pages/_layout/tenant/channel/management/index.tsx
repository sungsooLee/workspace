import { queryOptions } from '@entities/channel/service/channel.queries';
import { getChannelUrl } from '@features/channel/channel-application/service/channel-application.service';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { getDateToString } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { ChannelParam, EnGlobalConst } from '@types';
import { useCreation } from 'ahooks';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/tenant/channel/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

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
            placeholder: t('입력 또는 선택'),
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

  const { data: loginUser } = useFetchAuthUser();
  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);

  const roleId = loginUser?.activeRole?.roleId;

  useEffect(() => {
    const init = async () => {
      const listParam = routerState.location.state.listParam;
      if (listParam) {
        onFormChange(listParam);
        if (await onFormValid()) {
          handleOnSearch(getValues());
        }
      }
    };
    init();
  }, []);

  const linkClick = (channelUuid: string) => {
    router.navigate({
      to: '/tenant/channel/management/detail',
      state: {
        channelUuid,
        listParam: getValues(),
      },
    });
  };

  const gridInitConfig = useCreation(
    () => ({
      query: (data: ChannelParam) => queryOptions.list(`${roleId}`, data),
      columns: [
        {
          name: 'channelCreationType',
          label: t('개설방식'),
          render: (info: any) =>
            t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelCreationType.${info.getValue()}`,
            ),
          size: 90,
          enableSorting: false,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'tenantList',
          label: t('테넌트'),
          render: (info: any) => {
            if (info.row.original.tenantList.length === 1)
              return info.row.original.tenantList[0].tenantName;
            else if (info.row.original.tenantList.length > 1)
              return t('{{name}} 외 {{count}}', {
                name: info.row.original.tenantList[0].tenantName,
                count: info.row.original.tenantList.length - 1,
              });
            return '-';
          },
          enableSorting: false,
        },
        {
          name: 'channelName',
          label: t('채널명'),
          render: (info: any) => (
            <Button
              className="link"
              onClick={() => linkClick(info.row.original.channelUuid)}
              label={info.row.original.channelName}
            />
          ),
        },
        {
          name: 'channelMainId',
          label: t('채널 핸들'),
          render: (info: any) => (
            <Button
              variant="link"
              label={info.getValue()}
              onClick={() => window.open(getChannelUrl(info.getValue()), '_blank')}
            />
          ),
        },
        {
          name: 'channelTenatMappingType',
          label: t('채널 유형'),
          render: (info: any) =>
            t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelTenatMappingType.${info.getValue()}`,
            ),
          size: 90,
          enableSorting: false,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'channelSecretType',
          label: t('채널 구분'),
          render: (info: any) =>
            t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelSecretType.${info.getValue()}`,
            ),
          size: 90,
          enableSorting: false,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'channelSubscriptionType',
          label: t('구독 방식'),
          render: (info: any) =>
            t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelSubscriptionType.${info.getValue()}`,
            ),
          size: 90,
          enableSorting: false,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'channelOwnerUserList',
          label: t('채널 소유자'),
          render: (info: any) => {
            if (info.row.original.channelOwnerUserList.length === 1)
              return info.row.original.channelOwnerUserList[0].userName;
            else if (info.row.original.channelOwnerUserList.length > 1)
              return t('{{name}} 외 {{count}}', {
                name: info.row.original.channelOwnerUserList[0].userName,
                count: info.row.original.channelOwnerUserList.length - 1,
              });
            return '-';
          },
          enableSorting: false,
        },
        {
          name: 'isUsed',
          label: t('사용 여부'),
          render: (info: any) => (info.getValue() ? t('사용') : t('미사용')),
          enableSorting: false,
          size: 90,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'isDisplay',
          label: t('노출 여부'),
          render: (info: any) => (info.getValue() ? t('노출') : t('비노출')),
          enableSorting: false,
          size: 90,
          meta: {
            cellAlign: 'center',
          },
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 10,
        sort: [],
      },
    }),
    [],
  );

  const searchParam = () => {
    const data = getValues();
    const searchData = {
      ...data,
      regStartDate: data.regDate.from
        ? getDateToString(new Date(data.regDate.from), 'YYYYMMDD')
        : '',
      regEndDate: data.regDate.to ? getDateToString(new Date(data.regDate.to), 'YYYYMMDD') : '',
      roleId: loginUser?.activeRole?.roleId,
    };
    return searchData;
  };

  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, searchParam);
  const [registButtonEnabled, setRegistButtonEnabled] = useState(false);

  useEffect(() => {
    if (loginUser) {
      setRegistButtonEnabled(
        loginUser.activeRole?.roleType === 'PLATFORM_MANAGER' ||
          loginUser.activeRole?.roleType === 'TENANT_MANAGER',
      );
    }
  }, [loginUser]);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(searchParam());
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
          showNumberingColumn
          title={t('채널 관리 목록')}
          disabledSelectionToggle
        />
      </MainContents>
    </PageContainer>
  );
}
