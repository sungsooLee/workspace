/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto } from './com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto';
import type { com_ever_edu_pms_channel_dto_res_ChannelOwnerUserResDto } from './com_ever_edu_pms_channel_dto_res_ChannelOwnerUserResDto';
export type com_ever_edu_pms_channel_dto_res_ChannelResDto = {
    /**
     * 채널 UUID
     */
    channelUuid?: string;
    /**
     * 채널 개설 방식 구분
     */
    channelCreationType?: com_ever_edu_pms_channel_dto_res_ChannelResDto.channelCreationType;
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
    channelTenatMappingType?: com_ever_edu_pms_channel_dto_res_ChannelResDto.channelTenatMappingType;
    /**
     * 채널비밀구분
     */
    channelSecretType?: com_ever_edu_pms_channel_dto_res_ChannelResDto.channelSecretType;
    /**
     * 채널 구독 방식 구분
     */
    channelSubscriptionType?: com_ever_edu_pms_channel_dto_res_ChannelResDto.channelSubscriptionType;
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
    fileStorageType?: com_ever_edu_pms_channel_dto_res_ChannelResDto.fileStorageType;
    /**
     * 노출여부여부
     */
    isDisplay?: boolean;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 회사명 리스트(테넌트매핑된 회사)
     */
    companyNameList?: Array<string>;
    createdBy?: string;
    lastModifiedBy?: string;
    createdDate?: string;
    modifiedDate?: string;
    tenants?: Array<com_ever_edu_pms_channel_dto_res_ChannelMappingTenantResDto>;
};
export namespace com_ever_edu_pms_channel_dto_res_ChannelResDto {
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
}

