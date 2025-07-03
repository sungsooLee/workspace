/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_schedule_dto_res_ScheduleResultResDto = {
    /**
     * Schedule 상태
     */
    state?: com_ever_edu_pms_schedule_dto_res_ScheduleResultResDto.state;
    /**
     * 결과 메세지 (오류 등...)
     */
    message?: string;
    /**
     * 시작일시
     */
    startDate?: string;
    /**
     * 종료일시
     */
    endDate?: string;
};
export namespace com_ever_edu_pms_schedule_dto_res_ScheduleResultResDto {
    /**
     * Schedule 상태
     */
    export enum state {
        WAIT = 'WAIT',
        EXECUTED = 'EXECUTED',
        COMPLETED = 'COMPLETED',
        FAILED = 'FAILED',
    }
}

