/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin = {
    contentId?: number;
    contentName?: string;
    deadlineDays?: number;
    submitDeadlineType?: com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin.submitDeadlineType;
    isOpened?: boolean;
    isDeleted?: boolean;
};
export namespace com_ever_edu_cms_asgmt_dto_res_AsgmtGroupResDto$ListOnAdmin {
    export enum submitDeadlineType {
        BEFORE = 'BEFORE',
        AFTER = 'AFTER',
    }
}

