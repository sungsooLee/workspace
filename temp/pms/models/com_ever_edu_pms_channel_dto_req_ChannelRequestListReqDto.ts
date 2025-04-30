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
     * 신청상태
     */
    approvalStatusTypecd?: com_ever_edu_pms_channel_dto_req_ChannelRequestListReqDto.approvalStatusTypecd;
    /**
     * 비공개채널여부
     */
    isSecretChannel?: boolean;
    /**
     * 신청자
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
     * 신청기간 시작일
     */
    startDate?: string;
    /**
     * 신청기간 종료일
     */
    endDate?: string;
};
export namespace com_ever_edu_pms_channel_dto_req_ChannelRequestListReqDto {
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

