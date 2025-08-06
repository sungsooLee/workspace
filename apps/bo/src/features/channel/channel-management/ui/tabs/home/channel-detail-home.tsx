import { EnFormMode } from '@shared/types/enums';
import { forwardRef, useEffect, useState } from 'react';
import { EnChannelDetailButtonLayout, EnChannelDetailListType } from '../../../types/type';
import { ChannelDetailHomeBanner } from './channel-detail-home-banner';
import { ChannelDetailHomeBannerDetail } from './channel-detail-home-banner-detail';

export enum EnChannelDetailHomeMode {
  HOME = 'HOME',
  BANNER = 'BANNER',
  COURSE_KEYWORD = 'COURSE_KEYWORD',
  PACKAGE_KEYWORD = 'PACKAGE_KEYWORD',
}

interface ChannelDetailHomeProps {
  onButtonChange: (layout: EnChannelDetailButtonLayout, listType?: EnChannelDetailListType) => void;
}

const ChannelDetailHomeComponent = (props: ChannelDetailHomeProps, ref: any) => {
  const [homeMode, setHomeMode] = useState(EnChannelDetailHomeMode.HOME);
  const [formMode, setFormMode] = useState(EnFormMode.NONE);

  const [selectedBannerId, setSelectedBannerId] = useState<number>();

  useEffect(() => {
    if (props.onButtonChange) {
      switch (homeMode) {
        case EnChannelDetailHomeMode.HOME:
          props.onButtonChange(EnChannelDetailButtonLayout.NONE);
          break;
        case EnChannelDetailHomeMode.BANNER:
        case EnChannelDetailHomeMode.COURSE_KEYWORD:
        case EnChannelDetailHomeMode.PACKAGE_KEYWORD:
          props.onButtonChange(
            EnChannelDetailButtonLayout.RESET_AND_SAVE,
            EnChannelDetailListType.TAB_LIST,
          );
          break;
      }
    }
  }, [props.onButtonChange, homeMode]);

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
