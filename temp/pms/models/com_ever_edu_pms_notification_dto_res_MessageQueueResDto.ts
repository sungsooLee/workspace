/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_notification_dto_res_MessageQueueResDto = {
    messageQueueId?: number;
    sendingStartDate?: string;
    sentDate?: string;
    status?: com_ever_edu_pms_notification_dto_res_MessageQueueResDto.status;
    failedReason?: string;
    userNo?: number;
    userName?: string;
    email?: string;
};
export namespace com_ever_edu_pms_notification_dto_res_MessageQueueResDto {
    export enum status {
        WAITING = 'WAITING',
        SENT = 'SENT',
        FAILED = 'FAILED',
    }
}

