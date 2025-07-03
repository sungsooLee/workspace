/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin = {
    termsId?: number;
    termsName?: string;
    termsEffectiveDate?: string;
    termsTarget?: com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin.termsTarget;
    isUsed?: boolean;
    isDeleted?: boolean;
    isMandatory?: boolean;
    termsTypeCode?: com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin.termsTypeCode;
    termsStatus?: com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin.termsStatus;
    termsOrder?: number;
    termsDesc?: string;
    termsVersion?: string;
    noticeStartDate?: string;
    noticeEndDate?: string;
    mailSendingDate?: string;
    isNoticeAutoSending?: boolean;
    translationCount?: number;
    translationLocaleCount?: number;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_terms_dto_res_TermsResDto$ListOnAdmin {
    export enum termsTarget {
        ALL = 'ALL',
        TENANT = 'TENANT',
        USER_GROUP = 'USER_GROUP',
    }
    export enum termsTypeCode {
        TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
        PRIVACY_POLICY = 'PRIVACY_POLICY',
        SENSITIVE_PERSONAL_INFO = 'SENSITIVE_PERSONAL_INFO',
        PERSONAL_INFO_COLLECTION = 'PERSONAL_INFO_COLLECTION',
    }
    export enum termsStatus {
        PENDING = 'PENDING',
        PUBLISHED = 'PUBLISHED',
        EXPIRED = 'EXPIRED',
    }
}

