/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_notification_dto_res_EmailTemplateResDto } from './com_ever_edu_pms_notification_dto_res_EmailTemplateResDto';
import type { com_ever_edu_pms_notification_dto_res_PeriodicEmailReceiverResDto$ListOnAdmin } from './com_ever_edu_pms_notification_dto_res_PeriodicEmailReceiverResDto$ListOnAdmin';
import type { java_time_LocalTime } from './java_time_LocalTime';
export type com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$DetailOnAdmin = {
    periodicEmailId?: number;
    periodicEmailName?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    sendingStartDate?: string;
    scheduledTime?: java_time_LocalTime;
    periodicEmailCycleCode?: com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$DetailOnAdmin.periodicEmailCycleCode;
    template?: com_ever_edu_pms_notification_dto_res_EmailTemplateResDto;
    receivers?: Array<com_ever_edu_pms_notification_dto_res_PeriodicEmailReceiverResDto$ListOnAdmin>;
};
export namespace com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$DetailOnAdmin {
    export enum periodicEmailCycleCode {
        WEEKDAY = 'WEEKDAY',
        WEEKDAY_EXCEPT_FRI = 'WEEKDAY_EXCEPT_FRI',
        MWF = 'MWF',
        TT = 'TT',
    }
}

