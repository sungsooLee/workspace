/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_notification_dto_req_MessageQueueEntrySearchReqDto = {
    /**
     * 메세지 타입
     */
    messageType?: com_ever_edu_pms_notification_dto_req_MessageQueueEntrySearchReqDto.messageType;
    /**
     * 발송 상태
     */
    status?: com_ever_edu_pms_notification_dto_req_MessageQueueEntrySearchReqDto.status;
};
export namespace com_ever_edu_pms_notification_dto_req_MessageQueueEntrySearchReqDto {
    /**
     * 메세지 타입
     */
    export enum messageType {
        EMAIL = 'EMAIL',
        SMS = 'SMS',
        KAKAO = 'KAKAO',
        PUSH = 'PUSH',
    }
    /**
     * 발송 상태
     */
    export enum status {
        WAITING = 'WAITING',
        SENT = 'SENT',
        FAILED = 'FAILED',
    }
}

