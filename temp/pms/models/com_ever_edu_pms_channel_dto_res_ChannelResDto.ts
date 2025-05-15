/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto } from './com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto';
export type com_ever_edu_pms_channel_dto_res_ChannelResDto = {
    channelId?: number;
    channelName?: string;
    tenantId?: number;
    tenantName?: string;
    /**
     * 회사명
     */
    companyName?: string;
    tenants?: Array<com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto>;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    isUniversalChannel?: boolean;
    isSecretChannel?: boolean;
    channelOwnerId?: number;
    channelOwnerName?: string;
    /**
     * 채널접수ID
     */
    channelAcceptId?: number;
    createdBy?: string;
    createdDate?: string;
    modifiedDate?: string;
};

