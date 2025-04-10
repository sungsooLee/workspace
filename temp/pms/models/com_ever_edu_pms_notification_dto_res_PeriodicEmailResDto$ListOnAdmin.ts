/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { java_time_LocalTime } from './java_time_LocalTime';
export type com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$ListOnAdmin = {
    periodicEmailId?: number;
    periodicEmailName?: string;
    templateId?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    sendingStartDate?: string;
    scheduledTime?: java_time_LocalTime;
    periodicEmailCycleCode?: com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$ListOnAdmin.periodicEmailCycleCode;
};
export namespace com_ever_edu_pms_notification_dto_res_PeriodicEmailResDto$ListOnAdmin {
    export enum periodicEmailCycleCode {
        WEEKDAY = 'WEEKDAY',
        WEEKDAY_EXCEPT_FRI = 'WEEKDAY_EXCEPT_FRI',
        MWF = 'MWF',
        TT = 'TT',
    }
}

