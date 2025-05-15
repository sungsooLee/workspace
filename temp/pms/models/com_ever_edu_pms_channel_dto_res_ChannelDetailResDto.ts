/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto } from './com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto';
export type com_ever_edu_pms_channel_dto_res_ChannelDetailResDto = {
    channelId?: number;
    channelName?: string;
    tenantId?: number;
    tenantName?: string;
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 채널학습내용
     */
    channelLearningContent?: string;
    /**
     * 채널목적내용
     */
    channelPurposeContent?: string;
    /**
     * 채널메인링크내용
     */
    channelMainLinkContent?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 유니버셜채널 여부
     */
    isUniversalChannel?: boolean;
    /**
     * 비공개채널여부
     */
    isSecretChannel?: boolean;
    /**
     * 보안채널여부
     */
    isSecureChannel?: boolean;
    /**
     * 활성화여부
     */
    isActived?: boolean;
    /**
     * 삭제여부
     */
    isDeleted?: boolean;
    channelUuid?: string;
    channelOwnerId?: number;
    channelOwnerName?: string;
    /**
     * 채널접수ID
     */
    channelAcceptId?: number;
    tenants?: Array<com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto>;
    createdBy?: string;
    lastModifiedBy?: string;
    createdDate?: string;
    modifiedDate?: string;
};

