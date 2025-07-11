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
    userState?: com_ever_edu_pms_notification_dto_res_PeriodicEmailReceiverResDto$ListOnAdmin.userState;
};
export namespace com_ever_edu_pms_notification_dto_res_PeriodicEmailReceiverResDto$ListOnAdmin {
    export enum userState {
        NORMAL = 'NORMAL',
        WAIT = 'WAIT',
        DORMANT = 'DORMANT',
        LOCKED = 'LOCKED',
    }
}

