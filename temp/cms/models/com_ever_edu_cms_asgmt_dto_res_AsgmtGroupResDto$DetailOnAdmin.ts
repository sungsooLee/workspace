/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnAdmin } from './com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnAdmin';
export type com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$DetailOnAdmin = {
    contentId?: number;
    contentName?: string;
    deadlineDays?: number;
    submitDeadlineType?: com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$DetailOnAdmin.submitDeadlineType;
    asgmts?: Array<com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$ListOnAdmin>;
};
export namespace com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$DetailOnAdmin {
    export enum submitDeadlineType {
        BEFORE = 'BEFORE',
        AFTER = 'AFTER',
    }
}

