import { EnFormMode } from '@types';
import { forwardRef, useEffect, useState } from 'react';
import { EnChannelDetailButtonLayout } from '../../../types/type';
import { ChannelDetailHomeBanner } from './channel-detail-home-banner';
import { ChannelDetailHomeBannerDetail } from './channel-detail-home-banner-detail';

export enum EnChannelDetailHomeMode {
  HOME = 'HOME',
  BANNER = 'BANNER',
  COURSE_KEYWORD = 'COURSE_KEYWORD',
  PACKAGE_KEYWORD = 'PACKAGE_KEYWORD',
}

interface ChannelDetailHomeProps {
  onButtonLayoutChange: (layout: EnChannelDetailButtonLayout) => void;
}

const ChannelDetailHomeComponent = (props: ChannelDetailHomeProps, ref: any) => {
  const [homeMode, setHomeMode] = useState(EnChannelDetailHomeMode.HOME);
  const [formMode, setFormMode] = useState(EnFormMode.NONE);

  const [selectedBannerId, setSelectedBannerId] = useState<number>();

  useEffect(() => {
    if (props.onButtonLayoutChange) {
      switch (homeMode) {
        case EnChannelDetailHomeMode.HOME:
          props.onButtonLayoutChange(EnChannelDetailButtonLayout.NONE);
          break;
        case EnChannelDetailHomeMode.BANNER:
        case EnChannelDetailHomeMode.COURSE_KEYWORD:
        case EnChannelDetailHomeMode.PACKAGE_KEYWORD:
          props.onButtonLayoutChange(EnChannelDetailButtonLayout.RESET_AND_SAVE);
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
            setSelectedBannerId(undefined);
          }}
          onDetailClick={(bannerId: number) => {
            setHomeMode(EnChannelDetailHomeMode.BANNER);
            setFormMode(EnFormMode.VIEW);
            setSelectedBannerId(bannerId);
          }}
        />
      )}
      {homeMode === EnChannelDetailHomeMode.BANNER && (
        <ChannelDetailHomeBannerDetail
          ref={ref}
          mode={formMode}
          bannerId={selectedBannerId}
          onCompleted={() => {
            setHomeMode(EnChannelDetailHomeMode.HOME);
          }}
        />
      )}
    </>
  );
};

export const ChannelDetailHome = forwardRef(ChannelDetailHomeComponent);
