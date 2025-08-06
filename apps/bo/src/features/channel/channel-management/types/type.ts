import { GridBoxConfig } from '@learnway/ui/grid';
import { EnFormMode } from '@shared/types/enums';

/**
 * 채널 상세 상단 버튼 레이아웃
 * 등록 / 초기화,저장 / 구독 해지
 */
export enum EnChannelDetailButtonLayout {
  REGISTER = 'REGISTER',
  RESET_AND_SAVE = 'RESET_AND_SAVE',
  CANCEL_SUBSCRIBE = 'CANCEL_SUBSCRIBE',
  NONE = 'NONE',
}

/**
 * 채널 상세 탭
 */
export enum EnChannelDetailTabKeys {
  BASE = 'BASE',
  USER = 'USER',
  HOME = 'HOME',
  BOARD = 'BOARD',
  SUBSCRIBER = 'SUBSCRIBER',
  MANAGER_ROLE = 'MANAGER_ROLE',
  USER_GROUP = 'USER_GROUP',
}

/**
 * 채널 홈 배너 리스트 Props
 */
export interface ChannelHomeBannerListProps {
  onAddClick?: () => void;
  onDetailClick: (bannerId: number) => void;
}

/**
 * 채널 홈 배너 상세 Props
 */
export interface ChannelHomeBannerDetailProps {
  mode: EnFormMode;
  bannerId?: number | undefined;
  onCompleted: () => void;
}

export interface ChannelSubscriberSearchFormData {
  tenantId: { value: string; label: string };
  companyCode: { value: string; label: string };
  employeeNumber: string;
  channelSubscriptionType: string;
  channelSubscriptionStatType: string;
  subscriptionDate: {
    from: object;
    to: object;
  };
  unSubscriptionDate: {
    from: object;
    to: object;
  };
}

export interface ChannelSubscriberPageHookResult {
  provider: any;
  getValues: () => any;
  onSubmit: any;
  onReset: () => void;
  gridConfig: GridBoxConfig;
  handleOnSearch: (data: ChannelSubscriberSearchFormData) => void;
  watch: any;
}
