/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto = {
    messageQueueEntryId?: number;
    messageTypeCode?: com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto.messageTypeCode;
    sendingTypeCode?: com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto.sendingTypeCode;
    templateId?: string;
    sendingStartDate?: string;
    completedDate?: string;
    status?: com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto.status;
    isDeleted?: boolean;
};
export namespace com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto {
    export enum messageTypeCode {
        EMAIL = 'EMAIL',
        SMS = 'SMS',
        KAKAO = 'KAKAO',
        PUSH = 'PUSH',
    }
    export enum sendingTypeCode {
        RESERVED = 'RESERVED',
        PERIODIC = 'PERIODIC',
        ONETIME = 'ONETIME',
    }
    export enum status {
        WAITING = 'WAITING',
        SENT = 'SENT',
        FAILED = 'FAILED',
    }
}

