/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto } from './com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelOwnerUserResDto } from './com_ever_edu_pms_channel_dto_res_ChannelOwnerUserResDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelPropertiesResDto } from './com_ever_edu_pms_channel_dto_res_ChannelPropertiesResDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelTagResDto } from './com_ever_edu_pms_channel_dto_res_ChannelTagResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin';
export type com_ever_edu_pms_channel_dto_res_ChannelDetailResDto = {
    /**
     * 채널 UUID
     */
    channelUuid?: string;
    /**
     * 채널 개설 방식 구분
     */
    channelCreationType?: com_ever_edu_pms_channel_dto_res_ChannelDetailResDto.channelCreationType;
    /**
     * 채널 명
     */
    channelName?: string;
    /**
     * 채널메인아이디(채널핸들)
     */
    channelMainId?: string;
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
     * 테넌트 리스트
     */
    tenantList?: Array<com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto>;
    /**
     * 채널소유자 리스트
     */
    channelOwnerUserList?: Array<com_ever_edu_pms_channel_dto_res_ChannelOwnerUserResDto>;
    /**
     * 파일 저장 설정
     */
    fileStorageType?: com_ever_edu_pms_channel_dto_res_ChannelDetailResDto.fileStorageType;
    /**
     * 노출여부여부
     */
    isDisplay?: boolean;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 채널 프로필 이미지 경로 uuid
     */
    channelProfileImageFileGroupUuid?: string;
    /**
     * 채널 홈 이미지 경로 uuid
     */
    channelHomeImageFileGroupUuid?: string;
    /**
     * 채널안내
     */
    channelDesc?: string;
    channelTagList?: Array<com_ever_edu_pms_channel_dto_res_ChannelTagResDto>;
    /**
     * 삭제여부
     */
    isDeleted?: boolean;
    /**
     * 채널대상자 설정 구분
     */
    channelTargetUserSettingType?: com_ever_edu_pms_channel_dto_res_ChannelDetailResDto.channelTargetUserSettingType;
    channelProperties?: com_ever_edu_pms_channel_dto_res_ChannelPropertiesResDto;
    /**
     * 채널신청ID
     */
    channelRequestId?: number;
    mainTenantInfo?: com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin;
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
    /**
     * 파일 저장 설정
     */
    export enum fileStorageType {
        AWS_INTERNAL = 'AWS_INTERNAL',
        AWS_EXTERNAL = 'AWS_EXTERNAL',
        HMG_CLOUD = 'HMG_CLOUD',
    }
    /**
     * 채널대상자 설정 구분
     */
    export enum channelTargetUserSettingType {
        USER_GROUP_SETTING = 'USER_GROUP_SETTING',
        MANUAL_SETTING = 'MANUAL_SETTING',
    }
}

