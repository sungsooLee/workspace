import { EnButtonLayout } from '@pages/_layout/tenant/channel/management/detail.lazy';
import { EnFormMode } from '@types';
import { forwardRef, useEffect, useState } from 'react';
import { ChannelDetailHomeBanner } from './channel-detail-home-banner';
import { ChannelDetailHomeBannerDetail } from './channel-detail-home-banner-detail';

export enum EnChannelDetailHomeMode {
  HOME = 'HOME',
  BANNER = 'BANNER',
  COURSE_KEYWORD = 'COURSE_KEYWORD',
  PACKAGE_KEYWORD = 'PACKAGE_KEYWORD' }

interface ChannelDetailHomeProps {
  onButtonLayoutChange: (layout: EnButtonLayout) => void;
}

const ChannelDetailHomeComponent = (props: ChannelDetailHomeProps, ref: any) => {
  const [homeMode, setHomeMode] = useState(EnChannelDetailHomeMode.HOME);
  const [formMode, setFormMode] = useState(EnFormMode.NONE);

  useEffect(() => {
    if (props.onButtonLayoutChange) {
      switch (homeMode) {
        case EnChannelDetailHomeMode.HOME:
          props.onButtonLayoutChange(EnButtonLayout.NONE);
          break;
        case EnChannelDetailHomeMode.BANNER:
        case EnChannelDetailHomeMode.COURSE_KEYWORD:
        case EnChannelDetailHomeMode.PACKAGE_KEYWORD:
          props.onButtonLayoutChange(EnButtonLayout.RESET_AND_SAVE);
          break;
      }
    }
  }, [props.onButtonLayoutChange, homeMode]);

  return (
    <>
      {homeMode === EnChannelDetailHomeMode.HOME && (
        <ChannelDetailHomeBanner
          onAddClick={() => {
            setHomeMode(EnChannelDetailHomeMode.BANNER);
            setFormMode(EnFormMode.ADD);
          }}
        />
      )}
      {homeMode === EnChannelDetailHomeMode.BANNER && (
        <ChannelDetailHomeBannerDetail ref={ref} mode={formMode} />
      )}
    </>
  );
};

export const ChannelDetailHome = forwardRef(ChannelDetailHomeComponent);
