/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$Combine = {
    combineType?: com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$Combine.combineType;
    combineValue?: number;
    combineValueName?: string;
    combineValueType?: string;
    combineValuePath?: string;
    combineOperator?: com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$Combine.combineOperator;
};
export namespace com_ever_edu_lms_blackwhite_dto_res_BlackAndWhiteDto$Combine {
    export enum combineType {
        USER_GROUP = 'USER_GROUP',
        JOB_ROLE = 'JOB_ROLE',
        JOB_LEVEL = 'JOB_LEVEL',
        JOB_TITLE = 'JOB_TITLE',
        JOB_GROUP = 'JOB_GROUP',
        COMPANY = 'COMPANY',
    }
    export enum combineOperator {
        AND = 'AND',
        OR = 'OR',
    }
}

