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
     * 테넌트
     */
    tenantId?: number;
    /**
     * 테넌트이름
     */
    tenantName?: string;
    /**
     * 비공개채널여부
     */
    isSecretChannel?: boolean;
    /**
     * 신청자Id
     */
    reqeusterId?: number;
    /**
     * 신청자명
     */
    reqeusterName?: string;
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
     * 신청상태
     */
    approvalStatusTypecd?: com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto.approvalStatusTypecd;
    /**
     * 신청일시
     */
    requestDate?: string;
    /**
     * 채널접수ID
     */
    channelAcceptId?: number;
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
     * 채널접수일시
     */
    channelAcceptDate?: string;
    /**
     * 결재일시(승인일시
     */
    approvalDate?: string;
    /**
     * 채널신청 uuid
     */
    channelRequestUuid?: string;
    /**
     * 채널ID
     */
    channelId?: number;
};
export namespace com_ever_edu_pms_channel_dto_res_ChannelRequestDetailResDto {
    /**
     * 신청상태
     */
    export enum approvalStatusTypecd {
        PENDING = 'PENDING',
        ACCEPTED = 'ACCEPTED',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

