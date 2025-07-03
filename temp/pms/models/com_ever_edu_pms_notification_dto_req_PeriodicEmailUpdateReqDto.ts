/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto } from './com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto';
export type com_ever_edu_pms_notification_dto_req_PeriodicEmailUpdateReqDto = {
    /**
     * 정기 메일명
     */
    periodicEmailName?: string;
    /**
     * 템플릿 ID
     */
    templateId?: string;
    template?: com_ever_edu_pms_notification_dto_req_EmailTemplateReqDto;
    /**
     * 발송 여부
     */
    isActive?: boolean;
    /**
     * 발신 시작일
     */
    sendingStartDate?: string;
    /**
     * 발신 시간
     */
    scheduledTime?: string;
    /**
     * 발송 주기
     */
    periodicEmailCycle?: com_ever_edu_pms_notification_dto_req_PeriodicEmailUpdateReqDto.periodicEmailCycle;
};
export namespace com_ever_edu_pms_notification_dto_req_PeriodicEmailUpdateReqDto {
    /**
     * 발송 주기
     */
    export enum periodicEmailCycle {
        WEEKDAY = 'WEEKDAY',
        WEEKDAY_EXCEPT_FRI = 'WEEKDAY_EXCEPT_FRI',
        MWF = 'MWF',
        TT = 'TT',
    }
}

