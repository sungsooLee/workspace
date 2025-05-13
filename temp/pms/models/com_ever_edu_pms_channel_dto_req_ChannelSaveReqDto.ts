/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto } from './com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto';
export type com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto = {
    /**
     * 채널접수ID
     */
    channelAcceptId?: number;
    /**
     * 채널 명
     */
    channelName: string;
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
    channelMainLinkContent: string;
    /**
     * 보안채널여부
     */
    isSecureChannel: boolean;
    /**
     * 비공개채널여부
     */
    isSecretChannel: boolean;
    /**
     * 채널소유자Id
     */
    channelOwnerId: number;
    /**
     * 유니버셜채널 여부
     */
    isUniversalChannel: boolean;
    /**
     * 테넌트전체 여부
     */
    isAllTenant: boolean;
    tenantList: Array<com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto>;
    userGroupList?: Array<com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto>;
    userList?: Array<com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto>;
    userRestraintList?: Array<com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto>;
};

