/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_channel_dto_req_ChannelRequestListReqDto = {
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
    requestState?: string;
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
};

