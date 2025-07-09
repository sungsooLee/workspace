export interface ChannelByRoleId {
  channelUuid: string;
  channelCreationType: string;
  channelName: string;
  channelMainId: string;
  channelTenatMappingType: string;
  channelSecretType: string;
  channelSubscriptionType: string;
  tenantList: TenantList[];
  channelOwnerUserList: ChannelOwnerUserList[];
  fileStorageType: string;
  isDisplay: boolean;
  isUsed: boolean;
  companyNameList: string[];
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  modifiedDate: string;
}

export interface TenantList {
  channelId: number;
  tenantId: number;
  tenantName: string;
  isMainTenant: boolean;
}

export interface ChannelOwnerUserList {
  channelId: number;
  userUuid: string;
  userName: string;
}
