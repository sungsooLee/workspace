/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto } from './com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto';
/**
 * 채널 목록
 */
export type com_ever_edu_pms_channel_dto_res_ChannelResDto = {
    channelUuid?: string;
    channelName?: string;
    tenantId?: number;
    tenantName?: string;
    /**
     * 회사명
     */
    companyName?: string;
    tenantList?: Array<com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto>;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    isUniversalChannel?: boolean;
    isSecretChannel?: boolean;
    channelOwnerId?: number;
    channelOwnerName?: string;
    /**
     * 채널신청ID
     */
    channelRequestId?: number;
    createdBy?: string;
    createdDate?: string;
    modifiedDate?: string;
    tenants?: Array<com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto>;
};

