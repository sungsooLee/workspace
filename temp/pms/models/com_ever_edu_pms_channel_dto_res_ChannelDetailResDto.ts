/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelLearnerUserGroupResDto } from './com_ever_edu_pms_channel_dto_res_ChannelLearnerUserGroupResDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelLearnerUserResDto } from './com_ever_edu_pms_channel_dto_res_ChannelLearnerUserResDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto } from './com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto';
export type com_ever_edu_pms_channel_dto_res_ChannelDetailResDto = {
    /**
     * 채널 개설 방식 구분
     */
    channelCreationType?: com_ever_edu_pms_channel_dto_res_ChannelDetailResDto.channelCreationType;
    /**
     * 채널 명
     */
    channelName?: string;
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
     * 채널 테넌트 관계 유형(일반/유니버셜)
     */
    channelTenatMappingType?: com_ever_edu_pms_channel_dto_res_ChannelDetailResDto.channelTenatMappingType;
    /**
     * 채널비밀구분
     */
    channelSecretType?: com_ever_edu_pms_channel_dto_res_ChannelDetailResDto.channelSecretType;
    /**
     * 채널 구독 방식 구분
     */
    channelSubscriptionType?: com_ever_edu_pms_channel_dto_res_ChannelDetailResDto.channelSubscriptionType;
    /**
     * 채널소유자Id
     */
    channelOwnerId?: number;
    channelOwnerName?: string;
    /**
     * 보안채널여부
     */
    isSecureChannel?: boolean;
    /**
     * 활성화여부
     */
    isActived?: boolean;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 삭제여부
     */
    isDeleted?: boolean;
    channelUuid?: string;
    channelTargetUserSettingType?: com_ever_edu_pms_channel_dto_res_ChannelDetailResDto.channelTargetUserSettingType;
    learnerUserGroupList?: Array<com_ever_edu_pms_channel_dto_res_ChannelLearnerUserGroupResDto>;
    learnerUserList?: Array<com_ever_edu_pms_channel_dto_res_ChannelLearnerUserResDto>;
    learnerRestraintUserList?: Array<com_ever_edu_pms_channel_dto_res_ChannelLearnerUserResDto>;
    /**
     * 채널신청ID
     */
    channelRequestId?: number;
    tenantList?: Array<com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto>;
    tenantId?: number;
    tenantName?: string;
    /**
     * 회사명
     */
    companyName?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    createdDate?: string;
    modifiedDate?: string;
    tenants?: Array<com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto>;
};
export namespace com_ever_edu_pms_channel_dto_res_ChannelDetailResDto {
    /**
     * 채널 개설 방식 구분
     */
    export enum channelCreationType {
        REQUEST_CREATE = 'REQUEST_CREATE',
        MANUAL_CREATE = 'MANUAL_CREATE',
    }
    /**
     * 채널 테넌트 관계 유형(일반/유니버셜)
     */
    export enum channelTenatMappingType {
        MAPPING_TENANT = 'MAPPING_TENANT',
        ALL_TENANT = 'ALL_TENANT',
    }
    /**
     * 채널비밀구분
     */
    export enum channelSecretType {
        NOT_SECRET = 'NOT_SECRET',
        SECRET = 'SECRET',
    }
    /**
     * 채널 구독 방식 구분
     */
    export enum channelSubscriptionType {
        MANUAL = 'MANUAL',
        AUTO = 'AUTO',
    }
    export enum channelTargetUserSettingType {
        USER_GROUP_SETTING = 'USER_GROUP_SETTING',
        MANUAL_SETTING = 'MANUAL_SETTING',
    }
}

