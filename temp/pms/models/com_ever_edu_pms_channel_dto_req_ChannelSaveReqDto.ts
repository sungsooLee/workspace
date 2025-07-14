/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_req_ChannelOwnerUserReqDto } from './com_ever_edu_pms_channel_dto_req_ChannelOwnerUserReqDto';
import type { com_ever_edu_pms_channel_dto_req_ChannelPropertiesUpdateReqDto } from './com_ever_edu_pms_channel_dto_req_ChannelPropertiesUpdateReqDto';
import type { com_ever_edu_pms_channel_dto_req_ChannelTagReqDto } from './com_ever_edu_pms_channel_dto_req_ChannelTagReqDto';
import type { com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto } from './com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto';
export type com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto = {
    /**
     * 채널Uuid
     */
    channelUuid?: string;
    /**
     * 채널신청 uuid
     */
    channelRequestUuid?: string;
    /**
     * 채널 개설 방식 구분
     */
    channelCreationType?: com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto.channelCreationType;
    /**
     * 채널 명
     */
    channelName: string;
    /**
     * 채널메인아이디(채널핸들)
     */
    channelMainId?: string;
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
    tenantList?: Array<com_ever_edu_pms_channel_dto_req_ChannelTenantReqDto>;
    /**
     * 채널소유자UUID list
     */
    channelOwnerUserList?: Array<com_ever_edu_pms_channel_dto_req_ChannelOwnerUserReqDto>;
    /**
     * 파일 저장 설정
     */
    fileStorageType?: com_ever_edu_pms_channel_dto_req_ChannelSaveReqDto.fileStorageType;
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
    /**
     * 테넌트정산태그
     */
    channelTagList?: Array<com_ever_edu_pms_channel_dto_req_ChannelTagReqDto>;
    channelProperties?: com_ever_edu_pms_channel_dto_req_ChannelPropertiesUpdateReqDto;
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
    /**
     * 파일 저장 설정
     */
    export enum fileStorageType {
        AWS_INTERNAL = 'AWS_INTERNAL',
        AWS_EXTERNAL = 'AWS_EXTERNAL',
        HMG_CLOUD = 'HMG_CLOUD',
    }
}

