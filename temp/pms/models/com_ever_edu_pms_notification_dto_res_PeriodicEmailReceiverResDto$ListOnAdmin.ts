/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_notification_dto_res_PeriodicEmailReceiverResDto$ListOnAdmin = {
    id?: number;
    employeeNumber?: string;
    userName?: string;
    userEngName?: string;
    emailAddress?: string;
    userStateCode?: com_ever_edu_pms_notification_dto_res_PeriodicEmailReceiverResDto$ListOnAdmin.userStateCode;
};
export namespace com_ever_edu_pms_notification_dto_res_PeriodicEmailReceiverResDto$ListOnAdmin {
    export enum userStateCode {
        WAIT = 'WAIT',
        NORMAL = 'NORMAL',
        HALT = 'HALT',
        LEAVE = 'LEAVE',
        DELETE = 'DELETE',
    }
}

