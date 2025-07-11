/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser = {
    contentId?: number;
    contentName?: string;
    deadlineDays?: number;
    submitDeadlineType?: com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser.submitDeadlineType;
    asgmtUUID?: string;
    asgmtName?: string;
    statusCode?: com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser.statusCode;
    score?: number;
    submitDate?: string;
};
export namespace com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnUser {
    export enum submitDeadlineType {
        BEFORE = 'BEFORE',
        AFTER = 'AFTER',
    }
    export enum statusCode {
        SUBMITTED = 'SUBMITTED',
        SCORED = 'SCORED',
        REJECTED = 'REJECTED',
    }
}

