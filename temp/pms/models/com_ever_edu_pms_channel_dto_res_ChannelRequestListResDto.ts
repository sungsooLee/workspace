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
     * 신청자
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
     * 신청상태
     */
    approvalStatusTypecd?: com_ever_edu_pms_channel_dto_res_ChannelRequestListResDto.approvalStatusTypecd;
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
     * 채널신청 uuid
     */
    channelRequestUuid?: string;
    /**
     * 채널접수 uuid
     */
    channelAcceptUuid?: string;
};
export namespace com_ever_edu_pms_channel_dto_res_ChannelRequestListResDto {
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

