/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto = {
    /**
     * 테넌트 Id
     */
    tenantId?: number;
    /**
     * 채널 개설 방식 구분
     */
    channelCreationType?: com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto.channelCreationType;
    /**
     * 채널 명
     */
    channelName?: string;
    /**
     * 채널메인아이디(채널핸들)
     */
    channelMainId?: string;
    /**
     * 채널 테넌트 관계 유형(채널유형) enum: ChannelTenatMappingType
     */
    channelTenatMappingType?: com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto.channelTenatMappingType;
    /**
     * 채널 사용여부
     */
    isUsed?: boolean;
    isDisplay?: boolean;
    companyId?: number;
    channelOwnerUserUuid?: string;
    channelOwnerUserName?: string;
    /**
     * 등록검색시작일(yyyyMMdd)
     */
    regStartDate?: string;
    /**
     * 등록검색종료일(yyyyMMdd)
     */
    regEndDate?: string;
};
export namespace com_ever_edu_pms_channel_dto_req_ChannelSearchReqDto {
    /**
     * 채널 개설 방식 구분
     */
    export enum channelCreationType {
        REQUEST_CREATE = 'REQUEST_CREATE',
        MANUAL_CREATE = 'MANUAL_CREATE',
    }
    /**
     * 채널 테넌트 관계 유형(채널유형) enum: ChannelTenatMappingType
     */
    export enum channelTenatMappingType {
        MAPPING_TENANT = 'MAPPING_TENANT',
        ALL_TENANT = 'ALL_TENANT',
    }
}

