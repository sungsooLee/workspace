/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto = {
    /**
     * 채널신청ID
     */
    channelRequestId?: number;
    /**
     * 채널명
     */
    channelName?: string;
    /**
     * 테넌트
     */
    tenantId?: number;
    /**
     * 테넌트이름
     */
    tenantName?: string;
    /**
     * 채널 테넌트 관계 유형
     */
    channelTenatMappingType?: com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto.channelTenatMappingType;
    /**
     * 채널비밀구분
     */
    channelSecretType?: com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto.channelSecretType;
    /**
     * 채널메인아이디
     */
    channelMainId?: string;
    /**
     * 채널메인링크내용
     */
    channelMainLinkContent?: string;
    /**
     * 채널학습내용
     */
    channelLearningContent?: string;
    /**
     * 채널목적내용
     */
    channelPurposeContent?: string;
    /**
     * 신청자Id
     */
    reqeusterId?: number;
    /**
     * 신청자 사원번호
     */
    reqeusterEmployeeNumber?: string;
    /**
     * 신청자명
     */
    reqeusterName?: string;
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
    approvalStatusType?: com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto.approvalStatusType;
    /**
     * 메일발송여부
     */
    isChannelCreationMailSend?: boolean;
    /**
     * 결재자(승인자)ID
     */
    approverId?: number;
    /**
     * 결재자(승인자
     */
    approverName?: string;
    /**
     * 결재일시(승인일시)
     */
    approvalDate?: string;
    /**
     * 채널 신청일시
     */
    createdDate?: string;
    /**
     * 채널신청 uuid
     */
    channelRequestUuid?: string;
    /**
     * 채널ID
     */
    channelId?: number;
    /**
     * 채널 활성화여부
     */
    isActivedChannel?: boolean;
    /**
     * 채널 사용여부
     */
    isUsedChannel?: boolean;
    /**
     * 채널 개설일
     */
    createdDateChannel?: string;
};
export namespace com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto {
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
    /**
     * 신청상태
     */
    export enum approvalStatusType {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

