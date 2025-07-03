/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_channel_dto_req_ChannelRequestSaveReqDto = {
    /**
     * 테넌트번호
     */
    tenantId?: number;
    /**
     * 채널이름
     */
    channelName?: string;
    /**
     * 채널메인아이디
     */
    channelMainId?: string;
    /**
     * 채널메인링크내용
     */
    channelMainLinkContent?: string;
    /**
     * 채널 테넌트 관계 유형
     */
    channelTenatMappingType?: com_ever_edu_pms_channel_dto_req_ChannelRequestSaveReqDto.channelTenatMappingType;
    /**
     * 채널비밀구분
     */
    channelSecretType?: com_ever_edu_pms_channel_dto_req_ChannelRequestSaveReqDto.channelSecretType;
    /**
     * 채널학습내용
     */
    channelLearningContent?: string;
    /**
     * 채널목적내용
     */
    channelPurposeContent?: string;
    /**
     * 요청자ID
     */
    channelRequestorId?: number;
};
export namespace com_ever_edu_pms_channel_dto_req_ChannelRequestSaveReqDto {
    /**
     * 채널 테넌트 관계 유형
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
}

