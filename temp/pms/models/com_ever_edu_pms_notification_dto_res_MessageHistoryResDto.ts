/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_notification_dto_res_MessageHistoryResDto = {
    messageHistoryId?: number;
    messageTypeCode?: com_ever_edu_pms_notification_dto_res_MessageHistoryResDto.messageTypeCode;
    sendingTypeCode?: com_ever_edu_pms_notification_dto_res_MessageHistoryResDto.sendingTypeCode;
    templateId?: string;
    completedDate?: string;
    status?: com_ever_edu_pms_notification_dto_res_MessageHistoryResDto.status;
    recordId?: string;
};
export namespace com_ever_edu_pms_notification_dto_res_MessageHistoryResDto {
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

