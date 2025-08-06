import { useToggleDisplayChannelBanner } from '@entities/channel';
import { channelBannerQueryOptions } from '@entities/channel/service/channel-banner.queries';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { useGridBox } from '@learnway/ui/grid';
import { Switch } from '@learnway/ui/switch';
import { useToast } from '@learnway/ui/toast';
import { EnGlobalConst } from '@shared/types/enums';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { ChannelHomeBannerListProps } from '../types/type';

export const useChannelHomeBannerList = (props: ChannelHomeBannerListProps) => {
  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const { onDetailClick } = props;
  const { open: openToast } = useToast();

  const { toggleDisplay } = useToggleDisplayChannelBanner({});

  const [totalCount, setTotalCount] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);

  const handleCheckedChange = (bannerId: number) => (checked: boolean) => {
    const params = {
      channelUuid,
      bannerId,
    };
    toggleDisplay(params, {
      onSuccess: () => {
        openToast({ title: t('저장 하였습니다.'), type: 'success' });
        gridFetch({ channelUuid });
      },
    });
  };

  const {
    config: gridConfig,
    data: gridData,
    gridFetch,
  } = useGridBox({
    query: channelBannerQueryOptions.list,
    columns: [
      {
        name: 'thumbnail',
        label: t('썸네일'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'channelBannerType',
        label: t('배너 유형'),
        render: (info: any) =>
          t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelBannerType.${info.getValue()}`),
        size: 120,
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'bannerName',
        label: t('배너명'),
        render: (info: any) => (
          <Button
            className="link"
            label={info.getValue()}
            onClick={() => onDetailClick(info.row.original.channelBannerId)}
          />
        ),
      },
      {
        name: 'period',
        label: t('게재 기간'),
        render: (info: any) => `${info.row.original.startDate} ~ ${info.row.original.endDate}`,
        size: 220,
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'channelBannerDisplayStateType',
        label: t('상태'),
        render: (info: any) =>
          t(
            `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.channel.ChannelBannerDisplayStateType.${info.getValue()}`,
          ),
        size: 140,
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'displayCount',
        label: t('노출'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'clickCount',
        label: t('클릭'),
        size: 100,
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'modifiedDate',
        label: t('수정일'),
        size: 250,
        render: (info: any) =>
          info.row.original.modifiedDate
            ? getDateToString(
                new Date(info.row.original.modifiedDate),
                DATE_TIME_FORMAT.DATETIME_SEC,
              )
            : '',
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'isDisplayed',
        label: t('노출여부'),
        size: 120,
        render: (info: any) => (
          <Switch
            label={info.getValue() ? t('노출') : t('비노출')}
            checked={info.getValue()}
            onCheckedChange={handleCheckedChange(info.row.original.channelBannerId)}
          />
        ),
        meta: {
          cellAlign: 'center',
        },
      },
      {
        name: 'move',
        label: t('순서 이동'),
        size: 90,
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
  });

  useEffect(() => {
    gridFetch({ channelUuid });
  }, []);

  useEffect(() => {
    if (gridData) {
      setTotalCount(gridData.totalElements);
      setDisplayedCount(gridData.content.filter((item) => item.isDisplayed === true).length);
    }
  }, [gridData]);

  return { gridConfig, displayedCount, totalCount };
};
