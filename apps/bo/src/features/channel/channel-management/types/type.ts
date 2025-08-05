import { EnFormMode } from '@types';

// 등록 / 초기화,저장 / 구독 해지
export enum EnChannelDetailButtonLayout {
  REGISTER = 'REGISTER',
  RESET_AND_SAVE = 'RESET_AND_SAVE',
  CANCEL_SUBSCRIBE = 'CANCEL_SUBSCRIBE',
  NONE = 'NONE',
}

export enum EnChannelDetailTabKeys {
  BASE = 'BASE',
  USER = 'USER',
  HOME = 'HOME',
  BOARD = 'BOARD',
  SUBSCRIBER = 'SUBSCRIBER',
  MANAGER_ROLE = 'MANAGER_ROLE',
  USER_GROUP = 'USER_GROUP',
}

export interface ChannelHomeBannerListProps {
  onAddClick?: () => void;
  onDetailClick: (bannerId: number) => void;
}

export interface ChannelHomeBannerDetailProps {
  mode: EnFormMode;
  bannerId?: number | undefined;
  onCompleted: () => void;
}
