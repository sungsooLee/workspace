import { channelSubscriberQueryOptions } from '@entities/channel/service/channel-subscriber.queries';
import { useDynamicForm2 } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { useGridBox } from '@learnway/ui/grid';
import { EnGlobalConst } from '@shared/types/enums';
import { useRouterState } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChannelSubscriberPageHookResult } from '../types/type';

export const useChannelSubscriberPage = (): ChannelSubscriberPageHookResult => {
  const { t } = useTranslation();
  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const { provider, getValues, onSubmit, onReset, watch } = useDynamicForm2({
    builders: [],
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const searchParam = () => {
    const data = getValues();
    console.log('### searchParam', data);
    const searchData = {
      ...data,
      channelUuid,
      startSubscriptionDate: data.subscriptionDate?.from
        ? getDateToString(new Date(data.subscriptionDate.from), 'YYYYMMDD')
        : '',
      endSubscriptionDate: data.subscriptionDate?.to
        ? getDateToString(new Date(data.subscriptionDate.to), 'YYYYMMDD')
        : '',
      startUnSubscriptionDateDate: data.unSubscriptionDate?.from
        ? getDateToString(new Date(data.unSubscriptionDate.from), 'YYYYMMDD')
        : '',
      endUnsubscriptionDateDate: data.unSubscriptionDate?.to
        ? getDateToString(new Date(data.unSubscriptionDate.to), 'YYYYMMDD')
        : '',
    };
    return searchData;
  };

  const { config: gridConfig, gridFetch } = useGridBox(
    {
      query: channelSubscriberQueryOptions.list,
      columns: [
        {
          name: 'tenantNames',
          label: t('테넌트'),
        },
        {
          name: 'companyName',
          label: t('회사'),
        },
        {
          name: 'deptName',
          label: t('소속'),
        },
        {
          name: 'employeeNumber',
          label: t('사번'),
        },
        {
          name: 'userName',
          label: t('이름'),
          render: (info: any) => <Button className="link" stopPropagation label={info.getVaue()} />,
        },
        {
          name: 'channelSubscriptionType',
          label: t('구독 방식'),
          render: (info: any) =>
            t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelSubscriptionType.${info.getVaue()}`,
            ),
        },
        {
          name: 'channelSubscriptionStatType',
          label: t('상태'),
          render: (info: any) =>
            t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelSubscriptionStatType.${info.getVaue()}`,
            ),
        },
        {
          name: 'subscriptionDate',
          label: t('구독 신청일'),
          size: 250,
          render: (info: any) =>
            info.row.original.subscriptionDate
              ? getDateToString(
                  new Date(info.row.original.subscriptionDate),
                  DATE_TIME_FORMAT.DATETIME_SEC,
                )
              : '',
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'unSubscriptionDate',
          label: t('구독 해지일'),
          size: 250,
          render: (info: any) =>
            info.row.original.unSubscriptionDate
              ? getDateToString(
                  new Date(info.row.original.unSubscriptionDate),
                  DATE_TIME_FORMAT.DATETIME_SEC,
                )
              : '',
          meta: {
            cellAlign: 'center',
          },
        },
      ],
      gridState: {
        page: 0,
        size: 10,
        sort: [],
      },
    },
    searchParam,
  );

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(searchParam());
  }, []);

  return {
    provider,
    getValues,
    gridConfig,
    onSubmit,
    onReset,
    handleOnSearch,
    watch,
  };
};
