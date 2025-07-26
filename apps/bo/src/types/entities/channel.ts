import { ISODateString, PaginationRequest } from '@types';

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

export interface ChannelParam extends PaginationRequest {
  tenantId?: string;
  channelCreationType?: string;
  channelName?: string;
  channelMainId?: string;
  channelTenatMappingType?: string;
  companyId?: string;
  channelOwnerUserUuid?: string;
  channelOwnerUserName?: string;
  isDisplay?: boolean;
  isUsed?: boolean;
}

export interface ChannelResponse {
  channelUuid: string;
  channelCreationType: 'REQUEST_CREATE';
  channelName: string;
  channelMainId: string;
  channelTenatMappingType: 'MAPPING_TENANT';
  channelSecretType: 'NOT_SECRET';
  channelSubscriptionType: 'MANUAL';
  tenantList: [
    {
      channelId: number;
      tenantId: number;
      tenantName: string;
      isMainTenant: boolean;
    },
  ];
  channelOwnerUserList: [
    {
      channelId: number;
      userUuid: string;
      userName: string;
    },
  ];
  fileStorageType: 'AWS_INTERNAL';
  isDisplay: boolean;
  isUsed: boolean;
  companyNameList: string[];
  createdBy: string;
  lastModifiedBy: string;
  createdDate: ISODateString;
  modifiedDate: ISODateString;
}
