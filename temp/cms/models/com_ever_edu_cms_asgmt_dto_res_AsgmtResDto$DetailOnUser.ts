/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnUser = {
    contentId?: number;
    contentName?: string;
    deadlineDays?: number;
    submitDeadlineType?: com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnUser.submitDeadlineType;
    asgmtUUID?: string;
    asgmtName?: string;
    asgmtText?: string;
    attachFileGroupId?: number;
    explainFileId?: number;
    scoringCriteria?: string;
    submitType?: com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnUser.submitType;
};
export namespace com_ever_edu_cms_asgmt_dto_res_AsgmtResDto$DetailOnUser {
    export enum submitDeadlineType {
        BEFORE = 'BEFORE',
        AFTER = 'AFTER',
    }
    export enum submitType {
        OPTION = 'OPTION',
        FILE = 'FILE',
        TEXT = 'TEXT',
    }
}

