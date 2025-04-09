/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_notification_dto_req_EmailReceiverReqDto } from './com_ever_edu_pms_notification_dto_req_EmailReceiverReqDto';
import type { com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto } from './com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto';
export type com_ever_edu_pms_notification_dto_req_EmailSendReqDto = {
    /**
     * 템플릿 ID
     */
    templateId?: string;
    template?: com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto;
    /**
     * 수신인 리스트
     */
    receivers?: Array<com_ever_edu_pms_notification_dto_req_EmailReceiverReqDto>;
    /**
     * 발신 시작일
     */
    sendingStartDate?: string;
    /**
     * 발신 시간
     */
    sendingStartTime?: string;
};

