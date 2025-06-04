/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_req_ChannelLearnerUserGroupReqDto } from './com_ever_edu_pms_channel_dto_req_ChannelLearnerUserGroupReqDto';
import type { com_ever_edu_pms_channel_dto_req_ChannelLearnerUserReqDto } from './com_ever_edu_pms_channel_dto_req_ChannelLearnerUserReqDto';
import type { com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto } from './com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto';
export type com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto = {
    /**
     * 채널 개설 방식 구분
     */
    channelCreationType?: com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto.channelCreationType;
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
     * 채널메인아이디
     */
    channelMainId?: string;
    /**
     * 채널메인링크내용
     */
    channelMainLinkContent: string;
    /**
     * 채널 테넌트 관계 유형(일반/유니버셜)
     */
    channelTenatMappingType: com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto.channelTenatMappingType;
    /**
     * 채널비밀구분
     */
    channelSecretType: com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto.channelSecretType;
    /**
     * 채널 구독 방식 구분
     */
    channelSubscriptionType?: com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto.channelSubscriptionType;
    /**
     * 채널소유자Id
     */
    channelOwnerId: number;
    /**
     * 보안채널여부
     */
    isSecureChannel: boolean;
    /**
     * 활성화여부
     */
    isActived?: boolean;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    channelTargetUserSettingType?: com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto.channelTargetUserSettingType;
    tenantList?: Array<com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto>;
    learnerUserGroupList?: Array<com_ever_edu_pms_channel_dto_req_ChannelLearnerUserGroupReqDto>;
    learnerUserList?: Array<com_ever_edu_pms_channel_dto_req_ChannelLearnerUserReqDto>;
    learnerRestraintUserList?: Array<com_ever_edu_pms_channel_dto_req_ChannelLearnerUserReqDto>;
    /**
     * 채널신청ID
     */
    channelRequestId?: number;
};
export namespace com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto {
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

