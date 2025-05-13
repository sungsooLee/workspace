/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto = {
    messageQueueEntryId?: number;
    messageType?: com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto.messageType;
    sendingType?: com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto.sendingType;
    templateId?: string;
    sendingStartDate?: string;
    completedDate?: string;
    messageQueueStatus?: com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto.messageQueueStatus;
    isDeleted?: boolean;
};
export namespace com_ever_edu_pms_notification_dto_res_MessageQueueEntryResDto {
    export enum messageType {
        EMAIL = 'EMAIL',
        SMS = 'SMS',
        KAKAO = 'KAKAO',
        PUSH = 'PUSH',
    }
    export enum sendingType {
        RESERVED = 'RESERVED',
        PERIODIC = 'PERIODIC',
        ONETIME = 'ONETIME',
    }
    export enum messageQueueStatus {
        WAITING = 'WAITING',
        SENT = 'SENT',
        FAILED = 'FAILED',
    }
}

