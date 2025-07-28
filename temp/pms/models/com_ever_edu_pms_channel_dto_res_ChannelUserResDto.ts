/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_channel_dto_res_ChannelUserResDto = {
    /**
     * 채널 UUID
     */
    channelUuid?: string;
    /**
     * 채널 개설 방식 구분
     */
    channelCreationType?: com_ever_edu_pms_channel_dto_res_ChannelUserResDto.channelCreationType;
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
    channelTenatMappingType?: com_ever_edu_pms_channel_dto_res_ChannelUserResDto.channelTenatMappingType;
    /**
     * 채널비밀구분
     */
    channelSecretType?: com_ever_edu_pms_channel_dto_res_ChannelUserResDto.channelSecretType;
    /**
     * 채널 구독 방식 구분
     */
    channelSubscriptionType?: com_ever_edu_pms_channel_dto_res_ChannelUserResDto.channelSubscriptionType;
    /**
     * 파일 저장 설정
     */
    fileStorageType?: com_ever_edu_pms_channel_dto_res_ChannelUserResDto.fileStorageType;
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
     * 채널 Tag 목록
     */
    channelTags?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    createdDate?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_channel_dto_res_ChannelUserResDto {
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

