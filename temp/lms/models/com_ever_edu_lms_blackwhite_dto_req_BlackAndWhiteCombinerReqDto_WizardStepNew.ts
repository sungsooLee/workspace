/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 학습대상 유저 그룹 조합
 */
export type com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStepNew = {
    combineType: com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStepNew.combineType;
    combineValue?: number;
};
export namespace com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStepNew {
    export enum combineType {
        USER_GROUP = 'USER_GROUP',
        JOB_ROLE = 'JOB_ROLE',
        JOB_LEVEL = 'JOB_LEVEL',
        JOB_TITLE = 'JOB_TITLE',
        JOB_GROUP = 'JOB_GROUP',
        COMPANY = 'COMPANY',
    }
}

