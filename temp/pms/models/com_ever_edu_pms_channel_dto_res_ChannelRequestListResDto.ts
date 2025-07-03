/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_channel_dto_res_ChannelRequestListResDto = {
    /**
     * 채널신청ID
     */
    channelRequestId?: number;
    /**
     * 테넌트Id
     */
    tenantId?: number;
    /**
     * 테넌트이름
     */
    tenantName?: string;
    /**
     * 채널 테넌트 관계 유형(일반/유니버셜)
     */
    channelTenatMappingType?: com_ever_edu_pms_channel_dto_res_ChannelRequestListResDto.channelTenatMappingType;
    /**
     * 채널비밀구분
     */
    channelSecretType?: com_ever_edu_pms_channel_dto_res_ChannelRequestListResDto.channelSecretType;
    /**
     * 신청자 사원번호
     */
    reqeusterEmployeeNumber?: string;
    /**
     * 신청자
     */
    reqeusterName?: string;
    /**
     * 채널메인아이디
     */
    channelMainId?: string;
    /**
     * 채널명
     */
    channelName?: string;
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 조직정보
     */
    departmentName?: string;
    /**
     * 신청상태
     */
    approvalStatusType?: com_ever_edu_pms_channel_dto_res_ChannelRequestListResDto.approvalStatusType;
    /**
     * 신청일시
     */
    requestDate?: string;
    /**
     * 메일발송여부
     */
    isChannelCreationMailSend?: boolean;
    /**
     * 결재자(승인자
     */
    approverName?: string;
    /**
     * 결재일시(승인일시
     */
    approvalDate?: string;
    /**
     * 반려사유내용
     */
    rejectedReasonContent?: string;
    /**
     * 채널ID
     */
    channelId?: number;
    /**
     * 채널신청 uuid
     */
    channelRequestUuid?: string;
};
export namespace com_ever_edu_pms_channel_dto_res_ChannelRequestListResDto {
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
     * 신청상태
     */
    export enum approvalStatusType {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

