/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_schedule_dto_res_ScheduleResDto = {
    /**
     * UUID
     */
    uuid?: string;
    /**
     * Schedule 이름 (Job 이름)
     */
    scheduleName?: string;
    /**
     * Cron 표현식
     */
    cronExpression?: string;
    /**
     * Schedule 상태
     */
    state?: com_ever_edu_pms_schedule_dto_res_ScheduleResDto.state;
    /**
     * Schedule 설명
     */
    description?: string;
};
export namespace com_ever_edu_pms_schedule_dto_res_ScheduleResDto {
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

